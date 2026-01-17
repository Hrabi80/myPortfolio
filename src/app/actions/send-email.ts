"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type SendEmailState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function sendEmail(prevState: SendEmailState, formData: FormData): Promise<SendEmailState> {
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields",
      message: validatedFields.error.errors[0].message,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Update this with your verified domain if available
      to: ["hrabi.ahmed8@gmail.com"],
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send email", message: error.message };
    }

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Server error:", error);
    return { success: false, error: "Internal server error", message: "Something went wrong." };
  }
}
