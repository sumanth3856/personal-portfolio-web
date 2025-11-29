"use client";

import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-4xl"
      >
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-1 via-purple-500 to-accent-2 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative px-6 py-2 rounded-full bg-secondary ring-1 ring-white/10 leading-none flex items-center">
            <span className="text-purple-100 font-medium text-sm">Available for hire</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight mt-8">
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-1 to-blue-500">Digital</span> <br />
          Experiences
        </h1>

        <p className="text-xl md:text-2xl text-purple-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          I craft accessible, pixel-perfect, and performant web applications with a focus on user experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/projects"
            className="group flex items-center gap-2 bg-accent-1 text-secondary px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            View Work <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full glass hover:bg-white/10 transition-all duration-300 font-medium"
          >
            Contact Me
          </Link>
        </div>
      </motion.div>

    </div>
  );
}
