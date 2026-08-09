// articles/*.html 에서 제목·날짜·본문 발췌를 뽑아 articles-data.js 로 굽는다.
// 런타임에 23개 파일을 fetch 하지 않도록 빌드 시점에 한 번만 추출한다.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const articlesDir = path.join(rootDir, 'articles');

const EXCERPT_LEN = 150;

const ENTITIES = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>',
  '&quot;': '"', '&#39;': "'", '&apos;': "'", '&hellip;': '…',
};

function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m] ?? ' ');
}

function stripTags(html) {
  return decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function pick(html, re) {
  const m = re.exec(html);
  return m ? stripTags(m[1]) : '';
}

// 본문 <p> 들을 순서대로 이어붙여 발췌를 만든다.
// 코드블록(table/pre)과 안내용 인용구(blockquote)는 통째로 걷어내고, 링크만 있는 문단은 건너뛴다.
function excerptOf(html) {
  const body = /<div class="article-content">([\s\S]*)/.exec(html);
  if (!body) return '';

  const cleaned = body[1]
    .replace(/<table[\s\S]*?<\/table>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, ' ')
    .replace(/<figure[\s\S]*?<\/figure>/gi, ' ');

  let out = '';
  for (const m of cleaned.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    // 참고 링크만 나열한 문단은 발췌로 쓸모가 없으므로
    // URL 을 걷어낸 뒤에도 문장이 남는 문단만 채택한다
    const text = stripTags(m[1]).replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
    if (text.length < 20) continue;
    out += (out ? ' ' : '') + text;
    if (out.length >= EXCERPT_LEN) break;
  }

  if (!out) return '';
  return out.length > EXCERPT_LEN ? `${out.slice(0, EXCERPT_LEN).trimEnd()}…` : out;
}

const posts = readdirSync(articlesDir)
  .filter((f) => f.endsWith('.html'))
  .map((file) => {
    const html = readFileSync(path.join(articlesDir, file), 'utf-8');

    // 날짜 영역에 "(구버전)" 같은 배지가 함께 들어있는 글이 있어
    // 날짜만 떼어내고 나머지 문구는 badge 로 보존한다
    const dateLine = pick(html, /<p class="article-date">([\s\S]*?)<\/p>/i);
    const date = (/\d{4}-\d{2}-\d{2}/.exec(dateLine) || [''])[0];
    const badge = dateLine.replace(date, '').replace(/[()]/g, '').trim();

    return {
      title: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i),
      date,
      ...(badge ? { badge } : {}),
      url: `articles/${file}`,
      excerpt: excerptOf(html),
    };
  })
  .filter((p) => p.title && p.date)
  .sort((a, b) => b.date.localeCompare(a.date));

const missing = posts.filter((p) => !p.excerpt);
if (missing.length) {
  console.warn(`발췌 추출 실패 ${missing.length}건:`);
  missing.forEach((p) => console.warn(`  - ${p.url}`));
}

const out = `// 이 파일은 scripts/generate-excerpts.mjs 가 생성합니다. 직접 수정하지 마세요.
const blogPosts = ${JSON.stringify(posts, null, 2)};
`;

writeFileSync(path.join(rootDir, 'articles-data.js'), out);
console.log(`articles-data.js generated with ${posts.length} posts`);
