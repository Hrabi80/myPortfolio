import { ContactMessage } from "@/domain/entities/contact.entity";
import { MessageSender } from "@/domain/ports";

// This is a server-side only adapter. It should not be used in client components directly
// without a server action or API route, which are not available in static export.
// This serves as a reference for users who might deploy a separate worker.
export class ResendAdapter implements MessageSender {
  async send(message: ContactMessage): Promise<void> {
    console.log("ResendAdapter: Sending message....", message);
    // In a real server environment, you would use the Resend SDK here.
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });
    
    // Simulating a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("ResendAdapter: Message sent (simulated).");
  }
}
