import { ContactMessage } from "@/domain/entities/contact.entity";
import { MessageSender } from "@/domain/ports";
import { env } from "@/env";

export class FormspreeAdapter implements MessageSender {
  async send(message: ContactMessage): Promise<void> {
    if (!env.NEXT_PUBLIC_FORMSPREE_ID) {
      console.warn("NEXT_PUBLIC_FORMSPREE_ID is not set. Form submission will fail.");
      return;
    }

    const response = await fetch(`https://formspree.io/f/${env.NEXT_PUBLIC_FORMSPREE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Failed to send message via Formspree");
    }
  }
}
