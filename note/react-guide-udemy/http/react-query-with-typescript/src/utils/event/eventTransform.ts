import { EventApiResponse } from "../../types/events/api";
import { Event } from "../../types/events/client";

export const eventTransform = {
  toClient: (apiEvent: EventApiResponse): Event => ({
    id: apiEvent.id,
    title: apiEvent.title,
    createdAt: new Date(apiEvent.created_at),
    updatedAt: new Date(apiEvent.updated_at),
    status: apiEvent.status,
    organizerId: apiEvent.organizer_id,
  }),
};
