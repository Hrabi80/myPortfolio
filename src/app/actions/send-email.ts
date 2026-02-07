"use server";

import { env } from "@/env";
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
    const accessKey = env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not configured");
      return {
        success: false,
        error: "Configuration error",
        message: "Contact form is not properly configured. Please contact the administrator.",
      };
    }
     const body = JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: `Portfolio Contact: ${subject}`,
        message,
        from_name: name,
        replyto: email,
      });
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "PortfolioContact/1.0",
      },
      body: body,
    });

    const responseText = await response.text();
    const contentType = response.headers.get("content-type") || "";
    let data: { success?: boolean; message?: string } | null = null;

    if (contentType.includes("application/json")) {
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Web3Forms returned non-JSON response", {
          status: response.status,
          statusText: response.statusText,
          body: responseText.slice(0, 500),
          parseError,
        });
      }
    } else if (!response.ok) {
      // Web3Forms sometimes returns an HTML challenge page when blocked.
      console.error("Web3Forms returned non-JSON error response", {
        status: response.status,
        statusText: response.statusText,
        body: responseText.slice(0, 500),
      });
    }

    if (response.ok && data?.success) {
      return { success: true, message: "Email sent successfully!" };
    } else {
      console.error("Web3Forms error:", {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      return {
        success: false,
        error: "Failed to send email",
        message:
          data?.message ||
          (response.status === 403
            ? "Request blocked by Web3Forms. Check WEB3FORMS_ACCESS_KEY and allowed domains for your site."
            : "Something went wrong. Please try again."),
      };
    }
  } catch (error) {
    console.error("Server error:", error);
    return { success: false, error: "Internal server error", message: "Something went wrong." };
  }
}
