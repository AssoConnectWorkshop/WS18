"use client";

import { useState, useRef, useCallback } from "react";

const AXES = [
  "Valeurs & missions",
  "Relations extérieures",
  "Bilan des activités",
  "Membres & bénévoles",
  "Projets à venir",
];

const INITIAL_MESSAGES = [
  {
    role: "ai" as const,
    text: "Bonjour ! Je suis là pour vous aider à rédiger votre rapport d'activité 🎉 Pour commencer, pouvez-vous me parler des grandes actions menées par votre association cette année ?",
  },
];

type Message = { role: "ai" | "user"; text: string };

// SpeechRecognition is not in the default TS lib
type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: (e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  return (
    (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ??
    (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition ??
    null
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, [input]);

  const toggleRecording = useCallback(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur. Essayez Chrome ou Edge.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      let transcript = "";
      for (let i = 0; i < Object.keys(e.results).length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [isRecording]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex gap-8 h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1B3A]">Discussion avec l&apos;IA</h1>
          <p className="text-[#6B6887] text-sm mt-1">
            Répondez aux questions pour structurer votre rapport
          </p>
        </div>

        <div className="flex-1 border border-[#E4E2F0] rounded-2xl overflow-y-auto p-6 flex flex-col gap-4 bg-[#F8F7FF]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-[#5C3DD8] text-white rounded-br-sm"
                    : "bg-white border border-[#E4E2F0] rounded-bl-sm text-[#1C1B3A]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={toggleRecording}
            title={isRecording ? "Arrêter l'enregistrement" : "Dicter votre réponse"}
            className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-200"
                : "border border-[#E4E2F0] text-[#6B6887] hover:border-[#5C3DD8] hover:text-[#5C3DD8]"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2Zm7 8a1 1 0 0 1 1 1 8 8 0 0 1-7 7.938V21h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-1.062A8 8 0 0 1 4 12a1 1 0 1 1 2 0 6 6 0 1 0 12 0 1 1 0 0 1 1-1Z" />
            </svg>
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRecording ? "Parlez maintenant…" : "Écrivez ou dictez votre réponse…"}
            className="flex-1 border border-[#E4E2F0] rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5C3DD8]"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="shrink-0 bg-[#5C3DD8] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#4A2FB8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Envoyer
          </button>
        </div>
        {isRecording && (
          <p className="text-xs text-red-500 text-center -mt-2">
            Enregistrement en cours… cliquez sur le micro pour arrêter.
          </p>
        )}
      </div>

      <aside className="w-56 shrink-0 flex flex-col gap-4">
        <div className="bg-white border border-[#E4E2F0] shadow-sm rounded-2xl p-5 flex flex-col gap-3">
          <h2 className="font-semibold text-sm text-[#1C1B3A]">Axes à couvrir</h2>
          <ul className="flex flex-col gap-2">
            {AXES.map((axe) => (
              <li key={axe} className="flex items-center gap-2 text-sm text-[#6B6887]">
                <span className="w-4 h-4 rounded border border-[#E4E2F0] shrink-0" />
                {axe}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-[#6B6887] text-center">
          Chaque axe sera coché au fil de la discussion.
        </p>
      </aside>
    </div>
  );
}
