export default function Places({
  isLoading, // 로딩 상태
  loadingText, // 로딩 중 표시할 텍스트
  places, // 장소 데이터 배열
  fallbackText, // 데이터가 없을 때 표시할 텍스트
}) {
  return (
    <main>
      <h1>Places</h1>
      {/* 로딩 중일 때 */}
      {isLoading && <p>{loadingText}</p>}
      {/* 로딩이 끝났고 데이터가 없을 때 */}
      {!isLoading && places.length === 0 && <p>{fallbackText}</p>}
      {/* 로딩이 끝났고 데이터가 있을 때 */}
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
