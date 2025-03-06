import { apiClient } from "../http";
import { EventApiResponse, EventListApiResponse } from "../../types/events/api";
import { CreateEventData, UpdateEventData } from "../../types/events/client";

export const eventApi = {
  getEvent: async (id: string) => {
    const { data } = await apiClient.get<{ event: EventApiResponse }>(
      `/events/${id}`
    );
    return data.event;
  },

  getEventList: async () => {
    const { data } = await apiClient.get<EventListApiResponse>("/events");
    return data;
  },

  createEvent: async (eventData: CreateEventData) => {
    const { data } = await apiClient.post<{ event: EventApiResponse }>(
      "/events",
      eventData
    );
    return data.event;
  },

  updateEvent: async (id: string, eventData: UpdateEventData) => {
    const { data } = await apiClient.put<{ event: EventApiResponse }>(
      `/events/${id}`,
      eventData
    );
    return data.event;
  },

  deleteEvent: async (id: string) => {
    await apiClient.delete(`/events/${id}`);
    return { id };
  },
};
