interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function generateEmailHtml({ name, email, message }: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #1a1a1a; color: #ffffff; padding: 24px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Portfolio Inquiry</h1>
    </div>
    <div style="padding: 32px;">
      <div style="margin-bottom: 24px;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #666666; font-weight: 600; margin-bottom: 4px;">From</div>
        <div style="font-size: 16px; color: #1a1a1a;"><strong>${name}</strong> (<a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>)</div>
      </div>
      
      <div style="margin-bottom: 24px;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #666666; font-weight: 600; margin-bottom: 4px;">Message</div>
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; white-space: pre-wrap; font-size: 16px; color: #1a1a1a;">${message}</div>
      </div>
    </div>
    <div style="background-color: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0 0 8px 0;">This message was sent from your portfolio contact form.</p>
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Sai Sumanth Portfolio</p>
    </div>
  </div>
</body>
</html>
  `;
}
