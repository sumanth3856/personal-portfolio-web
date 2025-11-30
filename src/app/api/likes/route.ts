import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const likes = await kv.get('portfolio:likes');
        return NextResponse.json({ likes: likes || 0 });
    } catch (error) {
        console.error('KV Error:', error);
        return NextResponse.json({ likes: 0 }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action } = body;

        let likes;
        if (action === 'like') {
            likes = await kv.incr('portfolio:likes');
        } else if (action === 'unlike') {
            likes = await kv.decr('portfolio:likes');
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({ likes });
    } catch (error) {
        console.error('KV Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
