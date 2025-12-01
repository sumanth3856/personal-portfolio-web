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
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #1a1a1a;
      color: #ffffff;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 32px;
    }
    .field {
      margin-bottom: 24px;
    }
    .label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #666666;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .value {
      font-size: 16px;
      color: #1a1a1a;
    }
    .message-box {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 16px;
      white-space: pre-wrap;
    }
    .footer {
      background-color: #f9fafb;
      padding: 16px;
      text-align: center;
      font-size: 12px;
      color: #666666;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Inquiry</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value"><strong>${name}</strong> (<a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>)</div>
      </div>
      
      <div class="field">
        <div class="label">Message</div>
        <div class="value message-box">${message}</div>
      </div>
    </div>
    <div class="footer">
      <p>This message was sent from your portfolio contact form.</p>
      <p>&copy; ${new Date().getFullYear()} Sai Sumanth Portfolio</p>
    </div>
  </div>
</body>
</html>
  `;
}
