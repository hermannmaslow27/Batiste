"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function MarketingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Puis-je utiliser mon propre nom de domaine personnalisé ?",
      a: "Oui, absolument ! Dès la formule Pro, vous pouvez connecter n'importe quel domaine personnalisé (ex: www.votremarque.com ou www.mon-atelier.fr). Nous fournissons les enregistrements DNS simples et générons automatiquement le certificat SSL HTTPS sécurisé.",
    },
    {
      q: "Faut-il savoir coder pour concevoir un site sur Batiste ?",
      a: "Non, aucune compétence technique ni ligne de code n'est requise. Tout se fait visuellement via notre Studio de conception réactif. Vous choisissez vos blocs, personnalisez vos contenus et vos styles en direct avec aperçu instantané sur ordinateur et smartphone.",
    },
    {
      q: "Comment fonctionne la gestion multilingue ?",
      a: "Batiste gère nativement le multilingue sans installer d'extension. Vous pouvez activer le français, l'anglais ou d'autres langues. Chaque page et article possède sa version traduite, et un sélecteur de langue s'affiche automatiquement pour vos visiteurs.",
    },
    {
      q: "Mes données et messages de contact sont-ils sécurisés ?",
      a: "Tout est chiffré et stocké de façon isolée selon les meilleures normes de sécurité. Dès qu'un prospect remplit un devis ou un formulaire, la demande arrive en temps réel dans votre tableau de bord sans intermédiaire.",
    },
    {
      q: "Puis-je changer d'univers graphique (thème) à tout moment ?",
      a: "Oui ! C'est l'une des grandes forces de Batiste : votre contenu (textes, images, produits) est indépendant du thème graphique. Vous pouvez basculer d'un style épuré à un style sombre ou coloré en un clic sans jamais perdre vos informations.",
    },
  ];

  return (
    <div id="faq" className="border-t border-zinc-200/80 bg-zinc-50/60 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Foire aux questions
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Questions fréquentes
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Tout ce que vous devez savoir avant de lancer votre site ou application.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-zinc-900 transition hover:bg-zinc-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`size-4 text-zinc-400 shrink-0 ml-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-zinc-900" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
