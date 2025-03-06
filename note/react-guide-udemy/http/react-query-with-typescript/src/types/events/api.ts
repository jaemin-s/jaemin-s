export interface EventApiResponse {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  status: "draft" | "published" | "archived";
  organizer_id: string;
  _metadata: {
    version: number;
    last_modified_by: string;
  };
}

export interface EventListApiResponse {
  events: EventApiResponse[];
  total: number;
  page: number;
  per_page: number;
}
