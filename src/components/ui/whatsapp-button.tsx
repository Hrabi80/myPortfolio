export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/21627797784"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="currentColor"
      >
        <path d="M12.04 2a9.94 9.94 0 0 0-8.5 15.1L2 22l5.1-1.5A9.94 9.94 0 1 0 12.04 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.02.9.92-2.95-.19-.3a8.19 8.19 0 1 1 7.77 3.67Zm4.77-6.2c-.26-.13-1.56-.77-1.8-.86-.24-.09-.41-.13-.58.13-.17.26-.67.86-.82 1.03-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.1-1.27-.78-.7-1.3-1.56-1.46-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44h-.5c-.17 0-.45.07-.68.32-.23.26-.9.88-.9 2.14 0 1.25.92 2.46 1.05 2.63.13.17 1.8 2.76 4.36 3.87.61.26 1.08.42 1.45.54.61.2 1.17.17 1.61.1.49-.07 1.56-.64 1.78-1.26.22-.62.22-1.15.15-1.26-.06-.11-.24-.17-.5-.3Z" />
      </svg>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
