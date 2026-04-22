# Samsara

**Live:** https://thealch3m1st.github.io/samsara/

An interactive modern Wheel of Life, read through *The Tibetan Book of the
Dead* (trans. Gyurme Dorje & Graham Coleman, Penguin Classics Deluxe
Edition).

Click any section of the wheel — the six realms, the three poisons at the
hub, the wrathful figure holding it, the Buddha who points beyond, the
moon above, the outer ring, the bottom caption — and the book opens to
what it has to say about that section.

## Matryoshka reading

Every quote can be zoomed out, one nested layer at a time:

1. **The quote** — as cited.
2. **Surrounding paragraph** — the sentences around it.
3. **Same page** — more of what the book is saying here.
4. **Chapter context** — the wider passage in the book.
5. **The whole book** — all 575 pages, continuous. As you scroll, the
   wheel on the left pulses live — wedges light up gold when the page
   you're reading names them.

Names and concepts in any passage are interactive — click them for a
glossary popover with the book's own definitions, Tibetan and Sanskrit,
cross-references, and a "Go to..." chip that jumps to the relevant wheel
section. Every `p. 279` / `pp. 19–20` is a clickable page-link that
opens the full book at that page.

## Local development

```sh
python3 -m http.server --directory app 8766
open http://localhost:8766/
```

Or, via the included Claude Code config:

```sh
claude
# ↳ preview_start { "name": "samsara" }
```

The mask editor (`/editor.html`) is included for future hotspot tweaks.

## Source

- `app/wheel.jpeg` — the wheel artwork (by the project author).
- `app/masks.json` — hand-drawn hotspot polygons.
- `app/glossary.js` — 35 glossary entries curated from the book's own
  *Glossary of Key Terms*.
- `app/contexts.json` — three-level nested context for each quoted
  passage, extracted directly from the book.
- `app/book.json` — full book text, page-indexed.

The book itself (`book.pdf`) is not tracked in this repo. Quoted
passages and glossary definitions are used under fair-use for this
educational, non-commercial work.
