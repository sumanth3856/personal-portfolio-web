import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const storePath = path.join(process.cwd(), 'src/data/store.json');

function getLocalStore() {
    if (!fs.existsSync(storePath)) {
        return { likes: 0, messages: [] };
    }
    const data = fs.readFileSync(storePath, 'utf8');
    return JSON.parse(data);
}

interface StoreData {
    likes: number;
    messages: unknown[];
}

function saveLocalStore(data: StoreData) {
    fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const body = await request.json();
    const messageData = {
        ...body,
        date: new Date().toISOString(),
    };

    // 1. Send Email via Resend (if API Key is present)
    console.log("Checking Resend API Key:", process.env.RESEND_API_KEY ? "Present" : "Missing");

    if (process.env.RESEND_API_KEY && resend) {
        try {
            console.log("Attempting to send email to:", 'saisumanthstylest3856@gmail.com');
            const emailResponse = await resend.emails.send({
                from: 'Portfolio Contact <onboarding@resend.dev>', // Default Resend testing domain
                to: 'saisumanthstylest3856@gmail.com', // User's email from store.json
                subject: `New Contact Form Submission from ${messageData.name}`,
                html: `
          <h1>New Message</h1>
          <p><strong>Name:</strong> ${messageData.name}</p>
          <p><strong>Email:</strong> ${messageData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${messageData.message}</p>
        `,
            });

            if (emailResponse.error) {
                console.error("Resend API returned error:", emailResponse.error);
                return NextResponse.json({ success: false, error: emailResponse.error.message || 'Failed to send email' }, { status: 500 });
            } else {
                console.log("Resend Success - Email ID:", emailResponse.data?.id);
            }
        } catch (error) {
            console.error('Resend Exception:', error);
            const errorMessage = error instanceof Error ? error.message : 'Resend Exception';
            return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
        }
    }

    // 2. Persist to Vercel KV (if configured)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
            await kv.lpush('messages', messageData);
            return NextResponse.json({ success: true });
        } catch (error) {
            console.error('Vercel KV Error:', error);
        }
    }

    // 3. Fallback to local store (Only in development or if FS is writable)
    try {
        const store = getLocalStore();
        store.messages.push(messageData);
        saveLocalStore(store);
    } catch (error) {
        console.warn('Could not save to local store (expected in Vercel production):', error);
        // Do not fail the request if local save fails, as email/KV might have succeeded
    }

    return NextResponse.json({ success: true });
}
