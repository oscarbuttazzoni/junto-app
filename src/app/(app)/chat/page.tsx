"use client";

import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="px-6 pt-14 text-center">
      <MessageCircle size={40} className="text-teal mx-auto mb-4" />
      <h1 className="font-serif text-2xl mb-2">Chat</h1>
      <p className="text-sm text-text-dim">
        Cuando aceptes un match, acá van a poder coordinar los detalles de su
        sesión.
      </p>
    </div>
  );
}
