# Next.js로 대시보드 만들기

## 프로젝트 시작

### 프로젝트 생성

`pnpm` 설치(선택) : `npm`과 `yarn`보다 빠르고 효과적인 패키지 매니저

```
npm install -g pnpm
```

Next.js 앱 생성, starter-example 템플릿 사용

```
npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
```

### 폴더 구조

```
/app
    /lib
    /ui
/public
/next.config.ts
...
```

-   `/app` : 애플리케이션이 필요한 경로, 구성 요소, 로직 등이 모두 포함된 폴더. 주 작업 영역
-   `/app/lib` : 데이터 가져오기, 유틸리티 함수 등 재사용 가능한 함수들이 포함된 폴더
-   `/app/ui` : 카드, 테이블 등 애플리케이션의 모든 UI 구성 요소.
-   `/public` : 이미지 같은 정적 자산
-   **Config Files** : `next.config.ts`을 비롯한 구성파일들. 템플릿을 사용했기 때문에 수정 필요 없음

### Placeholder data

UI 구성 단계에서 database나 API가 없다면 placeholder data를 사용하면 도움이 됨

-   JSON이나 JavaScript objects 형태
-   `mockAPI`과 같은 3rd party service

지금은 `app/lib/placeholder-data.ts`에 JavaScript object형태로 사전구성됨

### TypeScript

`/app/lib/definitions.ts`를 살펴보면 데이터베이스에서 반환될 유형을 수동으로 선언함.

```typescript
export type Invoice = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: "pending" | "paid";
};
```

TypeScript를 사용하면 잘못된 데이터 형식을 전달하는 일을 방지할 수 있음

> 여기서는 수동으로 유형을 선언하지만 데이터베이스 스키마에 따라 자동 생성하는 `Prisma` 또는 `Drizzle` 사용을 권장

### 개발 서버 실행

프로젝트의 패키지를 설치하기 위해 `pnpm i`를 실행

```
pnpm i
```

`pnpm dev`로 개발서버 실행

```
pnpm dev
```

`http://localhost:3000`을 브라우저에 입력해서 확인

## CSS 스타일링

### 전역 스타일링

`/app/layout.tsx`에 `global.css`를 추가하여 애플리케이션 전역적으로 사용할 스타일 적용

```
import '@/app/ui/global.css';
```

### tailwind

유틸리티 클래스를 빠르게 작성할 수 있도록 하여 개발 프로세스를 가속화하는 **CSS 프레임워크**

클래스 이름을 추하가여 요소의 스타일을 지정

```
<h1 className="text-blue-500">I'm blue!</h1>
```

### CSS module

기존 CSS 방식이나 JSX와 스타일을 별도로 유지하는 것을 선호할 때 사용

`home.module.css`를 만들고

```
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

tsx에 추가하여 적용

```
import styles from '@/app/ui/home.module.css';

export default function Page() {
  return (
    ...
      <div className={styles.shape} />
    ...
  )
}
```

Tailwind와 CSS module은 가장 일반적인 방식이고 둘 다 사용할 수 도 있음

### clsx를 사용하여 클래스 이름 전환

상태나 다른 조건에 따라 요소의 스타일을 조건부로 지정해야 하는 경우 clsx 라이브러리를 이용하여 쉽게 전환할 수 있음

```
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

### 기타 스타일링 솔루션

-   Sass
-   styled-jsx
-   styled-components
-   emotion

## 글꼴 및 이미지 최적화

브라우저가 처음에 시스템 글꼴로 텍스트를 렌더링한 다음 로드되면 사용자 지정 글꼴로 변경될 경우.
이 전환으로 인해 레이아웃이 변경되어 주변의 요소가 이동할 수 있음

Next.js는 `next/font` 모듈을 사용할 때 애플리케이션의 글꼴을 자동으로 최적화함.

빌드 시 글꼴 파일을 다운로드하여 다른 정적 자산과 함께 호스팅하여, 글꼴에 대한 추가 네트워크 요청이 없음

### 기본 글꼴 추가

`/app/ui` 폴더에 `/fonts.ts` 파일 생성. 이 파일을 사용하여 애플리케이션 전체에서 사용될 글꼴을 보관

`next/font/google` 모듈에서 `Inter` 글꼴을 가져욤. 그런 다음 하위 집합을 지정

```
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

마지막으로 `/app/layout.tsx`의 `<body>`에 글꼴을 추가

```
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

`<body>`에 적용했기 때문에 애플리케이션 전체에 글꼴이 적용됨.

`antialiased`는 Tailwind의 글꼴을 매끈하게 하는 클래스

### 이미지 최적화 이유

Next.js 는 `/public` 폴더의 정적 자산을 제공함. `/public`은 애플리케이션에서 참조할 수 있음

일반 HTML을 사용하여 이미지를 추가하면

```
<img
  src="/hero.png"
  alt="Screenshots of the dashboard project showing desktop version"
/>
```

하지만 다음과 같은 추가 작업이 필요함

-   다양한 화면 크기에서의 반응형 지정
-   다양한 장치에 맞게 이미지 크기 지정
-   이미지가 로드될 때 레이아웃이 전환되는 것 방지
-   사용자 뷰포트 밖에 있는 이미지를 지연 로드

### `<Image>` 컴포넌트

`<Image>` 컴포넌트는 HTML 태그 `<img>`의 확장이며 다음과 같은 자동 이미지 최적화 기능을 제공.

-   이미지가 로딩될 때 레이아웃이 자동으로 전환되는 것을 방지
-   작은 뷰포트를 갖춘 기기에 큰 이미지가 전송되는 것을 방지하기 위해 이미지 크기를 조절
-   기본적으로 이미지가 지연 로딩 (뷰포트에 들어오면 로드)
-   `Webp`와 `AVIF` 같은 최신 형식으로 이미지 제공

### 이미지 추가

`/public`에 있는 `here-desktop.png`와 `here-mobile.png`를 `next/image`의 `<Image>`를 사용하여 추가합니다.

```
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
    //...
  );
}
```
