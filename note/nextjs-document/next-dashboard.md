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

##
