import type { SiteTemplate } from "./types";

export const consultantTemplate: SiteTemplate = {
  id: "consultant",
  name: "Nexus Conseil & Stratégie",
  category: "consulting",
  tagline: "Conseil en transformation, gouvernance et croissance durable",
  description: "Parfait pour cabinets de conseil, experts-comptables, avocats, coachs et consultants indépendants.",
  themeId: "corporate",
  previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80",
  tags: ["Confiance & Clarté", "Méthodologie", "Prise de RDV"],
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
            buttonUrl: "#rdv",
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
                buttonUrl: "/contact",
              },
              {
                title: "Optimisation des Processus",
                description: "Diagnostic organisationnel, digitalisation raisonnée et réduction des coûts opérationnels.",
                imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Gouvernance & M&A",
                description: "Audit d'acquisition, pactes d'actionnaires et structuration des comités stratégiques.",
                imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
            ],
          },
        },
        {
          type: "testimonials",
          content: {
            title: "La voix de nos clients partenaires",
            items: [
              {
                quote: "Le diagnostic stratégique de Nexus a permis de restructurer notre offre et de doubler notre marge opérationnelle en 18 mois.",
                name: "Alexandre Dupuis",
                role: "PDG, Groupe Novatech",
                avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
              },
              {
                quote: "Rigueur, écoute bienveillante et pragmatisme : un accompagnement précieux lors de notre levée de fonds Série B.",
                name: "Éléonore Fabre",
                role: "Fondatrice, CleanBio",
                avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
              },
            ],
          },
        },
        {
          type: "booking_form",
          content: {
            title: "Planifier un premier échange stratégique",
            description: "Session de 45 minutes confidentielle et sans engagement pour faire le point sur vos priorités.",
            duration: 45,
          },
        },
      ],
    },
  ],
};
