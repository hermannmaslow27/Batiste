import type { SiteTemplate } from "./types";

export const craftArtisanTemplate: SiteTemplate = {
  id: "craft_artisan",
  name: "Atelier Végétal & Céramique",
  category: "craft",
  tagline: "Créations uniques en grès pyrité et art floral contemporain",
  description: "Idéal pour céramistes, ébénistes, bijoutiers, créateurs indépendants et ateliers d'art.",
  themeId: "nordic",
  previewImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop&q=80",
  tags: ["Storytelling", "Galerie d'œuvres", "Demande de sur-mesure"],
  pages: [
    {
      title: "Accueil",
      slug: "",
      isHomepage: true,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Façonner la matière, célébrer l'organique",
            subtitle: "Chaque pièce est tournée à la main dans notre atelier, cuite au grand feu et pensée pour traverser le temps avec poésie.",
            imageUrl: "https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Découvrir la collection",
            buttonUrl: "#collection",
            badge: "🌿 Pièces uniques numérotées",
            alignment: "left",
            overlay: true,
          },
        },
        {
          type: "rich_text",
          content: {
            title: "La philosophie de l'Atelier",
            content: "Nous croyons en un artisanat lent, patient et respectueux de la terre.\n\nChaque courbe, chaque texture rugueuse ou satinée témoigne du dialogue entre la main de l'artisan et l'alchimie du feu.\n\nNos émaux sont formulés sur place à base de cendres végétales et de minéraux purs, garantissant des teintes singulières et inimitables.",
            alignment: "left",
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Séries Récentes",
            columns: "3",
            cards: [
              {
                title: "Vases Cratère en Grès Brut",
                description: "Émaillage partiel à la cendre de chêne, terre chamottée cuite à 1280°C.",
                imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Services à Thé Minéral",
                description: "Théière galet avec filtre intégré et quatre bols façonnés au pincé.",
                imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Suspensions Lumineuses Céladon",
                description: "Porcelaine translucide diffusant une clarté douce et apaisante.",
                imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
            ],
          },
        },
        {
          type: "form",
          content: {
            title: "Commander une pièce sur-mesure",
            description: "Vous avez un projet pour votre intérieur, votre table ou une scénographie ? Parlons-en.",
            submitText: "Transmettre ma demande",
            successMessage: "Merci pour votre message. Nous vous répondrons avec croquis et devis sous 48 heures.",
            fields: [
              { label: "Nom & Prénom", type: "text", required: true },
              { label: "Email", type: "email", required: true },
              { label: "Type de pièce souhaitée (Vase, Service, Sculpture...)", type: "text", required: true },
              { label: "Description de votre idée ou dimensions envisagées", type: "textarea", required: true },
            ],
          },
        },
      ],
    },
  ],
};
