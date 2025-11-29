import { Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-white/5 bg-secondary/50 backdrop-blur-sm py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-accent-2">
                <p>&copy; {new Date().getFullYear()} Sai Sumanth. Built with Next.js & Tailwind.</p>
                <a
                    href="https://github.com/sumanth3856/personal-portfolio-web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                >
                    <Github size={20} />
                    <span>View on GitHub</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
