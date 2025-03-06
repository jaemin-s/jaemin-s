export interface Event {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  status: "draft" | "published" | "archived";
  organizerId: string;
}

export interface CreateEventData {
  title: string;
  status?: "draft" | "published";
  organizerId: string;
}

export interface UpdateEventData {
  title?: string;
  status?: "draft" | "published" | "archived";
}
