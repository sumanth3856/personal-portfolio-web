"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

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

        // Check local storage for liked status
        const liked = localStorage.getItem('hasLiked');
        if (liked) setHasLiked(true);
    }, []);

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLoading) return;

        setIsLoading(true);
        // Optimistic update
        const newHasLiked = !hasLiked;
        setHasLiked(newHasLiked);
        setLikes(prev => newHasLiked ? prev + 1 : prev - 1);

        if (newHasLiked) {
            localStorage.setItem('hasLiked', 'true');
        } else {
            localStorage.removeItem('hasLiked');
        }

        try {
            const res = await fetch('/api/likes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: newHasLiked ? 'like' : 'unlike' })
            });

            if (!res.ok) throw new Error('Failed to update likes');

            const data = await res.json();
            setLikes(data.likes);
            toast.success(newHasLiked ? 'Thanks for the love!' : 'Unliked');
        } catch (error) {
            console.error('Error updating likes:', error);
            // Revert optimistic update
            setHasLiked(!newHasLiked);
            setLikes(prev => !newHasLiked ? prev + 1 : prev - 1);
            if (!newHasLiked) {
                localStorage.setItem('hasLiked', 'true');
            } else {
                localStorage.removeItem('hasLiked');
            }
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
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer group relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="w-80 h-52 bg-gradient-to-br from-accent-1 to-accent-2 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden border border-white/20">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                            <div className="text-white text-xl font-bold z-10 tracking-widest uppercase">Read About Me</div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                        </div>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#000000] px-4 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Click to open
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="letter"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Letter from Sai Sumanth"
                        className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <h2 className="sr-only">Letter from Sai Sumanth</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            Close
                        </button>

                        <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white">
                            <pre className={`whitespace-pre-wrap text-2xl leading-relaxed ${caveat.className} text-gray-200`}>
                                {content}
                            </pre>
                        </div>

                        <div className="mt-12 flex items-center justify-center border-t border-white/10 pt-8">
                            <button
                                onClick={handleLike}
                                aria-label={hasLiked ? "Unlike this letter" : "Like this letter"}
                                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${hasLiked
                                    ? 'bg-pink-500/20 text-pink-400'
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
