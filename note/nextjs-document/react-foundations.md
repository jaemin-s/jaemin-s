# React Foundations

## 목차

-   [1. React와 Next.js](#react와-nextjs)
-   [2. 사용자 인터페이스(UI) 렌더링](#사용자-인터페이스ui-렌더링)
-   [3. Javascript로 UI 업데이트](#javascript로-ui-업데이트)
-   [4. React 시작하기](#react-시작하기)

## React와 Next.js

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

## 사용자 인터페이스(UI) 렌더링

### 브라우저가 코드를 해석하여 UI를 렌더링하는 방식

사용자가 웹 페이지를 방문하면 서버가 `HTML` 파일을 브라우저에 반환
-> 브라우저는 `HTML`을 읽고 `문서 개체 모델(DOM)`을 구성

### DOM이란

`DOM`은 `HTML`요소의 **객체** 표현

코드와 사용자 인터페이스 사이의 다리 역할을 하며 **부모와 자식 관계가 있는 트리**와 같은 구조를 가짐

## Javascript로 UI 업데이트

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

## React 시작하기

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
    3. camelCase로 표현
