// ── 프로젝트 ───────────────────────────────────────────────────
// featured: 상세 모달에 highlights·기술스택·링크가 모두 노출되는 대표 프로젝트
// image 가 없으면 gradient 클래스 + lang 라벨로 카드 상단을 채운다
const projects = [
  {
    id: 'dongsoop',
    team: true,
    status: '운영중',
    name: '동숲',
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
    image: 'assets/projects/dongsoop.png',
    images: [
      'assets/projects/dongsoop.png',
      'assets/projects/dongsoop-alert.gif',
      'assets/projects/dongsoop-timetable.gif',
      'assets/projects/dongsoop-recruit.gif',
      'assets/projects/dongsoop-market.gif',
      'assets/projects/dongsoop-chatbot.gif',
    ],
    icon: 'server',
    featured: true,
  },
  {
    id: 'inear',
    team: true,
    name: 'Inear',
    subtitle: '실시간 신규 앨범 스트리밍 & 소통 서비스',
    period: '2024.10 – 2024.12',
    context: '네이버 부스트캠프 9기',
    desc: '다중 인스턴스 기반 실시간 스트리밍 환경에서 부하·배포·동기화 문제를 해결하며 실시간 서비스 운영 기반을 구축.',
    highlights: [
      'HLS 기반 음원 실시간 제공: 오디오를 .ts 세그먼트로 분할하고 m3u8 재생목록 제공 시 현재 재생 구간 이전 세그먼트를 제외해 전달',
      'Redis Adapter 도입으로 다중 인스턴스 소켓 동기화 문제 해결',
      'git diff 기반 배포 파이프라인 분리 → 배포 시간 37.5% 단축',
      'Docker 빌드·런타임 스테이지 분리 → 이미지 33% 경량화',
    ],
    tech: ['TypeScript', 'Nest.js', 'MySQL', 'Redis', 'Docker', 'Nginx', 'NCP'],
    siteUrl: 'https://inear.live',
    url: 'https://github.com/boostcampwm-2024/web18-inear',
    extraLinks: [{ label: 'Notion', url: 'https://m.site.naver.com/1WNGQ' }],
    image: 'assets/projects/inear.png',
    images: ['assets/projects/inear-home.png', 'assets/projects/inear-player.png'],
    icon: 'music',
    featured: true,
  },
  {
    id: 'mineportal',
    name: 'MinePortal',
    subtitle: '브라우저 마인크래프트 채팅 뷰어 & 데스크톱 클라이언트',
    period: '2026.08 ~',
    context: '개인 프로젝트',
    desc: '설치 없이 브라우저에서 마인크래프트 서버에 접속해 채팅을 보내고 받는 웹 서비스. IP 제한 서버를 위한 데스크톱 클라이언트와 Toss 미니앱까지 함께 제공.',
    highlights: [
      'MCProtocolLib으로 백엔드가 마인크래프트 프로토콜을 직접 처리해, 클라이언트 설치 없이 브라우저에서 서버 채팅을 릴레이(체험 모드)',
      'Mojang player-certificates 엔드포인트로 RSA 키를 발급받아 채팅에 서명해, 시큐어 챗을 강제하는 서버에서도 정상 동작',
      'IP 제한/화이트리스트 서버 대응을 위한 Java 데스크톱 클라이언트로 백엔드 릴레이를 우회해 PC에서 직접 연결',
      'push 시 SSH로 프로덕션에 자동 배포되는 GitHub Actions 파이프라인 구성',
    ],
    tech: ['Spring Boot', 'WebSocket', 'Java', 'Docker', 'MCProtocolLib'],
    siteUrl: 'https://mineportal.kr',
    url: 'https://github.com/rdyjun/mineportal',
    image: 'assets/projects/mineportal.png',
    icon: 'layers',
    featured: true,
  },
  {
    id: 'movie-review',
    name: 'Talk Film',
    desc: '영화 리뷰 서비스.',
    tag: ['Backend', 'JSP'],
    lang: 'Java',
    url: 'https://github.com/rdyjun/talkfilm',
    image: 'assets/projects/movie-review.gif',
    icon: 'film',
  },
  {
    id: 'coding-test',
    minor: true,
    name: 'coding-test',
    desc: '문제 해결 경험을 위한 코딩 테스트 기록.',
    tag: 'Algorithm',
    lang: 'Java',
    url: 'https://github.com/rdyjun/coding-test',
    gradient: 'grad-purple',
    icon: 'code',
  },
  {
    id: 'work-log',
    minor: true,
    name: 'college-work-log-writer',
    desc: '대학 근로 일지 작성기.',
    tag: 'Tool',
    lang: 'JavaScript',
    url: 'https://github.com/rdyjun/college-work-log-writer',
    gradient: 'grad-yellow',
    icon: 'file',
  },
  {
    id: 'vue-web-asgm',
    minor: true,
    name: 'vue-web-asgm',
    desc: 'Vue를 활용한 정적 웹사이트 프로젝트.',
    tag: 'Frontend',
    lang: 'Vue',
    url: 'https://github.com/rdyjun/vue-web-asgm',
    gradient: 'grad-green',
    icon: 'layout',
  },
  {
    id: 'attendance',
    minor: true,
    name: 'attendance_check',
    desc: 'QR코드를 통한 출석체크 프로그램.',
    tag: 'Tool',
    lang: 'JavaScript',
    url: 'https://github.com/rdyjun/attendance_check',
    gradient: 'grad-teal',
    icon: 'qr',
  },
  {
    id: 'cnn-tutorial',
    minor: true,
    name: 'cnn-model-design-tutorial',
    desc: 'CNN 모델 설계를 위한 튜토리얼.',
    tag: 'ML',
    lang: 'Jupyter',
    url: 'https://github.com/rdyjun/cnn-model-design-tutorial',
    gradient: 'grad-blue',
    icon: 'brain',
  },
  {
    id: 'pygame-spaceship',
    minor: true,
    name: 'pygame-spaceship',
    desc: '파이게임을 활용한 우주선 게임.',
    tag: 'Game',
    lang: 'Python',
    url: 'https://github.com/rdyjun/pygame-spaceship',
    gradient: 'grad-pink',
    icon: 'game',
  },
];

// ── 블로그 글 ───────────────────────────────────────────────────
// blogPosts 는 articles-data.js 에서 온다 (scripts/generate-excerpts.mjs 가 생성).
// 해당 스크립트를 불러오지 않는 페이지에서도 안전하도록 접근을 감싼다.
function allPosts() {
  return typeof blogPosts === 'undefined' ? [] : blogPosts;
}

// ── 아이콘 SVG ─────────────────────────────────────────────────
const ICONS = {
  arrow: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="18" x2="18" y2="6"/><polyline points="8 6 18 6 18 16"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 2a1 1 0 0 1 .707.293l5 5A1 1 0 0 1 21 9h-1v1a5.002 5.002 0 0 1-4 4.9V17l2 2v2H6v-2l2-2v-3.1A5.002 5.002 0 0 1 4 10V9H3a1 1 0 0 1-.707-1.707l5-5A1 1 0 0 1 8 2h8zm-4 16.5L10.5 21h3L12 18.5zM15 4H9L5.414 7.586A3.006 3.006 0 0 0 8 10a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3 3.006 3.006 0 0 0 2.586-2.414L15 4z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  notion: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>`,

  // 프로젝트 카드용
  server: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 3v1h2V6H6zm-2 8h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zm2 3v1h2v-1H6z"/></svg>`,
  music: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3v12.5a3.5 3.5 0 1 1-2-3.163V6.415l-8 1.6v9.485a3.5 3.5 0 1 1-2-3.163V5.18l12-2.4z"/></svg>`,
  film: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 2v2h2V5H6zm10 0v2h2V5h-2zM4 9v6h16V9H4zm2 10v-2h2v2H6zm10 0v-2h2v2h-2z"/></svg>`,
  code: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.7 15.9 4.8 12l3.9-3.9a1 1 0 0 0-1.4-1.4l-4.6 4.6a1 1 0 0 0 0 1.4l4.6 4.6a1 1 0 0 0 1.4-1.4zm6.6 0 3.9-3.9-3.9-3.9a1 1 0 0 1 1.4-1.4l4.6 4.6a1 1 0 0 1 0 1.4l-4.6 4.6a1 1 0 0 1-1.4-1.4z"/></svg>`,
  file: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 6v10h5V9H4zm7 0v10h9V9h-9z"/></svg>`,
  qr: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h3v3h-3v-3zm5 0h3v3h-3v-3zm-5 5h3v3h-3v-3zm5 0h3v3h-3v-3z"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a4 4 0 0 0-4 4v.35A3.5 3.5 0 0 0 5.5 13 3.5 3.5 0 0 0 8 16.32V18a4 4 0 0 0 8 0v-1.68A3.5 3.5 0 0 0 18.5 13 3.5 3.5 0 0 0 16 6.35V6a4 4 0 0 0-4-4zm-1 5h2v10h-2V7z"/></svg>`,
  game: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 6h10a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5 3 3 0 0 1-2.4-1.2L13 15h-2l-1.6 1.8A3 3 0 0 1 7 18a5 5 0 0 1-5-5v-2a5 5 0 0 1 5-5zm-1 4v1H5v2h1v1h2v-1h1v-2H8v-1H6zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm2 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2 2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
};

const ICON_LABELS = { github: 'GitHub', notion: 'Notion' };

// ── 경로 헬퍼 (articles/ 하위 페이지는 한 단계 위를 봐야 함) ────
function pageMode() {
  const path = location.pathname.replace(/\\/g, '/');
  if (path.includes('/articles/')) return 'detail';
  if (/article\.html$/.test(path)) return 'articles';
  if (/project\.html$/.test(path)) return 'projects';
  return 'index';
}

function basePath() {
  return pageMode() === 'detail' ? '../' : '';
}

// ── 아티클 카드 템플릿 ──────────────────────────────────────────
function articleCardHTML(p) {
  const base = basePath();
  const badge = p.badge ? `<span class="acard-badge">${p.badge}</span>` : '';
  const excerpt = p.excerpt ? `<p class="acard-excerpt">${p.excerpt}</p>` : '';
  return `
  <a class="acard reveal" href="${base}${p.url}">
    <div class="acard-meta">
      <span class="acard-date">${p.date}</span>
      ${badge}
    </div>
    <h3 class="acard-title">${p.title}</h3>
    ${excerpt}
    <span class="acard-more">읽기 <span class="acard-arrow">${ICONS.arrow}</span></span>
  </a>`;
}

// limit: 숫자면 해당 개수만, 생략하면 전체 렌더링
function renderArticleGrid(elementId, limit) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const posts = limit ? allPosts().slice(0, limit) : allPosts();
  el.innerHTML = posts.map(articleCardHTML).join('');
  observeReveals();
}

// ── 이전/이후 글 내비게이션 (아티클 상세 페이지) ─────────────────
function pagerCellHTML(post, cls, label) {
  if (!post) return `<span class="pager-link empty" aria-hidden="true"></span>`;
  return `
  <a class="pager-link ${cls}" href="${basePath()}${post.url}">
    <span class="pager-label">${label}</span>
    <span class="pager-title">${post.title}</span>
  </a>`;
}

function renderArticlePager() {
  const body = document.querySelector('.article-body');
  if (!body || document.querySelector('.article-pager')) return;
  const posts = allPosts(); // 날짜 내림차순 (최신이 첫 번째)
  const file = decodeURIComponent(location.pathname).split('/').pop();
  const idx = posts.findIndex((p) => p.url.split('/').pop() === file);
  if (idx === -1) return;
  const older = posts[idx + 1];
  const newer = posts[idx - 1];
  if (!older && !newer) return;
  const nav = document.createElement('nav');
  nav.className = 'article-pager';
  nav.setAttribute('aria-label', '이전/이후 글');
  nav.innerHTML = pagerCellHTML(older, 'prev', '← 이전 글') + pagerCellHTML(newer, 'next', '이후 글 →');
  body.appendChild(nav);
}

function initArticlePager() {
  if (pageMode() !== 'detail') return;
  if (typeof blogPosts !== 'undefined') {
    renderArticlePager();
    return;
  }
  // 상세 페이지는 articles-data.js 를 직접 포함하지 않으므로 여기서 주입한다
  const s = document.createElement('script');
  s.src = `${basePath()}articles-data.js`;
  s.onload = renderArticlePager;
  document.head.appendChild(s);
}

// ── 프로젝트 카드 그리드 ────────────────────────────────────────
function cardVisualHTML(p) {
  if (p.image) {
    const count = p.images ? p.images.length : 1;
    const badge = count > 1 ? `<span class="pcard-gallery-badge">${ICONS.layers} ${count}</span>` : '';
    return `
      <div class="pcard-visual ${p.gradient || 'grad-orange'}">
        <img src="${basePath()}${p.image}" alt="${p.name} 스크린샷" loading="lazy" />
        ${badge}
      </div>`;
  }
  return `
      <div class="pcard-visual pcard-fallback ${p.gradient || 'grad-purple'}">
        <span class="pcard-lang">${p.lang || ''}</span>
      </div>`;
}

function roleBadgeHTML(p) {
  return `<span class="pcard-role${p.team ? ' is-team' : ''}">${p.team ? '팀' : '1인'}</span>`;
}

function statusBadgeHTML(p) {
  return p.status ? `<span class="status-badge"><span class="status-dot"></span>${p.status}</span>` : '';
}

// tag 는 문자열 또는 배열 둘 다 허용한다
function tagList(p) {
  return Array.isArray(p.tag) ? p.tag : [p.tag];
}

// compact: 부가 작업용 — 상단 비주얼 없이 텍스트만
function projectCardHTML(p, { compact = false } = {}) {
  const chips = p.featured
    ? p.tech.slice(0, 3).map((t) => `<span class="tech-chip">${t}</span>`).join('')
    : [p.lang, ...tagList(p)].filter(Boolean).map((t) => `<span class="tech-chip tech-chip-muted">${t}</span>`).join('');

  return `
    <button class="pcard reveal${compact ? ' pcard-compact' : ''}" type="button" data-id="${p.id}" aria-haspopup="dialog">
      ${compact ? '' : cardVisualHTML(p)}
      <div class="pcard-body">
        <div class="pcard-head">
          <span class="pcard-icon">${ICONS[p.icon] || ICONS.code}</span>
          <h3>${p.name}</h3>
          ${statusBadgeHTML(p)}
          ${roleBadgeHTML(p)}
        </div>
        <p class="pcard-desc">${p.desc}</p>
        <div class="pcard-tags">${chips}</div>
      </div>
    </button>`;
}

function renderProjectGrid(elementId, { minor = false } = {}) {
  const grid = document.getElementById(elementId);
  if (!grid) return;
  const list = projects.filter((p) => Boolean(p.minor) === minor);
  grid.innerHTML = list.map((p) => projectCardHTML(p, { compact: minor })).join('');

  // 개수는 목록에서 직접 센다 (분류를 바꿔도 라벨이 틀어지지 않도록)
  if (minor) {
    const summary = grid.closest('details')?.querySelector('summary');
    if (summary) summary.textContent = '그 외 학습·과제용 작업 더 보기';
  }
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.pcard');
    if (!card) return;
    openModal(projects.find((p) => p.id === card.dataset.id));
  });
  observeReveals();
}

// ── 프로젝트 상세 모달 ──────────────────────────────────────────
let lastFocused = null;

function modalContentHTML(p) {
  const visual = p.images
    ? `<div class="modal-gallery">
        <div class="modal-gallery-track">
          ${p.images.map((src) => `<img src="${basePath()}${src}" alt="${p.name} 스크린샷" loading="lazy" draggable="false" />`).join('')}
        </div>
        ${p.images.length > 1 ? `
        <button class="modal-gallery-nav modal-gallery-prev" type="button" aria-label="이전 이미지">${ICONS.chevron}</button>
        <button class="modal-gallery-nav modal-gallery-next" type="button" aria-label="다음 이미지">${ICONS.chevron}</button>
        <div class="modal-gallery-dots">${p.images.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('')}</div>` : ''}
      </div>`
    : p.image
    ? `<div class="modal-visual ${p.gradient || 'grad-orange'}"><img src="${basePath()}${p.image}" alt="${p.name} 스크린샷" /></div>`
    : `<div class="modal-visual ${p.gradient || 'grad-purple'}"><span class="pcard-lang">${p.lang || ''}</span></div>`;

  const role = `<span class="pcard-role${p.team ? ' is-team' : ''}">${p.team ? '팀' : '1인'}</span>`;
  const status = statusBadgeHTML(p);
  const metaInfo = p.featured
    ? `<span class="pin-icon">${ICONS.pin}</span>${p.context} · ${p.period} ${status}`
    : `${[p.lang, ...tagList(p)].filter(Boolean).join(' · ')} ${status}`;
  const meta = `<span class="modal-context"><span class="modal-context-info">${metaInfo}</span>${role}</span>`;

  const subtitle = p.subtitle ? `<p class="modal-subtitle">${p.subtitle}</p>` : '';

  const highlights = p.highlights
    ? `<ul class="modal-highlights bullet-list">${p.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>`
    : '';

  const tech = p.tech
    ? `<div class="tech-list">${p.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('')}</div>`
    : '';

  const extra = (p.extraLinks || []).map((l) => {
    const key = l.label.toLowerCase();
    const icon = ICONS[key];
    const label = ICON_LABELS[key] || l.label;
    return icon
      ? `<a class="btn-icon" href="${l.url}" target="_blank" rel="noopener" aria-label="${label}">${icon}</a>`
      : `<a class="extra-link" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`;
  }).join('');

  return `
    <div class="modal" role="dialog" aria-modal="true" aria-label="${p.name}">
      <button class="modal-close" type="button" aria-label="닫기">✕</button>
      ${visual}
      <div class="modal-body">
        ${meta}
        <h3>${p.name}</h3>
        ${subtitle}
        <p class="modal-desc">${p.desc}</p>
        ${highlights}
        ${tech}
        <div class="modal-actions">
          ${p.siteUrl ? `<a class="btn btn-primary" href="${p.siteUrl}" target="_blank" rel="noopener">사이트 방문 ↗</a>` : ''}
          <a class="btn-icon" href="${p.url}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
          ${extra}
        </div>
      </div>
    </div>`;
}

let currentProjectImages = [];
let modalGalleryIndex = 0;

function setModalGalleryIndex(index) {
  const track = document.querySelector('#project-modal .modal-gallery-track');
  if (!track || !track.children.length) return;
  modalGalleryIndex = (index + track.children.length) % track.children.length;
  track.style.transform = `translateX(-${modalGalleryIndex * 100}%)`;
  document.querySelectorAll('#project-modal .modal-gallery-dots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === modalGalleryIndex);
  });
}

// 세로로 긴 스크린샷(GIF 등)은 cover 로 꽉 채우면 대부분 잘려나가므로
// 실제 비율을 확인해 세로형이면 contain 으로 전체가 보이게 전환한다
function markImageOrientation(img) {
  const check = () => {
    if (img.naturalWidth && img.naturalHeight) {
      img.classList.toggle('portrait', img.naturalHeight > img.naturalWidth);
    }
  };
  if (img.complete) check();
  else img.addEventListener('load', check, { once: true });
}

function openModal(p) {
  const backdrop = document.getElementById('project-modal');
  if (!backdrop || !p) return;
  lastFocused = document.activeElement;
  currentProjectImages = p.images || (p.image ? [p.image] : []);
  modalGalleryIndex = 0;
  backdrop.innerHTML = modalContentHTML(p);
  backdrop.querySelectorAll('.modal-visual img, .modal-gallery-track img').forEach(markImageOrientation);
  backdrop.classList.add('open');
  document.body.classList.add('modal-open');
  backdrop.querySelector('.modal-close')?.focus();
}

// #project-<id> 로 들어오면 해당 프로젝트를 바로 연다 (공유 링크용)
function openModalFromHash() {
  const match = /^#project-(.+)$/.exec(location.hash);
  if (!match) return;
  openModal(projects.find((p) => p.id === match[1]));
}

function closeModal() {
  const backdrop = document.getElementById('project-modal');
  if (!backdrop || !backdrop.classList.contains('open')) return;
  backdrop.classList.remove('open');
  document.body.classList.remove('modal-open');
  backdrop.innerHTML = '';
  lastFocused?.focus();
}

// ── 이미지 라이트박스 (확대 + 좌우 슬라이드) ─────────────────────
let lightboxImages = [];
let lightboxIndex = 0;

function ensureLightbox() {
  let backdrop = document.getElementById('lightbox-backdrop');
  if (backdrop) return backdrop;

  backdrop = document.createElement('div');
  backdrop.id = 'lightbox-backdrop';
  backdrop.className = 'lightbox-backdrop';
  backdrop.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="닫기">✕</button>
    <button class="lightbox-nav lightbox-prev" type="button" aria-label="이전 이미지">${ICONS.chevron}</button>
    <img class="lightbox-img" src="" alt="" />
    <button class="lightbox-nav lightbox-next" type="button" aria-label="다음 이미지">${ICONS.chevron}</button>`;
  document.body.appendChild(backdrop);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target.closest('.lightbox-close')) closeLightbox();
    else if (e.target.closest('.lightbox-prev')) showLightbox(lightboxIndex - 1);
    else if (e.target.closest('.lightbox-next')) showLightbox(lightboxIndex + 1);
  });
  document.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightbox(lightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightbox(lightboxIndex + 1);
  });
  return backdrop;
}

function showLightbox(index) {
  const backdrop = ensureLightbox();
  lightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
  backdrop.querySelector('.lightbox-img').src = `${basePath()}${lightboxImages[lightboxIndex]}`;
  const multi = lightboxImages.length > 1;
  backdrop.querySelectorAll('.lightbox-nav').forEach((btn) => { btn.style.display = multi ? '' : 'none'; });
}

function openLightbox(images, startIndex) {
  if (!images || !images.length) return;
  lightboxImages = images;
  const backdrop = ensureLightbox();
  showLightbox(startIndex || 0);
  backdrop.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeLightbox() {
  const backdrop = document.getElementById('lightbox-backdrop');
  if (!backdrop) return;
  backdrop.classList.remove('open');
  const modalBackdrop = document.getElementById('project-modal');
  if (!modalBackdrop || !modalBackdrop.classList.contains('open')) {
    document.body.classList.remove('modal-open');
  }
}

// 모달 갤러리 드래그(마우스·터치 공용) 슬라이드
let galleryDragTrack = null;
let galleryDragStartX = 0;
let galleryDragDeltaX = 0;
let galleryDragWidth = 0;
let galleryWasDragged = false;

function initModalGalleryDrag(backdrop) {
  backdrop.addEventListener('pointerdown', (e) => {
    // 갤러리가 아닌 단일 이미지(.modal-visual) 클릭 시에도 이전 드래그 상태가
    // 남아 있으면 클릭(확대)이 씹히므로, 대상에 상관없이 항상 리셋한다
    galleryWasDragged = false;
    const track = e.target.closest('.modal-gallery-track');
    if (!track || track.children.length < 2) return;
    galleryDragTrack = track;
    galleryDragStartX = e.clientX;
    galleryDragDeltaX = 0;
    galleryDragWidth = track.parentElement.offsetWidth;
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
  });

  backdrop.addEventListener('pointermove', (e) => {
    if (!galleryDragTrack) return;
    galleryDragDeltaX = e.clientX - galleryDragStartX;
    const base = -modalGalleryIndex * galleryDragWidth;
    galleryDragTrack.style.transform = `translateX(${base + galleryDragDeltaX}px)`;
  });

  const endDrag = () => {
    if (!galleryDragTrack) return;
    const track = galleryDragTrack;
    galleryDragTrack = null;
    track.style.transition = '';
    // 실제로 의미 있게 움직였을 때만 드래그로 취급 — 클릭 시 손 떨림 정도의
    // 미세한 이동까지 드래그로 오인해 클릭(확대)이 씹히는 걸 방지
    galleryWasDragged = Math.abs(galleryDragDeltaX) > 10;
    const threshold = galleryDragWidth * 0.18;
    if (galleryDragDeltaX < -threshold) setModalGalleryIndex(modalGalleryIndex + 1);
    else if (galleryDragDeltaX > threshold) setModalGalleryIndex(modalGalleryIndex - 1);
    else setModalGalleryIndex(modalGalleryIndex);
  };
  backdrop.addEventListener('pointerup', endDrag);
  backdrop.addEventListener('pointercancel', endDrag);
}

function initModal() {
  const backdrop = document.getElementById('project-modal');
  if (!backdrop) return;
  initModalGalleryDrag(backdrop);
  backdrop.addEventListener('click', (e) => {
    if (galleryWasDragged) {
      galleryWasDragged = false;
      return;
    }
    if (e.target === backdrop || e.target.closest('.modal-close')) {
      closeModal();
      return;
    }
    if (e.target.closest('.modal-gallery-prev')) {
      setModalGalleryIndex(modalGalleryIndex - 1);
      return;
    }
    if (e.target.closest('.modal-gallery-next')) {
      setModalGalleryIndex(modalGalleryIndex + 1);
      return;
    }
    const img = e.target.closest('.modal-visual img, .modal-gallery-track img');
    if (img) {
      openLightbox(currentProjectImages, modalGalleryIndex);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
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

// ── 상단 헤더 (공유 컴포넌트) ───────────────────────────────────
function headerHTML(mode) {
  const base = basePath();
  const idx = `${base}index.html`;
  const isIndex = mode === 'index';

  // 헤더에는 페이지 이동만 남긴다 (같은 문서 내 앵커는 넣지 않음)
  const links = [
    { name: 'projects', label: 'Projects', href: `${base}project.html` },
    { name: 'articles', label: 'Articles', href: `${base}article.html` },
  ];

  const activeName = mode === 'projects' ? 'projects'
    : mode === 'articles' || mode === 'detail' ? 'articles'
    : null;

  const navHTML = links.map((l) => {
    const active = l.name === activeName ? ' active' : '';
    return `<a class="nav-link${active}" href="${l.href}">${l.label}</a>`;
  }).join('');

  return `
    <div class="header-inner">
      <a class="brand" href="${isIndex ? '#top' : idx}">rdyjun</a>
      <nav class="site-nav" id="site-nav">${navHTML}</nav>
      <div class="header-actions">
        <a class="btn-icon" href="https://github.com/rdyjun" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
        <button class="theme-toggle" id="theme-toggle" aria-label="테마 전환">
          <span class="theme-icon">☀️</span>
        </button>
        <button class="nav-toggle" id="nav-toggle" aria-label="메뉴 열기" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>`;
}

function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.innerHTML = headerHTML(pageMode());
}

// ── 모바일 메뉴 ────────────────────────────────────────────────
function closeNav() {
  document.getElementById('site-nav')?.classList.remove('open');
  const btn = document.getElementById('nav-toggle');
  btn?.classList.remove('open');
  btn?.setAttribute('aria-expanded', 'false');
}

function initNavToggle() {
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeNav();
  });
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

// ── 앵커 스크롤 ────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id === '#top' ? document.body : document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeNav();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
  initHeader();
  initFooter();
  initTheme();
  initThemeToggle();
  initNavToggle();

  renderProjectGrid('project-grid');
  renderProjectGrid('minor-grid', { minor: true });
  initModal();
  openModalFromHash();
  window.addEventListener('hashchange', openModalFromHash);

  renderArticleGrid('blog-preview', 6);
  renderArticleGrid('blog-list');
  initArticlePager();

  initSmoothScroll();
  observeReveals();
});
