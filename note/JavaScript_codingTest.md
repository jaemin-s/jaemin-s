# 자바스크립트 코딩테스트

## 목차

-   [1. 알고리즘 및 함수](#알고리즘-및-함수)

    -   [1.1. 수학](#수학)

    -   최대공약수 (GCD)
    -   최소공배수 (LCM)
    -   소수 판별
    -   수인수분해
    -   팩토리얼
    -   순열과 조합
    -   피보나치 수열

    -   [1.2. 문자열](#문자열)

    -   문자열 역순
    -   문자열 파싱
    -   정규표현식
    -   회문(팰린드롬) 확인

    -   [1.3. 배열](#배열)

    -   정렬 (sort)
    -   필터링 (filter)
    -   매핑 (map)
    -   리듀스 (reduce)
    -   배열 평탄화 (flat)
    -   중복 제거
    -   최대/최소값 찾기

    -   [1.4. 자료구조](#자료구조)

    -   스택
    -   큐
    -   해시맵/해시테이블
    -   링크드리스트
    -   트리
    -   그래프
    -   힙

    -   [1.5. 탐색/정렬](#탐색정렬)

    -   이진 탐색
    -   깊이 우선 탐색 (DFS)
    -   너비 우선 탐색 (BFS)
    -   버블 정렬
    -   선택 정렬
    -   삽입 정렬
    -   퀵 정렬
    -   병합 정렬

    -   [1.6. 기타 유용한 매서드](#기타-유용한-메서드)

    -   Math 객체 메서드 (ceil, floor, round, abs 등)
    -   Array 메서드 (slice, splice, concat 등)
    -   String 메서드 (split, substring, replace 등)
    -   Set, Map 자료구조
    -   Object 메서드 (keys, values, entries)

    -   [1.7. 알고리즘 패턴](#알고리즘-패턴)

    -   투 포인터
    -   슬라이딩 윈도우
    -   그리디
    -   다이나믹 프로그래밍
    -   백트래킹

-   [2. 문제](#문제)

## 1. 알고리즘 및 함수

### 1.1. 수학

#### 1.1.1. 최대공약수 (GCD)

-   설명: 두 수의 공통된 약수 중 가장 큰 수
-   방법: 유클리드 호제법 사용
    -   a를 b로 나눈 나머지를 r이라고 했을 때, GCD(a, b) = GCD(b, r)
    -   r이 0이면 그때 b가 최대공약수

```javascript
// 재귀를 이용한 방법
function getGCD(a, b) {
    return b === 0 ? a : getGCD(b, a % b);
}

// 반복문을 이용한 방법
function getGCD(a, b) {
    while (b !== 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

// 사용 예시
console.log(getGCD(12, 18)); // 6
console.log(getGCD(60, 48)); // 12
```

-   최소공배수 (LCM)
-   소수 판별
-   수인수분해
-   팩토리얼
-   순열과 조합
-   피보나치 수열

### 문자열

-   문자열 역순
-   문자열 파싱
-   정규표현식
-   회문(팰린드롬) 확인

### 1.3. 배열

-   정렬 (sort)
-   필터링 (filter)
-   매핑 (map)
-   리듀스 (reduce)
-   배열 평탄화 (flat)
-   중복 제거
-   최대/최소값 찾기

#### 1.3.7. 최빈값

-   설명: 주어진 배열에서 가장 자주 등장하는 값을 찾는 방법
-   방법:
    1. 객체를 사용하여 각 요소의 등장 횟수를 카운트
    2. Map을 사용하여 카운트

```javascript
// 1. 객체를 사용한 방법
function getMode(arr) {
    const counter = {};
    let maxCount = 0;
    let modes = [];

    // 각 요소의 등장 횟수를 카운트
    arr.forEach((num) => {
        counter[num] = (counter[num] || 0) + 1;
        if (counter[num] > maxCount) {
            maxCount = counter[num];
        }
    });

    // 최빈값 찾기
    for (let num in counter) {
        if (counter[num] === maxCount) {
            modes.push(Number(num));
        }
    }

    return modes;
}

// 2. Map을 사용한 방법
function getModeWithMap(arr) {
    const counter = new Map();
    let maxCount = 0;

    // 카운트
    arr.forEach((num) => {
        const count = (counter.get(num) || 0) + 1;
        counter.set(num, count);
        maxCount = Math.max(maxCount, count);
    });

    // 최빈값 찾기
    return [...counter]
        .filter(([num, count]) => count === maxCount)
        .map(([num]) => num);
}

// 사용 예시
const numbers = [1, 2, 3, 3, 2, 2, 4, 5];
console.log(getMode(numbers)); // [2]
console.log(getModeWithMap(numbers)); // [2]

// 최빈값이 여러 개인 경우
const numbers2 = [1, 1, 2, 2, 3];
console.log(getMode(numbers2)); // [1, 2]
```

### 자료구조

-   스택
-   큐
-   해시맵/해시테이블
-   링크드리스트
-   트리
-   그래프
-   힙

### 탐색/정렬

-   이진 탐색
-   깊이 우선 탐색 (DFS)
-   너비 우선 탐색 (BFS)
-   버블 정렬
-   선택 정렬
-   삽입 정렬
-   퀵 정렬
-   병합 정렬

### 1.6. 기타 유용한 메서드

-   Math 객체 메서드 (ceil, floor, round, abs 등)

#### 1.6.1. Math.abs()

-   설명: 주어진 숫자의 절대값을 반환
-   특징:
    -   음수를 양수로 변환
    -   양수는 그대로 반환
    -   0은 0 반환
    -   문자형 숫자도 자동 형변환

```javascript
// 기본 사용
console.log(Math.abs(-5)); // 5
console.log(Math.abs(5)); // 5
console.log(Math.abs(0)); // 0

// 문자형 숫자
console.log(Math.abs("-3")); // 3
```

-   Array 메서드 (slice, splice, concat 등)
-   String 메서드 (split, substring, replace 등)
-   Set, Map 자료구조
-   Object 메서드 (keys, values, entries)

### 알고리즘 패턴

-   투 포인터
-   슬라이딩 윈도우
-   그리디
-   다이나믹 프로그래밍
-   백트래킹

## 문제
