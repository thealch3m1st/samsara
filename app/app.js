(async function () {
  const overlay = document.getElementById("overlay");
  const book    = document.getElementById("book-inner");

  // ------------------------------------------------------------------
  // Hotspots — built from hand-drawn masks.json.
  // The "outer" ring is a donut: outer boundary with the six realm
  // wedges punched out as holes using fill-rule="evenodd".
  // ------------------------------------------------------------------

  const masks  = await fetch("masks.json").then(r => r.json());
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
  // Term-detection. Sort terms longest-first so multi-word terms win
  // over single-word substrings. Build one big regex with alternation.
  // ------------------------------------------------------------------

  const TERMS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

  // Also accept a few surface-form aliases for terms whose canonical
  // form in the glossary has diacritics the passages don't always use.
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
    "god realms": "Deva Realm",
    "antigod realms": "Asura Realm",
    "human realms": "Human Realm",
    "animal realms": "Animal Realm",
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

  const allTerms = [
    ...TERMS,
    ...Object.keys(TERM_ALIASES),
  ].sort((a, b) => b.length - a.length);

  const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const termsPattern = new RegExp(
    // match a whole term, bounded by non-word characters or punctuation
    // (we avoid simple \b because our terms contain non-ASCII chars)
    `(?<![A-Za-zāīūḍṇṭṛṣśñçè])(${allTerms.map(escapeRe).join("|")})(?![A-Za-zāīūḍṇṭṛṣśñçè])`,
    "g"
  );

  function escapeHTML(s){
    return s.replace(/[&<>"']/g, c => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
    }[c]));
  }

  // Wrap detected terms in clickable spans. We escape first, then run
  // the regex on the escaped HTML (safe because our terms contain no
  // HTML-special chars).
  function markUpTerms(text, skipKey){
    let html = escapeHTML(text);
    const seen = new Set(); // dedupe — only linkify first occurrence per passage
    html = html.replace(termsPattern, (match) => {
      const canonical = TERM_ALIASES[match] || match;
      if (!GLOSSARY[canonical]) return match;
      if (canonical === skipKey) return match; // avoid linking a term to itself
      const key = canonical.toLowerCase();
      if (seen.has(key)) return match;
      seen.add(key);
      return `<button class="term" data-term="${escapeHTML(canonical)}">${match}</button>`;
    });
    return html;
  }

  // ------------------------------------------------------------------
  // Popover for glossary terms
  // ------------------------------------------------------------------

  const popover = document.getElementById("popover");
  const popoverBody = document.getElementById("popover-body");
  let pinnedTerm = null;

  function showTerm(termName, anchorEl){
    const g = GLOSSARY[termName];
    if (!g) return;
    const tibSkt = [g.tib && `<span class="tib">${escapeHTML(g.tib)}</span>`,
                    g.skt && `<span class="skt">Skt. ${escapeHTML(g.skt)}</span>`]
      .filter(Boolean).join(" · ");

    const bodyHTML = markUpTerms(g.body || "", termName);

    const seeHTML = (g.see || []).map(ref => {
      // ref can be either a glossary term or a wheel section (via the realm entries)
      return `<button class="term term--see" data-term="${escapeHTML(ref)}">${escapeHTML(ref)}</button>`;
    }).join("");

    // "Go to section" chip if this term maps to a wheel section
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
      ${g.page ? `<div class="pop-page">From the book · ${escapeHTML(g.page)}</div>` : ""}
      ${goToChip}
      ${seeHTML ? `<div class="pop-see"><span class="eyebrow">See also</span>${seeHTML}</div>` : ""}
    `;

    // Position: anchor beneath the clicked element when possible;
    // otherwise centre in the book panel.
    const bookRect = book.getBoundingClientRect();
    popover.style.display = "block";
    popover.style.opacity = "0";
    // Let it render, then measure
    requestAnimationFrame(() => {
      const popRect = popover.getBoundingClientRect();
      let top, left;
      if (anchorEl){
        const a = anchorEl.getBoundingClientRect();
        left = Math.min(
          Math.max(bookRect.left + 12, a.left - 20),
          bookRect.right - popRect.width - 12
        );
        top = a.bottom + 8;
        // If the popover would overflow the viewport bottom, place above
        if (top + popRect.height > window.innerHeight - 12){
          top = Math.max(12, a.top - popRect.height - 8);
        }
      } else {
        left = bookRect.left + (bookRect.width - popRect.width) / 2;
        top  = bookRect.top + 80;
      }
      popover.style.left = `${left}px`;
      popover.style.top  = `${top}px`;
      popover.style.opacity = "1";
    });

    pinnedTerm = termName;
  }

  function hideTerm(){
    popover.style.display = "none";
    pinnedTerm = null;
  }

  // Delegated handler for any term click inside the book or popover
  document.addEventListener("click", (e) => {
    const termBtn = e.target.closest(".term");
    if (termBtn){
      e.stopPropagation();
      showTerm(termBtn.dataset.term, termBtn);
      return;
    }
    const goBtn = e.target.closest(".go-section");
    if (goBtn){
      e.stopPropagation();
      hideTerm();
      render(goBtn.dataset.section);
      return;
    }
    if (e.target.closest(".pop-close")){
      hideTerm();
      return;
    }
    // Click outside popover closes it
    if (popover.style.display === "block" && !e.target.closest("#popover")){
      hideTerm();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideTerm();
  });

  // ------------------------------------------------------------------
  // Main book panel
  // ------------------------------------------------------------------

  function render(key){
    const d = WHEEL_DATA[key];
    if (!d) return;
    hideTerm();

    overlay.querySelectorAll("[data-key]").forEach(r =>
      r.classList.toggle("is-active", r.dataset.key === key)
    );

    const metaRows = [];
    if (d.poison) metaRows.push(["Poison", d.poison]);
    if (d.light)  metaRows.push(["Light",  d.light]);
    if (d.sage)   metaRows.push(["Sage",   d.sage]);

    const passagesHTML = d.passages.map((p, i) => {
      const textHTML    = markUpTerms(p.text);
      const contextHTML = p.context ? markUpTerms(p.context) : null;
      return `
        <div class="passage" data-index="${i}">
          <p class="passage-text">${textHTML}</p>
          ${contextHTML ? `
            <div class="passage-context" hidden>
              <div class="context-label">In context</div>
              <p>${contextHTML}</p>
            </div>
            <button class="passage-toggle" aria-expanded="false">Read in context ↓</button>
          ` : ""}
          <div class="page">${escapeHTML(p.page)}</div>
        </div>
      `;
    }).join("");

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

        <div class="book-title">From the book · ${escapeHTML(d.page || "")}</div>
        <h3>${escapeHTML(d.bookTitle || "")}</h3>

        ${passagesHTML}

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
      if (e.key === "Enter" || e.key === " "){
        e.preventDefault();
        render(el.dataset.key);
      }
    });
  });

  // Delegated: section chips + passage "read in context" toggles
  book.addEventListener("click", (e) => {
    const chip = e.target.closest(".section-chip, .go-section");
    if (chip){
      e.stopPropagation();
      render(chip.dataset.section);
      return;
    }
    const toggle = e.target.closest(".passage-toggle");
    if (toggle){
      const ctx = toggle.parentElement.querySelector(".passage-context");
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      ctx.hidden = isOpen;
      toggle.textContent = isOpen ? "Read in context ↓" : "Hide context ↑";
    }
  });

  render("caption");
})();
