const IMAGE_PATTERN = /^!\[([^\]]*)\]\(([^)]+)\)$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function formatInline(text: string): string {
  let result = "";
  let index = 0;

  while (index < text.length) {
    const remaining = text.slice(index);

    if (remaining.startsWith("**")) {
      const end = text.indexOf("**", index + 2);
      if (end !== -1) {
        const inner = text.slice(index + 2, end);
        result += `<strong>${formatInline(inner)}</strong>`;
        index = end + 2;
        continue;
      }
    }

    if (remaining.startsWith("*")) {
      const end = text.indexOf("*", index + 1);
      if (end !== -1) {
        const inner = text.slice(index + 1, end);
        result += `<em>${formatInline(inner)}</em>`;
        index = end + 1;
        continue;
      }
    }

    if (remaining.startsWith("`")) {
      const end = text.indexOf("`", index + 1);
      if (end !== -1) {
        const inner = text.slice(index + 1, end);
        result += `<code>${escapeHtml(inner)}</code>`;
        index = end + 1;
        continue;
      }
    }

    if (remaining.startsWith("![") || remaining.startsWith("[")) {
      const isImage = remaining.startsWith("![");
      const openIndex = index + (isImage ? 2 : 1);
      const closeBracket = text.indexOf("]", openIndex);
      const openParen = text.indexOf("(", closeBracket);
      const closeParen = text.indexOf(")", openParen);

      if (closeBracket !== -1 && openParen === closeBracket + 1 && closeParen !== -1) {
        const label = text.slice(openIndex, closeBracket);
        const url = text.slice(openParen + 1, closeParen);

        if (isImage) {
          result += `<span class="doc-image-inline"><img src="${escapeAttribute(
            url
          )}" alt="${escapeAttribute(label)}" /></span>`;
        } else {
          result += `<a href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer">${formatInline(
            label
          )}</a>`;
        }

        index = closeParen + 1;
        continue;
      }
    }

    const char = text[index];
    result += escapeHtml(char);
    index += 1;
  }

  return result;
}

function buildTable(lines: string[]): string {
  if (lines.length < 2) return "";

  const rows = lines.map((line) =>
    line
      .slice(1, -1)
      .split("|")
      .map((cell) => formatInline(cell.trim()))
  );

  const header = rows[0];
  const body = rows.slice(2); // Skip separator row

  const headerHtml = `<tr>${header.map((cell) => `<th>${cell}</th>`).join("")}</tr>`;
  const bodyHtml = body
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  return `<table>${headerHtml ? `<thead>${headerHtml}</thead>` : ""}${bodyHtml ? `<tbody>${bodyHtml}</tbody>` : ""}</table>`;
}

/**
 * Minimal Markdown → HTML renderer optimized for scorecard documentation.
 * Supports headings, lists, tables, inline emphasis, code fences, and images.
 */
export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = "";

  let inList = false;
  let inCode = false;
  let codeBuffer: string[] = [];
  let paragraphBuffer: string[] = [];
  let tableBuffer: string[] | null = null;

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(" ");
      html += `<p>${formatInline(text)}</p>`;
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableBuffer && tableBuffer.length > 0) {
      html += buildTable(tableBuffer);
      tableBuffer = null;
    }
  };

  const flushCode = () => {
    if (inCode) {
      html += `<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`;
      codeBuffer = [];
      inCode = false;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        flushCode();
      } else {
        flushParagraph();
        flushList();
        flushTable();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeBuffer.push(rawLine);
      return;
    }

    if (trimmed === "") {
      flushParagraph();
      flushList();
      flushTable();
      return;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushTable();
      html += "<hr />";
      return;
    }

    if (IMAGE_PATTERN.test(trimmed)) {
      flushParagraph();
      flushList();
      flushTable();
      const match = trimmed.match(IMAGE_PATTERN);
      if (match) {
        const [, alt, src] = match;
        html += `<figure class="doc-image"><img src="${escapeAttribute(
          src
        )}" alt="${escapeAttribute(alt)}" />${
          alt ? `<figcaption>${formatInline(alt)}</figcaption>` : ""
        }</figure>`;
      }
      return;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const [, hashes, text] = headingMatch;
      const level = Math.min(hashes.length, 6);
      flushParagraph();
      flushList();
      flushTable();
      html += `<h${level}>${formatInline(text.trim())}</h${level}>`;
      return;
    }

    if (/^\|.*\|$/.test(trimmed)) {
      flushParagraph();
      flushList();
      if (!tableBuffer) {
        tableBuffer = [];
      }
      tableBuffer.push(trimmed);
      return;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      flushTable();
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      const item = trimmed.slice(2);
      html += `<li>${formatInline(item)}</li>`;
      return;
    }

    paragraphBuffer.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushTable();
  flushCode();

  return html;
}


