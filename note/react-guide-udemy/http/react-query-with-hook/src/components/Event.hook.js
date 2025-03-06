import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchEvent,
  fetchEventList,
  updateEvent,
  deleteEvent,
  createEvent,
} from "../util/http";

export function useEvent(eventId) {
  const queryClient = useQueryClient();

  // Queries
  const detailQuery = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => fetchEvent({ id: eventId }),
  });

  const listQuery = useQuery({
    queryKey: ["events"],
    queryFn: fetchEventList,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (newEvent) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateEvent,
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["events", id]);
      const previousEvent = queryClient.getQueryData(["events", id]);
      queryClient.setQueryData(["events", id], data);
      return { previousEvent };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["events", variables.id], context.previousEvent);
    },
    onSettled: (id) => {
      queryClient.invalidateQueries(["events", id]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (data) => {
      queryClient.removeQueries(["events", data.id]);
      queryClient.invalidateQueries(["events"]);
    },
  });

  return {
    // Queries
    detailQuery: {
      data: detailQuery.data,
      isLoading: detailQuery.isLoading,
      error: detailQuery.error,
      // 추가로 사용 가능한 값들
      // isError: detailQuery.isError,
      // isFetching: detailQuery.isFetching,
      // isSuccess: detailQuery.isSuccess,
      // status: detailQuery.status,
    },
    listQuery: {
      data: listQuery.data,
      isLoading: listQuery.isLoading,
      error: listQuery.error,
    },
    // Mutations
    createMutation: createMutation.mutate,
    updateMutation: updateMutation.mutate,
    deleteMutation: deleteMutation.mutate,
  };
}
