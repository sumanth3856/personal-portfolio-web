"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function GlobalErrorHandler({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            // Check if the error is related to storage access
            if (event.reason instanceof Error && event.reason.message.includes("Access to storage is not allowed")) {
                // Prevent the default handler (which might log to console or crash)
                event.preventDefault();
                console.warn("Suppressed 'Access to storage' error.");
                // Optionally show a silent toast or just ignore it if it's not critical
                // toast.error("Storage access is restricted in this environment.");
            }
        };

        const handleError = (event: ErrorEvent) => {
            if (event.message.includes("Access to storage is not allowed")) {
                event.preventDefault();
                console.warn("Suppressed 'Access to storage' error.");
            }
        };

        window.addEventListener("unhandledrejection", handleUnhandledRejection);
        window.addEventListener("error", handleError);

        return () => {
            window.removeEventListener("unhandledrejection", handleUnhandledRejection);
            window.removeEventListener("error", handleError);
        };
    }, []);

    return <>{children}</>;
}
