(async function () {
  const overlay = document.getElementById("overlay");
  const book    = document.getElementById("book-inner");

  // ------------------------------------------------------------------
  // Load hand-drawn masks and build SVG paths.
  // The "outer" ring is the outer boundary with the six realm wedges
  // punched out as holes (via fill-rule="evenodd").
  // ------------------------------------------------------------------

  const masks = await fetch("masks.json").then(r => r.json());
  const REALMS = ["deva","asura","human","animal","ghost","hell"];

  // Render order: big background shapes first, small ones on top, so
  // that tiny hotspots (moon, greed, etc.) win pointer-events.
  const ORDER = [
    "outer",   // donut ring — goes under the realm wedges
    ...REALMS, // six wedges over the ring
    "caption",
    "yama", "buddha", "moon",
    "greed", "aversion", "delusion", // three poisons on top
  ];

  function polygonD(points){
    if (!points || points.length < 3) return "";
    return "M " + points.map(([x,y]) => `${x} ${y}`).join(" L ") + " Z";
  }

  function ringD(){
    // Outer boundary + each realm as a hole (evenodd).
    let d = polygonD(masks.outer);
    REALMS.forEach(k => {
      if (masks[k]) d += " " + polygonD(masks[k]);
    });
    return d;
  }

  for (const key of ORDER){
    if (!masks[key]) continue;
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.dataset.key = key;
    p.setAttribute("d", key === "outer" ? ringD() : polygonD(masks[key]));
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
  // Book panel rendering
  // ------------------------------------------------------------------

  function escapeHTML(s){
    return s.replace(/[&<>"']/g, c => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
    }[c]));
  }

  function render(key){
    const d = WHEEL_DATA[key];
    if (!d) return;

    overlay.querySelectorAll("[data-key]").forEach(r =>
      r.classList.toggle("is-active", r.dataset.key === key)
    );

    const metaRows = [];
    if (d.poison) metaRows.push(["Poison", d.poison]);
    if (d.light)  metaRows.push(["Light",  d.light]);
    if (d.sage)   metaRows.push(["Sage",   d.sage]);

    const passagesHTML = d.passages.map(p => `
      <div class="passage">
        <p>${escapeHTML(p.text)}</p>
        <div class="page">${escapeHTML(p.page)}</div>
      </div>
    `).join("");

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
              <dd>${escapeHTML(v)}</dd>
            `).join("")}
          </dl>
        ` : ""}

        <div class="book-title">From the book · ${escapeHTML(d.page || "")}</div>
        <h3>${escapeHTML(d.bookTitle || "")}</h3>

        ${passagesHTML}
      </article>
    `;
    book.scrollTop = 0;
  }

  overlay.querySelectorAll("[data-key]").forEach(el => {
    el.addEventListener("click", () => render(el.dataset.key));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " "){
        e.preventDefault(); render(el.dataset.key);
      }
    });
  });

  render("caption");
})();
