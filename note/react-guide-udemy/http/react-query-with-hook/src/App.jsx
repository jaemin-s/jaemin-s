import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js";
import Event from "./components/Event.jsx";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Event />
    </QueryClientProvider>
  );
}
