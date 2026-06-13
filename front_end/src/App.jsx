import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;