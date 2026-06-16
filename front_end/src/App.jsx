import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "react-hot-toast";
import {useCurrentUser} from "./hooks/userHooks/useCurrentUser";
function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
         <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                }}
            />
            <AppRouter />
        </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;