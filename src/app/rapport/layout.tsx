"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { label: "1. Discussion", href: "/rapport/chat" },
  { label: "2. Axes", href: "/rapport/axes" },
  { label: "3. Génération", href: "/rapport/generation" },
];

export default function RapportLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <Link href="/rapport" className="font-bold text-lg shrink-0">
            Rapport d&apos;activité
          </Link>
          <nav className="flex items-center gap-1">
            {steps.map((step) => {
              const active = pathname.startsWith(step.href);
              return (
                <Link
                  key={step.href}
                  href={step.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {step.label}
                </Link>
              );
            })}
          </nav>
          <div className="shrink-0 w-32" />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
