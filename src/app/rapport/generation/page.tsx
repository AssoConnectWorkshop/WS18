const formats = [
  {
    icon: "📄",
    title: "Rapport PDF complet",
    description:
      "Document normatif complet pour l'AG ou les financeurs. Inclut tous les axes, données chiffrées et narratif.",
  },
  {
    icon: "🗂️",
    title: "Plaquette 4 pages",
    description:
      "Présentation synthétique pour le board, partenaires ou presse. Mise en page professionnelle prête à imprimer.",
  },
  {
    icon: "🎬",
    title: "Vidéo courte",
    description:
      "Les chiffres clés de votre année en vidéo. Idéal pour l'AG ou les réseaux sociaux.",
  },
];

export default function GenerationPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold">Génération des formats</h1>
        <p className="text-gray-500 text-sm mt-1">
          Choisissez les formats à exporter
        </p>
      </div>

      <div className="border border-yellow-200 bg-yellow-50 rounded-2xl px-6 py-4 text-sm text-yellow-800">
        Terminez la validation de vos 5 axes pour débloquer la génération.
      </div>

      <div className="flex flex-col gap-4">
        {formats.map((fmt) => (
          <div
            key={fmt.title}
            className="border rounded-2xl p-6 flex items-center gap-6 opacity-60"
          >
            <span className="text-4xl shrink-0">{fmt.icon}</span>
            <div className="flex-1 flex flex-col gap-1">
              <h2 className="font-semibold">{fmt.title}</h2>
              <p className="text-sm text-gray-500">{fmt.description}</p>
            </div>
            <button
              disabled
              className="shrink-0 bg-gray-100 text-gray-400 px-5 py-2 rounded-full text-sm font-medium cursor-not-allowed"
            >
              Bientôt disponible
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
