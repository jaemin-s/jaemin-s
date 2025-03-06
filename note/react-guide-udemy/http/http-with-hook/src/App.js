import Places from "./components/Places";
import { useFetch } from "./hooks/useFetch";
import { fetchUserPlaces } from "./util/http";

function App() {
  // useFetch 커스텀 훅을 사용하여 장소 데이터를 가져옴
  // fetchUserPlaces: HTTP GET 요청을 수행하는 함수
  // []: 초기값으로 빈 배열 설정
  const {
    isFetching, // 데이터 로딩 상태
    error, // 에러 상태
    fetchedData: userPlaces, // 가져온 장소 데이터
    setFetchedData: setUserPlaces, // 장소 데이터를 수정하는 setState 함수
  } = useFetch(fetchUserPlaces, []);

  return (
    <div>
      {/* 에러가 있으면 에러 메시지 표시 */}
      {error && <p>{error.message}</p>}
      {/* 에러가 없으면 Places 컴포넌트 렌더링 */}
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
