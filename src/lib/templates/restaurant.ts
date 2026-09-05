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
            buttonUrl: "#reservation",
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
                buttonUrl: "/contact",
              },
              {
                title: "Canette de Challans rôtie",
                description: "Mousseline de panais fumé, jus corsé au poivre sauvage et déclinaison de betteraves.",
                imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
              },
              {
                title: "Soufflé Chaud Grand Marnier",
                description: "Crème glacée à la vanille de Madagascar et zestes d'oranges amères confites.",
                imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
                buttonUrl: "/contact",
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
          type: "booking_form",
          content: {
            title: "Réserver votre expérience",
            description: "Déjeuners du mardi au dimanche · Dîners du jeudi au samedi. Pour les tables de plus de 6 convives, merci de nous contacter directement.",
            duration: 120,
          },
        },
        {
          type: "contact_form",
          content: {
            title: "Venir nous voir",
            description: "Une question, un événement privé ou une privatisation ? Écrivez-nous ou passez nous voir.",
            email: "bonjour@ardoise-verre.fr",
            phone: "01 42 68 90 12",
            address: "14 rue des Artisans, 75011 Paris",
          },
        },
      ],
    },
  ],
};
