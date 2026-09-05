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
            buttonUrl: "/tarifs",
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
                buttonUrl: "/fonctionnalites",
              },
              {
                title: "Pipelines CI/CD Auto-scalables",
                description: "Exécutez vos tests et builds en parallèle avec un provisionnement d'instances en millisecondes.",
                imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/fonctionnalites",
              },
              {
                title: "Sécurité & Conformité SOC2",
                description: "Chiffrement AES-256 de bout en bout, audits automatiques et gestion granulaire des rôles.",
                imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/fonctionnalites",
              },
            ],
          },
        },
        {
          type: "testimonials",
          content: {
            title: "Recommandé par les meilleurs ingénieurs",
            items: [
              {
                quote: "PulseEngine a divisé par 4 le temps moyen de résolution de nos incidents critiques de production.",
                name: "Alexandre Dupont",
                role: "VP Engineering @ ScaleFlow",
                avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
              },
              {
                quote: "Le ratio performance/prix est imbattable. L'onboarding de nos développeurs juniors s'est fait en une après-midi.",
                name: "Camille Laurent",
                role: "Lead DevOps @ CloudNexus",
                avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
              },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Prêt à transformer votre productivité ?",
            description: "Rejoignez plus de 12 000 ingénieurs et commencez gratuitement pendant 14 jours, sans carte bancaire requise.",
            buttonText: "Découvrir nos forfaits",
            buttonUrl: "/tarifs",
          },
        },
      ],
    },
    {
      title: "Fonctionnalités",
      slug: "fonctionnalites",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Une plateforme unifiée, zéro compromis",
            subtitle: "Découvrez comment nos modules d'observabilité, d'automatisation et de sécurité collaborent pour fluidifier votre quotidien technique.",
            imageUrl: "",
            buttonText: "Voir les tarifs",
            buttonUrl: "/tarifs",
            badge: "🚀 Architecture modulaire de pointe",
            alignment: "center",
            overlay: false,
          },
        },
        {
          type: "bento_grid",
          content: {
            title: "Tous les outils dont vos équipes ont besoin",
            items: [
              {
                title: "Télémétrie & Logs unifiés",
                description: "Centralisez logs, métriques et traces distribuées dans un index ultra-compact sans surcoût de stockage.",
                colSpan: "2",
              },
              {
                title: "Alerting Intelligent & AI Root-Cause",
                description: "Fini la fatigue des alertes. Notre moteur corrèle les signaux faibles pour cibler la cause racine.",
                colSpan: "1",
              },
              {
                title: "Déploiements Zero-Downtime",
                description: "Canary releases et blue/green automatisés avec rollback instantané en cas d'anomalie.",
                colSpan: "1",
              },
              {
                title: "Conformité & Contrôle d'Accès RBAC",
                description: "Journal d'audit immuable, authentification SAML/SSO et respect rigoureux du RGPD.",
                colSpan: "2",
              },
            ],
          },
        },
        {
          type: "faq",
          content: {
            title: "Questions techniques fréquentes",
            questions: [
              {
                question: "Quelle est la surcharge sur nos applications en production ?",
                answer: "Notre agent est développé en Rust et consomme moins de 0.5% de CPU et 30 Mo de RAM, garantissant un impact nul sur vos temps de réponse.",
              },
              {
                question: "Puis-je connecter PulseEngine à Grafana ou Datadog ?",
                answer: "Oui, nous supportons nativement le protocole OpenTelemetry (OTel) ainsi que les exports Prometheus pour une intégration transparente avec votre écosystème existant.",
              },
              {
                question: "Comment fonctionne l'exportation des données ?",
                answer: "Toutes vos données vous appartiennent. Vous pouvez configurer des exports continus vers Amazon S3, Google Cloud Storage ou votre data lake.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Tarifs & Abonnements",
      slug: "tarifs",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Des tarifs clairs et sans surprise",
            subtitle: "Payez uniquement ce que vous consommez. Évoluez facilement au fur et à mesure que votre équipe et vos métriques grandissent.",
            imageUrl: "",
            buttonText: "Démarrer 14 jours gratuits",
            buttonUrl: "/contact",
            badge: "💳 Sans engagement ni carte requise",
            alignment: "center",
            overlay: false,
          },
        },
        {
          type: "pricing_table",
          content: {
            title: "Choisissez la formule adaptée à vos ambitions",
            plans: [
              {
                name: "Starter",
                price: "29 €",
                period: "/ mois",
                description: "Pour les développeurs indépendants et petits projets en lancement.",
                features: [
                  "Jusqu'à 3 membres d'équipe",
                  "10 millions d'événements / mois",
                  "Rétention des logs 14 jours",
                  "Support communautaire Discord",
                ],
                buttonText: "Commencer en Starter",
                buttonUrl: "/contact",
              },
              {
                name: "Pro Scale",
                price: "99 €",
                period: "/ mois",
                popular: true,
                description: "Pour les startups et entreprises en forte accélération produit.",
                features: [
                  "Membres illimités",
                  "100 millions d'événements / mois",
                  "Rétention des logs 90 jours",
                  "Moteur AI Root-Cause inclus",
                  "Support prioritaire sous 2h",
                ],
                buttonText: "Essai gratuit 14j",
                buttonUrl: "/contact",
              },
              {
                name: "Enterprise",
                price: "299 €",
                period: "/ mois",
                description: "Pour les organisations exigeant un SLA dédié et une conformité sur-mesure.",
                features: [
                  "Événements sur-mesure",
                  "Hébergement dédié ou On-Premise",
                  "SAML / SSO & RBAC avancé",
                  "Account Manager & SLA 99.99%",
                ],
                buttonText: "Contacter l'équipe",
                buttonUrl: "/contact",
              },
            ],
          },
        },
        {
          type: "contact_form",
          content: {
            title: "Besoin d'une démonstration sur-mesure ?",
            description: "Un de nos ingénieurs solutions peut configurer un POC complet adapté à votre stack en 30 minutes.",
            email: "sales@pulseengine.dev",
            phone: "+33 1 89 20 44 10",
          },
        },
      ],
    },
  ],
};
