// articles-src/*.md 를 articles/*.html 로 빌드한다.
// frontmatter(title/date/badge) + 마크다운 본문 -> 사이트 아티클 템플릿.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import hljs from 'highlight.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(rootDir, 'articles-src');
const outDir = path.join(rootDir, 'articles');

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, content: raw };

  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { data, content: m[2] };
}

function slugify(headingHtml) {
  return headingHtml.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, '-');
}

// 헤딩마다 사이트 기존 아티클과 동일한 id + 앵커 링크(#hashtag)를 붙인다.
const usedIds = new Set();
const renderer = new marked.Renderer();
renderer.heading = ({ tokens, depth }) => {
  const text = renderer.parser.parseInline(tokens);
  let id = slugify(text);
  let unique = id;
  let n = 2;
  while (usedIds.has(unique)) unique = `${id}-${n++}`;
  usedIds.add(unique);

  if (depth === 1) return `<h1 id="${unique}">${text}</h1>\n`;
  return `<h${depth} id="${unique}">
  <span class="me-2">${text}</span>
  <a href="#${unique}" class="anchor text-muted"><i class="fas fa-hashtag"></i></a>
</h${depth}>\n`;
};

// 코드블록에 언어를 지정하면 빌드 시점에 highlight.js 로 하이라이팅한다.
renderer.code = ({ text, lang }) => {
  const language = lang && hljs.getLanguage(lang) ? lang : null;
  const highlighted = language
    ? hljs.highlight(text, { language }).value
    : hljs.highlightAuto(text).value;
  const langClass = language ? ` language-${language}` : '';
  return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>\n`;
};

function articleTemplate({ title, date, badge, bodyHtml }) {
  const dateLine = badge
    ? `${date} <span style="color:#888">(${badge})</span>`
    : date;

  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | rdyjun</title>
    <link rel="stylesheet" href="../style.css" />
    <link rel="stylesheet" href="../article.css" />
  </head>
  <body>

    <header class="site-header" id="site-header"></header>

    <div class="page">
      <main class="page-head">
        <div class="article-nav">
          <a href="../article.html" class="back-link">← Articles</a>
        </div>
        <article class="article-body">
          <header class="article-header">
            <p class="article-date">${dateLine}</p>
            <h1>${title}</h1>
          </header>
          <div class="article-content">

${bodyHtml}

          </div>
        </article>
      </main>
    </div>

    <footer></footer>

    <script src="../script.js"></script>
  </body>
</html>
`;
}

if (!existsSync(srcDir)) {
  console.log('articles-src/ 가 없어서 건너뜀');
  process.exit(0);
}

const mdFiles = readdirSync(srcDir).filter((f) => f.endsWith('.md'));
let built = 0;

for (const file of mdFiles) {
  const raw = readFileSync(path.join(srcDir, file), 'utf-8');
  const { data, content } = parseFrontmatter(raw);

  if (!data.title || !data.date) {
    console.warn(`건너뜀 (title/date 없음): ${file}`);
    continue;
  }

  usedIds.clear();
  const bodyHtml = marked.parse(content, { renderer }).trim();
  const html = articleTemplate({
    title: data.title,
    date: data.date,
    badge: data.badge,
    bodyHtml,
  });

  const slug = path.basename(file, '.md');
  writeFileSync(path.join(outDir, `${slug}.html`), html);
  built++;
}

console.log(`articles-src/*.md ${built}개 -> articles/*.html 빌드 완료`);
