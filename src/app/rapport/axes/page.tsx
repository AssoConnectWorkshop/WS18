"use client";

import { useState } from "react";

type Status = "validé" | "en_cours" | "à_faire";

type Axe = {
  title: string;
  description: string;
  status: Status;
  summary: string;
};

const INITIAL_AXES: Axe[] = [
  {
    title: "Valeurs & missions",
    description: "Objet social, alignement des actions avec les engagements fondateurs",
    status: "en_cours",
    summary:
      "Notre association œuvre depuis 2015 pour l'insertion des jeunes par le sport. Cette année, nos actions restent pleinement alignées avec notre objet social : accompagner 150 jeunes de 15 à 25 ans vers l'autonomie. Le lancement d'un nouveau programme jeunesse confirme cet engagement fondateur.",
  },
  {
    title: "Relations extérieures",
    description: "Partenaires, fédérations, collectivités, mécènes",
    status: "à_faire",
    summary:
      "3 nouveaux partenariats ont été signés cette année : la mairie, la Fondation de France et le Crédit Mutuel. L'association a également rejoint le réseau national Sport & Insertion, renforçant sa visibilité nationale.",
  },
  {
    title: "Bilan des activités",
    description: "Actions menées, résultats obtenus, ressources mobilisées",
    status: "à_faire",
    summary:
      "12 événements organisés sur l'année, réunissant plus de 400 participants au total. Le programme jeunesse lancé en mars a déjà accompagné 38 jeunes. Deux projets n'ont pas abouti faute de financement — une leçon intégrée pour 2025.",
  },
  {
    title: "Membres & bénévoles",
    description: "Évolution des adhésions, bénévoles investis",
    status: "à_faire",
    summary:
      "L'association compte 210 membres actifs, en hausse de 15% par rapport à l'an dernier. 34 bénévoles ont contribué aux événements, dont 8 particulièrement investis tout au long de l'année.",
  },
  {
    title: "Projets à venir",
    description: "Chantiers pour l'année suivante, moyens envisagés",
    status: "à_faire",
    summary:
      "Pour 2025, trois chantiers prioritaires : l'ouverture d'un deuxième site, la création d'un fonds de dotation, et le développement d'un partenariat avec l'Éducation nationale. Un budget prévisionnel de 180 000 € est envisagé.",
  },
];

const REFRESH_VARIANTS: Record<string, string[]> = {
  "Valeurs & missions": [
    "Notre association, fondée en 2015, place l'insertion par le sport au cœur de son projet. Avec 150 jeunes accompagnés et un nouveau programme jeunesse, l'année confirme la cohérence entre nos valeurs et nos actions concrètes.",
    "Depuis sa création, l'association défend une vision : le sport comme vecteur d'insertion et d'autonomie. En 2024, chaque action menée — des 12 événements au programme jeunesse — reflète fidèlement cet objet social.",
  ],
  "Relations extérieures": [
    "L'année 2024 marque une consolidation de nos alliances : 3 partenariats signés (mairie, Fondation de France, Crédit Mutuel) et une adhésion au réseau national Sport & Insertion qui ouvre de nouvelles perspectives.",
    "Nos relations extérieures se sont enrichies de 3 nouveaux partenaires stratégiques. L'intégration au réseau Sport & Insertion renforce notre ancrage dans l'écosystème national de l'insertion par le sport.",
  ],
  "Bilan des activités": [
    "12 événements, 400+ participants, 38 jeunes accompagnés par le programme jeunesse : 2024 a été dense. Deux initiatives n'ont pas abouti — nous les documentons honnêtement pour en tirer les enseignements.",
    "Une année rythmée par 12 événements et le lancement réussi du programme jeunesse (38 jeunes). Les échecs sont assumés : deux projets stoppés faute de financement, des leçons précieuses pour 2025.",
  ],
  "Membres & bénévoles": [
    "210 membres actifs (+15%), 34 bénévoles mobilisés dont 8 piliers de l'association : la communauté grandit et s'engage. Mention spéciale à nos bénévoles de longue date pour leur fidélité.",
    "La dynamique d'adhésion est forte : +15% de membres cette année. 34 bénévoles ont donné de leur temps, certains sur la quasi-totalité des événements — un capital humain précieux à valoriser.",
  ],
  "Projets à venir": [
    "2025 s'annonce ambitieux : deuxième site, fonds de dotation, partenariat Éducation nationale. Un budget prévisionnel de 180 000 € structure ces ambitions avec réalisme.",
    "Trois projets structurants pour 2025 : expansion géographique, diversification des financements et ancrage institutionnel renforcé. Le budget prévisionnel de 180 000 € reflète notre trajectoire de croissance.",
  ],
};

const statusStyle: Record<Status, string> = {
  validé: "bg-green-100 text-green-700",
  en_cours: "bg-blue-100 text-blue-700",
  à_faire: "bg-gray-100 text-gray-400",
};

const statusLabel: Record<Status, string> = {
  validé: "Validé ✓",
  en_cours: "En cours",
  à_faire: "À faire",
};

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

export default function AxesPage() {
  const [axes, setAxes] = useState<Axe[]>(INITIAL_AXES);
  const [drafts, setDrafts] = useState<Record<string, string>>(
    Object.fromEntries(INITIAL_AXES.map((a) => [a.title, a.summary]))
  );
  const [refreshing, setRefreshing] = useState<Record<string, boolean>>({});
  const [variantIndex, setVariantIndex] = useState<Record<string, number>>({});

  const validated = axes.filter((a) => a.status === "validé").length;

  const validate = (title: string) => {
    setAxes((prev) => {
      const idx = prev.findIndex((a) => a.title === title);
      return prev.map((a, i) => {
        if (a.title === title) return { ...a, status: "validé", summary: drafts[title] };
        if (i === idx + 1 && a.status === "à_faire") return { ...a, status: "en_cours" };
        return a;
      });
    });
  };

  const unvalidate = (title: string) => {
    setAxes((prev) =>
      prev.map((a) => (a.title === title ? { ...a, status: "en_cours" } : a))
    );
  };

  const refresh = (title: string) => {
    setRefreshing((prev) => ({ ...prev, [title]: true }));
    const variants = REFRESH_VARIANTS[title] ?? [];
    const nextIdx = ((variantIndex[title] ?? -1) + 1) % variants.length;
    setTimeout(() => {
      if (variants.length > 0) {
        setDrafts((prev) => ({ ...prev, [title]: variants[nextIdx] }));
        setVariantIndex((prev) => ({ ...prev, [title]: nextIdx }));
      }
      setRefreshing((prev) => ({ ...prev, [title]: false }));
    }, 1400);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Validation des axes</h1>
        <p className="text-gray-500 text-sm mt-1">
          Relisez, ajustez et validez chaque axe de votre rapport
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{validated} / {axes.length} axes validés</span>
          <span>{Math.round((validated / axes.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full transition-all duration-500"
            style={{ width: `${(validated / axes.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="text-xs text-gray-400 flex items-center gap-2 -mt-4">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Synthèses générées à partir de votre discussion — actualisez ou modifiez avant de valider.
      </div>

      <div className="flex flex-col gap-4">
        {axes.map((axe) => (
          <div
            key={axe.title}
            className={`border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${
              axe.status === "à_faire" ? "opacity-40" : ""
            } ${axe.status === "validé" ? "bg-green-50 border-green-200" : ""}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{axe.title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{axe.description}</p>
              </div>
              <span className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full ${statusStyle[axe.status]}`}>
                {statusLabel[axe.status]}
              </span>
            </div>

            {axe.status === "en_cours" && (
              <>
                <textarea
                  value={drafts[axe.title]}
                  onChange={(e) =>
                    setDrafts((prev) => ({ ...prev, [axe.title]: e.target.value }))
                  }
                  rows={4}
                  disabled={refreshing[axe.title]}
                  className="border rounded-xl p-3 text-sm w-full outline-none focus:ring-2 focus:ring-black resize-none disabled:opacity-50 disabled:bg-gray-50"
                />
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => validate(axe.title)}
                    disabled={!drafts[axe.title]?.trim()}
                    className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Valider cet axe
                  </button>
                  <button
                    onClick={() => refresh(axe.title)}
                    disabled={refreshing[axe.title]}
                    className="border px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshIcon spinning={!!refreshing[axe.title]} />
                    {refreshing[axe.title] ? "Actualisation…" : "Actualiser la synthèse"}
                  </button>
                </div>
              </>
            )}

            {axe.status === "validé" && (
              <>
                <p className="text-sm text-gray-700">{axe.summary}</p>
                <button
                  onClick={() => unvalidate(axe.title)}
                  className="self-start text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
                >
                  Modifier cet axe
                </button>
              </>
            )}

            {axe.status === "à_faire" && (
              <p className="text-sm text-gray-400">
                Validez l&apos;axe précédent pour débloquer celui-ci.
              </p>
            )}
          </div>
        ))}
      </div>

      {validated === axes.length && (
        <div className="border border-green-300 bg-green-50 rounded-2xl p-6 text-center flex flex-col gap-3">
          <p className="font-semibold text-green-800">Tous les axes sont validés 🎉</p>
          <a
            href="/rapport/generation"
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Passer à la génération →
          </a>
        </div>
      )}
    </div>
  );
}
