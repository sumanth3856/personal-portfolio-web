"use client";

const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400">
                    © {new Date().getFullYear()} Sai Sumanth. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
