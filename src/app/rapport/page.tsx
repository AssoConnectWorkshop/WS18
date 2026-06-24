import Link from "next/link";

const years = [
  {
    year: 2026,
    badge: "En cours",
    badgeStyle: "bg-[#F0EEFF] text-[#5C3DD8]",
    subtitle: "Année fiscale en cours",
    cta: "Ouvrir",
  },
  {
    year: 2025,
    badge: "À démarrer",
    badgeStyle: "bg-gray-100 text-gray-500",
    subtitle: "Préparer l'AG 2026",
    cta: "Démarrer",
  },
  {
    year: 2024,
    badge: "Archivé",
    badgeStyle: "bg-gray-100 text-gray-400",
    subtitle: "Rapport clôturé",
    cta: "Consulter",
  },
];

export default function RapportIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-[#1C1B3A]">Rapport d&apos;activité</h1>
        <p className="text-[#6B6887] text-lg">Sélectionnez l&apos;année à éditer</p>
      </div>

      <div className="flex flex-col gap-4">
        {years.map(({ year, badge, badgeStyle, subtitle, cta }) => (
          <div key={year} className="bg-white border border-[#E4E2F0] shadow-sm rounded-2xl p-6 flex items-center gap-6 hover:shadow-md transition-shadow">
            <span className="text-5xl font-bold w-28 shrink-0 text-[#1C1B3A]">{year}</span>
            <div className="flex-1 flex flex-col gap-1">
              <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${badgeStyle}`}>
                {badge}
              </span>
              <p className="text-[#6B6887] text-sm mt-1">{subtitle}</p>
            </div>
            <Link
              href={`/rapport/${year}`}
              className="shrink-0 bg-[#5C3DD8] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#4A2FB8] transition-colors"
            >
              {cta}
            </Link>
          </div>
        ))}

        <Link
          href="/rapport/2027"
          className="border-2 border-dashed border-[#E4E2F0] rounded-2xl p-6 flex items-center justify-center gap-3 text-[#6B6887] hover:text-[#5C3DD8] hover:border-[#5C3DD8] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">Nouvelle année</span>
        </Link>
      </div>
    </div>
  );
}
