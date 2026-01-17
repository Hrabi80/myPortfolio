"use server";

import { z } from "zod";

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
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not configured");
      return {
        success: false,
        error: "Configuration error",
        message: "Contact form is not properly configured. Please contact the administrator.",
      };
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: `Portfolio Contact: ${subject}`,
        message,
        from_name: name,
        replyto: email,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, message: "Email sent successfully!" };
    } else {
      console.error("Web3Forms error:", data);
      return {
        success: false,
        error: "Failed to send email",
        message: data.message || "Something went wrong. Please try again.",
      };
    }
  } catch (error) {
    console.error("Server error:", error);
    return { success: false, error: "Internal server error", message: "Something went wrong." };
  }
}
