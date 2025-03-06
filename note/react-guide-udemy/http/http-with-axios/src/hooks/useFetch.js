import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false); // 로딩 상태
  const [error, setError] = useState(); // 에러 상태
  const [fetchedData, setFetchedData] = useState(initialValue); // 받아온 데이터

  useEffect(() => {
    // 비동기 데이터 요청 함수
    async function fetchData() {
      setIsFetching(true); // 로딩 시작
      try {
        const data = await fetchFn(); // HTTP 요청 실행
        setFetchedData(data); // 데이터 저장
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." }); // 에러 처리
      }

      setIsFetching(false); // 로딩 종료
    }

    fetchData(); // 컴포넌트 마운트 시 데이터 요청
  }, [fetchFn]); // fetchFn이 변경될 때마다 재실행

  return {
    isFetching, // 로딩 상태
    fetchedData, // 받아온 데이터
    setFetchedData, // 데이터 수정 함수
    error, // 에러 상태
  };
}
