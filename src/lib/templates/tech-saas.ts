import type { SiteTemplate } from "./types";

export const techSaasTemplate: SiteTemplate = {
  id: "tech_saas",
  name: "PulseEngine · Tech SaaS",
  category: "tech",
  tagline: "Plateforme cloud haute performance pour équipes produits",
  description: "Idéal pour startups, plateformes logicielles, applications mobiles, API et fintechs.",
  themeId: "midnight",
  badge: "Ultra-moderne",
  previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
  tags: ["Hero Dark", "Bento Grid", "Statistiques clés", "FAQ Accordéon"],
  pages: [
    {
      title: "Accueil",
      slug: "",
      isHomepage: true,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Déployez vos idées à la vitesse de l'éclair",
            subtitle: "PulseEngine unifie votre télémétrie, automatise vos workflows et accélère vos cycles de release sans compromis sur la sécurité.",
            imageUrl: "",
            buttonText: "Démarrer l'essai gratuit",
            buttonUrl: "/contact",
            badge: "⚡ v3.4 maintenant disponible avec AI Analytics",
            alignment: "center",
            overlay: false,
          },
        },
        {
          type: "stats",
          content: {
            title: "Une infrastructure de confiance éprouvée à l'échelle",
            stats: [
              { value: "99.99%", label: "SLA garanti", description: "Redondance multi-régions sans interruption de service" },
              { value: "45ms", label: "Latence p95", description: "Traitement des requêtes distribuées à l'échelle mondiale" },
              { value: "12k+", label: "Développeurs actifs", description: "Des startups aux licornes internationales" },
            ],
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Conçu pour les équipes qui visent l'excellence",
            columns: "3",
            cards: [
              {
                title: "Surveillance en Temps Réel",
                description: "Détectez instantanément les anomalies grâce à notre moteur de corrélations haute vitesse.",
                imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Pipelines CI/CD Auto-scalables",
                description: "Exécutez vos tests et builds en parallèle avec un provisionnement d'instances en millisecondes.",
                imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Sécurité & Conformité SOC2",
                description: "Chiffrement AES-256 de bout en bout, audits automatiques et gestion granulaire des rôles.",
                imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
            ],
          },
        },
        {
          type: "faq",
          content: {
            title: "Questions fréquentes",
            questions: [
              { question: "Combien de temps prend l'intégration ?", answer: "L'installation s'effectue en moins de 10 minutes grâce à notre SDK TypeScript et nos intégrations clé-en-main pour Next.js, Docker et Kubernetes." },
              { question: "Puis-je changer de forfait à tout moment ?", answer: "Oui, la mise à niveau ou la rétrogradation de forfait s'effectue au prorata temporis en un clic depuis votre espace facturation." },
              { question: "Où sont hébergées nos données ?", answer: "Nos serveurs sont basés en Europe (Francfort et Paris), conformes au RGPD et certifiés ISO 27001 et SOC2 Type II." },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Prêt à transformer votre productivité ?",
            description: "Rejoignez plus de 12 000 ingénieurs et commencez gratuitement pendant 14 jours, sans carte bancaire requise.",
            buttonText: "Commencer gratuitement",
            buttonUrl: "/contact",
          },
        },
      ],
    },
  ],
};
