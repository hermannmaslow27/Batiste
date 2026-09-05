import type { SiteTemplate } from "./types";

export const restaurantTemplate: SiteTemplate = {
  id: "restaurant",
  name: "L'Ardoise & Le Verre",
  category: "restaurant",
  tagline: "Bistronomie de saison, vins d'auteurs & terrasse secrète",
  description: "Parfait pour bistrots, restaurants gastronomiques, cafés de spécialité et bars à vin.",
  themeId: "warm",
  badge: "Populaire",
  previewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80",
  tags: ["Carte & Menus", "Réservation en ligne", "Avis certifiés", "Horaires & Accès"],
  pages: [
    {
      title: "Accueil",
      slug: "",
      isHomepage: true,
      blocks: [
        {
          type: "hero",
          content: {
            title: "L'Ardoise & Le Verre",
            subtitle: "Une cuisine d'émotions au rythme des récoltes locales. Découvrez notre menu vivant, renouvelé chaque semaine.",
            imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Réserver une table",
            buttonUrl: "/contact",
            badge: "✨ Guide Michelin 2026",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Nos Suggestions de Saison",
            columns: "3",
            cards: [
              {
                title: "Carpaccio de Saint-Jacques",
                description: "Huile de combawa, caviar d'agrumes et jeunes pousses maraîchères de la vallée.",
                imageUrl: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/carte",
              },
              {
                title: "Canette de Challans rôtie",
                description: "Mousseline de panais fumé, jus corsé au poivre sauvage et déclinaison de betteraves.",
                imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/carte",
              },
              {
                title: "Soufflé Chaud Grand Marnier",
                description: "Crème glacée à la vanille de Madagascar et zestes d'oranges amères confites.",
                imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/carte",
              },
            ],
          },
        },
        {
          type: "stats",
          content: {
            title: "L'esprit de notre Maison",
            stats: [
              { value: "100%", label: "Produits de saison", description: "Approvisionnement en circuit court sous 50km" },
              { value: "180+", label: "Références de vins", description: "Sélection biodynamique et vignerons indépendants" },
              { value: "4.9/5", label: "Satisfaction convives", description: "Plus de 450 avis vérifiés sur l'année" },
            ],
          },
        },
        {
          type: "testimonials",
          content: {
            title: "Ce qu'en disent nos convives",
            items: [
              {
                quote: "Un moment hors du temps. La cuisson du poisson était millimétrée et les accords mets-vins remarquables.",
                name: "Sophie & Pierre M.",
                role: "Habitués du samedi soir",
                avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
              },
              {
                quote: "Le meilleur bistrot moderne de la ville. Accueil chaleureux, service attentif et carte des vins divine.",
                name: "Guillaume Bertin",
                role: "Critique culinaire local",
                avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
              },
            ],
          },
        },
        {
          type: "cta",
          content: {
            title: "Une table vous attend ce soir",
            description: "Réservez directement en ligne ou venez nous rendre visite au 14 rue des Vignes.",
            buttonText: "Consulter la carte",
            buttonUrl: "/carte",
          },
        },
      ],
    },
    {
      title: "Carte & Menus",
      slug: "carte",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Notre Carte Gastronomique",
            subtitle: "Des assiettes créatives où la fraîcheur brute du terroir rencontre la précision culinaire contemporaine.",
            imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Réserver votre dégustation",
            buttonUrl: "/contact",
            badge: "🌿 Carte Printemps-Été",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "pricing_table",
          content: {
            title: "Nos Formules & Menus",
            plans: [
              {
                name: "Menu Déjeuner du Marché",
                price: "36 €",
                period: "/ convive",
                description: "Entrée + Plat + Dessert servi en 45 minutes pour le déjeuner du mardi au vendredi.",
                features: [
                  "Entrée du jour selon arrivage",
                  "Plat de pêche côtière ou viande de terroir",
                  "Dessert minute ou café gourmand",
                  "Pain au levain maison & beurre baratté",
                ],
                buttonText: "Réserver ce menu",
                buttonUrl: "/contact",
              },
              {
                name: "Menu Immersion en 5 Temps",
                price: "78 €",
                period: "/ convive",
                popular: true,
                description: "Le parcours signature du Chef : voyage sensoriel entre terre et océan.",
                features: [
                  "Mise en bouche & amuse-bouche végétal",
                  "2 Entrées dégustation",
                  "Pièce de bœuf maturé ou homard bleu",
                  "Pré-dessert rafraîchissant",
                  "Grand dessert signature",
                ],
                buttonText: "Vivre l'expérience",
                buttonUrl: "/contact",
              },
              {
                name: "Accord Mets & Vins Rares",
                price: "45 €",
                period: "/ personne",
                description: "Sélection de 4 crus d'artisans vignerons commentée par notre chef sommelier.",
                features: [
                  "Champagne de récoltant-manipulant",
                  "Blanc minéral de la Loire",
                  "Rouge de terroir en biodynamie",
                  "Vin doux naturel ou digestif rare",
                ],
                buttonText: "Ajouter l'accord",
                buttonUrl: "/contact",
              },
            ],
          },
        },
        {
          type: "card_grid",
          content: {
            title: "Quelques Incontournables",
            columns: "3",
            cards: [
              {
                title: "Poireau Brûlé & Anguille Fumée",
                description: "Vinaigrette tiède au raifort, sabayon citronné et noisettes torréfiées du Piémont.",
                imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Pigeonneau en Deux Cuissons",
                description: "Le coffre rôti au sautoir, les cuisses confites, purée de topinambours et jus truffé.",
                imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Chocolat Grand Cru & Fève Tonka",
                description: "Ganache soyeuse 72% Guanaja, croustillant praliné sarrasin et glace fleur de sel.",
                imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Réservations & Contact",
      slug: "contact",
      isHomepage: false,
      blocks: [
        {
          type: "hero",
          content: {
            title: "Votre Table d'Exception",
            subtitle: "Pour le déjeuner, un dîner intime ou une célébration privée, nous préparons votre venue avec soin.",
            imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80",
            buttonText: "Voir les créneaux",
            buttonUrl: "#reservation",
            badge: "📍 14 rue des Vignes, 75006 Paris",
            alignment: "center",
            overlay: true,
          },
        },
        {
          type: "booking_form",
          content: {
            title: "Réserver votre table en ligne",
            description: "Déjeuners du mardi au dimanche de 12h à 14h30 · Dîners du mardi au samedi de 19h30 à 22h30. Pour les groupes de plus de 8 personnes, contactez-nous par message.",
            duration: 120,
          },
        },
        {
          type: "faq",
          content: {
            title: "Questions fréquentes",
            questions: [
              {
                question: "Prenez-vous en compte les allergies et régimes alimentaires ?",
                answer: "Absolument. Lors de votre réservation, précisez toute intolérance ou régime (végétarien, sans gluten, sans lactose). Notre chef adaptera le menu.",
              },
              {
                question: "Peut-on privatiser le restaurant ou le salon privé ?",
                answer: "Oui, notre salon privé peut accueillir jusqu'à 16 personnes assises. Le restaurant complet est privatisable sur demande pour des événements d'entreprise ou réceptions familiales.",
              },
              {
                question: "Où se garer à proximité ?",
                answer: "Le parking public Saint-Germain se situe à 150 mètres. La station de métro Odéon (lignes 4 et 10) est à 3 minutes à pied.",
              },
            ],
          },
        },
        {
          type: "contact_form",
          content: {
            title: "Nous contacter",
            description: "Une question particulière ou une demande de privatisation ? Écrivez-nous, nous vous répondons sous 24h.",
            email: "contact@ardoiseetverre.fr",
            phone: "+33 1 42 68 00 12",
            address: "14 rue des Vignes, 75006 Paris",
          },
        },
      ],
    },
  ],
};
