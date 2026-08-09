---
title: DynamoDB 환경에서 조회-검사-저장으로 지키던 유일성을 키 제약으로 옮기기
date: 2026-08-06
---

<style>
  .diagram-figure { margin: 1.5rem 0 2rem; }
  .diagram-box {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.4rem 1.4rem 1.6rem;
    overflow-x: auto;
  }
  .diagram-box svg { display: block; width: 100%; max-width: 460px; height: auto; margin: 0 auto; }
  .diagram-row-label { font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; fill: var(--fg); }
  .diagram-node-box { fill: var(--card); stroke: var(--border); stroke-width: 1.5; }
  .diagram-node-box.accent { stroke: var(--accent); stroke-width: 2; }
  .diagram-node-text { font-size: 0.95rem; fill: var(--fg); font-weight: 700; text-anchor: middle; }
  .diagram-node-sub { font-size: 0.76rem; fill: var(--muted); text-anchor: middle; }
  .diagram-edge-label { font-family: var(--font-mono); font-size: 0.78rem; fill: var(--muted); text-anchor: middle; }
  .diagram-arrow { stroke: var(--muted); stroke-width: 2; fill: none; }
  .diagram-gap { fill: none; stroke: var(--accent); stroke-width: 2; stroke-dasharray: 6 4; }
  .diagram-outer { fill: none; stroke: var(--accent); stroke-width: 2; stroke-dasharray: 6 4; }
  .diagram-card-title { font-size: 0.85rem; fill: var(--fg); font-weight: 700; text-anchor: middle; }
  .diagram-note { font-size: 0.78rem; fill: var(--muted); }
  figcaption.diagram-caption {
    margin-top: 0.8rem;
    font-size: 0.85rem;
    color: var(--muted);
    text-align: center;
  }
</style>

> DynamoDB(NoSQL) 기준으로 작성된 글입니다.

최근 개발 중 유니크 제약 관련 문제가 있었다.  
구체적인 도메인은 밝힐 수 없어서, 여기서는 **사용자**와 **사용자 닉네임**으로 예를 들겠다.  

해당 프로젝트에서 사용자가 약 100명 정도로 적었기 때문에 가벼운 조건 검사로 둘 수 있었지만,  
해당 닉네임이 각 사용자의 서브 도메인으로 사용되어,  
사용자간 자원을 공유하게 될 수 있는 큰 이슈가 있어 개선하게 되었다.

사용자(User) 엔티티에 닉네임(User.nickname)이 저장되고 있었고,  
앞서 얘기한 것과 같이 서브 도메인으로 사용되기 때문에 닉네임은 고유하게 저장되어야 한다.  
이 구조에서 동시성에 따른 데이터 중복을 예방하는 내용을 다룬다.

## 검사와 생성 사이

기존 방식은 단순했다. 닉네임을 보조 인덱스(GSI)로 조회해 이미 있으면 실패하고, 없으면 닉네임이 할당된다.
사용자간 순차적 요청 시에는 정상적으로 막힌다. 문제는 검사와 생성이 하나의 연산이 아니라는 것이다.

게다가 닉네임을 조회하기 위한 보조 인덱스(GSI)는 DynamoDB 특성 상 일관성(Consistent) 읽기를 지원하지 않는다.  
보조 인덱스의 일관성 읽기가 보장되지 않는 이유는, 데이터 변경 시 원본 테이블에 쓰기가 커밋되면 **비동기**로 전파되기 때문이다.  
그래서 저장을 하더라도 읽을 때 최신 값을 읽어오지 않을 수 있다는 의미가 된다.

<figure class="diagram-figure">
  <div class="diagram-box">
    <svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <text x="0" y="18" class="diagram-row-label">A</text>
      <rect x="0" y="30" width="150" height="46" rx="9" class="diagram-node-box" />
      <text x="75" y="52" class="diagram-node-text">생성 커밋</text>
      <text x="75" y="68" class="diagram-node-sub">원본 테이블에 기록됨</text>
      <path d="M150,53 L230,53" class="diagram-arrow" marker-end="url(#ah)" />
      <text x="192" y="45" class="diagram-edge-label">인덱스 전파</text>
      <rect x="230" y="30" width="150" height="46" rx="9" class="diagram-node-box" />
      <text x="305" y="58" class="diagram-node-text">인덱스 반영</text>
      <rect x="150" y="20" width="80" height="150" rx="8" class="diagram-gap" />
      <text x="190" y="192" class="diagram-edge-label">이 구간이 창</text>
      <text x="0" y="120" class="diagram-row-label">B</text>
      <rect x="0" y="132" width="150" height="46" rx="9" class="diagram-node-box accent" />
      <text x="75" y="154" class="diagram-node-text">조회 → "없음"</text>
      <text x="75" y="170" class="diagram-node-sub">A 를 아직 못 봄</text>
      <path d="M150,155 L380,155" class="diagram-arrow" marker-end="url(#ah)" />
      <text x="300" y="147" class="diagram-edge-label">생성 → 중복</text>
    </svg>
  </div>
  <figcaption class="diagram-caption">
    보조 인덱스 전파가 끝나기 전에 다음 요청이 조회하면 "없음"이 나온다
  </figcaption>
</figure>

저장 직후에도 시간차로 닉네임을 쓸 수 있다는 점이 치명적이라고 생각했다.

## 정말 뚫리나?

여기까지는 코드를 읽고 추론한 것이라, 실제로 뚫리는지 확인하고 넘어가기로 했다.  

방법은 이렇다. 기존 경로(조회 검사 → 조건 없는 쓰기)를 그대로 옮긴 함수를 하나 만들고, 같은 이름으로 요청을 겹쳐 보냈다.  
이후 저장된 닉네임 개수를 검증하기로 했다.
그런데 보조 인덱스로 세면 그 값 자체가 낡았을 수 있어서, 원본 테이블을 강한 일관성 읽기로 훑어 그 이름을 가진 항목을 직접 셌다.

<table>
  <thead>
    <tr><th>조건</th><th>결과</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>기존 구조<br /><span class="text-muted">동시 3개</span></td>
      <td><strong>3개 전부 생성</strong> — 검사가 아무것도 막지 못함</td>
    </tr>
    <tr>
      <td>기존 구조<br /><span class="text-muted">연달아 2개 · 20회 반복</span></td>
      <td><strong>2회 뚫림(10%)</strong> — 대기 없이 이어 보내면 인덱스가 못 따라옴</td>
    </tr>
  </tbody>
</table>

동시 요청은 100% 중복 데이터가 생성되고, 인덱스 전파도 늦었다.

## 락을 써볼까?

서버리스 구조였기 때문에 처음 떠올린 건 분산 락이었다.  
닉네임 단위로 락을 잡은 후, 그 안에서 기존 로직을 그대로 실행하면 되지 않나 싶었다.  

하지만 일관성 읽기 문제가 발목을 잡았다.  
두 사용자 A, B가 Steve라는 닉네임을 사용하려 한다고 가정하자.  
1. A가 락 획득 -> Steve 존재 여부 확인 -> 닉네임 획득 -> 락 반납  
2. A가 반납 후 B가 락 획득 -> Steve 존재 여부 확인(* 보조 인덱스 전파 속도 문제로 통과) -> 닉네임 획득 -> 락 반납

<figure class="diagram-figure">
  <div class="diagram-box">
    <svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ah3" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <text x="0" y="18" class="diagram-row-label">A (락 보유)</text>
      <rect x="0" y="30" width="86" height="42" rx="9" class="diagram-node-box" />
      <text x="43" y="56" class="diagram-node-text">락 획득</text>
      <path d="M86,51 L108,51" class="diagram-arrow" marker-end="url(#ah3)" />
      <rect x="108" y="30" width="106" height="42" rx="9" class="diagram-node-box accent" />
      <text x="161" y="47" class="diagram-node-text">쓰기 커밋</text>
      <text x="161" y="63" class="diagram-node-sub">원본 테이블에 반영</text>
      <path d="M214,51 L236,51" class="diagram-arrow" marker-end="url(#ah3)" />
      <rect x="236" y="30" width="86" height="42" rx="9" class="diagram-node-box" />
      <text x="279" y="56" class="diagram-node-text">락 해제</text>
      <rect x="108" y="18" width="290" height="204" rx="8" class="diagram-gap" />
      <text x="253" y="212" class="diagram-edge-label">GSI 전파 — 완료 시점 보장 없음</text>
      <path d="M279,72 L279,146" class="diagram-arrow" marker-end="url(#ah3)" />
      <text x="0" y="138" class="diagram-row-label">B (락 획득 직후)</text>
      <rect x="236" y="150" width="150" height="46" rx="9" class="diagram-node-box accent" />
      <text x="311" y="170" class="diagram-node-text">GSI 조회</text>
      <text x="311" y="186" class="diagram-node-sub">→ "없음" (여전히 낡음)</text>
      <text x="0" y="238" class="diagram-note">락은 요청 순서만 보장한다 — 그 안의 조회가 전파 구간에 걸리면 결과는 여전히 낡는다</text>
    </svg>
  </div>
  <figcaption class="diagram-caption">
    락으로 A → B 순서를 강제해도, B의 조회는 여전히 GSI 전파 구간 안에 걸릴 수 있다
  </figcaption>
</figure>


전파가 끝났는지 알 방법도 없다. 읽어온 값을 보고 "이게 최신인가"를 판별할 수단이 없어서  
"잠깐 기다렸다 읽자" 같은 회피도 100% 보장되지 않는다. 언제 읽든 낡았을 수 있다는 걸 전제로 짜야 한다.

## 큐나 스트림도 답이 아니었다

구조가 복잡해지면서 "차라리 이름 단위로 직렬화하면 되지 않나"를 검토했다.
FIFO 큐의 그룹 키에 이름을 넣으면 같은 이름에 대한 요청이 순차 처리된다.
변경 스트림으로도 가능해 보였다.

둘 다 같은 벽에 부딪혔다. **순서를 정해주는 도구인데, 우리가 필요한 건 읽기의 일관성**이었다.
컨슈머가 엄격히 순차로 돌아도, 앞 메시지의 쓰기가 인덱스에 반영되기 전에 다음 메시지가 조회하면
똑같이 "없음"이 나온다. 직렬화는 쓰기 순서를 정하지 인덱스 전파를 기다려주지 않는다.

결국 컨슈머 안에서도 제약 항목이 필요해지고, 제약 항목이 있으면 큐가 할 일이 없어진다. 여기서 순환한다.
변경 스트림은 제약이 하나 더 있었다. 스트림은 **커밋된 뒤에** 흐른다. 이미 써진 걸 보고
되돌리는 건 예방이 아니라 보상이고, 그 보상이 "남의 데이터를 지우는 것"이 되면 원래 문제보다 나쁘다.

이건 과거에 락과 큐로 문제를 풀었던 경험이 오히려 방해가 된 경우였다. 그때는 순서가 문제였고
이번에는 일관성이 문제였는데, 겉으로는 닮아 보여서 같은 도구를 계속 만지작거렸다.

## 조건 검사와 쓰기를 합친다면?

그러면 조회를 없애고 쓰기 자체에 조건을 걸면 되지 않을까. DynamoDB에는 조건부 쓰기(Conditional Write)가 있고,
조건과 쓰기가 같은 원자 연산으로 평가되니 읽고 쓰는 사이의 틈이 아예 없다.  

다만, DynamoDB에서 조건은 쓰기 대상에 한해서만 가능하다.  
즉, 내가 지금 생성 또는 수정하려는 사용자(User)의 행에 대해서만 조건을 검사할 수 있다는 의미이다.  
이 말은 다른 사용자의 닉네임 중 내가 쓰려는 닉네임이 있는지 없는지를 조건으로 쓸 수 없다는 뜻이다.

## 결론은 닉네임을 키(pk)로 만든다

방법은 결국 원초적인 방법 하나로 좁혀졌다.  
닉네임을 키로 만들어 DB에 저장하는 것이다.  

이 방법이 계속 미뤄졌던 것은, 사용자의 닉네임을 사용자(User)와 닉네임(Nickname) 엔티티에서 분리해서 관리해야 하고,  
휴먼 에러가 발생하면 두 엔티티의 값 정합성이 맞지 않을 수 있기 때문이다.

아무튼, 이러면 락 없이도 중복 가능성을 완전히 배제할 수 있다. 조건부 쓰기 자체가 이미 원자적인
compare-and-swap이라, 락이 하던 일(직렬화)을 대신해주기 때문이다.  
다만, 하나 고려할 점은 DynamoDB는 Upsert가 기본이다.  
즉, 누군가 steve라는 닉네임으로 pk를 생성(insert)했더라도,  
다른 사람이 steve라는 닉네임으로 쓰면 update처럼 동작한다는 것이다.  

그렇기 때문에 여기서 아까 조건부 쓰기가 필요하다.  
pk에 steve라는 닉네임이 없을 때 저장.

```javascript
await client.send(new PutCommand({
  TableName: "AppTable",
  Item: {
    pk: `NICKNAME#${nickname}`,
    userId,
  },
  ConditionExpression: "attribute_not_exists(pk)", // pk(닉네임)가 없을 때만 저장
}));
```
 
<figure class="diagram-figure">
  <div class="diagram-box">
    <svg viewBox="0 0 400 254" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ah2" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <text x="0" y="18" class="diagram-row-label">이전 · 조회 검사</text>
      <rect x="0" y="30" width="140" height="50" rx="10" class="diagram-node-box" />
      <text x="70" y="52" class="diagram-node-text">조회</text>
      <text x="70" y="68" class="diagram-node-sub">보조 인덱스</text>
      <rect x="152" y="26" width="56" height="58" rx="8" class="diagram-gap" />
      <path d="M140,55 L216,55" class="diagram-arrow" marker-end="url(#ah2)" />
      <rect x="220" y="30" width="140" height="50" rx="10" class="diagram-node-box" />
      <text x="290" y="52" class="diagram-node-text">쓰기</text>
      <text x="290" y="68" class="diagram-node-sub">조건 없음</text>
      <text x="0" y="104" class="diagram-note">두 연산이 분리돼 있어 그 사이에 다른 요청이 끼어든다</text>
      <text x="0" y="146" class="diagram-row-label">이후 · 키 제약</text>
      <rect x="0" y="158" width="360" height="66" rx="12" class="diagram-outer" />
      <text x="180" y="176" class="diagram-node-sub">하나의 트랜잭션</text>
      <rect x="14" y="182" width="158" height="34" rx="8" class="diagram-node-box accent" />
      <text x="93" y="204" class="diagram-card-title">제약 항목 생성</text>
      <rect x="188" y="182" width="158" height="34" rx="8" class="diagram-node-box" />
      <text x="267" y="204" class="diagram-card-title">리소스 생성</text>
      <text x="0" y="246" class="diagram-note">제약 항목의 키가 곧 이름 — 이미 있으면 통째로 취소된다</text>
    </svg>
  </div>
  <figcaption class="diagram-caption">
    검사와 쓰기를 나눠 하던 것을, 쓰기 하나에 조건을 실어 보내는 것으로 바꿨다
  </figcaption>
</figure>

> 여기서 중요한 건 이 항목의 정렬 키(sk)에 리소스 ID를 넣지 않는 것이다. 넣는 순간 같은 이름으로 여러 항목이 공존할 수 있어  
> 유일성이 사라진다. **같은 이름이면 반드시 같은 키 하나**여야 이 패턴이 성립한다.  
> 대신 소유자 ID를 일반 속성으로 들고 있게 했다. 나중에 이게 중요해진다.

## 개선 후 테스트 결과

새 구조도 [\[정말 뚫리나?\]](#정말-뚫리나?)에서 썼던 것과 똑같은 방법으로 재현해봤다.  
같은 이름으로 요청을 겹쳐 보내고, 보조 인덱스가 아니라 원본 테이블을 강한 일관성 읽기로 훑어 직접 셌다.

<table>
  <thead>
    <tr><th>조건</th><th>결과</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>새 구조<br /><span class="text-muted">동시 3개</span></td>
      <td><strong>1개만 생성</strong> — 나머지 2개는 트랜잭션 취소</td>
    </tr>
    <tr>
      <td>새 구조<br /><span class="text-muted">연달아 2개 · 20회 반복</span></td>
      <td><strong>0회 뚫림</strong></td>
    </tr>
  </tbody>
</table>

동시 3개든 연달아 20회든 뚫린 적이 없었다. 조건부 쓰기가 보조 인덱스가 아니라 원본 테이블을 직접 보고
평가되기 때문에, 인덱스 전파를 기다릴 이유 자체가 없어진 결과다.

## 실측 결과: 중복 0건

기존 데이터에 제약 항목을 채우는 백필 스크립트를 만들면서, 이름별로 묶어 중복을 먼저 찾는 단계를 넣었다.
쓰기 전에 중단하기 위한 안전장치였는데, 결과적으로 **중복이 실제로 있었는지 처음 확인하는 수단**이 됐다.

개발 환경과 운영 환경에서 돌렸고 **0건**이었다. 운영 환경도 수백 개 항목 중 중복은 하나도 없었다.
같은 이름을 거의 같은 순간에 두 번 요청하는 일이 이 규모에서는 일어나지 않았던 것뿐이다.

## 🎪 실수 축제

여기까지가 생각한 전부였는데, 실제로 붙이기 시작하니 닉네임을 건드리는 경로마다 문제가 하나씩 튀어나왔다.
닉네임이 두 곳(User 엔티티와 Nickname 제약 엔티티)에 존재하게 되면서 **항상 같이 움직여야 하는 관계**가 생겼기 때문이다.

### 탈퇴 도중의 닉네임 변경

사용자 탈퇴는 사용자가 만든 하위 데이터를 전부 지운 뒤에야 User 항목 삭제에 도달한다.  
탈퇴 시작 시점에 읽어둔 닉네임을 들고 마지막에 Nickname 제약을 지우는데,  
그 사이 사용자가 닉네임을 바꾸면 이미 무효해진 옛 제약을 지우고
새 닉네임의 제약은 주인 없이 남는다. 그 닉네임은 아무도 못 쓰는 상태로 소각된다.

이걸 조건으로 감지하는 대신 예방하기로 했다. 탈퇴 시작 시점에 User 항목에 삭제 표시를 남기고
**그 뒤에** 닉네임을 읽는다. 표시가 있는 동안 닉네임 변경이 막히므로, 읽은 값은 탈퇴가 끝날 때까지 유효하다.
순서가 핵심이다. 닉네임을 먼저 읽고 표시를 남기면 그 사이에 변경이 끼어들 수 있다.

### 재시도가 남의 닉네임을 지운다

탈퇴를 멱등하게 만들다가 걸린 문제다. 트랜잭션은 원자성을 주지 멱등성을 주지 않는다. 두 번 실행하면 두 번 일어난다.

"steve"로 탈퇴가 성공한 뒤 다른 사용자가 "steve"를 가져갔고, 그 상태에서 **앞선 탈퇴 요청이 재시도**되면 어떻게 될까.
User 항목 삭제는 userId를 키로 쓰니 재실행해도 늘 자기 것을 가리킨다. 그런데 Nickname 제약 항목은
**"steve"라는 문자열이 키**다. 같은 닉네임의 새 주인이 생기면 재시도가 그 사람의 제약을 가리킨다.
지워버리면 그 사용자는 제약 없이 남고, "steve"는 또 중복될 수 있다.

키만으로는 "내가 지우려던 그 항목"인지 구분할 수 없다는 게 핵심이었다. 그래서 Nickname 항목에 넣어둔
`userId` 속성을 삭제 조건에 걸었다. "내 것이거나, 아예 없으면" 통과. "남의 것"이면 거절.

```javascript
await client.send(new DeleteCommand({
  TableName: "AppTable",
  Key: { pk: `NICKNAME#${nickname}` },
  ConditionExpression: "attribute_not_exists(userId) OR userId = :userId",
  ExpressionAttributeValues: { ":userId": userId },
}));
```

없어도 통과시키는 조건(`attribute_not_exists`) 덕분에 재시도의 멱등성도 같이 지켜졌다.

### 취소 사유를 구분해야 문구가 맞는다

트랜잭션에 조건부 항목이 둘 이상 들어가면서 새로 생긴 문제다. 취소 사유를 전체로 훑으면
**서로 다른 실패를 구분하지 못한다.**

가입 시점에 "닉네임 선점"과 "이미 가입 처리된 이메일인가"를 한 트랜잭션에서 함께 검사한다고 하자.
전체를 훑는 판정은 둘을 구분하지 못해서 이메일 중복을 "이미 사용 중인 닉네임입니다"로 안내할 수 있다.
사용자는 닉네임을 계속 바꿔가며 시도하게 되고, 전부 실패한다.

다행히 취소 사유는 **트랜잭션 항목과 같은 순서로** 돌아온다. 그래서 항목의 위치를 고정해두고
그 자리만 보게 했다. 0번 자리가 걸리면 닉네임 선점, 1번 자리가 걸리면 이메일 중복.

여기서 하나 더 나왔다. 정말 같은 순간에 요청이 겹치면 돌아오는 코드가 조건 위반이 아니라
`TransactionConflict`다. 조건을 평가하기도 전에 항목 수준에서 거절되기 때문이다.
이걸 닉네임 선점 충돌로 묶으면 쓸 수 있는 닉네임을 두고 다른 닉네임을 계속 시도하게 되고,
이메일 중복으로 묶으면 멀쩡한 계정을 이미 가입됐다고 안내하게 된다. 어느 쪽으로도 묶으면 안 되고,
일시적 상태이므로 "잠시 후 다시 시도" 쪽으로 따로 빼야 했다.
그래서 `NicknameTaken`, `EmailAlreadyUsed`와 별개로 `RetryableTransactionConflict` 같은
전용 에러 타입을 하나 더 만들어서, 호출부가 이 셋을 서로 다른 문구로 처리하게 했다.

### 테스트가 거짓으로 통과했다

조건부 쓰기와 트랜잭션은 Mock으로 검증할 수 없다. Mock은 "조건을 붙였다"까지만 알려주고 "조건이 막는다"는 못 본다.
그래서 실제 테이블을 상대로 동시 요청을 재현하는 스크립트를 만들었다. 시나리오 하나가 이거였다.

> 같은 대상을 동시에 두 번 삭제 → 둘 다 성공해야 한다(멱등)

통과했다. 그런데 나중에 별도 스크립트를 돌리다가 그 테스트가 만든 데이터가 테이블에 그대로 남아 있는 걸 발견했다.
**아무것도 지워지지 않은 실행에서 통과가 찍혀 있었다.**

원인은 단언 방식이었다. 거절 사유가 예상 범위 안인지만 검사하고, 실제로 지워졌는지는 보지 않았다.
완전히 동시에 치면 DynamoDB가 **양쪽 다** 거절할 수 있다. 조건 평가 전 단계라 승자 개념이 없기 때문이다.
그러면 삭제는 0건인데 거절 사유는 전부 "예상 범위"라 조건을 만족해버린다.

얼마나 자주 그러는지 세어봤다.

<table>
  <thead>
    <tr><th>동시 삭제 20회</th><th>횟수</th></tr>
  </thead>
  <tbody>
    <tr><td>둘 다 성공 (직렬화됨)</td><td>6</td></tr>
    <tr><td>한쪽만 거절</td><td>12</td></tr>
    <tr><td><strong>양쪽 다 거절 → 삭제 0건</strong></td><td><strong>2</strong></td></tr>
  </tbody>
</table>

10%다. 열 번에 한 번은 거짓 통과가 나오고, 그때마다 데이터가 남는다. 남은 데이터는 실제 데이터와 구분되지 않아서
이후에 돌린 집계 스크립트가 그걸 실제 건수로 세기까지 했다.

규칙을 하나 세워서 모든 시나리오를 다시 썼다. **에러 종류가 아니라 최종 상태를 단언한다.**
일시적 거절을 허용하려면 호출자처럼 재시도한 뒤 결과를 확인하는 데까지 가야 하는 것으로 봤다.
정리 단계도 같은 규칙을 적용해서, 지운 뒤 실제로 사라졌는지 확인하고 남으면 종료 코드로 알리게 했다.
"통과했다"와 "깨끗하다"를 따로 보고하게 만든 셈이다.

판정 순서를 일부러 어긋나게 하고 돌려보는 것도 해봤다. 취소 사유를 위치로 판정하는데 그 위치를 하나 옮기면
실패해야 정상이다. 그런데 나머지 시나리오가 전부 통과했다. 그 위치를 검증하는 시나리오가 없었다는 뜻이라
하나 추가했다.

## 돌아보며

그러니까 이번 작업은 관측된 사고를 수습한 게 아니라 예방이다. 그걸 알고 나니 되짚어볼 게 생겼다.
복잡도의 상당 부분은 유일성 자체가 아니라 **그 주변**에서 왔다. 삭제 표시, 위치 기반 판정, 전용 에러 타입 같은 것들이다.
확률이 낮은 사고에는 방어도 싸야 하는데, 내가 붙인 방어는 비싼 편이었다.

유일성 제약 자체는 과하지 않았다고 본다. 보험료가 쌌기 때문이다.
제약 항목과 트랜잭션은 한 번 짜면 끝이고, 막으려던 사고는 조용하고 되돌리기 어려운 종류였다.
**확률이 낮아도 조용히 실패하는 것에는 값을 치를 만하다.**
다만 그 판단을 **재확인하고 나서** 했어야 했다. 예방을 먼저 다 쌓고 나중에 0건인 걸 확인하는 순서는 거꾸로였다.

## 정리

- 키가 아닌 값의 유일성은 **그 값을 키로 가진 항목**을 만들어야 강제된다. 인덱스는 유일성을 보장하지 않는다.
- 락·큐·스트림은 **순서**를 주는 도구다. 인덱스 전파 지연은 순서 문제가 아니라 일관성 문제라서 이 도구들로는 풀리지 않는다.
- 트랜잭션은 원자성을 주지 **멱등성**을 주지 않는다. 재시도가 같은 키를 다시 겨냥할 때, 그 키가 재사용 가능한 값이라면 남의 것을 가리킬 수 있다.
- 동시성 테스트는 에러 종류가 아니라 **최종 상태**를 단언해야 한다. 경합에서는 모두 실패하는 경우가 있고, 그때도 사유는 "예상 범위"다.
- **재현율과 발생 건수는 다른 숫자다.** 열 번에 한 번 뚫려도 그 조건이 만들어지지 않으면 발생은 0건이다. 방어 수준은 둘을 구분해서 정해야 한다.
- 예방을 쌓기 전에 **실제로 몇 건인지 먼저 재는 게** 순서다.
