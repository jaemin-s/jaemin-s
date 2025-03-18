# React Foundations

## 목차

-   [1. React와 Next.js](#1-react와-nextjs)
    -   [React란](#react란)
    -   [Next.js란](#nextjs란)
-   [2. 사용자 인터페이스(UI) 렌더링](#2-사용자-인터페이스ui-렌더링)
    -   [브라우저의 UI 렌더링 방식](#브라우저가-코드를-해석하여-ui를-렌더링하는-방식)
    -   [DOM이란](#dom이란)
-   [3. Javascript로 UI 업데이트](#3-javascript로-ui-업데이트)
-   [4. React 시작하기](#4-react-시작하기)
-   [5. 컴포넌트를 사용한 UI 구축](#5-컴포넌트를-사용한-ui-구축)
-   [6. Props를 사용하여 데이터 표시](#6-props를-사용하여-데이터-표시)
-   [7. State에 대한 상호 작용 추가](#7-state에-대한-상호-작용-추가)
-   [8. Next.js 설치](#8-nextjs-설치)
-   [9. 서버 및 클라이언트 구성 요소](#9-서버-및-클라이언트-구성-요소)

## 1. React와 Next.js

### 웹 애플리케이션의 빌딩 블록

**현대적 애플리케이션**을 구축할 때 고려해야 할 사항

-   `사용자 인터페이스` : 사용자가 애플리케이션을 사용하고 상호작용하는 방식
-   `라우팅` : 사용자가 애플리케이션의 여러 부분을 탐색하는 방식
-   `데이터 가져오기` : 데이터가 어디에 있는지, 그리고 어떻게 가져오는지
-   `렌더링` : 정적 또는 동적 콘텐츠를 언제, 어디서 렌더링하는지
-   `통합` : 어떤 타사 서비스를 사용하는지와 이러한 서비스에 어떻게 연결하는지(인증, 결제 등)
-   `인프라` : 애플리케이션 코드를 배포, 저장, 실행하는 위치(서버리스, CDN 등)
-   `성능` : 최종 사용자를 위해 애플리케이션을 최적화하는 방법
-   `확장성` : 팀, 데이터, 트래픽이 증가함에 따라 애플리케이션이 어떻게 적응하는지
-   `개발자 경험` : 애플리케이션을 구축하고 유지 관리하는 팀의 경험

### React란

`대화형 사용자 인터페이스`를 구축하기 위한 `JavaScript 라이브러리`

`사용자 인터페이스`(UI)란 사용자가 화면에서 보고 상호작용하는 요소를 의미

`라이브러리`란 React가 UI를 구축하는 데 유용한 **함수(API)를 제공**하지만, 해당 함수를 애플리케이션에서 어디에서 사용할지는 개발자에게 맡긴다는 것을 의미

### Next.js란

Next.js는 풀 스택 `웹 애플리케이션`을 만드는 데 필요한 기본 요소를 제공하는 `리액트 프레임워크`

`프레임워크`란 Next.js가 React에 필요한 **도구와 구성**을 처리하고 애플리케이션에 대한 추가적인 **구조, 기능 및 최적화를 제공**한다는 것을 의미

## 2. 사용자 인터페이스(UI) 렌더링

### 브라우저가 코드를 해석하여 UI를 렌더링하는 방식

사용자가 웹 페이지를 방문하면 서버가 `HTML` 파일을 브라우저에 반환
-> 브라우저는 `HTML`을 읽고 `문서 개체 모델(DOM)`을 구성

### DOM이란

`DOM`은 `HTML`요소의 **객체** 표현

코드와 사용자 인터페이스 사이의 다리 역할을 하며 **부모와 자식 관계가 있는 트리**와 같은 구조를 가짐

## 3. Javascript로 UI 업데이트

```html
<html>
    <body>
        <div id="app"></div>
        <script type="text/javascript">
            // Select the div element with 'app' id
            const app = document.getElementById("app");

            // Create a new H1 element
            const header = document.createElement("h1");

            // Create a new text node for the H1 element
            const text = "Develop. Preview. Ship.";
            const headerContent = document.createTextNode(text);

            // Append the text to the H1 element
            header.appendChild(headerContent);

            // Place the H1 element inside the div
            app.appendChild(header);
        </script>
    </body>
</html>
```

### HTML vs DOM

**브라우저 개발자 도구** 내부의 `DOM`요소를 살펴보면 `DOM`에는 `HTML`파일에는 없는 `<h1>`요소가 포함되어 있음

```html
<html>
    <head></head>
    <body>
        <div id="app">
            <h1>Develop. Preview. Ship.</h1>
        </div>
        <script type="text/javascript">
            ...
        </script>
    </body>
</html>
```

`HTML`은 **초기 페이지 내용**을 나타내는 반면

`DOM`은 사용자가 작성한 JavaScript 코드에 의해 **업데이트된 페이지 내용**을 나타내기 때문

**하지만** `<h1>`요소 하나를 위한 코드가 너무 장황함

### 명령형 프로그래밍 vs 선언형 프로그래밍

`명령형 프로그래밍`은 **사용자 인터페이스를 업데이트하는 방법**에 대한 단계를 작성 (위의 코드가 예시)

`선언형 프로그래밍`은 **원하는 결과를 직접 선언**하여 프로그램의 상태를 표현하는 방식

## 4. React 시작하기

```html
<html>
    <body>
        <div id="app"></div>
        <script type="text/javascript"></script>
    </body>
</html>
```

### 1. React 스크립트 로드

-   `react`는 React의 핵심 라이브러리
-   `react-dom`은 React를 DOM과 함께 사용할 수 있도록 하는 DOM 관련 메서드 제공

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

### 2. `ReactDOM.CreateRoot()` 와 `root.render()` 추가

-   `ReactDOM.CreateRoot()`는 특정 DOM 요소를 타겟팅하고 React 구성 요소를 표시할 루트를 만드는 방법
-   `root.render()`은 React 코드를 DOM에 렌더링하는 방법

```html
<script type="text/javascript">
    const app = document.getElementById("app");
    const root = ReactDOM.createRoot(app);
    root.render(<h1>Hello World!</h1>);
</script>
```

### 3. Babel 추가

브라우저에게 `JSX`를 이해시키기 위한 JavaScript **컴파일러**. `JSX` -> `JavaScript` 변환

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/jsx">
    ...
</script>
```

### JSX란

-   **HTML과 유사한 구문**으로 UI르 설명하는 **JavaScript 구문 확장**
-   세 가지 JSX 외에는 HTML과 JavaScript의 기호와 구문을 따름
    1. 여러 요소를 반환하려면 **단일 부모 태그**로 요소를 래핑해야함
    2. 모든 태그를 닫아야함
    3. **camelCase**로 표현

## 5. 컴포넌트를 사용한 UI 구축

### React 핵심 개념

-   `Components` (구성요소)
-   `Props`
-   `State`

### Components

-   `UI`는 `Components`라는 작은 구성 요소로 나눌 수 있음
-   `Components`를 사용하면 **LEGO 블록** 처럼 재사용 가능한 코드을 결합하여 더 큰 구조를 형성할 수 있음
-   나머지 애플리케이션에 영향을 주지 않고 구성 요소를 추가, 업데이트, 삭제할 수 있음 -> **유지 관리 용이**

### Components 생성

-   `Components`는 `UI` 요소를 반환하는 함수. **반환 문 내부에서** `JSX` 작성할 수 있음.
-   `React Components`는 일반 `HTML` 및 `JavaScript`와 구별하기 위해 **대문자로 시작해야함**
-   `React Components`는 일반 `HTML 태그`처럼 `<>`를 사용하여 사용함
-   일반 `HTML` 요소처럼 `React Components`를 **서로 중첩 할 수 있음** -> **Components tree**

```javascript
function Header() {
    return;
    <h1>Develop. Preview. Ship.</h1>;
}
function HomePage() {
    return (
        <div>
            <Header />
        </div>
    );
}
const root = ReactDOM.createRoot(app);
root.render(<HomePage />);
```

## 6. Props를 사용하여 데이터 표시

`Props` : 아래와 같은 상황에서 Components에 **정보 전달을 위해 사용하는 속성**

-   서로 다른 텍스트(value)를 전달하고 싶을 때
-   외부 데이터(API)를 받아서 쓰기 때문에 미리 값을 알 수 없을 때

### props 사용

`HTML 속성`처럼 `props` 전달 가능.

**부모 -> 자식으로 단방향 전달**

```javascript
function HomePage() {
    return (
        <div>
            <Header title="React" />
        </div>
    );
}
```

`Header(자식)`에서는 **첫번째 함수 매개변수**로 `props` 접근 가능

```javascript
function Header(props) {
    return <h1>Develop. Preview. Ship.</h1>;
}
```

`props`는 **객체**이므로 `구조 분해 할당`을 사용할 수 있음

```javascript
function Header({ title }) {
    return <h1>Develop. Preview. Ship.</h1>;
}
```

### JSX에서 변수 사용

`{}`를 이용하여 **JSX 마크업 내부**에서 일반 **JavaScript 직접 작성** 가능

```javascript
function Header({ title }) {
    return <h1>{title}</h1>;
}
```

`중괄호` 안에서 모든 `JavaScript 표현식`을 추가할 수 있음

1. 점 표기법을 사용한 객체 속성

```javascript
function Header(props) {
    return <h1>{props.title}</h1>;
}
```

2. 템플릿 리터럴

```javascript
function Header({ title }) {
    return <h1>{`Cool ${title}`}</h1>;
}
```

3. 함수의 반환 값

```javascript
function createTitle(title) {
    if (title) {
        return title;
    } else {
        return "Default title";
    }
}

function Header({ title }) {
    return <h1>{createTitle(title)}</h1>;
}
```

4. 삼항 연산자

```javascript
function Header({ title }) {
    return <h1>{title ? title : "Default Title"}</h1>;
}
```

### 리스트 반복하기

목록으로 표시해야하는 데이터가 있는 경우, `배열 메서드`를 사용하여 데이터를 조작하고 **스타일은 동일하지만 다른 정보를 보유한 UI 요소**를 생성할 수 있음

```javascript
function HomePage() {
    const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

    return (
        <div>
            <Header title="Develop. Preview. Ship." />
            <ul>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </div>
    );
}
```

-   `array.map()`을 사용하여 배열을 반복
-   **화살표 함수**를 사용하여 이름을 목록 항목에 매핑
-   항목을 식별하기 위한 `key` props 추가 -> 고유성이 보장된 값을 사용해야함

## 7. State에 대한 상호 작용 추가

### 이벤트 청취

-   클릭 시 동작을 위해 `onClick`을 사용

> 리액트에서 이벤트 이름은 camelCased로 `on+이벤트` 형태 (ex. onChange, onSubmit)

```javascript
function HomePage() {
  // ...
  return (
    <div>
      {/* ... */}
      <button onClick={}>Like</button>
    </div>
  );
}
```

### 이벤트 처리

-   이벤트가 트리거될 때마다 이벤트를 처리(handle)하는 함수를 정의

> `handle+이벤트` 형태로 많이 사용

```javascript
function HomePage() {
    // 	...
    function handleClick() {
        console.log("increment like count");
    }

    return (
        <div>
            {/* ... */}
            <button onClick={handleClick}>Like</button>
        </div>
    );
}
```

### State 및 Hooks

`hooks`는 react의 함수 세트로서 컴포넌트에 `state`와 같은 로직을 추가 할 수 있음

`state`는 사용자 상호 작용에 의해 트리거되는 UI의 모든 정보

### useState

React에서 `state`를 관리하는 대표적인 `hooks`

1. `useState()`는 배열을 반환. 첫번째 항목은 상태의 `value`, 두번째 항목은 상태를 `update`하는 함수

> 항목의 이름 지정에 조건은 없지만 일반적으로 `상태 변수`는 **설명적인 이름**, `업데이트 함수`는 **set+상태 변수 이름**

2. 상태의 초기 값 추가 가능. **미지정 시 `null`**

3. `components`에서 `상태 업데이트 함수` 호출

```javascript
function HomePage() {
    // ...
    const [likes, setLikes] = React.useState(0);

    function handleClick() {
        setLikes(likes + 1);
    }

    return (
        <div>
            {/* ... */}
            <button onClick={handleClick}>Likes ({likes})</button>
        </div>
    );
}
```

## 8. Next.js 설치

Next.js를 사용하면 프로젝트에서 `react` 와 `react-dom`을 로드할 필요 없음

대신 `npm`을 사용하여 이러한 패키지를 설치 할 수 있음

1. 우선 `index.html`과 같은 디렉토리에 `package.json`파일을 만들고 빈 객체 작성 `{}`

```json
//package.json
{}
```

2. 터미널을 사용하여 프로젝트의 루트 경로에서 커맨드 입력

```
npm install react@latest react-dom@latest next@latest
```

## 9. 서버 및 클라이언트 구성 요소
