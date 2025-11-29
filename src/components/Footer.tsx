const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-white/5 bg-secondary/50 backdrop-blur-sm py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-accent-2">
                <p>&copy; {new Date().getFullYear()} My Portfolio. Built with Next.js & Tailwind.</p>
            </div>
        </footer>
    );
};

export default Footer;
