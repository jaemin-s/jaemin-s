import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEvent,
  updateEvent,
  deleteEvent,
  createEvent,
} from "../util/http";

export default function EditEvent() {
  const queryClient = useQueryClient();
  const eventId = "1"; // 실제로는 라우터나 props로 받을 수 있습니다

  // GET 요청 - 단일 이벤트 조회
  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events", eventId], // 캐시 키로 사용됨
    queryFn: () => fetchEvent({ id: eventId }),
  });

  // POST 요청 - 이벤트 생성
  const { mutate: createMutation } = useMutation({
    mutationFn: createEvent,
    onSuccess: (newEvent) => {
      // 새 이벤트 생성 후 이벤트 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["events"] });
      // 또는 직접 캐시 업데이트
      queryClient.setQueryData(["events"], (oldEvents) => {
        return oldEvents ? [...oldEvents, newEvent] : [newEvent];
      });
    },
  });

  // PUT 요청 - 이벤트 수정
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateEvent,
    // 낙관적 업데이트
    onMutate: async ({ id, data }) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      // 이전 데이터 백업
      const previousEvent = queryClient.getQueryData(["events", id]);
      // 낙관적으로 캐시 업데이트
      queryClient.setQueryData(["events", id], data);
      // 롤백을 위해 이전 데이터 반환
      return { previousEvent };
    },
    onError: (err, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      queryClient.setQueryData(["events", variables.id], context.previousEvent);
    },
    onSettled: (id) => {
      // 작업 완료 후 쿼리 리프레시
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });

  // DELETE 요청 - 이벤트 삭제
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (data) => {
      // 삭제된 이벤트의 쿼리 제거
      queryClient.removeQueries({ queryKey: ["events", data.id] });
      // 이벤트 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <button onClick={() => createMutation({ title: "New Event" })}>
        Create Event
      </button>
      <button
        onClick={() =>
          updateMutation({
            id: eventId,
            data: { ...event, title: "Updated Title" },
          })
        }
      >
        Update Event
      </button>
      <button onClick={() => deleteMutation(eventId)}>Delete Event</button>
    </div>
  );
}
