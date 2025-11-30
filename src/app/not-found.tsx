import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
            <div className="bg-red-500/10 p-6 rounded-full mb-6 animate-pulse">
                <AlertCircle size={64} className="text-red-500" />
            </div>

            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>

            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
                Oops! The page you are looking for doesn&apos;t exist or has been moved.
            </p>

            <Link
                href="/"
                className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
                <Home size={18} />
                Back to Home
            </Link>
        </div>
    );
}
