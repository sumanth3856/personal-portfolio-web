"use client";

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
}

const ProjectCard = ({ title, description, tags, link, github }: ProjectProps) => {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass glass-hover rounded-2xl p-6 transition-all duration-300 group"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-[#000000] dark:text-white group-hover:text-[#3f224a] transition-colors">{title}</h3>
                <div className="flex gap-3">
                    <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors">
                        <Github size={18} />
                    </a>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors">
                        <ExternalLink size={18} />
                    </a>
                </div>
            </div>

            <p className="text-[#000000] dark:text-gray-300 mb-6 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent-1/10 text-accent-1 border border-accent-1/20">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
