(function () {
  /**
   * docsify-alerts (readable version)
   * Single DOM-pass implementation that:
   *  - Detects blockquotes starting with one or more [!TYPE] markers
   *  - Supports chained markers inside a single paragraph
   *  - Preserves markdown-rendered content (images, code, iframes, etc.)
   *  - Adds accessible roles & labels
   *  - Allows lightweight extension via window.$docsify.alertsConfig.types
   */

  // Ensure global config container exists
  const rootConfig = (window.$docsify = window.$docsify || {});
  const userConfig = rootConfig.alertsConfig || {};

  // Icon + class map. Users can extend by providing alertsConfig.types with same structure: { TYPE: { c: 'className', i: 'svgMarkup' } }
  const ALERT_TYPES = userConfig.types || {
    NOTE: { c: 'note', i: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>' },
    TIP: { c: 'tip', i: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"/></svg>' },
    IMPORTANT: { c: 'important', i: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>' },
    WARNING: { c: 'warning', i: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>' },
    CAUTION: { c: 'caution', i: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>' }
  };

  /** Default CSS (readable multi-line for overrides) */
  function buildDefaultCSS() {
    return `
    .alert { border-radius:4px; margin:1em 0; padding:.75em 1em; border-left:4px solid; display:flex; align-items:flex-start; line-height:1.4; color:var(--alert-text-color,black); }
    .alert svg { margin-right:.5em; flex-shrink:0; width:16px; height:16px; margin-top:2px; }
    .alert .alert-content { flex:1; }
    .alert .alert-content > p { margin:.3em 0; }
    .alert .alert-content > p:first-child { margin-top:0; }
    .alert .alert-content > p:last-child { margin-bottom:0; }
    .alert.note { background:#e7f3fe; border-color:#2196f3; }
    .alert.tip { background:#e7fbe7; border-color:#4caf50; }
    .alert.important { background:#f3e7fe; border-color:#9c27b0; }
    .alert.warning { background:#fff8e1; border-color:#ffeb3b; }
    .alert.caution { background:#ffebee; border-color:#f44336; }
    `;
  }

  function injectStyles() {
    if (document.getElementById('docsify-alerts-styles')) return; // prevent duplicates
    const style = document.createElement('style');
    style.id = 'docsify-alerts-styles';
    style.textContent = buildDefaultCSS() + (rootConfig.alertStyles || '');
    document.head.appendChild(style);
  }

  /**
   * Wrap content HTML inside an alert container
   */
  function createAlertNode(type, innerHTML) {
    const spec = ALERT_TYPES[type];
    if (!spec) return null;
    const div = document.createElement('div');
    div.className = 'alert ' + spec.c;
    div.setAttribute('role', 'note');
    div.setAttribute('aria-label', type);
    div.innerHTML = `${spec.i}<div class="alert-content">${innerHTML}</div>`;
    return div;
  }

  /**
   * Before markdown render: preserve line breaks in multiline alerts by adding two spaces
   * to each continuation quote line (except the last) so Docsify converts them to <br>.
   */
  function preserveMultilineBreaks(rawMarkdown) {
    const lines = rawMarkdown.split(/\r?\n/);
    const output = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!/^>\s*\[!(\w+)\]/.test(line)) { output.push(line); continue; }
      output.push(line); // push marker line
      let j = i + 1;
      const continuation = [];
      while (j < lines.length) {
        const nextLine = lines[j];
        if (/^>\s*\[!(\w+)\]/.test(nextLine)) break; // next alert
        if (/^>\s?.*/.test(nextLine)) { continuation.push(j); j++; continue; }
        break;
      }
      for (let k = 0; k < continuation.length; k++) {
        let ln = lines[continuation[k]];
        if (k < continuation.length - 1 && !/\s\s$/.test(ln) && ln.trim() !== '>') ln += '  ';
        output.push(ln);
      }
      i = j - 1; // advance outer loop
    }
    return output.join('\n');
  }

  /**
   * After Docsify renders markdown: transform qualifying blockquotes to alert divs.
   * Supports chained markers within the first paragraph of the blockquote.
   */
  function transformRenderedBlockquotes() {
    const container = document.querySelector('.markdown-section') || document.body;
    container.querySelectorAll('blockquote').forEach(blockquote => {
      if (blockquote.dataset.alertProcessed) return;
      const firstParagraph = blockquote.querySelector('p');
      if (!firstParagraph) return;
      const firstHTML = firstParagraph.innerHTML.trim();
      if (!/\[!(\w+)\]/.test(firstHTML)) return; // no markers

      // Split by markers: ['', TYPE, content, TYPE, content, ...]
      const parts = firstHTML.split(/\[!(\w+)\]/);
      if (parts.length < 3) return;

      const fragment = document.createDocumentFragment();
      const singleMarker = parts.length === 3; // exactly one marker/content pair

      for (let idx = 1; idx < parts.length; idx += 2) {
        const type = (parts[idx] || '').toUpperCase();
        let htmlSegment = (parts[idx + 1] || '').trim();

        // If only one marker for this blockquote, append remaining siblings (other paragraphs, lists, etc.)
        if (idx === 1 && singleMarker) {
          const clone = blockquote.cloneNode(true);
            // remove original first paragraph from clone; keep the rest
          if (clone.firstElementChild) clone.removeChild(clone.firstElementChild);
          if (clone.children.length) {
            const remainingHTML = Array.from(clone.children).map(n => n.outerHTML).join('');
            htmlSegment = htmlSegment ? htmlSegment + ' ' + remainingHTML : remainingHTML;
          }
        }

        const node = createAlertNode(type, htmlSegment);
        if (node) fragment.appendChild(node);
      }

      blockquote.dataset.alertProcessed = '1';
      blockquote.replaceWith(fragment);
    });
  }

  // Register plugin hooks
  rootConfig.plugins = (rootConfig.plugins || []).concat(function (hook) {
    hook.init(injectStyles);              // add styles once
    hook.beforeEach(preserveMultilineBreaks); // adjust raw markdown for multiline breaks
    hook.doneEach(transformRenderedBlockquotes); // wrap rendered blockquotes
  });
})();
