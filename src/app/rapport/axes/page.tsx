type Status = "validé" | "en_cours" | "à_faire";

const axes: { title: string; status: Status; summary?: string }[] = [
  {
    title: "Valeurs & missions",
    status: "en_cours",
    summary:
      "Notre association œuvre depuis 2015 pour l'insertion des jeunes par le sport. Cette année, nos actions restent pleinement alignées avec notre objet social : accompagner 150 jeunes de 15 à 25 ans vers l'autonomie.",
  },
  {
    title: "Relations extérieures",
    status: "validé",
    summary:
      "3 nouveaux partenariats signés avec la mairie, la Fondation de France et le Crédit Mutuel. Adhésion au réseau national Sport & Insertion.",
  },
  { title: "Bilan des activités", status: "à_faire" },
  { title: "Membres & bénévoles", status: "à_faire" },
  { title: "Projets à venir", status: "à_faire" },
];

const statusLabel: Record<Status, string> = {
  validé: "Validé",
  en_cours: "En cours",
  à_faire: "À faire",
};

const statusStyle: Record<Status, string> = {
  validé: "bg-green-100 text-green-700",
  en_cours: "bg-yellow-100 text-yellow-700",
  à_faire: "bg-gray-100 text-gray-400",
};

const validated = axes.filter((a) => a.status === "validé").length;

export default function AxesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Validation des axes</h1>
        <p className="text-gray-500 text-sm mt-1">
          Validez chaque axe de votre rapport
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{validated} / {axes.length} axes validés</span>
          <span>{Math.round((validated / axes.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full transition-all"
            style={{ width: `${(validated / axes.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {axes.map((axe) => (
          <div
            key={axe.title}
            className={`border rounded-2xl p-6 flex flex-col gap-4 ${
              axe.status === "à_faire" ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{axe.title}</h2>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyle[axe.status]}`}
              >
                {statusLabel[axe.status]}
              </span>
            </div>

            {axe.status === "en_cours" && axe.summary && (
              <>
                <textarea
                  defaultValue={axe.summary}
                  rows={4}
                  className="border rounded-xl p-3 text-sm w-full outline-none focus:ring-2 focus:ring-black resize-none"
                />
                <div className="flex gap-3">
                  <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Valider
                  </button>
                  <button className="border px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                    Modifier avec l&apos;IA
                  </button>
                </div>
              </>
            )}

            {axe.status === "validé" && axe.summary && (
              <p className="text-sm text-gray-600">{axe.summary}</p>
            )}

            {axe.status === "à_faire" && (
              <p className="text-sm text-gray-400">
                Complétez les axes précédents pour débloquer celui-ci.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
