import type { SiteTemplate } from "./types";

export const consultantTemplate: SiteTemplate = {
  id: "consultant",
  name: "Nexus Conseil & Stratégie",
  category: "consulting",
  tagline: "Conseil en transformation, gouvernance et croissance durable",
  description: "Parfait pour cabinets de conseil, experts-comptables, avocats, coachs et consultants indépendants.",
  themeId: "corporate",
  badge: "Haute Performance",
  previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80",
  tags: ["Confiance & Clarté", "Méthodologie", "Prise de RDV", "Diagnostic Offert"],
  pages: [
    {
      title: "Accueil",
      slug: "",
      isHomepage: true,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Décider avec clarté dans un monde complexe",
            subtitle: "Nous accompagnons les dirigeants et comités de direction dans leurs choix stratégiques, l'optimisation de leurs organisations et le pilotage de leur rentabilité.",
            imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Demander un diagnostic",
            buttonUrl: "/rendez-vous",
            badge: "🔒 15 ans d'expérience au service des dirigeants",
            alignment: "left",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Nos Domaines d'Intervention",
            columns: "3",
            cards: [
              {
                title: "Stratégie de Croissance",
                description: "Modélisation financière, conquête de nouveaux segments et accélération commerciale.",
                imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/expertises",
              },
              {
                title: "Optimisation des Processus",
                description: "Diagnostic organisationnel, digitalisation raisonnée et réduction des coûts opérationnels.",
                imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/expertises",
              },
              {
                title: "Gouvernance & M&A",
                description: "Audit d'acquisition, pactes d'actionnaires et structuration des comités stratégiques.",
                imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/expertises",
              },
            ],
          },
        },
        {
          type: "stats",
          content: {
            title: "Des résultats tangibles et mesurés",
            stats: [
              { value: "+32%", label: "Marge d'EBITDA moyenne", description: "Constatée chez nos clients à 18 mois" },
              { value: "85+", label: "Missions menées à terme", description: "Dans l'industrie, la tech et la santé" },
              { value: "98%", label: "Taux de recommandation", description: "Par les présidents et directeurs généraux" },
            ],
          },
        },
        {
          type: "testimonials",
          content: {
            title: "Témoignages de dirigeants",
            items: [
              {
                quote: "L'intervention de Nexus nous a permis de restructurer nos 3 filiales avec sérénité et d'atteindre la rentabilité un an plus tôt que prévu.",
                name: "Bernard Lecomte",
                role: "Président Directeur Général @ Groupe Altius",
                avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
              },
              {
                quote: "Une lucidité stratégique précieuse doublée d'un accompagnement humain très respectueux des équipes en place.",
                name: "Valérie Gauthier",
                role: "Directrice Générale @ SantéTech France",
                avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
              },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Prêt à accélérer la transformation de votre entreprise ?",
            description: "Bénéficiez d'une session de cadrage stratégique offerte de 45 minutes avec l'un de nos directeurs associés.",
            buttonText: "Prendre rendez-vous",
            buttonUrl: "/rendez-vous",
          },
        },
      ],
    },
    {
      title: "Expertises & Méthode",
      slug: "expertises",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Une Méthodologie Éprouvée",
            subtitle: "Pas de théories abstraites : nous apportons des solutions pragmatiques, directement applicables par vos équipes terrain.",
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Planifier une session",
            buttonUrl: "/rendez-vous",
            badge: "📈 Méthode Nexus 4D",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Les 4 Étapes de Notre Accompagnement",
            columns: "2",
            cards: [
              {
                title: "1. Diagnostic Flash & Immersion",
                description: "Analyse quantitative des bilans, entretiens qualitatifs et cartographie des goulots d'étranglement.",
                imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/rendez-vous",
              },
              {
                title: "2. Feuille de Route & Priorisation",
                description: "Sélection des chantiers à retour sur investissement rapide (Quick Wins) et définition des KPI cibles.",
                imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/rendez-vous",
              },
              {
                title: "3. Déploiement & Conduite du Changement",
                description: "Mise en œuvre concrète aux côtés de vos managers, formation et ajustement des process.",
                imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/rendez-vous",
              },
              {
                title: "4. Pérennisation & Pilotage",
                description: "Tableaux de bord automatisés et rituels managériaux pour inscrire les gains dans la durée.",
                imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/rendez-vous",
              },
            ],
          },
        },
        {
          type: "faq",
          content: {
            title: "Questions fréquentes",
            questions: [
              {
                question: "Quelle est la durée moyenne d'une mission de conseil ?",
                answer: "Un diagnostic initial prend 2 à 3 semaines. Les phases de déploiement et de transformation durent généralement entre 3 et 6 mois selon le périmètre concerné.",
              },
              {
                question: "Quel est votre modèle d'honoraires ?",
                answer: "Nous fonctionnons au forfait pour les diagnostics initiaux, puis selon une combinaison forfait + honoraires de succès (Success Fees) indexés sur vos résultats.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Prendre Rendez-vous",
      slug: "rendez-vous",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Échangeons sur vos Enjeux",
            subtitle: "Réservez directement votre créneau d'échange confidentiel avec un associé senior pour faire le point sur vos priorités.",
            imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Choisir un horaire",
            buttonUrl: "#booking",
            badge: "🤝 Échange 100% confidentiel",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "booking_form",
          content: {
            title: "Sélectionnez votre créneau de consultation",
            description: "Entretien stratégique préliminaire de 45 minutes par visioconférence ou dans nos locaux parisiens.",
            duration: 45,
          },
        },
        {
          type: "contact_form",
          content: {
            title: "Ou envoyez-nous un message direct",
            description: "Notre secrétariat général traitera votre message sous 12h ouvrées.",
            email: "direction@nexus-strategie.fr",
            phone: "+33 1 55 90 88 00",
            address: "42 avenue Montaigne, 75008 Paris",
          },
        },
      ],
    },
  ],
};
