# Vite + React + TypeScript

[https://vite.dev/guide/](URL)

### 1. 프로젝트 생성

```
//TypeScript 템플릿으로 Vite 프로젝트 생성
yarn create vite . --template react-ts

//의존성 설치 및 실행
yarn
yarn dev
```

### 2. Tailwind CSS

1. Install Tailwind CSS

```
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

2. Configure template paths

```
//tailwind.config.js
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]
```

3. Add the Tailwind directives to CSS

```
//index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
