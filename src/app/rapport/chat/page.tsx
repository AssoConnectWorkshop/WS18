"use client";

const axes = [
  "Valeurs & missions",
  "Relations extérieures",
  "Bilan des activités",
  "Membres & bénévoles",
  "Projets à venir",
];

const messages = [
  {
    role: "ai" as const,
    text: "Bonjour ! Je suis là pour vous aider à rédiger votre rapport d'activité 🎉 Pour commencer, pouvez-vous me parler des grandes actions menées par votre association cette année ?",
  },
  {
    role: "user" as const,
    text: "On a organisé 12 événements, lancé un nouveau programme jeunesse et signé 3 partenariats.",
  },
];

export default function ChatPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex gap-8 h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Discussion avec l&apos;IA</h1>
          <p className="text-gray-500 text-sm mt-1">
            Répondez aux questions pour structurer votre rapport
          </p>
        </div>

        <div className="flex-1 border rounded-2xl overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-black text-white rounded-br-sm"
                    : "bg-white border rounded-bl-sm text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Écrivez votre réponse…"
            className="flex-1 border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
          />
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Envoyer
          </button>
        </div>
      </div>

      <aside className="w-56 shrink-0 flex flex-col gap-4">
        <div className="border rounded-2xl p-5 flex flex-col gap-3">
          <h2 className="font-semibold text-sm">Axes à couvrir</h2>
          <ul className="flex flex-col gap-2">
            {axes.map((axe) => (
              <li key={axe} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-4 h-4 rounded border border-gray-300 shrink-0" />
                {axe}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-gray-400 text-center">
          Chaque axe sera coché au fil de la discussion.
        </p>
      </aside>
    </div>
  );
}
