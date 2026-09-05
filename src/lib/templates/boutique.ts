import type { SiteTemplate } from "./types";

export const boutiqueTemplate: SiteTemplate = {
  id: "boutique",
  name: "Maison Botanique · Soins Naturels",
  category: "retail",
  tagline: "Rituels cosmétiques bio, herboristerie moderne et bien-être",
  description: "Idéal pour marques de cosmétiques, boutiques artisanales, épiceries fines et créateurs bien-être.",
  themeId: "emerald",
  badge: "Bio & Éthique",
  previewImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80",
  tags: ["Catalogue Produits", "Ingrédients Sains", "Boutique Showcase", "Consultation Beauté"],
  pages: [
    {
      title: "Accueil",
      slug: "",
      isHomepage: true,
      blocks: [
        {
          type: "hero",
          content: {
            title: "La puissance des plantes dans un rituel quotidien",
            subtitle: "Des formules botaniques pures, certifiées biologiques, fabriquées en Provence dans le respect absolu de votre peau et des écosystèmes.",
            imageUrl: "https://images.unsplash.com/photo-1608248597359-bb436b7617b0?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Explorer les collections",
            buttonUrl: "/collections",
            badge: "🌿 100% Origine Naturelle certifiée",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Nos Essentiels Iconiques",
            columns: "3",
            cards: [
              {
                title: "Sérum Botanique Éclat",
                description: "Huile de pépins de figue de barbarie et vitamine C naturelle pour un teint lumineux et défatigué.",
                imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/collections",
              },
              {
                title: "Baume Réconfortant Karité & Néroli",
                description: "Texture fondante nourrissante pour peaux sensibles, parfum doux de fleur d'oranger.",
                imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/collections",
              },
              {
                title: "Brume Florale de Bleuet & Sauge",
                description: "Hydrolat apaisant anti-pollution pour rafraîchir et tonifier l'épiderme tout au long de la journée.",
                imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/collections",
              },
            ],
          },
        },
        {
          type: "stats",
          content: {
            title: "Nos engagements de transparence",
            stats: [
              { value: "0%", label: "Pétrochimie & silicones", description: "Formules biodégradables non polluantes" },
              { value: "100%", label: "Flacons en verre recyclable", description: "Système de consigne en boutique" },
              { value: "99.4%", label: "Satisfaction de nos clientes", description: "Sur plus de 2 800 commandes expédiées" },
            ],
          },
        },
        {
          type: "testimonials",
          content: {
            title: "Avis vérifiés de notre communauté",
            items: [
              {
                quote: "Le Sérum Éclat a complètement transformé ma peau en trois semaines. Fini les tiraillements, le grain est velouté !",
                name: "Juliette Ferrand",
                role: "Cliente fidèle depuis 2 ans",
                avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
              },
              {
                quote: "Une éthique irréprochable et des senteurs délicates. C'est le cadeau parfait pour mes proches soucieux de la nature.",
                name: "Marc Antoine D.",
                role: "Adepte de soins clean",
                avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
              },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Envie d'un diagnostic personnalisé de votre peau ?",
            description: "Prenez rendez-vous pour un bilan de routine offert de 20 minutes avec notre naturopathe cosmétique.",
            buttonText: "Prendre rendez-vous",
            buttonUrl: "/boutique",
          },
        },
      ],
    },
    {
      title: "Collections & Rituels",
      slug: "collections",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Nos Gammes de Soins Botaniques",
            subtitle: "Une sélection raisonnée d'élixirs, crèmes végétales et infusions cosmétiques récoltées en agriculture biologique.",
            imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Visiter l'herboristerie",
            buttonUrl: "/boutique",
            badge: "🌿 Certifié Ecocert Cosmos Organic",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Les Rituels par Type de Peau",
            columns: "3",
            cards: [
              {
                title: "Rituel Éclat & Anti-Oxydant",
                description: "Pour peaux ternes ou fatiguées : vitamine C végétale, grenade et huile précieuse d'argousier.",
                imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/boutique",
              },
              {
                title: "Rituel Nutrition & Apaisement",
                description: "Pour peaux sèches et sensibles : extrait de camomille matricaire, avoine colloïdale et cire d'abeille bio.",
                imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/boutique",
              },
              {
                title: "Rituel Pureté & Équilibre",
                description: "Pour peaux mixtes à imperfections : zinc marin, arbre à thé et hydrolat de romarin à cinéole.",
                imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/boutique",
              },
            ],
          },
        },
        {
          type: "banner",
          content: {
            title: "Livraison offerte dès 50 € d'achats · Échantillons offerts dans chaque commande",
            buttonText: "Commander",
            buttonUrl: "/boutique",
          },
        },
      ],
    },
    {
      title: "Boutique & Rendez-vous",
      slug: "boutique",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Rencontrez-nous en Boutique",
            subtitle: "Située au cœur du Marais, notre herboristerie vous accueille pour tester toutes nos textures et bénéficier de conseils personnalisés.",
            imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Réserver votre diagnostic peau",
            buttonUrl: "#booking",
            badge: "📍 19 rue des Francs-Bourgeois, 75004 Paris",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "booking_form",
          content: {
            title: "Diagnostic Peau & Consultation Privée (20 min)",
            description: "Analyse douce de votre typologie cutanée, test des galéniques et composition de votre ordonnance de beauté naturelle.",
            duration: 20,
          },
        },
        {
          type: "contact_form",
          content: {
            title: "Nous contacter ou passer commande spéciale",
            description: "Notre équipe vous répond sous 24 heures pour toute question sur nos ingrédients ou points de vente distributeurs.",
            email: "contact@maison-botanique.fr",
            phone: "+33 1 48 04 22 15",
            address: "19 rue des Francs-Bourgeois, 75004 Paris",
          },
        },
      ],
    },
  ],
};
