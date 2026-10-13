(() => {
  const header = document.querySelector('[data-shared-header]');
  if (!header) return;

  const base = header.dataset.base || '.';
  header.innerHTML = `
    <a class="brand" href="${base}/index.html">Junby<span>.</span></a>
    <nav aria-label="주 메뉴">
      <a href="${base}/project.html">Projects</a>
      <a href="${base}/article.html">Writing</a>
      <a href="${base}/index.html#history">History</a>
      <a class="nav-github" href="https://github.com/rdyjun" target="_blank" rel="noopener">GitHub ↗</a>
    </nav>`;
})();
