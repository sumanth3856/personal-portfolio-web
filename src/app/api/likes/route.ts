import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const storePath = path.join(process.cwd(), 'src/data/store.json');

function getLocalStore() {
    if (!fs.existsSync(storePath)) {
        return { likes: 0, messages: [] };
    }
    const data = fs.readFileSync(storePath, 'utf8');
    return JSON.parse(data);
}

function saveLocalStore(data: any) {
    fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
}

export async function GET() {
    // Check if Vercel KV is configured
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
            const likes = await kv.get('likes');
            return NextResponse.json({ likes: likes || 0 });
        } catch (error) {
            console.error('Vercel KV Error:', error);
        }
    }

    // Fallback to local store
    const store = getLocalStore();
    return NextResponse.json({ likes: store.likes });
}

export async function POST() {
    // Check if Vercel KV is configured
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
            const likes = await kv.incr('likes');
            return NextResponse.json({ likes });
        } catch (error) {
            console.error('Vercel KV Error:', error);
        }
    }

    // Fallback to local store
    const store = getLocalStore();
    store.likes++;
    saveLocalStore(store);
    return NextResponse.json({ likes: store.likes });
}
