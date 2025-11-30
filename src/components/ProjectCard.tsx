"use client";

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    image: string;
    category: string;
    behance?: string;
    dribbble?: string;
    link?: string;
}

const ProjectCard = ({ title, description, image, category, behance, link }: ProjectProps) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-black/50">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-3">
                        {behance && (
                            <a href={behance} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-accent-1 hover:text-white transition-colors">
                                Behance
                            </a>
                        )}
                    </div>
                </div>
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10">
                        {category}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-accent-1 group-hover:text-white transition-colors">{title}</h3>
                    {link && (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-colors">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>

                <p className="text-[#000000] dark:text-gray-300 mb-6 leading-relaxed flex-grow">{description}</p>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
