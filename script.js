// ── 대표 프로젝트 ───────────────────────────────────────────────
const featured = [
  {
    name: '동숲 (Dongsooop)',
    subtitle: '동양미래대학교 편의 앱 서비스',
    period: '2025.03 ~',
    context: '대학 프로젝트',
    desc: '교내 정보 자동화·실시간 기능·무중단 배포를 포함해 전체 백엔드 아키텍처를 직접 설계·운영한 앱 서비스.',
    highlights: [
      'Socket.IO Nest.js로 MVP 구현 후 Spring Boot In-Memory·락·스케줄링 기반으로 재설계해 오버엔지니어링 제거',
      'JPA 기반 회원락·Map 락으로 소셜 연동 동시성 처리',
      'Spring Security JWT·App Check Filter로 요청 신뢰도 검증',
    ],
    tech: ['Spring Boot', 'JPA', 'PostgreSQL', 'Redis', 'Docker', 'Nginx', 'AWS', 'OCI'],
    siteUrl: 'https://dongsoop.site',
    url: 'https://github.com/dongsooop/backend',
  },
  {
    name: 'Inear',
    subtitle: '실시간 신규 앨범 스트리밍 & 소통 서비스',
    period: '2024.10 – 2024.12',
    context: '네이버 부스트캠프 9기',
    desc: '다중 인스턴스 기반 실시간 스트리밍 환경에서 부하·배포·동기화 문제를 해결하며 실시간 서비스 운영 기반을 구축.',
    highlights: [
      'Redis Adapter 도입으로 다중 인스턴스 소켓 동기화 문제 해결',
      'git diff 기반 배포 파이프라인 분리 → 배포 시간 37.5% 단축',
      'Docker 빌드·런타임 스테이지 분리 → 이미지 33% 경량화',
    ],
    tech: ['TypeScript', 'Nest.js', 'MySQL', 'Redis', 'Docker', 'Nginx', 'NCP'],
    siteUrl: 'https://inear.live',
    url: 'https://github.com/boostcampwm-2024/web18-inear',
    extraLinks: [{ label: 'Notion', url: 'https://m.site.naver.com/1WNGQ' }],
  },
];

// ── 그 외 프로젝트 ──────────────────────────────────────────────
const projects = [
  { name: 'web-assignment-movie-review', desc: '영화 리뷰 서비스.', tag: 'Backend', lang: 'Java', url: 'https://github.com/rdyjun/web-assignment-movie-review' },
  { name: 'coding-test', desc: '문제 해결 경험을 위한 코딩 테스트 기록.', tag: 'Algorithm', lang: 'Java', url: 'https://github.com/rdyjun/coding-test' },
  { name: 'college-work-log-writer', desc: '대학 근로 일지 작성기.', tag: 'Tool', lang: 'JavaScript', url: 'https://github.com/rdyjun/college-work-log-writer' },
  { name: 'vue-web-asgm', desc: 'Vue를 활용한 정적 웹사이트 프로젝트.', tag: 'Frontend', lang: 'Vue', url: 'https://github.com/rdyjun/vue-web-asgm' },
  { name: 'attendance_check', desc: 'QR코드를 통한 출석체크 프로그램.', tag: 'Tool', lang: 'JavaScript', url: 'https://github.com/rdyjun/attendance_check' },
  { name: 'cnn-model-design-tutorial', desc: 'CNN 모델 설계를 위한 튜토리얼.', tag: 'ML', lang: 'Jupyter', url: 'https://github.com/rdyjun/cnn-model-design-tutorial' },
  { name: 'pygame-spaceship', desc: '파이게임을 활용한 우주선 게임.', tag: 'Game', lang: 'Python', url: 'https://github.com/rdyjun/pygame-spaceship' },
];

// ── 블로그 글 ───────────────────────────────────────────────────
const blogPosts = [
  { title: 'Spring Boot에서 카카오 소셜 로그인 적용', date: '2026-01-13', url: 'articles/oauth-spring-boot.html' },
  { title: '실시간 매칭 구조 리팩터링: 낙관적 락에서 MQ로 전환하기까지', date: '2025-12-11', url: 'articles/dongsoop-matching-queue.html' },
  { title: '개인 도메인으로 무료 메일 보내기', date: '2025-07-30', url: 'articles/email-smtp-by-domain.html' },
  { title: 'QueryDSL 충돌', date: '2025-07-15', url: 'articles/querydsl-crash.html' },
  { title: 'JPA와 복합키', date: '2025-03-28', url: 'articles/composite-key-by-jpa.html' },
  { title: '싱글톤 클래스 관리: Bean vs Static 방식의 차이점', date: '2025-03-07', url: 'articles/singleton-static-bean.html' },
  { title: 'return 할 때 await을 붙이면 어떻게 될까?', date: '2025-02-12', url: 'articles/await-promise.html' },
  { title: '자바스크립트의 sort', date: '2025-01-26', url: 'articles/javascript-sort.html' },
  { title: '다중 인스턴스 환경을 고려해서 소켓 통신 동기화', date: '2025-01-15', url: 'articles/redis-adapter.html' },
  { title: '[네이버 부스트캠프] 웹·모바일 9기 멤버십 과정 최종 회고', date: '2024-12-27', url: 'articles/naver-bostcamp-membership.html' },
  { title: '배포 시간 절반 단축을 위한 파이프라인 분리', date: '2024-12-13', url: 'articles/deploy-independent-pipeline.html' },
  { title: '[Naver Cloud] Green Developers 후기', date: '2024-12-11', url: 'articles/green-developers-review.html' },
  { title: '[Docker] 도커를 이용해서 배포 프로세스를 최적화하자', date: '2024-11-24', url: 'articles/boostcamp-docker-updated.html' },
  { title: '[Mysql] NOT IN 문제', date: '2024-09-10', url: 'articles/sql-not-in.html' },
  { title: '[node] 미들웨어가 뭘까?', date: '2024-09-08', url: 'articles/express-middleware.html' },
  { title: '[네이버 부스트캠프] 웹·모바일 9기 챌린지 과정 최종 회고', date: '2024-08-11', url: 'articles/naver-boostcamp-challenge.html' },
  { title: '[네이버 부스트캠프] 웹·모바일 9기 베이직 과정 회고', date: '2024-07-08', url: 'articles/naver-boostcamp-basic.html' },
  { title: '[클라우드] 로드 밸런싱', date: '2024-06-16', url: 'articles/loadbalancing.html' },
  { title: '[스프링 시큐리티] 기본 인증 방식', date: '2024-05-03', url: 'articles/spring-security-lecture.html' },
  { title: '[알고리즘] 누적합 알고리즘', date: '2024-04-17', url: 'articles/algorithm-prefix-sum.html' },
  { title: '[알고리즘] 플로이드 워셜 알고리즘', date: '2024-04-06', url: 'articles/algorithm-floyd-warshall.html' },
  { title: '[알고리즘] 다익스트라 알고리즘', date: '2024-03-18', url: 'articles/algorithm-dijkstra.html' },
];

// ── 아이콘 SVG ─────────────────────────────────────────────────
const ICONS = {
  arrow: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="18" x2="18" y2="6"/><polyline points="8 6 18 6 18 16"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 2a1 1 0 0 1 .707.293l5 5A1 1 0 0 1 21 9h-1v1a5.002 5.002 0 0 1-4 4.9V17l2 2v2H6v-2l2-2v-3.1A5.002 5.002 0 0 1 4 10V9H3a1 1 0 0 1-.707-1.707l5-5A1 1 0 0 1 8 2h8zm-4 16.5L10.5 21h3L12 18.5zM15 4H9L5.414 7.586A3.006 3.006 0 0 0 8 10a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3 3.006 3.006 0 0 0 2.586-2.414L15 4z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  notion: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>`,
};

const ICON_LABELS = { github: 'GitHub', notion: 'Notion' };

// ── 블로그 행 템플릿 ────────────────────────────────────────────
function blogRowHTML(p) {
  return `
  <a class="blog-row reveal" href="${p.url}">
    <span class="blog-date">${p.date.slice(0, 7)}</span>
    <span class="blog-title">${p.title}</span>
    <span class="blog-arrow">${ICONS.arrow}</span>
  </a>`;
}

// limit: 숫자면 해당 개수만, 생략하면 전체 렌더링
function renderBlogList(elementId, limit) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts;
  el.innerHTML = posts.map(blogRowHTML).join('');
  observeReveals();
}

// ── 렌더링: 대표 프로젝트 ───────────────────────────────────────
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  grid.innerHTML = featured.map((p) => {
    const tech  = p.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('');
    const hl    = p.highlights.map((h) => `<li>${h}</li>`).join('');
    const extra = (p.extraLinks || []).map((l) => {
      const key  = l.label.toLowerCase();
      const icon = ICONS[key];
      const label = ICON_LABELS[key] || l.label;
      return icon
        ? `<a class="btn-icon" href="${l.url}" target="_blank" rel="noopener" aria-label="${label}">${icon}</a>`
        : `<a class="extra-link" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`;
    }).join('');
    return `
    <article class="featured-card glass reveal">
      <div class="featured-head">
        <div>
          <span class="featured-context"><span class="pin-icon">${ICONS.pin}</span>${p.context} · ${p.period}</span>
          <h4>${p.name}</h4>
          <p class="featured-subtitle">${p.subtitle}</p>
        </div>
        ${p.siteUrl ? `<a class="btn btn-primary" href="${p.siteUrl}" target="_blank" rel="noopener">사이트 방문 ↗</a>` : ''}
      </div>
      <p class="featured-desc">${p.desc}</p>
      <ul class="featured-highlights bullet-list">${hl}</ul>
      <div class="tech-list">${tech}</div>
      <div class="featured-actions">
        <a class="btn-icon" href="${p.url}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
        ${extra}
      </div>
    </article>`;
  }).join('');
  observeReveals();
}

// ── 렌더링: 프로젝트 목록 페이지 (featured 스타일로 통합) ───────
function renderProjectPage() {
  const grid = document.getElementById('all-projects-grid');
  if (!grid) return;

  const featuredHTML = featured.map((p) => {
    const tech  = p.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('');
    const hl    = p.highlights.map((h) => `<li>${h}</li>`).join('');
    const extra = (p.extraLinks || []).map((l) => {
      const key  = l.label.toLowerCase();
      const icon = ICONS[key];
      const label = ICON_LABELS[key] || l.label;
      return icon
        ? `<a class="btn-icon" href="${l.url}" target="_blank" rel="noopener" aria-label="${label}">${icon}</a>`
        : `<a class="extra-link" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`;
    }).join('');
    return `
    <article class="featured-card glass reveal">
      <div class="featured-head">
        <div>
          <span class="featured-context"><span class="pin-icon">${ICONS.pin}</span>${p.context} · ${p.period}</span>
          <h4>${p.name}</h4>
          <p class="featured-subtitle">${p.subtitle}</p>
        </div>
        ${p.siteUrl ? `<a class="btn btn-primary" href="${p.siteUrl}" target="_blank" rel="noopener">사이트 방문 ↗</a>` : ''}
      </div>
      <p class="featured-desc">${p.desc}</p>
      <ul class="featured-highlights bullet-list">${hl}</ul>
      <div class="tech-list">${tech}</div>
      <div class="featured-actions">
        <a class="btn-icon" href="${p.url}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
        ${extra}
      </div>
    </article>`;
  });

  const regularHTML = projects.map((p) => {
    const chips = [p.lang, p.tag].map((t) => `<span class="tech-chip">${t}</span>`).join('');
    return `
    <article class="featured-card glass reveal">
      <div class="featured-head">
        <div>
          <h4>${p.name}</h4>
        </div>
      </div>
      <p class="featured-desc">${p.desc}</p>
      <div class="tech-list">${chips}</div>
      <div class="featured-actions">
        <a class="btn-icon" href="${p.url}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
      </div>
    </article>`;
  });

  grid.innerHTML = [...featuredHTML, ...regularHTML].join('');
  observeReveals();
}

// ── 렌더링: 프로젝트 그리드 ────────────────────────────────────
function renderProjects(filter = 'All', limit) {
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.tag === filter);
  const list = limit ? filtered.slice(0, limit) : filtered;
  grid.innerHTML = list.map((p) => `
    <a class="project-card glass reveal" href="${p.url}" target="_blank" rel="noopener">
      <div class="card-top">
        <h3>${p.name}</h3>
        <span class="card-arrow">↗</span>
      </div>
      <p>${p.desc}</p>
      <div class="card-meta">
        <span class="lang-badge"><span class="lang-dot"></span>${p.lang}</span>
        <span class="card-tag">${p.tag}</span>
      </div>
    </a>`
  ).join('');
  observeReveals();
}

function renderFilters() {
  const container = document.getElementById('filters');
  if (!container) return;
  const tags = ['All', ...new Set(projects.map((p) => p.tag))];
  container.innerHTML = tags.map((t, i) =>
    `<button class="filter-btn${i === 0 ? ' active' : ''}" data-tag="${t}">${t}</button>`
  ).join('');
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    container.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.tag);
  });
}

// ── 스크롤 등장 애니메이션 ──────────────────────────────────────
let io;
function observeReveals() {
  if (!io) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
  }
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => io.observe(el));
}

// ── 사이드바 (공유 컴포넌트) ─────────────────────────────────────
function sidebarHTML(mode) {
  const base = mode === 'detail' ? '../' : '';
  const idx = `${base}index.html`;
  const isIndex = mode === 'index';

  const aboutHref    = isIndex ? '#about' : `${idx}#about`;
  const historyHref  = isIndex ? '#history' : `${idx}#history`;
  const projectsHref = isIndex ? '#projects' : mode === 'projects' ? `${base}project.html` : `${idx}#projects`;
  const articlesHref = `${base}article.html`;

  const mainActive     = mode === 'index' || mode === 'projects';
  const articlesActive = mode === 'articles' || mode === 'detail';
  const projectsSubActive = mode === 'projects';

  const ds = (name) => (isIndex ? ` data-section="${name}"` : '');

  return `
    <div class="sb-top">
      <a class="sb-logo" href="${isIndex ? '#about' : idx}">rdyjun</a>
      <p class="sb-name">SungJun Joo</p>
      <p class="sb-role">Backend Developer</p>
    </div>

    <nav class="sb-nav">
      <div class="sb-nav-group">
        <a class="sb-navlink sb-navlink-main${mainActive ? ' active' : ''}" href="${aboutHref}"${ds('main')}>
          <span class="nav-num">01</span>Main
        </a>
        <div class="sb-subnav">
          <a class="sb-sublink${isIndex ? ' active' : ''}" href="${aboutHref}"${ds('about')}>About</a>
          <a class="sb-sublink" href="${historyHref}"${ds('history')}>History</a>
          <a class="sb-sublink${projectsSubActive ? ' active' : ''}" href="${projectsHref}"${ds('projects')}>Projects</a>
        </div>
      </div>
      <a class="sb-navlink${articlesActive ? ' active' : ''}" href="${articlesHref}">
        <span class="nav-num">02</span>Articles
      </a>
    </nav>

    <div class="sb-links">
      <a href="https://github.com/rdyjun" target="_blank" rel="noopener">GitHub ↗</a>
      <a href="mailto:rdyjun00@gmail.com">Email ↗</a>
      <button class="theme-toggle" id="theme-toggle" aria-label="테마 전환">
        <span class="theme-icon">☀️</span>
      </button>
    </div>`;
}

function pageMode() {
  const path = location.pathname.replace(/\\/g, '/');
  if (path.includes('/articles/')) return 'detail';
  if (/article\.html$/.test(path)) return 'articles';
  if (/project\.html$/.test(path)) return 'projects';
  return 'index';
}

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  sidebar.innerHTML = sidebarHTML(pageMode());
}

// ── 모바일 상단 바 (공유 컴포넌트) ────────────────────────────────
function mobileBarHTML(mode) {
  const logoHref = mode === 'index' ? '#about' : mode === 'detail' ? '../index.html' : 'index.html';
  return `
    <a class="sb-logo" href="${logoHref}">rdyjun</a>
    <button class="hamburger" id="hamburger" aria-label="메뉴 열기">
      <span></span><span></span><span></span>
    </button>`;
}

function initMobileBar() {
  const bar = document.querySelector('.mobile-bar');
  if (!bar) return;
  bar.innerHTML = mobileBarHTML(pageMode());
}

// ── 푸터 (공유 컴포넌트) ─────────────────────────────────────────
function footerHTML() {
  return `
    <p>SungJun Joo · <a href="mailto:rdyjun00@gmail.com">rdyjun00@gmail.com</a></p>
    <p class="footer-copy">© <span id="year">${new Date().getFullYear()}</span> rdyjun</p>`;
}

function initFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  footer.innerHTML = footerHTML();
}

// ── 사이드바 active 링크 ────────────────────────────────────────
const MAIN_SUB_SECTIONS = ['about', 'history', 'projects'];

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.sb-navlink[data-section], .sb-sublink[data-section]');
  const mainLink = document.querySelector('.sb-navlink-main');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove('active'));
        const active = document.querySelector(`[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
        if (mainLink) {
          mainLink.classList.toggle('active', MAIN_SUB_SECTIONS.includes(entry.target.id));
        }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => obs.observe(s));
}

// ── 앵커 스크롤 ────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeSidebar();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ── 모바일 햄버거 ───────────────────────────────────────────────
function closeSidebar() {
  const sidebar   = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  sidebar?.classList.remove('open');
  hamburger?.classList.remove('open');
}

function initHamburger() {
  const btn     = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    sidebar.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !btn.contains(e.target)) closeSidebar();
  });
}

// ── 테마 토글 ───────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateToggleIcon(saved);
}

function updateToggleIcon(theme) {
  document.querySelectorAll('.theme-toggle .theme-icon').forEach((el) => {
    el.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

function initThemeToggle() {
  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateToggleIcon(next);
    });
  });
}

// ── 초기화 ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMobileBar();
  initSidebar();
  initFooter();
  initTheme();
  initThemeToggle();
  if (document.getElementById('all-projects-grid')) {
    renderProjectPage();
  } else {
    renderFeatured();
    renderProjects('All', 3);
  }
  renderBlogList('blog-preview', 5);
  renderBlogList('blog-list');
  initSmoothScroll();
  initActiveNav();
  initHamburger();
});
