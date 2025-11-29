'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
                <div className="flex flex-col items-center text-center max-w-lg">
                    <div className="bg-yellow-500/10 p-6 rounded-full mb-6">
                        <AlertTriangle size={64} className="text-yellow-500" />
                    </div>

                    <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                        We apologize for the inconvenience. An unexpected error has occurred.
                        Please try refreshing the page.
                    </p>

                    <button
                        onClick={() => reset()}
                        className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
