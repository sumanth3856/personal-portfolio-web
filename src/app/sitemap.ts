import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getSortedPostsData();
    const baseUrl = 'https://your-portfolio.com'; // Replace with actual domain

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
        },
        ...postUrls,
    ];
}
