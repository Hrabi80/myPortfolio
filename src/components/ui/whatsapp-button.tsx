import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/21627797784"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl animate-bounce-soft"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </a>
  );
}
