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

## 레이아웃 및 페이지 만들기

### 중첩 라우팅

Next.js는 폴더를 이용하여 중첩 경로를 만드는 파일 시스템 라우팅을 사용함. 각 폴더는 URL 세그먼트에 매필외는 경로 세그먼트를 나타냄

`layout.tsx`와 `page.tsx` 파일을 사용하여 각 경로에 대해 별도의 UI를 만들 수 있음.

`page.tsx` 파일은 React 구성요소를 내보내는 특수 Next.js파일이 며 경로에 액세스할 수 있도록 하는 데 필요함.

중첨 경로를 만들려면 폴더를 서로 중첩하고 그 안에 `page.tsx`를 추가하면 됨

`(overview)`처럼 괄호로 폴더 이름을 감싸면 해당 경로는 URL에는 포함되지 않으나 다른 경로와 구분됨

### 레이아웃 만들기

Next.js에서는 `layout.tsx` 파일을 사용하여 여러 페이지에서 공유되는 UI를 만들 수 있음.

```
import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

`Layout`은 `children` 컴포넌트를 prop로 전달 받아 표시함.

페이지를 전환 해도 Layout의 컴포넌트는 리렌더링 되지 않고 페이지 컴포넌트만 업데이트 됨

## 페이지 간 탐색

기존 HTML의 `<a>` 태그를 사용하면 페이지 전환 시 브라우저가 새로 고침됨. 그래서 `next/link`의 `<Link>`를 사용함

### `<Link>` 사용 시 이점

기존 React SPA가 브라우저 진입 시 모든 코드를 로드하는 것과는 다르게 Next.js가 경로 세그먼트를 기준으로 코드 분리함

-   필요한 코드만 읽기 때문에 속도가 빠름.
-   에러가 발생하여도 다른 페이지는 정상 동작함.
-   `<Link>` 컴포넌트가 뷰포트에 진입 시 백그라운드에서 미리 가져옴.

### 패턴 : 활성화된 링크 표시

일반적인 UI 패턴은 현재 어떤 페이지에 있는지 알려주기 위에 링크에 표시함.

Next.js는 경로를 확인하기 위해 `usePathname()` 훅을 제공. 이를 사용하여 패턴을 구현 가능.
`usePathname()`을 사용하기 위해서 `'use client'`를 추가 해야함

```typescript
'use client'

import { usePathname } from 'next/navigation';
...

export default function NavLinks() {
    const pathname = usePathname();
    //...
}
```

`pathname`을 사용하여 조건부 스타일링 적용

```typescript
//...
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
//...
```

## 데이터베이스 설정

1. 프로젝트를 GitHub 저장소에 등록
2. Vercel에 프로젝트를 연결
3. 데이터베이스 생성 및 .env에 키 입력 (.gitignore 확인 필수)
4. 데이터베이스 가이드 참고하여 연결 및 초기 데이터 입력(seed) : vercel의 postgres 이용

## 데이터 가져오기

### 데이터를 가져오는 방법

API layer : 애플리케이션 코드와 데이터베이스 사이 계층

-   타사에서 제공하는 API를 사용하느 경우
-   클라이언트에서 데이터를 가져오는 경우, 데이터베이스 비밀이 클라이언트에 노출되는 것을 방지하기 위해

`Route Handlers`를 사용하여 API 엔드포인트를 생성할 수 있음

데이터베이스 쿼리

-   풀스택 애플리케이션을 만들 때
-   React Server Components를 사용하는 경우, 데이터베이스에 직접 쿼리 할 수 있음

`Postgres`또는 `ORM`을 사용하여 데이터베이스와 상호 작용

### React Server Components

기본적으로 Next.js 애플리케이션은 React Server Components를 사용. 아래와 같은 이점 있음

-   기본적으로 비동기 작업에 대한 솔루션을 제공하여 `useEffect`, `useState`같은 구문 없이 `async/await` 사용 가능
-   서버에서 데이터 가져오고 로직을 수행하고 결과만 클라이언트로 전달
-   서버에서 실행되기 때문에 추가 API 계층 없이 데이터베이스에 직접 쿼리 가능

### SQL 사용

이 대시보드 애플리케이션은 `postgres.js`를 사용하여 데이터베이스 쿼리를 작성 함.

`postgres.js`와 `SQL` 사용 하는 이유

-   `SQL`은 관계형 데이터베이스를 쿼리하기 위한 산업 표준
-   `SQL`에 대한 기본적인 이해가 있으면 관계형 데이터베이스의 기본을 이해하는 데 도움이 되며, 이를 통해 다른 도구에 지식을 적용할 수 있음
-   `SQL`은 다재다능하여 특정 데이터를 가져오고 조작하는 데 적합
-   `postgres.js`는 `SQL injection`으로부터 보허 기능을 제공

```
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
...
```

### request waterfall

`request waterfall`은 이전 요청의 완료에 따라 달라지는 일련의 네트워크 요청

```typescript
export default async function Page() {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    const {
        totalPaidInvoices,
        totalPendingInvoices,
        numberOfInvoices,
        numberOfCustomers,
    } = await fetchCardData();
    ...
}
```

이 패턴은 이전 요청의 반환 데이터가 다음 요청에 사용되는 경우에는 적합하지만 성능적으로 좋지 않음.

### 병렬 데이터 페칭

Javascript의 기본 패턴으로 `Promise.all()` 또는 `Promise.allSettled()`를 사용하여 모든 Promise를 동시에 시작할 수 있음

```javascript
const data = await Promise.all([
    invoiceCountPromise,
    customerCountPromise,
    invoiceStatusPromise,
]);
```

단점으로는 한 데이터 요청이 유난히 느릴경우 전체가 느려짐

## 정적 및 동적 렌더링

### 정적 렌더링

정적 렌더링은 서버에 빌드되거나 데이터 재검증 시 데이터를 가져오고 렌더링됨

유저가 애플리케이션을 방문했을 때 캐시된 결과를 제공받기 때문에 아래와 같은 이점이 있음

-   빠른 웹사이트 : 배포 시점에 캐시된 데이터로 사전 렌더링된 컨텐츠를 빠르게 제공함
-   서버 부하 감소 : 각 사용차 요청에 대해 동적으로 콘텐츠를 생성할 필요가 없음. 이를 통해 컴퓨팅 비용을 줄일 수 있음
-   SEO : 사전 렌더링된 콘텐츠는 검색 엔진 크롤러가 색인하기 더 쉬움. 검색 엔진 순위를 개선하는 데 도움

정적 렌더링은 데이터가 없거나 사용자 간에 공유되는 데이터가 있는 UI에 유용함.

### 동적 렌더링

동적 렌더링을 사용하면 요청시간에 각 사용자에 대한 콘텐츠가 서버에서 렌더링됨

-   실시간 데이터 : 애플리케이션에서 실시간 또는 자주 업데이트 되는 데이터를 표시할 수 있음
-   사용자별 콘텐츠 : 대시보드나 사용자 프로필과 같은 개인화된 콘텐츠를 제공하고 사용자 상호 작용에 따라 데이터를 업데이트하는 것이 더 쉬움
-   요청 시간 정보 : 동적 렌더링을 사용하면 쿠기나 URL 검색 매개변수와 같이 요청 시점에만 알 수 있는 정보에 액세스할 수 있음

동적 렌더링을 사용하면 애플리케이션의 속도는 가장 느린 데이터 속도에 따라 결정됨

## 스트리밍

### 스트리밍이란?

스트리밍은 경로를 더 작은 조각으로 나누고 데이터가 준비되면 서버에서 클라이언트로 점진적으로 스트리밍할 수 있는 데이터 전송 기술

스트리밍을 통해 느린 데이터 요청이 전체 페이지를 차단하는 것을 방지할 수 있음.

Next.js에서 스트리밍을 구현하는 방법 두 가지

1. 페이지 수준에서는 `loading.tsx`를 사용하여
2. 컴포넌트 수준에서는 `<Suspense>`를 사용하여 보다 세부제어 가능

원하는 페이지 수준에 `loading.tsx`를 만들면 React Suspense이 적용

```
export default function Loading() {
  return <div>Loading...</div>;
}
```

텍스트 대신 스켈레톤을 사용하면 사용자 경험들 개선할 수 있음

### 구성요소 단위 스트리밍

전체 페이지를 스트리밍 하는 대신 React Suspense를 사용하여 특정 구성 요소를 스트리밍할 수 있음

Suspense를 사용하면 일부 조건이 충족될 때까지(데이터 로드) 애플리케이션의 렌더링 부분을 연기할 수 있음

Suspense로 동적요소를 래핑하고 로드되는 동안 표시할 대체 구성요소를 전달
