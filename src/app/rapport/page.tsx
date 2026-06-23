import Link from "next/link";

const modules = [
  {
    icon: "💬",
    title: "Discussion avec l'IA",
    description:
      "Répondez à quelques questions guidées. L'IA vous aide à structurer vos idées avec un ton léger.",
    href: "/rapport/chat",
    cta: "Démarrer",
  },
  {
    icon: "✅",
    title: "Validation des axes",
    description:
      "Validez et ajustez les synthèses de chaque grand axe de votre rapport.",
    href: "/rapport/axes",
    cta: "Voir les axes",
  },
  {
    icon: "📄",
    title: "Génération",
    description:
      "Exportez votre rapport en PDF, plaquette 4 pages ou vidéo courte.",
    href: "/rapport/generation",
    cta: "Générer",
  },
];

export default function RapportPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center gap-16">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-5xl font-bold tracking-tight">
          Générez votre rapport d&apos;activité
        </h1>
        <p className="text-xl text-gray-500 max-w-xl">
          En 3 étapes guidées, transformez vos données AssoConnect en un rapport
          complet — en moins de 30 minutes.
        </p>
        <div className="mt-4">
          <Link
            href="/rapport/chat"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
          >
            Commencer maintenant →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-3">
        {modules.map((mod, i) => (
          <div key={mod.href} className="border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{mod.icon}</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Étape {i + 1}
              </span>
            </div>
            <h2 className="text-xl font-semibold">{mod.title}</h2>
            <p className="text-gray-500 text-sm flex-1">{mod.description}</p>
            <Link
              href={mod.href}
              className="mt-auto inline-block border border-black px-4 py-2 rounded-full text-sm font-medium text-center hover:bg-black hover:text-white transition-colors"
            >
              {mod.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
