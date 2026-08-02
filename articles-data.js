// 이 파일은 scripts/generate-excerpts.mjs 가 생성합니다. 직접 수정하지 마세요.
const blogPosts = [
  {
    "title": "첫 오픈소스 기여",
    "date": "2026-07-31",
    "url": "articles/cloudflare-tunnel-contribution.html",
    "excerpt": "오픈소스 기여는 오래전부터 해보고 싶었던 일 중 하나였다. 하지만 막상 시작하려고 하면 어느 저장소에서 무엇부터 해야 할지 감이 잡히지 않아 계속 미루고 있었다. 그러다 오픈소스 기여에 다시 관심이 생겨서, 평소에 직접 쓰고 있는 서비스의 저장소부터 찾아보기로 했다.…"
  },
  {
    "title": "단일 인스턴스 환경에서 Redis MQ를 걷어내고 단일 큐로 전환하기",
    "date": "2026-07-19",
    "url": "articles/dongsoop-matching-lock.html",
    "excerpt": "이전에는 실시간 매칭 구조 리팩터링: 낙관적 락에서 MQ로 전환하기까지 에서 다룬 것처럼, Node.js + Redis MQ로 입장/퇴장 이벤트를 큐에 넣고 순서대로 처리하는 구조를 썼다. 당시엔 동시 입장으로 세션 정원이 초과되거나 세션이 중복 생성되는 문제를 락(W…"
  },
  {
    "title": "Spring Boot에서 카카오 소셜 로그인 적용",
    "date": "2026-01-13",
    "url": "articles/oauth-spring-boot.html",
    "excerpt": "Spring Boot 환경에서 OAuth2.0을 도입해보려고 한다. 기존 회원가입이 된 사용자에 대해서만 OAuth 연동을 하도록 할 것이며, 이에 따라 OAuth로만 회원가입은 불가하다. JWT를 사용중인 환경으로 OAuth2.0을 어떻게 적용할 것인 지에 대해 알아…"
  },
  {
    "title": "실시간 매칭 구조 리팩터링: 낙관적 락에서 MQ로 전환하기까지",
    "date": "2025-12-11",
    "badge": "구버전",
    "url": "articles/dongsoop-matching-queue.html",
    "excerpt": "이 글은 Node.js + Redis MQ 기반으로 구현했던 과거 버전을 다룹니다. 이후 단일 인스턴스 환경에 맞춰 로컬 락 구조로 다시 전환했습니다. 최신 내용은 이 글 을 참고해주세요. 처음에는 Redis의 WATCH 기능을 이용해 입장·퇴장 시점의 데이터를 스냅샷…"
  },
  {
    "title": "개인 도메인으로 무료 메일 보내기",
    "date": "2025-07-30",
    "url": "articles/email-smtp-by-domain.html",
    "excerpt": "회원 가입 과정에서 이메일 인증이 필요하며 이를 백엔드 서버에서 요청을 받아 인증 메일을 보내도록 할 것이다. 인증 메일은 서비스 운영 중 실제 사용자에게 보내질 메일이기 때문에 개인 메일로 보내지 않고, 사용중인 도메인으로 메일을 보낼 계획이다. 본 글은 도메인의 네…"
  },
  {
    "title": "QueryDSL 충돌",
    "date": "2025-07-15",
    "url": "articles/querydsl-crash.html",
    "excerpt": "QueryDSL을 사용해서 각 행으로 분리된 권한 데이터를 List로 합치는 과정에서 아래와 같은 문제에 직면했다. 예를 들어, 아래와 같이 테이블이 있을 경우 권한 부분을 합쳐서 가져온다. { ID: 1, Role: [USER, CUSTOMER] } 기존에 strin…"
  },
  {
    "title": "JPA와 복합키",
    "date": "2025-03-28",
    "url": "articles/composite-key-by-jpa.html",
    "excerpt": "공지사항을 개발하던 도중 복합키를 사용하게 되었다. 단순히 @Id를 두 번 넣으면 되겠지라고 생각했던 것은 오산이었다. 아래 사진을 확인하면 Entity has more than one id attribute. 라는 문구를 출력한다. 이 의미는 한 개 보다 많은 id…"
  },
  {
    "title": "싱글톤 클래스 관리: Bean vs Static 방식의 차이점",
    "date": "2025-03-07",
    "url": "articles/singleton-static-bean.html",
    "excerpt": "Java와 Spring Boot 프로젝트 개발 시 싱글톤은 자주 사용되는 패턴 중 하나이다. 인스턴스를 하나만 생성하여 메모리 효율성을 높이고 전역적으로 동일한 객체를 사용하기 위해 사용된다. 특히 데이터를 저장하기보다 로직을 처리하는 클래스에서 주로 사용된다. 이 싱…"
  },
  {
    "title": "return 할 때 await을 붙이면 어떻게 될까?",
    "date": "2025-02-12",
    "url": "articles/await-promise.html",
    "excerpt": "개발하다가 간혹 비동기 함수를 직접 return할 때가 있다. 처음에는 await을 꼭 붙여줬는데 지금은 await을 붙이지 않아도 된다는 사실을 알게되었다. 왜 await을 붙이지 않아도 되는 걸까? 아래 코드의 asyncFunction() 함수는 비동기 로직을 수행…"
  },
  {
    "title": "자바스크립트의 sort",
    "date": "2025-01-26",
    "url": "articles/javascript-sort.html",
    "excerpt": "코딩테스트 문제 풀이 중 계속 실패하여 엣지 케이스를 찾으려 했으나, 아무리 찾아도 엣지 케이스가 나오지 않는 문제가 발생했다. AI의 도움을 받아 array.sort() 부분이 문제라는 것을 알아냈다. 자바스크립트에서 array.sort() 는 배열의 요소를 문자열…"
  },
  {
    "title": "다중 인스턴스 환경을 고려해서 소켓 통신 동기화",
    "date": "2025-01-15",
    "url": "articles/redis-adapter.html",
    "excerpt": "Socket.IO Redis adapter 공식문서 링크 지난 프로젝트를 하면서 채팅, 투표 등 실시간 데이터 반영을 위해 Socket.IO를 사용했었다. 당장은 하나의 인스턴스로 서버를 돌리고 있기 때문에 문제가 없지만, 오토 스케일링을 사용한다고 가정하고 이때 발생…"
  },
  {
    "title": "[네이버 부스트캠프] 웹·모바일 9기 멤버십 과정 최종 회고",
    "date": "2024-12-27",
    "url": "articles/naver-bostcamp-membership.html",
    "excerpt": "올해 6월부터 지속된 네이버 부스트캠프 9기 정규 과정이 24. 12. 6 날짜로 막을 내리고, 최종 과정인 멤버십 과정을 수료하게 되었다. 내가 다닌 대학에서는 경험할 수 없었던 많은 경험을 해볼 수 있던 기간이었고, 그동안의 감정과 어떤 과정이 나에게 어떤 도움이…"
  },
  {
    "title": "배포 시간 절반 단축을 위한 파이프라인 분리",
    "date": "2024-12-13",
    "url": "articles/deploy-independent-pipeline.html",
    "excerpt": "게시글, 처음 사용해본 도커로 배포 리팩토링 해보기 지난번에 도커 자동 배포 방식을 개선했었는데, 모노레포였기 때문에 push했을 때 수정된 파일과 관계없이 클라이언트 프로젝트와 서버 프로젝트를 모두 다시 배포하는 상태였다. 하지만 커밋 변경사항에 따라 클라이언트 프로…"
  },
  {
    "title": "[Naver Cloud] Green Developers 후기",
    "date": "2024-12-11",
    "url": "articles/green-developers-review.html",
    "excerpt": "네이버 부스트캠프 과정에서 참여하게 된 Naver Cloud Green Developers 후기이다. 간단한 프로젝트 소개를 시작으로 해당 프로젝트에서의 Naver Cloud 적용 과정을 설명하겠다. 오직 음악으로만 소통할 수 있는 공간을 필요로 하는 아티스트와 팬들을…"
  },
  {
    "title": "[Docker] 도커를 이용해서 배포 프로세스를 최적화하자",
    "date": "2024-11-24",
    "url": "articles/boostcamp-docker-updated.html",
    "excerpt": "기존에는 클라우드 서버에서 git pull 로 최신 커밋을 내려받고, 도커 컴포즈 파일로 빌드 후 그린/블루 배포 방식을 통해 실행하는 구조였다. 하지만, 이 방식은 도커의 장점을 살리지 못하고, 굳이 도커를 추가로 가져가는 느낌이었다. 이런 문제를 해결하고자 도커를…"
  },
  {
    "title": "[Mysql] NOT IN 문제",
    "date": "2024-09-10",
    "url": "articles/sql-not-in.html",
    "excerpt": "SQL 문제를 풀면서 NOT IN을 사용했는데, 원하는 대로 조회가 되지 않았던 문제가 발생했다. 아래 코드는 프로그래머스의 SQL문제 이다. PARENT_ITEM_ID 에 속하지 않는 ITEM_ID 를 찾으려고 NOT IN 을 사용했으나, 아무것도 출력되지 않았다.…"
  },
  {
    "title": "[node] 미들웨어가 뭘까?",
    "date": "2024-09-08",
    "url": "articles/express-middleware.html",
    "excerpt": "미들웨어란 요청과 응답 사이에서 요청을 가로채거나, 요청 전후 추가 작업을 수행하는 함수이다. 간단한 예시로, 사용자 인증, 로깅 등의 작업이 있다. express 프레임 워크를 기준으로, express 모듈의 express() 함수를 호출하게 될 경우 express…"
  },
  {
    "title": "[네이버 부스트캠프] 웹·모바일 9기 챌린지 과정 최종 회고",
    "date": "2024-08-11",
    "url": "articles/naver-boostcamp-challenge.html",
    "excerpt": "해당 내용 중 문제가 될 사항이 있다면, rdyjun00@gmail.com 또는 댓글로 알려주시면 감사하겠습니다. 예정된 4주간의 네이버 부스트캠프 챌린지 과정이 모두 끝이났다. 다양한 학습 방식을 통해 학습에 몰입할 수 있었던 시간이었고, 언제 또 이만큼의 몰입을 해…"
  },
  {
    "title": "[네이버 부스트캠프] 웹·모바일 9기 베이직 과정 회고",
    "date": "2024-07-08",
    "url": "articles/naver-boostcamp-basic.html",
    "excerpt": "지난 2주간 네이버 부스트캠프의 베이직 과정을 수료했다! 서류 전형부터 1차 코딩테스트, 베이직 과정 및 2차 코딩테스트까지의 경험에서 내가 느꼈던 감정과 배운 것들에 대해서 기록해보려고 한다. 기본적인 인적 사항들과 4가지의 간단한 답변을 요구하는 질문이 있었다. 인…"
  },
  {
    "title": "[클라우드] 로드 밸런싱",
    "date": "2024-06-16",
    "url": "articles/loadbalancing.html",
    "excerpt": "로드 밸런싱은 여러 서버를 두고, 부하를 각 서버로 분산하기 위해 사용되는 기술이다. 이 로드 밸런싱의 종류와 특징을 알아볼 것이다. 처음 연결할 때에는 클라이언트의 고유 값을 해시 함수에 입력하여 해시 값을 계산한다. 이렇게 나온 해시 값을 서버 대수로 나누어 서버를…"
  },
  {
    "title": "[스프링 시큐리티] 기본 인증 방식",
    "date": "2024-05-03",
    "url": "articles/spring-security-lecture.html",
    "excerpt": "스프링 부트에서 제공되는 기본 인증 방식에 대해 알아볼 것이다. 웹사이트에 접근할 때, 어떤 경로에 접근하느냐에 따라 접근이 허용되는 경로와 허용되지 않는 경로가 있기 마련이다. 이러한 접근 보안에 대해 알아볼 것이다. 빌더 클래스로서 웹 보안을 구성하는 빈 객체 와…"
  },
  {
    "title": "[알고리즘] 누적합 알고리즘",
    "date": "2024-04-17",
    "url": "articles/algorithm-prefix-sum.html",
    "excerpt": "누적합(prefix sum) 알고리즘은 작거나, 큰 배열에서 부분적으로 배열의 값을 여러 번 업데이트 할 때 효율적으로 업데이트 할 수 있는 알고리즘이다. 업데이트 요청마다 반복문을 돌지 않고, 업데이트 정보를 저장해두었다가 한 번의 반복문으로 해결한다. 카카오에서 출…"
  },
  {
    "title": "[알고리즘] 플로이드 워셜 알고리즘",
    "date": "2024-04-06",
    "url": "articles/algorithm-floyd-warshall.html",
    "excerpt": "플로이드 워셜(FLoyd Warshall)은 모든 노드의 최단 경로 탐색 문제에서 사용되는 알고리즘으로, 모든 노드로부터 다른 모든 노드로의 최소 비용을 찾아낼 때 사용하는 알고리즘이다. 다익스트라(dijkstra)와 비교할 수 있는데, 다익스트라 알고리즘은 특정 한…"
  },
  {
    "title": "[알고리즘] 다익스트라 알고리즘",
    "date": "2024-03-18",
    "url": "articles/algorithm-dijkstra.html",
    "excerpt": "다익스트라(Dijkstra)는 최단 경로 탐색 문제에서 사용되는 알고리즘으로, 특정 노드에서 다른 노드로의 최소 비용을 찾아낼 때 사용하는 알고리즘이다. 알고리즘 분류는 탐욕(Greedy) 알고리즘이라고도 하며, 이미 탐색한 결과에 대해 계산하지 않고, 기존 결과를 재…"
  }
];
