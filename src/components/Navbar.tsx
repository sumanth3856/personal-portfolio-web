"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, Mail, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/about', label: 'About', icon: User },
        { href: '/projects', label: 'Projects', icon: Briefcase },
        { href: '/blog', label: 'Blog', icon: FileText },
        { href: '/contact', label: 'Contact', icon: Mail },
    ];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-2xl glass shadow-lg">
            <div className="px-6 py-3">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-accent-1 tracking-tight">
                        Portfolio<span className="text-white">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'text-accent-1' : 'text-gray-400 hover:text-accent-1 hover:bg-white/5'
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span>{link.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-white/5"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                        <div className="pl-4 border-l border-white/10 ml-4">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button (Simple placeholder for now) */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <span className="text-sm font-bold text-white">Menu</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
