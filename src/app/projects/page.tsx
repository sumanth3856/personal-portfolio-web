import ProjectCard from '@/components/ProjectCard';
import projectsData from '@/data/projects.json';

export default function Projects() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Selected Works</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    A collection of brand identities, user interfaces, and digital experiences.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectsData.map((project) => (
                    <div key={project.id} className="h-full">
                        <ProjectCard {...project} />
                    </div>
                ))}
            </div>
        </div>
    );
}
