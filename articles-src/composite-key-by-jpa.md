---
title: JPA와 복합키: @IdClass, @EmbeddedId, @MapsId 선택 기준
date: 2025-03-28
badge: Updated 2026-10-10
---

JPA에서 복합키를 표현하는 방법은 `@IdClass`와 `@EmbeddedId` 두 가지다. 둘 다 같은 테이블을 매핑할 수 있지만, 엔티티에서 식별자를 어떻게 다루고 연관관계를 어디에 둘지에 따라 코드의 모양과 의미가 달라진다.

이 글의 결론부터 말하면 다음과 같다.

- 복합키가 단순히 엔티티를 식별하기 위한 컬럼 묶음이고 연관 엔티티를 직접 다루는 것이 중요하다면 `@IdClass`가 편하다.
- 복합키 자체가 하나의 의미 있는 값 객체이고 코드의 여러 곳에서 통째로 전달·비교된다면 `@EmbeddedId`가 자연스럽다.
- `@EmbeddedId`가 다른 엔티티의 키를 포함한다면, 키 클래스에는 식별자 값만 두고 엔티티에는 `@MapsId`로 연관관계를 매핑하는 방식이 이식성 있는 JPA 표준이다.

## 왜 `@Id`를 두 번 붙이는 것만으로는 부족한가

복합 기본키에는 키 전체를 나타내는 별도 클래스가 필요하다. JPA는 이 클래스를 통해 영속성 컨텍스트 안에서 엔티티의 동일성을 판단하고, `find` 같은 API에 전달할 식별자 타입을 정한다.

키 클래스에는 일반적으로 다음 조건이 필요하다.

- 키 필드 이름과 타입이 엔티티 매핑과 일치해야 한다.
- 기본 생성자를 제공해야 한다. Jakarta Persistence 3.2부터는 record도 사용할 수 있다.
- 데이터베이스의 값 동등성과 일치하는 `equals`와 `hashCode`를 구현해야 한다.
- Jakarta Persistence 3.1 이하를 사용한다면 `Serializable`을 구현해야 한다. 3.2에서는 이 요구사항이 제거됐다.

## `@IdClass`: 키 필드를 엔티티에 펼쳐 놓기

식당에 좋아요를 누른 회원을 `(restaurant_id, member_id)`로 식별한다고 해보자.

```java
@Entity
@IdClass(RestaurantLikeId.class)
public class RestaurantLike {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
```

```java
public class RestaurantLikeId implements Serializable {

    private Long restaurant;
    private Long member;

    protected RestaurantLikeId() {
    }

    // equals, hashCode
}
```

여기서 `RestaurantLikeId`의 필드 타입은 `Restaurant`, `Member`가 아니라 각 대상 엔티티의 기본키 타입인 `Long`이다. 필드 이름은 엔티티의 `@Id` 속성 이름인 `restaurant`, `member`와 맞춘다.

이 방식은 엔티티에서 `like.getRestaurant()`처럼 연관관계를 바로 탐색할 수 있고, 조인 엔티티의 구조도 한눈에 보인다. 반면 키 값이 엔티티와 키 클래스 양쪽에 형태상 반복된다.

## `@EmbeddedId`: 식별자를 하나의 값으로 묶기

복합키 자체가 도메인에서 의미 있는 식별자라면 `@EmbeddedId`로 한 덩어리로 표현할 수 있다.

```java
@Embeddable
public class RestaurantLikeId implements Serializable {

    @Column(name = "restaurant_id")
    private Long restaurantId;

    @Column(name = "member_id")
    private Long memberId;

    protected RestaurantLikeId() {
    }

    // equals, hashCode
}
```

```java
@Entity
public class RestaurantLike {

    @EmbeddedId
    private RestaurantLikeId id;

    @MapsId("restaurantId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @MapsId("memberId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
```

`@MapsId("restaurantId")`는 `restaurant` 연관관계가 `id.restaurantId` 컬럼 매핑을 제공한다는 뜻이다. 따라서 같은 컬럼을 식별자와 연관관계가 따로 관리하지 않고 하나로 연결한다.

### 왜 키 클래스 안에 엔티티를 직접 넣지 않는가

Hibernate는 다음처럼 `@EmbeddedId` 안에 `@ManyToOne`을 넣은 매핑도 지원한다.

```java
@Embeddable
public class RestaurantLikeId {
    @ManyToOne
    private Restaurant restaurant;

    @ManyToOne
    private Member member;
}
```

그래서 기존 코드가 실행됐다고 해서 이상한 것은 아니다. 다만 이는 Hibernate가 제공하는 확장에 기대는 방식이다. Jakarta Persistence 명세는 embedded id 안의 연관관계 매핑을 지원하지 않는다고 명시한다. Hibernate 외의 JPA 구현체까지 고려한 이식성 있는 매핑은 식별자 값과 연관관계를 분리하고 `@MapsId`로 연결하는 형태다.

## JPQL과 Repository 메서드의 차이

`@IdClass`는 키 속성이 엔티티에 직접 노출된다.

```java
select l from RestaurantLike l
where l.restaurant.id = :restaurantId
  and l.member.id = :memberId
```

`@EmbeddedId`는 키 값에 접근할 때 `id`를 한 단계 거친다.

```java
select l from RestaurantLike l
where l.id.restaurantId = :restaurantId
  and l.id.memberId = :memberId
```

반대로 전체 식별자를 전달하거나 비교하는 코드에서는 `@EmbeddedId`가 더 명확하다.

```java
RestaurantLikeId id = new RestaurantLikeId(restaurantId, memberId);
restaurantLikeRepository.findById(id);
```

즉 쿼리 경로가 짧다는 이유만으로 한쪽을 선택하기보다는, 애플리케이션이 개별 연관관계와 식별자 값 객체 중 무엇을 중심으로 다루는지를 보는 편이 낫다.

## `Serializable`은 JSON 직렬화와 다른 문제다

복합키 클래스의 `Serializable`은 REST 응답을 JSON으로 바꾸는 Jackson 직렬화와 관계없다. 과거 JPA 명세가 영속성 식별자를 JVM 경계나 캐시 등의 환경에서도 표현할 수 있도록 요구한 Java 직렬화 계약이다.

또한 **모든 엔티티가 `Serializable`이어야 하는 것은 아니다.** Jakarta Persistence 3.1 이하에서는 복합 기본키 클래스가 `Serializable`이어야 했고, Jakarta Persistence 3.2부터는 기본키 클래스의 `Serializable` 요구사항 자체가 제거됐다.

따라서 사용하는 JPA 버전을 확인해야 한다. Spring Boot와 Hibernate 조합이 아직 Jakarta Persistence 3.1 이하라면 키 클래스에 `implements Serializable`을 두는 것이 표준에 맞고 가장 안전하다. JSON으로 반환하지 않는다는 이유로 제거할 성격의 코드는 아니다.

## 선택 기준

| 상황 | 권장 방식 |
| --- | --- |
| 조인 엔티티이며 각 연관 엔티티를 직접 탐색하는 일이 많다 | `@IdClass` |
| 키 필드를 엔티티 최상위에서 명시적으로 보고 싶다 | `@IdClass` |
| 복합키가 도메인에서 하나의 의미 있는 값 객체다 | `@EmbeddedId` |
| 키 전체를 메서드 인자나 조회 조건으로 자주 전달한다 | `@EmbeddedId` |
| `@EmbeddedId`가 다른 엔티티의 키를 포함한다 | 값 필드 + `@MapsId` |

기존의 모든 `@EmbeddedId`를 일괄적으로 `@IdClass`로 바꿀 필요는 없다. 먼저 각 복합키가 단순한 테이블 식별 수단인지, 독립적인 의미를 가진 값 객체인지 구분해야 한다. 전자라면 `@IdClass`가 더 단순할 수 있고, 후자라면 `@EmbeddedId`를 유지하면서 표준적인 `@MapsId` 매핑으로 정리하는 편이 의도를 잘 드러낸다.

## 참고

- [Jakarta Persistence 3.2 Specification](https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2)
- [Jakarta Persistence 3.2 변경 사항](https://jakarta.ee/specifications/persistence/3.2/)

