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
  tags: ["Portfolio Plein Écran", "Typographie Forte", "Showcase de Marques", "Contact & Devis"],
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
            buttonUrl: "/portfolio",
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
                buttonUrl: "/portfolio",
              },
              {
                title: "Komorebi · Fragrances Végétales",
                description: "Direction photographique, flaconnage sur-mesure et campagne digitale internationale.",
                imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&auto=format&fit=crop&q=80",
                buttonUrl: "/portfolio",
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
          type: "testimonials",
          content: {
            title: "Ce qu'en disent nos partenaires",
            items: [
              {
                quote: "Aura Studio a su capturer l'essence mystérieuse et moderne de notre maison avec une précision stylistique rare.",
                name: "Éléonore de Vance",
                role: "Fondatrice @ Maison Solène",
                avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
              },
              {
                quote: "Une direction artistique audacieuse qui nous a permis de remporter le prix du meilleur lancement produit de l'année.",
                name: "Kenji Takahashi",
                role: "Directeur de Création @ Komorebi Paris",
                avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
              },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Une vision à concrétiser ?",
            description: "Nous acceptons un nombre limité de collaborations par trimestre pour garantir un investissement total.",
            buttonText: "Initier une collaboration",
            buttonUrl: "/contact",
          },
        },
      ],
    },
    {
      title: "Portfolio",
      slug: "portfolio",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Nos Réalisations Récentes",
            subtitle: "Une anthologie de récits visuels, de systèmes d'identités et d'expériences interactives haute couture.",
            imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Démarrer un projet",
            buttonUrl: "/contact",
            badge: "📂 Projets 2024 - 2026",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Études de Cas Approfondies",
            columns: "3",
            cards: [
              {
                title: "Vogue Scénographie · Défilé Hiver",
                description: "Installation lumineuse monumentale et typographie générative sur les façades du Palais Royal.",
                imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Aura Audio · Casque Haute-Fidélité",
                description: "Design produit en aluminium brossé et expérience digitale 3D WebGL pour le lancement mondial.",
                imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Revue Diptyque · Édition Limitée",
                description: "Livre d'art de 300 pages imprimé sur papier d'art japonais avec tranche dorée à chaud.",
                imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Contact & Devis",
      slug: "contact",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Donnons vie à votre vision",
            subtitle: "Partagez vos ambitions, vos délais et vos attentes. Nous reviendrons vers vous avec une proposition d'intention sous 48 heures.",
            imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Remplir le formulaire",
            buttonUrl: "#contact-form",
            badge: "✨ Studio basé à Paris & disponible mondialement",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "contact_form",
          content: {
            title: "Formulaire de contact & brief projet",
            description: "Décrivez brièvement la nature de votre besoin (branding, direction artistique, site web ou packaging).",
            email: "hello@aurastudio.design",
            phone: "+33 1 75 43 90 22",
            address: "8 place de la Bastille, 75011 Paris",
          },
        },
        {
          type: "faq",
          content: {
            title: "Processus de collaboration",
            questions: [
              {
                question: "Quels sont vos délais habituels ?",
                answer: "Une refonte d'identité complète nécessite généralement entre 4 et 8 semaines. Les projets de plateformes digitales s'étendent de 6 à 12 semaines selon la complexité.",
              },
              {
                question: "Travaillez-vous avec des clients internationaux ?",
                answer: "Oui, près de la moitié de nos clients sont situés à New York, Londres, Tokyo et Genève. Nos échanges s'organisent sans friction à distance.",
              },
            ],
          },
        },
      ],
    },
  ],
};
