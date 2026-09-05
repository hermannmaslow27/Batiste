import type { SiteTemplate } from "./types";

export const craftArtisanTemplate: SiteTemplate = {
  id: "craft_artisan",
  name: "Atelier Végétal & Céramique",
  category: "craft",
  tagline: "Créations uniques en grès pyrité et art floral contemporain",
  description: "Idéal pour céramistes, ébénistes, bijoutiers, créateurs indépendants et ateliers d'art.",
  themeId: "nordic",
  badge: "Artisanat d'Art",
  previewImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop&q=80",
  tags: ["Storytelling", "Galerie d'œuvres", "Réservation d'Ateliers", "Sur-mesure"],
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
            buttonText: "Participer à un atelier",
            buttonUrl: "/ateliers",
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
                buttonUrl: "/atelier",
              },
              {
                title: "Services à Thé Minéral",
                description: "Théière galet avec filtre intégré et quatre bols façonnés au pincé.",
                imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/atelier",
              },
              {
                title: "Suspensions Lumineuses Céladon",
                description: "Porcelaine translucide diffusant une clarté douce et apaisante.",
                imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/atelier",
              },
            ],
          },
        },
        {
          type: "stats",
          content: {
            title: "L'artisanat en chiffres",
            stats: [
              { value: "100%", label: "Fait main", description: "Façonné et cuit à l'atelier" },
              { value: "1280°C", label: "Grand feu", description: "Pour une solidité et imperméabilité parfaites" },
              { value: "350+", label: "Élèves initiés", description: "Lors de nos stages et cours hebdomadaires" },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Envie de mettre les mains dans la terre ?",
            description: "Nos cours d'initiation et de perfectionnement sont ouverts à tous les niveaux, du débutant au passionné.",
            buttonText: "Découvrir les ateliers",
            buttonUrl: "/ateliers",
          },
        },
      ],
    },
    {
      title: "Ateliers & Stages",
      slug: "ateliers",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Initiez-vous au Tournage & Modelage",
            subtitle: "Venez partager un moment de déconnexion créative dans notre atelier lumineux au cœur des ateliers d'artisans.",
            imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Réserver votre place",
            buttonUrl: "#reservation",
            badge: "🏺 Petits groupes (6 personnes max)",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Nos Formules de Cours",
            columns: "3",
            cards: [
              {
                title: "Session Découverte (2h30)",
                description: "Une première approche du tour de potier. Façonnez vos deux premiers bols et choisissez vos émaux.",
                imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "#reservation",
              },
              {
                title: "Stage Immersion Week-end",
                description: "Deux jours complets pour explorer le tournage, le tournassage et l'émaillage de pièces complexes.",
                imageUrl: "https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "#reservation",
              },
              {
                title: "Cours Hebdomadaire Trimestriel",
                description: "Accompagnement continu sur 10 semaines pour acquérir l'autonomie complète à l'atelier.",
                imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "#reservation",
              },
            ],
          },
        },
        {
          type: "booking_form",
          content: {
            title: "Réserver votre créneau d'atelier",
            description: "Sélectionnez votre date. Le matériel, la terre, l'émaillage et les deux cuissons de vos pièces sont entièrement inclus.",
            duration: 150,
          },
        },
        {
          type: "faq",
          content: {
            title: "Tout savoir avant de venir",
            questions: [
              {
                question: "Faut-il apporter son matériel ?",
                answer: "Non, nous fournissons le tablier, les outils et la terre. Prévoyez simplement une tenue confortable et des ongles coupés courts pour faciliter le travail au tour.",
              },
              {
                question: "Quand pourrai-je récupérer mes créations ?",
                answer: "Après la séance, vos pièces doivent sécher lentement pendant 2 semaines avant la cuisson biscuit puis la cuisson émail. Elles sont prêtes sous 3 à 4 semaines.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "L'Atelier & Sur-mesure",
      slug: "atelier",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Créations Spéciales & Projets Sur-Mesure",
            subtitle: "Arts de la table pour restaurateurs, luminaires d'architectes et commandes personnalisées pour particuliers.",
            imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Décrire votre projet",
            buttonUrl: "#contact",
            badge: "✨ Collaboration & Devis sous 48h",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Nos Réalisations d'Exception",
            columns: "2",
            cards: [
              {
                title: "Vaisselle Gastronomique pour le Restaurant L'Estran",
                description: "Série de 120 assiettes texturées et bols à consommé aux émaux marins.",
                imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "#contact",
              },
              {
                title: "Lustres Sculpturaux pour l'Hôtel Particulier Marais",
                description: "Ensemble de 8 suspensions en porcelaine nervurée créant un jeu d'ombres végétales.",
                imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "#contact",
              },
            ],
          },
        },
        {
          type: "contact_form",
          content: {
            title: "Parlez-nous de votre idée",
            description: "Nous étudions chaque demande avec enthousiasme et rigueur pour donner vie à vos envies artisanales.",
            email: "bonjour@atelier-mineral.fr",
            phone: "+33 6 12 34 56 78",
            address: "22 cour des Artisans, 69002 Lyon",
          },
        },
      ],
    },
  ],
};
