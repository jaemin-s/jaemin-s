# React Router 완벽 가이드

## 1. 라우터 설정 (Router Setup)

React Router에서는 두 가지 방식으로 라우터를 설정할 수 있습니다.

### 1.1 createBrowserRouter 사용

객체 기반의 설정 방식으로, 더 현대적이고 권장되는 방법입니다.

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

### 1.2 createRoutesFromElements 사용

JSX 스타일의 설정 방식으로, 더 직관적인 구조를 제공합니다.

```jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductsPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);
```

## 2. 네비게이션 컴포넌트

### 2.1 Link

기본적인 네비게이션을 위한 컴포넌트입니다. 일반 a 태그와 달리 페이지를 새로 로드하지 않습니다.

```jsx
import { Link } from "react-router-dom";

<Link to="/products">상품 목록으로</Link>;
```

### 2.2 NavLink

Link의 확장 버전으로 활성화 상태를 스타일링할 수 있습니다.

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/"
  className={({ isActive }) => (isActive ? classes.active : undefined)}
  end
>
  Home
</NavLink>;
```

- `isActive`: 현재 경로가 활성화되었는지 확인
- `end`: 정확한 경로 일치 여부 확인

### 2.3 프로그래매틱 네비게이션

useNavigate 훅을 사용한 코드 기반 네비게이션입니다.

```jsx
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/products");
  }
}
```

## 3. 라우트 구조화

### 3.1 중첩 라우트 (Nested Routes)

레이아웃을 공유하는 라우트를 구성할 수 있습니다.

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
    ],
  },
]);
```

레이아웃 컴포넌트에서는 Outlet을 사용하여 자식 라우트를 렌더링합니다:

```jsx
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

### 3.2 동적 라우트 (Dynamic Routes)

URL 파라미터를 사용한 동적 라우팅을 지원합니다.

```jsx
{
  path: '/products/:productId',
  element: <ProductDetailPage />
}
```

useParams 훅으로 파라미터에 접근:

```jsx
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();
  // params.productId 접근 가능
}
```

## 4. 데이터 로딩과 제출

### 4.1 Loader

라우트 진입 전 데이터를 미리 로드할 수 있습니다.

```jsx
{
  path: 'events',
  element: <EventsPage />,
  loader: async () => {
    const response = await fetch('http://api.example.com/events');
    return response.json();
  }
}
```

데이터 사용:

```jsx
import { useLoaderData } from "react-router-dom";

function EventsPage() {
  const events = useLoaderData();
  return <EventsList events={events} />;
}
```

### 4.2 Action

폼 제출이나 데이터 변경 작업을 처리합니다.

```jsx
{
  path: 'events/new',
  element: <NewEventPage />,
  action: async ({ request }) => {
    const data = await request.formData();
    const response = await fetch('http://api.example.com/events', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data))
    });
    return redirect('/events');
  }
}
```

### 4.3 지연 로딩 (Deferred Data)

데이터 로딩을 지연시켜 UI의 일부를 먼저 표시할 수 있습니다.

```jsx
function loader() {
  return defer({
    events: loadEvents(),
    criticalData: await loadCriticalData()
  });
}

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}
```

## 5. 오류 처리

### 5.1 Error Boundaries

라우트별로 에러 처리를 설정할 수 있습니다.

```jsx
{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: [...]
}
```

에러 정보 접근:

```jsx
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>An error occurred!</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

## 6. 고급 기능

### 6.1 useNavigation

현재 네비게이션 상태를 추적합니다.

```jsx
import { useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" && <LoadingSpinner />}
      <Outlet />
    </div>
  );
}
```

### 6.2 useFetcher

라우트 전환 없이 loader나 action을 호출할 수 있습니다.

```jsx
function Newsletter() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/newsletter">
      <input type="email" name="email" />
      <button type="submit">
        {fetcher.state === "submitting" ? "Subscribing..." : "Subscribe"}
      </button>
    </fetcher.Form>
  );
}
```

### 6.3 Index Routes

부모 라우트의 기본 자식 라우트를 지정합니다.

```jsx
{
  path: '/',
  element: <RootLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'products', element: <ProductsPage /> }
  ]
}
```
