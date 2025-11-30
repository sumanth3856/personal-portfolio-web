"use client";

// Force git update

import { useState } from 'react';
import { Send, Loader2, Mail, Instagram, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            toast.success('Message sent successfully!', {
                description: "I'll get back to you as soon as possible.",
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            toast.error('Failed to send message.', {
                description: error instanceof Error ? error.message : "Please try again later or email me directly.",
            });
        } finally {
            // Reset status to idle after 3 seconds if not successful to allow retry
            if (status !== 'success') {
                setTimeout(() => setStatus('idle'), 3000);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-black dark:text-gray-400">Have a question or want to work together?</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="glass p-6 rounded-2xl space-y-6 border border-white/10 bg-white/5 backdrop-blur-lg">
                        <div className="flex items-center space-x-4 text-accent-2 dark:text-gray-300">
                            <div className="p-3 bg-white/5 rounded-full text-accent-1">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Name</h3>
                                <p>Sai Sumanth</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-accent-2 dark:text-gray-300">
                            <div className="p-3 bg-white/5 rounded-full text-accent-1">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Email</h3>
                                <p>saisumanth3856@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-accent-2 dark:text-gray-300">
                            <div className="p-3 bg-white/5 rounded-full text-accent-2">
                                <Instagram size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Instagram</h3>
                                <a
                                    href="https://www.instagram.com/sumanthhh._.08?igsh=dGt0MWx5cDlyZHU4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#11b41a] hover:text-white transition-colors"
                                >
                                    sumanthhh._.08
                                </a>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6 glass p-8 rounded-2xl" style={{ backgroundColor: '#000000ff' }}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-accent-1 focus:ring-1 focus:ring-accent-1 outline-none transition-all text-white placeholder-gray-500"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-accent-1 focus:ring-1 focus:ring-accent-1 outline-none transition-all text-white placeholder-gray-500"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-accent-1 focus:ring-1 focus:ring-accent-1 outline-none transition-all text-white placeholder-gray-500 resize-none"
                                placeholder="Your message..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full py-4 rounded-lg bg-black text-white font-bold hover:bg-accent-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Sending...
                                </>
                            ) : status === 'success' ? (
                                'Message Sent!'
                            ) : (
                                <>
                                    Send Message
                                    <Send size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
