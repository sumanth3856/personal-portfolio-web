import { getPostData, getSortedPostsData } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.id,
    }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = getPostData(slug);

    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{postData.title}</h1>
            <p className="text-gray-400 mb-8">{postData.date}</p>
            <div className="prose prose-invert prose-lg max-w-none">
                <MDXRemote source={postData.content} />
            </div>
        </article>
    );
}
