import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// File-based fallback for local development
const LIKES_FILE = path.join(process.cwd(), '.likes.json');

function getLikesFromFile(): number {
    try {
        if (fs.existsSync(LIKES_FILE)) {
            const data = fs.readFileSync(LIKES_FILE, 'utf-8');
            return JSON.parse(data).likes || 0;
        }
        return 0;
    } catch {
        return 0;
    }
}

function saveLikesToFile(likes: number): void {
    try {
        fs.writeFileSync(LIKES_FILE, JSON.stringify({ likes }));
    } catch (error) {
        console.error('Error saving likes:', error);
    }
}

export async function GET() {
    try {
        // Try Vercel KV first
        if (process.env.KV_REST_API_URL) {
            const { kv } = await import('@vercel/kv');
            const likes = await kv.get('portfolio:likes');
            return NextResponse.json({ likes: likes || 0 });
        }
        
        // Fallback to file-based storage
        const likes = getLikesFromFile();
        return NextResponse.json({ likes });
    } catch (error) {
        console.error('Likes GET Error:', error);
        // Return file-based likes as final fallback
        const likes = getLikesFromFile();
        return NextResponse.json({ likes });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action } = body;

        if (action !== 'like' && action !== 'unlike') {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        // Try Vercel KV first
        if (process.env.KV_REST_API_URL) {
            const { kv } = await import('@vercel/kv');
            let likes;
            if (action === 'like') {
                likes = await kv.incr('portfolio:likes');
            } else {
                likes = await kv.decr('portfolio:likes');
            }
            return NextResponse.json({ likes });
        }
        
        // Fallback to file-based storage
        let likes = getLikesFromFile();
        if (action === 'like') {
            likes++;
        } else {
            likes = Math.max(0, likes - 1);
        }
        saveLikesToFile(likes);
        return NextResponse.json({ likes });
    } catch (error) {
        console.error('Likes POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
