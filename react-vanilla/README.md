# Vaillna React 시작

## 1. `index.html`

### 1.1. index.html 생성

```html
<html>
    <body>
        <div id="app"></div>
        <script type="text/javascript"></script>
    </body>
</html>
```

### 1.2. React 스크립트 로드

-   `react`는 React의 핵심 라이브러리
-   `react-dom`은 React를 DOM과 함께 사용할 수 있도록 하는 DOM 관련 메서드 제공

```html
<html>
    <body>
        <div id="app"></div>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script type="text/javascript"></script>
    </body>
</html>
```

### 1.3. `ReactDOM.CreateRoot()` 와 `root.render()` 추가

`ReactDOM.CreateRoot()`는 특정 DOM 요소를 타겟팅하고 React 구성 요소를 표시할 루트를 만드는 방법

`root.render()`은 React 코드를 DOM에 렌더링하는 방법

```html
<html>
    <body>
        <div id="app"></div>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script type="text/javascript">
            const app = document.getElementById("app");
            const root = ReactDOM.createRoot(app);
            root.render(<h1>Hello World!</h1>);
        </script>
    </body>
</html>
```

### 1.4. Babel 추가

```html
<html>
    <body>
        <div id="app"></div>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script type="text/jsx">
            const app = document.getElementById("app");
            const root = ReactDOM.createRoot(app);
            root.render(<h1>Hello World!</h1>);
        </script>
    </body>
</html>
```
