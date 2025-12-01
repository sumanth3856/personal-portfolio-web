import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextResponse } from 'next/server';

// Mock Resend
const mockSend = vi.fn();
vi.mock('resend', () => {
    return {
        Resend: class {
            emails = {
                send: mockSend,
            };
        },
    };
});

// Mock fs and path
vi.mock('fs', () => ({
    default: {
        existsSync: vi.fn(),
        readFileSync: vi.fn(),
        writeFileSync: vi.fn(),
    },
}));

vi.mock('path', () => ({
    default: {
        join: vi.fn((...args) => args.join('/')),
    },
}));

// Mock process.cwd
vi.spyOn(process, 'cwd').mockReturnValue('/mock/cwd');

// Mock Vercel KV
vi.mock('@vercel/kv', () => ({
    kv: {
        lpush: vi.fn(),
    },
}));

describe('Contact API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules(); // Reset modules to re-evaluate top-level code
        process.env.RESEND_API_KEY = 're_123';
    });

    afterEach(() => {
        delete process.env.RESEND_API_KEY;
    });

    it('should send an email and return success when API key is present', async () => {
        mockSend.mockResolvedValue({ data: { id: 'email_123' }, error: null });

        // Dynamic import to ensure env var is picked up
        const { POST } = await import('./route');

        const request = new Request('http://localhost/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Hello world',
            }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({
            to: 'saisumanth3856@gmail.com',
            subject: expect.stringContaining('New Message from Test User'),
            html: expect.stringContaining('New Portfolio Inquiry'),
        }));
        expect(data).toEqual({ success: true });
    });

    it('should handle Resend API errors', async () => {
        mockSend.mockResolvedValue({ data: null, error: { message: 'Resend Error' } });

        const { POST } = await import('./route');

        const request = new Request('http://localhost/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Hello world',
            }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ success: false, error: 'Resend Error' });
    });
});
