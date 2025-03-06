import { useEvent } from "./Event.hook";

export default function EditEvent() {
  const eventId = "1"; // 예시 ID
  const {
    detailQuery,
    listQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useEvent(eventId);

  if (detailQuery.isLoading || listQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (detailQuery.error || listQuery.error) {
    return <div>{detailQuery.error?.message || listQuery.error?.message}</div>;
  }

  return (
    <div>
      {/* 이벤트 상세 */}
      <h1>{detailQuery.data?.title}</h1>

      {/* 이벤트 목록 */}
      <h2>Event List</h2>
      <ul>
        {listQuery.data?.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>

      {/* 액션 버튼들 */}
      <button onClick={() => createMutation({ title: "New Event" })}>
        Create Event
      </button>
      <button
        onClick={() =>
          updateMutation({
            id: eventId,
            data: { ...detailQuery.data, title: "Updated Title" },
          })
        }
      >
        Update Event
      </button>
      <button onClick={() => deleteMutation(eventId)}>Delete Event</button>
    </div>
  );
}
