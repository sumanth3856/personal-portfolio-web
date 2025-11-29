import Link from 'next/link';
import { getSortedPostsData } from '@/lib/mdx';

export default function Blog() {
    const posts = getSortedPostsData();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
            <div className="space-y-8">
                {posts.map((post) => (
                    <div key={post.id} className="glass p-8 rounded-2xl hover:bg-white/5 transition-colors">
                        <Link href={`/blog/${post.id}`}>
                            <h2 className="text-2xl font-bold mb-2 hover:text-accent-1 transition-colors">{post.title}</h2>
                        </Link>
                        <p className="text-gray-500 text-sm mb-4">{post.date}</p>
                        <p className="text-gray-300">{post.excerpt}</p>
                        <Link href={`/blog/${post.id}`} className="text-accent-1 text-sm font-bold mt-4 inline-block hover:underline">
                            Read more →
                        </Link>
                    </div>
                ))}

                {posts.length === 0 && (
                    <p className="text-center text-gray-400">No posts found.</p>
                )}
            </div>
        </div>
    );
}
