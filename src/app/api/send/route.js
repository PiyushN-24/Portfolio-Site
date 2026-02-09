import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // you receive it here
      replyTo: email, // reply goes to visitor
      subject: `[Portfolio] ${subject}`,
      text: `
From: ${email}

${message}
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("SMTP error:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
