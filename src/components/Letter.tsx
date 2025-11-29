"use client";

// Force git update

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface LetterProps {
    content: string;
}

const Letter = ({ content }: LetterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch initial likes
        fetch('/api/likes')
            .then(res => res.json())
            .then(data => setLikes(data.likes))
            .catch(err => console.error('Failed to fetch likes:', err));
    }, []);

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasLiked || isLoading) return;

        setIsLoading(true);
        // Optimistic update
        setLikes(prev => prev + 1);
        setHasLiked(true);

        try {
            const res = await fetch('/api/likes', { method: 'POST' });
            if (!res.ok) throw new Error('Failed to like');

            const data = await res.json();
            setLikes(data.likes);
            toast.success('Thanks for the love!');
        } catch (error) {
            console.error('Error liking:', error);
            // Revert optimistic update
            setLikes(prev => prev - 1);
            setHasLiked(false);
            toast.error('Failed to update likes. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="envelope"
                        layoutId="letter-container"
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer group relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-80 h-52 bg-gradient-to-br from-accent-1 to-accent-2 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden border border-white/20">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                            <div className="text-white text-xl font-bold z-10 tracking-widest uppercase">Read About Me</div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                        </div>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-secondary px-4 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Click to open
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="letter"
                        layoutId="letter-container"
                        className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            Close
                        </button>

                        <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white">
                            <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed">
                                {content}
                            </pre>
                        </div>

                        <div className="mt-12 flex items-center justify-center border-t border-white/10 pt-8">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${hasLiked
                                    ? 'bg-pink-500/20 text-pink-400 cursor-default'
                                    : 'bg-white/5 hover:bg-pink-500/20 text-gray-300 hover:text-pink-400'
                                    }`}
                            >
                                <Heart
                                    className={`transition-transform duration-300 ${hasLiked ? 'fill-current scale-110' : 'scale-100'}`}
                                    size={24}
                                />
                                <span className="font-bold text-lg">{likes}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Letter;
