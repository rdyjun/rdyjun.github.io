import { readdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = 'https://rdyjun.github.io';

function lastmod(relPath) {
  try {
    const date = execSync(`git log -1 --format=%cs -- "${relPath}"`, { cwd: rootDir })
      .toString()
      .trim();
    if (date) return date;
  } catch {
    // git unavailable or file untracked; fall back below
  }
  return new Date().toISOString().slice(0, 10);
}

const staticPages = [
  { url: '/', file: 'index.html', priority: '1.0' },
  { url: '/project.html', file: 'project.html', priority: '0.8' },
  { url: '/article.html', file: 'article.html', priority: '0.8' },
];

const articleFiles = readdirSync(path.join(rootDir, 'articles'))
  .filter((f) => f.endsWith('.html'))
  .sort();

const articlePages = articleFiles.map((f) => ({
  url: `/articles/${f}`,
  file: `articles/${f}`,
  priority: '0.6',
}));

const pages = [...staticPages, ...articlePages];

const urlEntries = pages
  .map(
    (p) => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${lastmod(p.file)}</lastmod>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(path.join(rootDir, 'sitemap.xml'), xml);
console.log(`sitemap.xml generated with ${pages.length} URLs`);
