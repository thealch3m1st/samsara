(async function () {
  const overlay = document.getElementById("overlay");
  const book    = document.getElementById("book-inner");

  // ------------------------------------------------------------------
  // Hotspots — built from hand-drawn masks.json.
  // The "outer" ring is a donut: outer boundary with the six realm
  // wedges punched out as holes using fill-rule="evenodd".
  // ------------------------------------------------------------------

  const [masks, CONTEXTS] = await Promise.all([
    fetch("masks.json").then(r => r.json()),
    fetch("contexts.json").then(r => r.json()),
  ]);
  const REALMS = ["deva","asura","human","animal","ghost","hell"];
  const ORDER  = [
    "outer",
    ...REALMS,
    "caption",
    "yama", "buddha", "moon",
    "greed", "aversion", "delusion",
  ];

  const polyD = pts => pts && pts.length >= 3
    ? "M " + pts.map(([x,y]) => `${x} ${y}`).join(" L ") + " Z"
    : "";

  const ringD = () =>
    polyD(masks.outer) + " " + REALMS.filter(k => masks[k]).map(k => polyD(masks[k])).join(" ");

  for (const key of ORDER){
    if (!masks[key]) continue;
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.dataset.key = key;
    p.setAttribute("d", key === "outer" ? ringD() : polyD(masks[key]));
    if (key === "outer") p.setAttribute("fill-rule", "evenodd");
    const d = WHEEL_DATA[key];
    if (d){
      p.setAttribute("role", "button");
      p.setAttribute("tabindex", "0");
      p.setAttribute("aria-label", d.name);
    }
    overlay.appendChild(p);
  }

  // ------------------------------------------------------------------
  // Term-detection — gold pills for glossary entries
  // ------------------------------------------------------------------

  const TERM_ALIASES = {
    "Śākyamuni": "Sakyamuni",
    "Sākyamuni": "Sakyamuni",
    "Sākyasiṃha": "Sakyamuni",
    "Indraśakra": "Sakra",
    "Yama Dharmarāja": "Yama Dharmarāja",
    "Mahākāruṇika": "Mahākāruṇika",
    "anguished spirits": "Hungry Ghost Realm",
    "anguished-spirit realms": "Hungry Ghost Realm",
    "hell realms": "Hell Realm",
    "hell-beings": "Hell Realm",
    "hell beings": "Hell Realm",
    "god realms": "Deva Realm",
    "antigod realms": "Asura Realm",
    "human realms": "Human Realm",
    "animal realms": "Animal Realm",
    "animal-realms": "Animal Realm",
    "pristine cognition": "Pristine Cognition",
    "cyclic existence": "Cyclic Existence",
    "dependent origination": "Dependent Origination",
    "twelve links": "Dependent Origination",
    "fundamental ignorance": "Fundamental Ignorance",
    "dissonant mental states": "Dissonant Mental States",
    "three poisons": "Three Poisons",
    "five poisons": "Five Poisons",
    "compassion": "Compassion",
    "karma": "Karma",
    "intermediate state": "Intermediate State of Rebirth",
    "meditational deity": "Meditational Deity",
    "maṇḍala": "Maṇḍala",
    "mandala": "Maṇḍala",
    "Vajrasattva": "Vajrasattva",
  };

  const allTerms = [...Object.keys(GLOSSARY), ...Object.keys(TERM_ALIASES)]
    .sort((a, b) => b.length - a.length);
  const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const termsPattern = new RegExp(
    `(?<![A-Za-zāīūḍṇṭṛṣśñçè])(${allTerms.map(escapeRe).join("|")})(?![A-Za-zāīūḍṇṭṛṣśñçè])`,
    "g"
  );

  function escapeHTML(s){
    return s.replace(/[&<>"']/g, c => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
    }[c]));
  }

  // Wrap any "p. N", "pp. N–M", "Chapter 4, p. 59" page reference in
  // a clickable span so it can open the reader at that page.
  function linkifyPageRefs(s){
    // Match "p. 279" or "pp. 19–20" / "pp. 19-20"
    return escapeHTML(s).replace(
      /\b(pp?\.\s*(\d+)(?:\s*[–-]\s*(\d+))?)/g,
      (full, _label, n) =>
        `<button class="page-link" data-page="${n}">${full}</button>`
    );
  }

  function markUpTerms(text, skipKey){
    let html = escapeHTML(text);
    const seen = new Set();
    html = html.replace(termsPattern, (match) => {
      const canonical = TERM_ALIASES[match] || match;
      if (!GLOSSARY[canonical]) return match;
      if (canonical === skipKey) return match;
      const key = canonical.toLowerCase();
      if (seen.has(key)) return match;
      seen.add(key);
      return `<button class="term" data-term="${escapeHTML(canonical)}">${match}</button>`;
    });
    return html;
  }

  // ------------------------------------------------------------------
  // Context lookup — match each passage to a 3-level context
  // ------------------------------------------------------------------

  function normalize(s){
    return s
      .replace(/\[[^\]]*\]/g, "")           // drop editorial brackets
      .replace(/[\u201c\u201d]/g, '"')      // smart quotes → dumb
      .replace(/[\u2019]/g, "'")            // smart apostrophe
      .replace(/[.,;:!?'"]/g, "")           // drop punctuation
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim();
  }

  // Pre-normalise each anchor AND its full level-3 context (the widest
  // chunk of surrounding book text), so a passage matches even when the
  // anchor phrase isn't literally in the passage — as long as the
  // passage sits within that anchor's chapter-wide window.
  const anchorIndex = Object.entries(CONTEXTS).map(([key, ctx]) => {
    const lvl = ctx.levels?.[2] || ctx.levels?.[1] || ctx.levels?.[0] || {};
    const full = normalize(
      (lvl.before || "") + " " + ctx.anchor + " " + (lvl.after || "")
    );
    return {
      key,
      anchorNorm: normalize(ctx.anchor),
      fullNorm: full,
      ctx,
    };
  });

  // A passage matches an anchor if there's a long enough overlapping
  // substring between them. We look for the longest shared run (shingle
  // of words) rather than requiring one to contain the other.
  function longestOverlap(a, b){
    // Check 6-word windows of the passage against the anchor's full context.
    const words = a.split(" ");
    let best = 0;
    for (let w = Math.min(words.length, 18); w >= 5; w--){
      for (let i = 0; i + w <= words.length; i++){
        const win = words.slice(i, i + w).join(" ");
        if (b.includes(win)){ return w; } // early exit — longest-first
      }
    }
    return best;
  }

  function contextFor(passage){
    const pnorm = normalize(passage.text);
    if (pnorm.length < 20) return null;

    let best = null;
    for (const a of anchorIndex){
      const overlap = longestOverlap(pnorm, a.fullNorm);
      if (overlap >= 5){
        // Bonus for a direct anchor-phrase match.
        const score = overlap * 100 +
          (a.fullNorm.includes(a.anchorNorm) && pnorm.includes(a.anchorNorm.slice(0, 20))
             ? 500 : 0);
        if (!best || score > best.score) best = { ...a, score, overlap };
      }
    }
    return best ? best.ctx : null;
  }

  // ------------------------------------------------------------------
  // Popover for glossary terms
  // ------------------------------------------------------------------

  const popover = document.getElementById("popover");
  const popoverBody = document.getElementById("popover-body");

  function showTerm(termName, anchorEl){
    const g = GLOSSARY[termName];
    if (!g) return;
    const tibSkt = [g.tib && `<span class="tib">${escapeHTML(g.tib)}</span>`,
                    g.skt && `<span class="skt">Skt. ${escapeHTML(g.skt)}</span>`]
      .filter(Boolean).join(" · ");

    const bodyHTML = markUpTerms(g.body || "", termName);
    const seeHTML = (g.see || []).map(ref =>
      `<button class="term term--see" data-term="${escapeHTML(ref)}">${escapeHTML(ref)}</button>`
    ).join("");
    let goToChip = "";
    if (g.section && WHEEL_DATA[g.section]){
      goToChip = `<button class="go-section" data-section="${escapeHTML(g.section)}">Go to ${escapeHTML(WHEEL_DATA[g.section].name)} →</button>`;
    }

    popoverBody.innerHTML = `
      <div class="pop-head">
        <div class="pop-title">
          <h4>${escapeHTML(termName)}</h4>
          ${tibSkt ? `<div class="tib-skt">${tibSkt}</div>` : ""}
        </div>
        <button class="pop-close" aria-label="Close">×</button>
      </div>
      <p class="pop-short">${escapeHTML(g.short || "")}</p>
      <div class="pop-body">${bodyHTML}</div>
      ${g.page ? `<div class="pop-page">From the book · ${linkifyPageRefs(g.page)}</div>` : ""}
      ${goToChip}
      ${seeHTML ? `<div class="pop-see"><span class="eyebrow">See also</span>${seeHTML}</div>` : ""}
    `;

    // Use the visible container as the clamp bounds: the reader when
    // open, otherwise the book panel, falling back to the whole aside.
    const boundsEl = !reader.hidden ? reader
                  : (bookInner && !bookInner.hidden ? bookInner
                  : document.querySelector("aside.book"));
    const bounds = boundsEl.getBoundingClientRect();
    popover.style.display = "block";
    popover.style.opacity = "0";
    requestAnimationFrame(() => {
      const popRect = popover.getBoundingClientRect();
      let top, left;
      if (anchorEl){
        const a = anchorEl.getBoundingClientRect();
        const minLeft = Math.max(12, bounds.left + 8);
        const maxLeft = Math.min(window.innerWidth - popRect.width - 12,
                                 bounds.right - popRect.width - 8);
        left = Math.min(Math.max(a.left - 20, minLeft), Math.max(minLeft, maxLeft));
        top = a.bottom + 8;
        if (top + popRect.height > window.innerHeight - 12){
          top = Math.max(12, a.top - popRect.height - 8);
        }
      } else {
        left = bounds.left + Math.max(0, (bounds.width - popRect.width) / 2);
        top  = bounds.top + 80;
      }
      popover.style.left = `${Math.max(12, left)}px`;
      popover.style.top  = `${Math.max(12, top)}px`;
      popover.style.opacity = "1";
    });
  }

  function hideTerm(){
    popover.style.display = "none";
  }

  document.addEventListener("click", (e) => {
    const termBtn = e.target.closest(".term");
    if (termBtn){ e.stopPropagation(); showTerm(termBtn.dataset.term, termBtn); return; }
    if (e.target.closest(".pop-close")){ hideTerm(); return; }
    if (popover.style.display === "block" && !e.target.closest("#popover") && !e.target.closest(".term")){
      hideTerm();
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hideTerm(); });

  // ------------------------------------------------------------------
  // Matryoshka passage rendering
  // ------------------------------------------------------------------
  //
  // Each passage renders as nested layers. The original quote is the
  // innermost layer, highlighted. Clicking "Zoom out" wraps the quote
  // in its surrounding paragraph, then its page, then its chapter.
  // Each layer has a header (how far out we are + book pages covered)
  // and can be collapsed back to the level below.

  const LEVEL_LABELS = [
    { name: "The quote",             desc: "as cited" },
    { name: "Surrounding paragraph", desc: "the sentences around it" },
    { name: "Same page",             desc: "more of what the book is saying here" },
    { name: "Chapter context",       desc: "the wider passage in the book" },
    { name: "The whole book",        desc: "read continuously, with the wheel lit up by what you read" },
  ];

  // ------------------------------------------------------------------
  // Term → wheel-section mapping. Drives the live highlighting in L4.
  // ------------------------------------------------------------------

  // Surface-form → wheel-section. Much wider than canonical glossary
  // keys, so the reader lights up the wheel on everyday book phrasing
  // ("anguished spirits", "god realms", "antigods", etc).
  const SURFACE_SECTIONS = {
    // six realms — many surface forms
    "god realm": ["deva"],  "god realms": ["deva"],  "god-realms": ["deva"],
    "realm of the gods": ["deva"], "deva": ["deva"], "pride": ["deva"],
    "Sakra": ["deva"], "Indraśakra": ["deva"],

    "antigod": ["asura"], "antigods": ["asura"], "antigod realm": ["asura"],
    "antigod realms": ["asura"], "realm of the antigods": ["asura"],
    "asura": ["asura"], "envy": ["asura"], "Vemacitra": ["asura"],

    "human realm": ["human"], "human realms": ["human"], "human beings": ["human"],
    "attachment": ["human"], "Sākyamuni": ["human"], "Sakyamuni": ["human"],
    "Śākyamuni": ["human"], "Śākyasiṃha": ["human"],

    "animal realm": ["animal"], "animal realms": ["animal"], "animal-realms": ["animal"],
    "animals": ["animal"], "delusion": ["animal", "delusion"],
    "Sthirasiṃha": ["animal"],

    "anguished spirit": ["ghost"], "anguished spirits": ["ghost"],
    "anguished-spirit": ["ghost"], "anguished-spirit realms": ["ghost"],
    "hungry ghost": ["ghost"], "preta": ["ghost"],
    "miserliness": ["ghost"], "Jvālamukha": ["ghost"],

    "hell realm": ["hell"], "hell realms": ["hell"], "hells": ["hell"],
    "hell-being": ["hell"], "hell-beings": ["hell"], "hell beings": ["hell"],
    "naraka": ["hell"], "aversion": ["hell", "aversion"],
    "hatred": ["hell", "aversion"],

    // three poisons (hub)
    "three poisons": ["greed", "aversion", "delusion"],
    "five poisons": ["greed", "aversion", "delusion", "deva", "asura"],
    "attachment and aversion": ["greed", "aversion"],
    "desire": ["greed"], "craving": ["greed", "ghost"],

    // ring / dependent origination
    "cyclic existence": ["outer"], "samsāra": ["outer"], "saṃsāra": ["outer"],
    "dependent origination": ["outer"], "twelve links": ["outer"],
    "karma": ["outer", "yama"], "past actions": ["outer", "yama"],

    // yama
    "Yama": ["yama"], "Yama Dharmarāja": ["yama", "hell"],
    "Lord of Death": ["yama"], "Dharmarāja": ["yama"],
    "impermanence": ["yama"], "bhavacakra": ["yama", "outer"],

    // buddha / compassion / liberation
    "Mahākāruṇika": ["buddha"], "Avalokiteśvara": ["buddha"],
    "compassion": ["buddha"], "great compassion": ["buddha"],
    "Vajrasattva": ["buddha"], "refuge": ["buddha"],
    "pristine cognition": ["buddha", "moon"],
    "buddha-body": ["buddha"], "buddhahood": ["buddha"],

    // moon / liberation
    "nirvāṇa": ["moon"], "liberation": ["moon"], "illusion": ["moon"],

    // center poisons
    "fundamental ignorance": ["delusion"],
    "ignorance": ["delusion"],
    "dissonant mental states": ["greed", "aversion", "delusion"],
  };

  // Build the HTML for a matryoshka layer at a given depth.
  // 0 = innermost (the quote itself). 1..3 = wrapping layers.
  // Only the OUTERMOST layer ever carries a zoom-out button; inner
  // layers only show a close-× in their header.
  function layerHTML(depth, isOutermost, quoteHTML, pageLabel, ctx){
    if (depth === 0){
      return `
        <div class="layer layer-0 is-quote" data-depth="0">
          <blockquote class="quote">${quoteHTML}</blockquote>
          <div class="layer-foot">
            <span class="page-ref">${linkifyPageRefs(pageLabel)}</span>
            ${isOutermost && ctx ? `
              <button class="zoom-out" data-target="1">
                <span class="zoom-icon">⌖</span>
                Zoom out to surrounding paragraph
              </button>` : ""}
          </div>
        </div>`;
    }
    const L = ctx.levels[depth - 1];
    if (!L) return layerHTML(depth - 1, isOutermost, quoteHTML, pageLabel, ctx);
    const label = LEVEL_LABELS[depth];
    const before = L.before ? markUpTerms(L.before) : "";
    const after  = L.after  ? markUpTerms(L.after)  : "";
    const pageRange = (L.startPage && L.endPage && L.startPage !== L.endPage)
      ? `pp. ${L.startPage}–${L.endPage}`
      : `p. ${L.startPage || ctx.page}`;
    const nextLabel = LEVEL_LABELS[depth + 1]?.name.toLowerCase() || null;
    return `
      <div class="layer layer-${depth}" data-depth="${depth}">
        <div class="layer-head">
          <span class="layer-name">${escapeHTML(label.name)}</span>
          <span class="layer-range">${linkifyPageRefs(pageRange)}</span>
          <button class="zoom-in" data-target="${depth - 1}" aria-label="Close this layer">×</button>
        </div>
        ${before ? `<p class="context-before">${before}</p>` : ""}
        ${layerHTML(depth - 1, false, quoteHTML, pageLabel, ctx)}
        ${after ? `<p class="context-after">${after}</p>` : ""}
        <div class="layer-foot">
          ${isOutermost
            ? (depth < 3
                ? `<button class="zoom-out" data-target="${depth + 1}">
                     <span class="zoom-icon">⌖</span>
                     Zoom out to ${escapeHTML(nextLabel || "next layer")}
                   </button>`
                : `<button class="open-reader" data-page="${L.startPage || ctx.page}" data-anchor="${escapeHTML(ctx.anchor || "")}">
                     <span class="zoom-icon">⌖</span>
                     Open the whole book
                   </button>`)
            : ""}
        </div>
      </div>
    `;
  }

  // Render a single passage at depth 0. Its matryoshka is rebuilt on demand.
  function passageHTML(p, idx){
    const ctx = contextFor(p);
    const quoteHTML = markUpTerms(p.text);
    return `
      <div class="passage" data-index="${idx}">
        <div class="matryoshka" data-level="0">
          ${layerHTML(0, true, quoteHTML, p.page, ctx)}
        </div>
      </div>
    `;
  }

  // Rebuild a matryoshka at the given depth by calling layerHTML directly.
  function setMatryoshkaLevel(matryoshkaEl, targetLevel){
    const passage = matryoshkaEl.closest(".passage");
    const idx = +passage.dataset.index;
    const p = currentPassages[idx];
    const ctx = contextFor(p);
    const quoteHTML = markUpTerms(p.text);
    matryoshkaEl.dataset.level = String(targetLevel);
    matryoshkaEl.innerHTML = layerHTML(targetLevel, true, quoteHTML, p.page, ctx);
  }

  // ------------------------------------------------------------------
  // Main book panel
  // ------------------------------------------------------------------

  let currentPassages = [];

  function render(key){
    const d = WHEEL_DATA[key];
    if (!d) return;
    hideTerm();

    overlay.querySelectorAll("[data-key]").forEach(r =>
      r.classList.toggle("is-active", r.dataset.key === key)
    );

    currentPassages = d.passages;

    const metaRows = [];
    if (d.poison) metaRows.push(["Poison", d.poison]);
    if (d.light)  metaRows.push(["Light",  d.light]);
    if (d.sage)   metaRows.push(["Sage",   d.sage]);

    const linksHTML = (d.links || []).map(k => {
      const target = WHEEL_DATA[k];
      if (!target) return "";
      return `<button class="section-chip" data-section="${escapeHTML(k)}">${escapeHTML(target.name)}</button>`;
    }).join("");

    book.innerHTML = `
      <article class="entry">
        <div class="eyebrow">A section of the wheel</div>
        <h2>${escapeHTML(d.name)}</h2>
        <div class="subtitle">${escapeHTML(d.subtitle || "")}</div>

        ${d.modern ? `<div class="modern">${escapeHTML(d.modern)}</div>` : ""}

        ${metaRows.length ? `
          <dl class="meta">
            ${metaRows.map(([k,v]) => `
              <dt>${escapeHTML(k)}</dt>
              <dd>${markUpTerms(v)}</dd>
            `).join("")}
          </dl>
        ` : ""}

        <div class="book-title">From the book · ${linkifyPageRefs(d.page || "")}</div>
        <h3>${escapeHTML(d.bookTitle || "")}</h3>

        ${d.passages.map(passageHTML).join("")}

        ${linksHTML ? `
          <div class="section-links">
            <div class="eyebrow">Related sections of the wheel</div>
            <div class="chips">${linksHTML}</div>
          </div>
        ` : ""}
      </article>
    `;
    book.scrollTop = 0;
  }

  overlay.querySelectorAll("[data-key]").forEach(el => {
    el.addEventListener("click", () => render(el.dataset.key));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " "){ e.preventDefault(); render(el.dataset.key); }
    });
  });

  // Delegated handlers for the book panel
  book.addEventListener("click", (e) => {
    const chip = e.target.closest(".section-chip, .go-section");
    if (chip){ e.stopPropagation(); render(chip.dataset.section); return; }
    const zoomOut = e.target.closest(".zoom-out");
    if (zoomOut){
      const m = zoomOut.closest(".matryoshka");
      setMatryoshkaLevel(m, +zoomOut.dataset.target);
      // smooth-scroll the passage into view
      zoomOut.closest(".passage").scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    const zoomIn = e.target.closest(".zoom-in");
    if (zoomIn){
      const m = zoomIn.closest(".matryoshka");
      setMatryoshkaLevel(m, +zoomIn.dataset.target);
      return;
    }
  });

  render("caption");

  // ------------------------------------------------------------------
  // L4 — the full-book reader with live wheel highlighting
  // ------------------------------------------------------------------

  const reader        = document.getElementById("reader");
  const readerPages   = document.getElementById("reader-pages");
  const readerClose   = document.getElementById("reader-close");
  const readerSubtitle= document.getElementById("reader-subtitle");
  const bookInner     = document.getElementById("book-inner");

  let bookData = null;
  let pageObserver = null;
  let visiblePages = new Set();

  async function ensureBook(){
    if (bookData) return bookData;
    bookData = await fetch("book.json").then(r => r.json());
    return bookData;
  }

  async function openReader(startPage, anchor){
    // Show "loading" state immediately so the user doesn't see an empty reader.
    bookInner.hidden = true;
    reader.hidden = false;
    readerPages.innerHTML = `<div class="reader-loading">Loading the book…</div>`;
    readerSubtitle.textContent = "loading…";

    try {
      await ensureBook();
    } catch (e) {
      readerPages.innerHTML = `<div class="reader-loading">Failed to load the book: ${e.message}. Close and try again.</div>`;
      return;
    }

    const pageNumbers = Object.keys(bookData || {}).map(n => +n).sort((a,b) => a - b);
    if (!pageNumbers.length) {
      readerPages.innerHTML = `<div class="reader-loading">The book appears to be empty. Close and try again.</div>`;
      return;
    }
    readerPages.innerHTML = pageNumbers.map(n => {
      const body = bookData[n];
      const paragraphs = body.split(/\n\s*\n+/)
        .map(p => `<p>${markUpTerms(p.trim())}</p>`)
        .join("");
      return `
        <section class="reader-page" data-page="${n}">
          <div class="reader-page-num">— p. ${n} —</div>
          <div class="reader-page-body">${paragraphs}</div>
        </section>
      `;
    }).join("");

    // Scroll to starting page. If the anchor phrase lives within the
    // page, scroll so that anchor text is visible; otherwise page top.
    requestAnimationFrame(() => {
      const target = reader.querySelector(`.reader-page[data-page="${startPage}"]`);
      if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
      if (anchor){
        // find first term mention inside the target page; highlight briefly
        const span = target?.querySelector(".reader-page-body");
        if (span){
          span.classList.add("flash-anchor");
          setTimeout(() => span.classList.remove("flash-anchor"), 1800);
        }
      }
    });

    // Observe all pages to know which are visible. As the user scrolls,
    // light up any wheel section whose terms appear on visible pages.
    if (pageObserver) pageObserver.disconnect();
    visiblePages = new Set();
    pageObserver = new IntersectionObserver((entries) => {
      for (const e of entries){
        const n = +e.target.dataset.page;
        if (e.isIntersecting) visiblePages.add(n);
        else visiblePages.delete(n);
      }
      updateWheelHighlight();
    }, { root: reader, threshold: 0.3 });
    reader.querySelectorAll(".reader-page").forEach(el => pageObserver.observe(el));

    // Initial seed: the page the reader opened on is already in view, so
    // compute highlights immediately instead of waiting for the first scroll.
    requestAnimationFrame(() => {
      const readerRect = reader.getBoundingClientRect();
      reader.querySelectorAll(".reader-page").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom > readerRect.top && r.top < readerRect.bottom) {
          visiblePages.add(+el.dataset.page);
        }
      });
      updateWheelHighlight();
    });
  }

  function closeReader(){
    reader.hidden = true;
    bookInner.hidden = false;
    if (pageObserver) { pageObserver.disconnect(); pageObserver = null; }
    // Clear wheel highlights
    overlay.querySelectorAll("[data-key]").forEach(el =>
      el.classList.remove("is-relevant")
    );
    readerSubtitle.textContent = "as the wheel lights up around what you are reading";
  }

  // Given the pages currently in view, mark matching wheel sections.
  // We scan the page text case-insensitively for each surface form and
  // union the sections they map to.
  function updateWheelHighlight(){
    if (!bookData) return;
    const pages = [...visiblePages].sort((a,b)=>a-b);
    if (!pages.length) return;
    const text = pages.map(n => bookData[n] || "").join(" ").toLowerCase();

    const sections = new Set();
    for (const [form, targets] of Object.entries(SURFACE_SECTIONS)){
      if (text.indexOf(form.toLowerCase()) !== -1){
        targets.forEach(s => sections.add(s));
      }
    }
    overlay.querySelectorAll("[data-key]").forEach(el =>
      el.classList.toggle("is-relevant", sections.has(el.dataset.key))
    );
    const first = pages[0], last = pages[pages.length - 1];
    readerSubtitle.textContent =
      first === last ? `p. ${first}` : `pp. ${first}–${last}`;
  }

  // Open reader on "Open the whole book" button. Also handle page-ref
  // clicks (from matryoshka headers, quote foot, popover footer) and
  // wedge-clicks while reader is open.
  book.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".open-reader");
    if (openBtn){
      e.stopPropagation();
      openReader(+openBtn.dataset.page || 100, openBtn.dataset.anchor || null);
    }
  });
  readerClose.addEventListener("click", closeReader);

  // Clicking any wheel section while the reader is open jumps to the
  // first page that mentions that section's defining term. Keeps the
  // section-click discoverable without duplicating UI.
  overlay.addEventListener("click", (e) => {
    if (reader.hidden) return;
    const key = e.target.closest("[data-key]")?.dataset.key;
    if (!key) return;
    e.stopPropagation();
    e.stopImmediatePropagation();
    // Find first page that mentions a defining term for this section.
    const defining = Object.entries(TERM_SECTIONS)
      .filter(([, sections]) => sections.includes(key))
      .map(([t]) => t);
    if (!defining.length || !bookData) return;
    const pages = Object.keys(bookData).map(n => +n).sort((a,b)=>a-b);
    for (const p of pages){
      const text = bookData[p] || "";
      if (defining.some(t => text.includes(t))){
        const target = reader.querySelector(`.reader-page[data-page="${p}"]`);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }
  }, true); // capture phase so we run before the normal render() handler

  // Clickable page numbers anywhere (matryoshka, section meta, popover)
  document.addEventListener("click", (e) => {
    const pl = e.target.closest(".page-link");
    if (!pl) return;
    e.stopPropagation();
    const n = parseInt(pl.dataset.page, 10);
    if (n) openReader(n);
  }, true);

})();
