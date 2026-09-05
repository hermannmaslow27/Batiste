import type { SiteTemplate } from "./types";

export const creativeStudioTemplate: SiteTemplate = {
  id: "creative_studio",
  name: "Aura Studio · Direction Artistique",
  category: "agency",
  tagline: "Identités remarquables & expériences digitales pour marques d'avant-garde",
  description: "Pour studios de design, directeurs artistiques, photographes et agences créatives.",
  themeId: "editorial",
  badge: "Design Award",
  previewImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&auto=format&fit=crop&q=80",
  tags: ["Portfolio Plein Écran", "Typographie Forte", "Showcase de Marques"],
  pages: [
    {
      title: "Accueil",
      slug: "",
      isHomepage: true,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Créer des marques qui capturent le regard et l'époque",
            subtitle: "Nous allions exigence typographique, intuition culturelle et technologies immersives pour façonner des univers visuels inoubliables.",
            imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Voir les études de cas",
            buttonUrl: "#projets",
            badge: "🏆 Studio de l'Année 2025",
            alignment: "left",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Sélection de Projets",
            columns: "2",
            cards: [
              {
                title: "Maison Solène · Haute Horlogerie",
                description: "Refonte d'identité globale, packaging d'exception et plateforme e-commerce éditoriale.",
                imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Komorebi · Fragrances Végétales",
                description: "Direction photographique, flaconnage sur-mesure et campagne digitale internationale.",
                imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
            ],
          },
        },
        {
          type: "stats",
          content: {
            title: "L'impact de notre démarche créative",
            stats: [
              { value: "48+", label: "Identités façonnées", description: "En Europe, aux États-Unis et en Asie" },
              { value: "14", label: "Récompenses internationales", description: "D&AD, Cannes Lions et Awwwards" },
              { value: "100%", label: "Approche sur-mesure", description: "Zéro template générique pour nos clients" },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Vous avez une vision à faire grandir ?",
            description: "Notre carnet de commandes pour le prochain trimestre est ouvert. Échangeons sur votre projet.",
            buttonText: "Planifier un rendez-vous exploratoire",
            buttonUrl: "/contact",
          },
        },
      ],
    },
  ],
};
