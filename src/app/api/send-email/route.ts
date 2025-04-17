// PLUGINS & OTHER
import { Resend } from 'resend';

// retrieves api key from env variables to autorthize the app to send emails using your resend account
const resend = new Resend(process.env.RESEND_API_KEY);

// POST
export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `Framing Dragon Inquiry: Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>

        <br/><br/>
        <div style="display: flex; align-items: center; gap: 10px; margin-top: 30px;">
          <a href="https://graybuckmedia.com" target="_blank" style="display: inline-block;">
            <img 
              src="https://graybuckmedia.com/imgs/graybuck_logo.png" 
              alt="Graybuck Media Logo" 
              style="border-radius: 6px; height: 50px; width: auto; cursor: pointer;" 
            />
          </a>
          <p style="font-style: italic; color: #888; margin: 0;">
            Powered by Graybuck Media | Web Design, Web Development, Photo, & Video<br/>
            <span style="font-size: 12px;">Evolving creatively, protecting your vision</span>
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
