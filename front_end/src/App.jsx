import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import AppRouter from "./routes/AppRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "react-hot-toast";

function App() {
    const [showDemoModal, setShowDemoModal] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem("supporthub-demo-modal-seen");
        if (!dismissed) {
            setShowDemoModal(true);
        }
    }, []);

    const handleCloseDemoModal = () => {
        setShowDemoModal(false);
        localStorage.setItem("supporthub-demo-modal-seen", "true");
    };

    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
         <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                }}
            />

            {showDemoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
                    <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-xl font-semibold text-white">
                                Demo Login Details
                            </h2>
                            <button
                                type="button"
                                onClick={handleCloseDemoModal}
                                className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-slate-300 hover:text-white"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-5 space-y-3 text-sm text-slate-300">
                            <p>
                                <span className="font-medium text-white">Normal User:</span>{" "}
                                user@gmail.com / User@123
                            </p>
                            <p>
                                <span className="font-medium text-white">Assignee:</span>{" "}
                                assignee@gmail.com / User@123
                            </p>
                            <p>
                                <span className="font-medium text-white">Admin:</span>{" "}
                                admin@gmail.com / User@123
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleCloseDemoModal}
                            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            <AppRouter />
        </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;