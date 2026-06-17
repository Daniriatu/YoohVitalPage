import React from "react";

const ChatFab = () => {
  const whatsAppUrl = "https://wa.me/8619063708671";
  return (
    <button
      onClick={() => window.open(whatsAppUrl, "_blank")}
      className="chat-fab"
      id="chat-fab"
      aria-label="Contactar servicio al cliente"
      title="Chat"
    >
      💬
    </button>
  );
};

export default ChatFab;
