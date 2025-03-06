# React HTTP 통신 패턴

React 애플리케이션에서 HTTP 통신을 구현하기 위한 패턴을 정리한 문서입니다.

## 목차

- [프로젝트 구조](#프로젝트-구조)
- [주요 컴포넌트](#주요-컴포넌트)
- [HTTP 통신 구현](#http-통신-구현)
- [커스텀 훅](#커스텀-훅)
- [사용 예시](#사용-예시)

## 프로젝트 구조

```
src/
├── components/
│   └── Places.jsx        # 장소 목록 표시 컴포넌트
├── hooks/
│   └── useFetch.js       # HTTP 요청 커스텀 훅
├── http.js               # HTTP 요청 함수 모음
└── App.js                # 메인 애플리케이션 컴포넌트
```

## 주요 컴포넌트

### Places 컴포넌트

장소 목록을 표시하는 컴포넌트로, 로딩 상태와 데이터 유무에 따른 조건부 렌더링을 구현합니다.

```jsx
export default function Places({
  isLoading, // 로딩 상태
  loadingText, // 로딩 중 표시할 텍스트
  places, // 장소 데이터 배열
  fallbackText, // 데이터가 없을 때 표시할 텍스트
}) {
  return (
    <main>
      <h1>Places</h1>
      {isLoading && <p>{loadingText}</p>}
      {!isLoading && places.length === 0 && <p>{fallbackText}</p>}
      {!isLoading && places.length > 0 && (
        <ul>
          {places.map((place) => (
            <li key={place.id}>
              <p>{place.title}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

## HTTP 통신 구현

`http.js` 파일에서 모든 HTTP 요청 함수들을 관리합니다. 각 함수는 특정 HTTP 메서드를 사용하여 서버와 통신합니다.

### GET 요청

```javascript
export async function fetchUserPlaces() {
  const response = await fetch("https://example.com/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return resData.places;
}
```

### PUT 요청

```javascript
export async function updateUserPlaces(places) {
  const response = await fetch("https://example.com/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}
```

### POST 요청

```javascript
export async function createUserPlace(placeData) {
  const response = await fetch("https://example.com/user-places", {
    method: "POST",
    body: JSON.stringify(placeData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to create new place");
  }

  return resData.place;
}
```

### DELETE 요청

```javascript
export async function deleteUserPlace(placeId) {
  const response = await fetch(`https://example.com/user-places/${placeId}`, {
    method: "DELETE",
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to delete place");
  }

  return resData.message;
}
```

## 커스텀 훅

`useFetch` 커스텀 훅을 사용하여 데이터 fetching 로직을 재사용 가능한 형태로 추상화합니다.

```javascript
export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false); // 로딩 상태
  const [error, setError] = useState(); // 에러 상태
  const [fetchedData, setFetchedData] = useState(initialValue); // 받아온 데이터

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
```

## 사용 예시

App 컴포넌트에서 커스텀 훅과 컴포넌트를 조합하여 사용합니다.

```javascript
function App() {
  const {
    isFetching,
    error,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
  } = useFetch(fetchUserPlaces, []);

  return (
    <div>
      {error && <p>{error.message}</p>}
      {!error && (
        <Places
          isLoading={isFetching}
          loadingText="불러오는 중..."
          places={userPlaces}
          fallbackText="방문하고 싶은 장소를 선택하세요"
        />
      )}
    </div>
  );
}
```

## 주요 특징

1. **모듈화**: HTTP 요청 함수들을 별도의 모듈로 분리하여 관리
2. **상태 관리**: 로딩, 에러, 데이터 상태를 체계적으로 관리
3. **재사용성**: 커스텀 훅을 통해 데이터 fetching 로직을 재사용
4. **에러 처리**: HTTP 요청 실패에 대한 일관된 에러 처리
5. **조건부 렌더링**: 다양한 상태에 따른 UI 처리

## 장점

- 코드의 구조화와 재사용성 향상
- 일관된 에러 처리와 로딩 상태 관리
- 관심사의 분리를 통한 유지보수성 향상
- HTTP 통신 로직의 추상화로 인한 개발 편의성
