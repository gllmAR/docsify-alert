# docsify-alert

Bring GitHub Flavored Markdown / CommonMark style callout (alert) blocks to Docsify with rich content support (images, code, media, iframes) and accessible, theme‑friendly rendering.

---

## Why

Docsify does not natively support the popular `[!NOTE]`, `[!TIP]`, `[!WARNING]`, etc. syntax. This plugin:

- Parses canonical callout syntax used across GitHub / docs ecosystems.
- Preserves full markdown inside alerts (default DOM mode) — images, code, tables, media.
- Avoids greedy regex pitfalls that swallow subsequent headings.
- Adds accessible roles and customizable theming.
- Provides a legacy pre-processing mode for ultra‑light transforms.

---

## Quick Start

Add the script after Docsify in your `index.html`:

```html
<script src="https://gllmar.github.io/docsify-alert/docsify-alerts.js"></script>
```

Basic page configuration (DOM mode is default, no extra config needed):

```html
<script>
  window.$docsify = {
    name: 'Your Docs',
    // optional customization examples
    alertStyles: `
      :root {
        --alert-text-color: #111;
      }
      .alert.note { background:#e7f3fe; }
    `,
    alertsConfig: {
      // mode: 'dom', // default; or 'pre'
      // lineBreakStrategy: 'preserve' // default
    }
  }
</script>
```

---

## Supported Syntax

Multiline form:

```
> [!NOTE]
> First line
> Second line
```

Single-line form:

```
> [!TIP] One line inline tip.
```

Supported default types: NOTE, TIP, IMPORTANT, WARNING, CAUTION.

Anything else falls back to a normal blockquote (untouched).

---

## Modes

| Mode | Purpose | Pros | Cons |
|------|---------|------|------|
| dom (default) | Transform after markdown render | Full markdown fidelity (tables, images, code, HTML) | Slight extra DOM pass |
| pre | Transform before markdown render via line parsing | Very light, earlier injection | Inner markdown becomes plain text (line breaks inserted as `<br>`) |

Select with:

```js
window.$docsify = { alertsConfig: { mode: 'pre' } }
```

---

## Line Break Handling

In `dom` mode we try to preserve multiline spacing. A strategy adds two trailing spaces to continuation lines so Docsify emits `<br>`. Disable (future) by setting `alertsConfig.lineBreakStrategy` (currently only `preserve`).

---

## Configuration API

```js
window.$docsify = {
  alertsConfig: {
    mode: 'dom',          // 'dom' | 'pre'
    lineBreakStrategy: 'preserve',
    types: {              // optional override or extension
      INFO: { class: 'note', icon: '<svg></svg>' }
    }
  }
}
```

`types` lets you extend or override built-in alert type map before the plugin initializes.

---

## Custom Styling

Inject additional CSS via `alertStyles` (concatenated after defaults) or target classes:

Classes generated:
- `.alert` (container)
- `.alert.note|tip|important|warning|caution`
- `.alert-content` (inner wrapper)

Variables you can define (recommended to add your own set):

```css
:root {
  --alert-text-color: #222;
  /* You can introduce your own e.g.: */
  /* --alert-note-bg: #e7f3fe; */
}
```

You can also completely omit default styling by overriding after load (future option: skipDefaults planned).

---

## Accessibility

- Each alert wrapper: `role="note"` and `aria-label` set to type.
- Icons have `aria-hidden="true"` implicitly via absence of title/desc; add a `<title>` in custom icons if desired.

Planned improvements: Provide heading-like first line semantics & keyboard focus outline option.

---

## Security

`dom` mode allows normal markdown sanitization path (Docsify processes content first). Raw HTML inside blockquotes is rendered per Docsify’s own rules. In `pre` mode inner text is HTML-escaped before insertion (preventing script execution). For untrusted docs content prefer `dom` mode + Docsify sanitize plugin.

---

## Extending Alert Types

Define before plugin script load:

```html
<script>
  window.$docsify = window.$docsify || {};
  window.$docsify.alertsConfig = {
    types: {
      NOTE: window.$docsify?.alertsConfig?.types?.NOTE, // keep existing
      SUCCESS: { class: 'tip', icon: '<svg><!-- custom --></svg>' }
    }
  }
</script>
```

Then style `.alert.success` via CSS.

---

## Roadmap / Ideas

- Custom alert titles: `[!NOTE Title]` syntax.
- Collapsible alerts (details/summary wrapper opt-in).
- Copy button for code-only alerts.
- Per-type CSS variable palette (e.g. `--alert-warning-bg`).
- Dark mode auto theme (prefers-color-scheme).
- NPM package & versioned CDN.
- Minified build & integrity hash example.
- Test suite (Jest/Vitest) with fixtures for parsing edge cases.

Contributions welcome — open an issue with suggestions.

---

## Changelog (excerpt)

- 0.1.0: Initial release (regex based)
- 0.2.0: Line-based parser, single-line alerts, XSS escaping
- 0.3.0: DOM mode (default) for full markdown fidelity; `pre` legacy mode; line break preservation

---

## Original Feature List

Brings GFM/CommonMark style alert boxes to Docsify.

## Features

- Support for different types of alert boxes:
  - Note
  - Tip
  - Important
  - Warning 
  - Caution
- SVG icons for each alert type
- Customizable styles
  

## Use case

### Important Notes

> [!IMPORTANT]
> This is a crucial piece of information. 

### Tips

> [!TIP]
> Here is a useful tip to help you.

### Warnings

> [!WARNING]
> Pay attention to this critical warning.

### Notes

> [!NOTE]
> This is some additional information.

### Caution

> [!CAUTION]
> Be aware of these potential consequences.


### Multilines Tips

> [!TIP]
> Here some multiline a useful tip to help you.


### Warnings

> [!WARNING]
> Pay attention to this critical warning. 0000000 0000000 0000000 m0000000 0000000 0000000

### Notes

> [!NOTE]
> This is some additional information.

### Caution

> [!CAUTION]
> Be aware of these potential consequences.


## Multiline Alert Stress Test

### Multiline Note

> [!NOTE]
> This is the first line of a multiline note.
> This is the second line of the note.
> This is the third line of the note.
> This is the fourth line of the note.
> This is the fifth line of the note.

### Multiline Tip

> [!TIP]
> This is the first line of a multiline tip.
> This is the second line of the tip.
> This is the third line of the tip.
> This is the fourth line of the tip.
> This is the fifth line of the tip.

### Multiline Warning

> [!WARNING]
> This is the first line of a multiline warning.
> This is the second line of the warning.
> This is the third line of the warning.
> This is the fourth line of the warning.
> This is the fifth line of the warning.


### Multiline Important

> [!IMPORTANT]
> This is the first line of a multiline important alert.
> This is the second line of the important alert.
> This is the third line of the important alert.
> This is the fourth line of the important alert.
> This is the fifth line of the important alert.

### Multiline Caution

> [!CAUTION]
> This is the first line of a multiline caution.
> This is the second line of the caution.
> This is the third line of the caution.
> This is the fourth line of the caution.
> This is the fifth line of the caution.


## Installation

To use the `docsify-alerts` plugin in your Docsify project add the following script to your `index.html`:

```javascript
<script src="https://gllmar.github.io/docsify-alert/docsify-alerts.js"></script>
```

## Customisation


You can override the default styles by specifying custom CSS in the alertStyles property in your index.html

```javascript
<script>
  window.$docsify = {
    name: 'Your Documentation',
    repo: '',
    loadSidebar: true,
    subMaxLevel: 2,
    alias: {
      '/.*/_sidebar.md': '/_sidebar.md'
    },
    alertStyles: `
      .alert.note {
        background-color: #e0f0ff;
        border-color: #2176ff;
      }
      .alert.tip {
        background-color: #e0ffe0;
        border-color: #21a121;
      }
      .alert.important {
        background-color: #f0e0ff;
        border-color: #a121ff;
      }
      .alert.warning {
        background-color: #fff0e0;
        border-color: #ffa121;
      }
      .alert.caution {
        background-color: #ffe0e0;
        border-color: #ff2121;
      }
      /* Custom CSS variable to override text color */
      :root {
        --alert-text-color: black; /* Change this to the desired color */
      }
    `
  }
</script>
```


## Media & Random Content Stress Tests

These examples include images, links, audio, video, iframes and raw HTML attempts inside alerts to observe rendering / escaping behavior.

### Mixed Inline (Single Line) Note

> [!NOTE] A quick reference with a link to [Docsify](https://docsify.js.org) and an inline image ![Placeholder 32x32](https://placehold.co/32x32.svg) plus some `code`.

### Multiline Tip With Image & Link

> [!TIP]
> An embedded image below should appear (or its markdown) followed by a link.
> ![Wide Placeholder](https://placehold.co/400x120/EEE/31343C.svg?text=Tip+Image)
> Visit the [Placeholder Site](https://placeholder.com) for more test images.
> Final line.

### Important With Raw HTML (Should Be Escaped / Safe)

> [!IMPORTANT]
> Attempting raw HTML image tag: <img src="https://placehold.co/80x80.svg" alt="raw html" />
> Attempting bold tag: <strong>Bold?</strong>
> Attempting script tag (should be neutralized): <script>console.log('xss')</script>
> End.

### Warning With Audio & Video Markdown / HTML

> [!WARNING]
> Markdown style (not actual markdown media tag, just text) audio link: [Sample Audio](https://www.w3schools.com/html/horse.mp3)
> Raw HTML audio (should be escaped): <audio controls src="https://www.w3schools.com/html/horse.mp3"></audio>
> Raw HTML video (escaped): <video controls width="200"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>
> End lines.

### Caution With Iframe & Mixed Content

> [!CAUTION]
> Iframe attempt: <iframe src="https://example.com" width="200" height="60"></iframe>
> Inline math attempt: <span class="math">E=mc^2</span>
> Another image markdown ![Small](https://placehold.co/50x50.svg)
> Link with title [Example](https://example.com "Example Title")
> Done.

### Chained Alerts (No Extra Blank Lines Between Source)
> [!NOTE] First immediate note.
> [!TIP] Second immediate tip.
> [!WARNING] Third immediate warning.
> [!CAUTION] Fourth immediate caution.
> [!IMPORTANT] Fifth immediate important.

### Deep Multiline Mixed

> [!TIP]
> Line 1 with link [OpenAI](https://openai.com)
> Line 2 with image ![Img](https://placehold.co/64x64.svg)
> Line 3 with raw html <em>emphasis?</em>
> Line 4 code `const x = 1;`
> Line 5 end.

