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
  tags: ["Catalogue Produits", "Ingrédients Sains", "Boutique Showcase"],
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
            buttonText: "Explorer le catalogue",
            buttonUrl: "#produits",
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
                buttonUrl: "/contact",
              },
              {
                title: "Baume Réconfortant Karité & Néroli",
                description: "Texture fondante nourrissante pour peaux sensibles, parfum doux de fleur d'oranger.",
                imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Brume Florale de Bleuet & Sauge",
                description: "Hydrolat apaisant anti-pollution pour rafraîchir et tonifier l'épiderme tout au long de la journée.",
                imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
            ],
          },
        },
        {
          type: "faq",
          content: {
            title: "Nos Engagements & Transparence",
            questions: [
              { question: "D'où proviennent vos plantes aromatiques ?", answer: "90% de nos cueillettes sont réalisées chez des producteurs partenaires certifiés bio en Haute-Provence et dans les Cévennes." },
              { question: "Les contenants sont-ils recyclables ?", answer: "Tous nos flacons sont en verre violet Miron anti-UV 100% recyclable, et nos étuis sont en carton ensemencé de graines sauvages." },
              { question: "Vos soins conviennent-ils aux peaux réactives ?", answer: "Toutes nos formules sont testées sous contrôle dermatologique, sans huiles minérales, sans silicones et sans parfums de synthèse." },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Recevez votre guide beauté holistique",
            description: "Inscrivez-vous pour recevoir nos conseils saisonniers et bénéficier de -15% sur votre première commande.",
            buttonText: "Nous contacter",
            buttonUrl: "/contact",
          },
        },
      ],
    },
  ],
};
