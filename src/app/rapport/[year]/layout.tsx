"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

export default function YearLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const pathname = usePathname();

  const steps = [
    { label: "1. Discussion", href: `/rapport/${year}/chat` },
    { label: "2. Axes", href: `/rapport/${year}/axes` },
    { label: "3. Génération", href: `/rapport/${year}/generation` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <Link href="/rapport" className="text-sm text-gray-500 hover:text-gray-900 transition-colors shrink-0">
            ← Tous les rapports
          </Link>
          <nav className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-400 mr-2">{year}</span>
            {steps.map((step) => {
              const active = pathname === step.href || pathname.startsWith(step.href + "/");
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
          <div className="shrink-0 w-40" />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
