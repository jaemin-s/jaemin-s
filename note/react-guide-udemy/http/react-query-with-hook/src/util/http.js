import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// GET 요청
export async function fetchEvent({ id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`);

  if (!response.ok) {
    throw new Error("Could not fetch event.");
  }

  const { event } = await response.json();
  return event;
}

// GET 이벤트 목록 조회
export async function fetchEventList() {
  const response = await fetch("http://localhost:3000/events");

  if (!response.ok) {
    throw new Error("Could not fetch events.");
  }

  const { events } = await response.json();
  return events;
}

// POST 요청
export async function createEvent(eventData) {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error("Could not create event.");
  }

  const { event } = await response.json();
  return event;
}

// PUT 요청
export async function updateEvent({ id, data }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Could not update event.");
  }

  const { event } = await response.json();
  return event;
}

// DELETE 요청
export async function deleteEvent(id) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete event.");
  }

  return { id };
}
