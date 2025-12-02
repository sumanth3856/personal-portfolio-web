# Deployment Guide

Your portfolio is ready to be deployed to Vercel!

## 1. Push to GitHub

## 2. Import to Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your repository: `personal-portfolio-web`.
4.  Framework Preset: **Next.js** (should be auto-detected).

## 3. Environment Variables
In the "Environment Variables" section of the deployment screen, add the following:

| Variable Name | Description | Required? |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Your API key from [Resend.com](https://resend.com) | **Yes** (for emails) |
| `KV_REST_API_URL` | Vercel KV URL | Optional (for persistence) |
| `KV_REST_API_TOKEN` | Vercel KV Token | Optional (for persistence) |

*Note: If you don't add KV variables, the app will work but likes/messages won't be saved permanently in production (they will reset on redeploy).*

## 4. Deploy
Click **"Deploy"**. Vercel will build your site and give you a live URL (e.g., `personal-portfolio-web.vercel.app`).

## 5. Verify
Visit your live URL and check:
-   **Home Page**: Should look correct.
-   **Contact Form**: Try sending a message (check your email).
