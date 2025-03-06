// API 통신을 위한 함수들을 모아둔 모듈

// GET 요청 - 사용자의 장소 목록을 가져옴
export async function fetchUserPlaces() {
  const response = await fetch("https://example.com/user-places");
  const resData = await response.json();

  // HTTP 상태 코드가 200-299 범위가 아닐 경우 에러 발생
  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return resData.places;
}

// PUT 요청 - 사용자의 장소 목록을 업데이트
export async function updateUserPlaces(places) {
  const response = await fetch("https://example.com/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }), // 데이터를 JSON 문자열로 변환
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 명시
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}

// POST 요청 - 새로운 장소 생성
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

// DELETE 요청 - 특정 장소 삭제
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
