import fs from 'fs';
import path from 'path';
import Letter from '@/components/Letter';

export default function About() {
    // In a real app, use a markdown parser. For now, simple display.
    const resumePath = path.join(process.cwd(), 'src/data/resume.md');
    const resumeContent = fs.readFileSync(resumePath, 'utf8');

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
            <Letter content={resumeContent} />
        </div>
    );
}
