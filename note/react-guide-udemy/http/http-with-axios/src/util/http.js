import axios from "axios";

// axios 인스턴스 생성 (선택사항이지만 권장)
const api = axios.create({
  baseURL: "https://example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// // 인스턴스 없이 get 요청
// export async function fetchUserPlaces() {
//   try {
//     const response = await axios.get('https://example.com/user-places');
//     return response.data.places;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch user places');
//   }
// }

// // query parameter를 포함한 get 요청 예시
// export async function fetchUserPlacesByCategory(category) {
//   try {
//     const response = await axios.get('https://example.com/user-places', {
//       params: { category }  // URL에 ?category=값 형태로 자동 변환됨
//     });
//     return response.data.places;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch user places');
//   }
// }

// get 요청
export async function fetchUserPlaces() {
  try {
    const response = await api.get("/user-places");
    return response.data.places;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user places"
    );
  }
}

// put 요청
export async function updateUserPlaces(places) {
  try {
    const response = await api.put("/user-places", { places });
    return response.data.message;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update user data"
    );
  }
}

// post 요청
export async function createUserPlace(placeData) {
  try {
    const response = await api.post("/user-places", placeData);
    return response.data.place;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create new place"
    );
  }
}

// delete 요청
export async function deleteUserPlace(placeId) {
  try {
    const response = await api.delete(`/user-places/${placeId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete place");
  }
}
