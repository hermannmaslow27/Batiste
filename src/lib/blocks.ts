import type { Messages } from "@/i18n/messages";

export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "number"
  | "boolean"
  | "select"
  | "list";

export interface FieldDef {
  key: string;
  /** key inside messages.fields */
  labelKey: keyof Messages["fields"];
  type: FieldType;
  options?: string[];
  itemFields?: FieldDef[];
  placeholder?: string;
}

export const BLOCK_TYPES = [
  "hero",
  "pricing_table",
  "bento_grid",
  "card_grid",
  "logo_cloud",
  "banner",
  "rich_text",
  "cta",
  "testimonials",
  "carousel",
  "form",
  "contact_form",
  "product_grid",
  "booking_form",
  "faq",
  "stats",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export interface BlockDef {
  type: BlockType;
  icon: string;
  fields: FieldDef[];
  defaults: Record<string, unknown>;
}

export const BLOCK_REGISTRY: Record<BlockType, BlockDef> = {
  hero: {
    type: "hero",
    icon: "▤",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "subtitle", labelKey: "subtitle", type: "textarea" },
      { key: "badge", labelKey: "badge", type: "text" },
      { key: "imageUrl", labelKey: "imageUrl", type: "url" },
      { key: "buttonText", labelKey: "buttonText", type: "text" },
      { key: "buttonUrl", labelKey: "buttonUrl", type: "text" },
      { key: "secondaryButtonText", labelKey: "secondaryButtonText", type: "text" },
      { key: "secondaryButtonUrl", labelKey: "secondaryButtonUrl", type: "text" },
      {
        key: "styleVariant",
        labelKey: "styleVariant",
        type: "select",
        options: ["default", "surface", "dark", "gradient"],
      },
      {
        key: "alignment",
        labelKey: "alignment",
        type: "select",
        options: ["center", "left"],
      },
      { key: "showRating", labelKey: "showRating", type: "boolean" },
      { key: "ratingText", labelKey: "ratingText", type: "text" },
      { key: "overlay", labelKey: "overlay", type: "boolean" },
    ],
    defaults: {
      title: "Construisez l'application ou le site parfait",
      subtitle: "La solution tout-en-un pour lancer vos projets web sans contraintes techniques ni agence.",
      badge: "✨ Nouvelle version disponible",
      imageUrl: "",
      buttonText: "Commencer gratuitement",
      buttonUrl: "/contact",
      secondaryButtonText: "En savoir plus",
      secondaryButtonUrl: "#features",
      styleVariant: "default",
      alignment: "center",
      showRating: true,
      ratingText: "4.9/5 satisfaction clients vérifiée",
      overlay: true,
    },
  },
  card_grid: {
    type: "card_grid",
    icon: "▦",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      {
        key: "columns",
        labelKey: "columns",
        type: "select",
        options: ["2", "3", "4"],
      },
      {
        key: "cards",
        labelKey: "cards",
        type: "list",
        itemFields: [
          { key: "title", labelKey: "title", type: "text" },
          { key: "description", labelKey: "description", type: "textarea" },
          { key: "imageUrl", labelKey: "imageUrl", type: "url" },
          { key: "buttonUrl", labelKey: "link", type: "text" },
        ],
      },
    ],
    defaults: {
      title: "Nos services",
      columns: "3",
      cards: [
        {
          title: "Service 1",
          description: "Décrivez cette prestation.",
          imageUrl: "",
          buttonUrl: "",
        },
        {
          title: "Service 2",
          description: "Décrivez cette prestation.",
          imageUrl: "",
          buttonUrl: "",
        },
        {
          title: "Service 3",
          description: "Décrivez cette prestation.",
          imageUrl: "",
          buttonUrl: "",
        },
      ],
    },
  },
  rich_text: {
    type: "rich_text",
    icon: "¶",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "content", labelKey: "content", type: "textarea" },
      {
        key: "alignment",
        labelKey: "alignment",
        type: "select",
        options: ["left", "center"],
      },
    ],
    defaults: {
      title: "À propos",
      content:
        "Racontez votre histoire, votre méthode et ce qui vous distingue.\n\nChaque paragraphe est séparé par une ligne vide.",
      alignment: "left",
    },
  },
  cta: {
    type: "cta",
    icon: "◉",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "description", labelKey: "description", type: "textarea" },
      { key: "buttonText", labelKey: "buttonText", type: "text" },
      { key: "buttonUrl", labelKey: "buttonUrl", type: "text" },
    ],
    defaults: {
      title: "Parlons de votre projet",
      description: "Réponse sous 24 heures ouvrées.",
      buttonText: "Demander un devis",
      buttonUrl: "/contact",
    },
  },
  testimonials: {
    type: "testimonials",
    icon: "❝",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      {
        key: "items",
        labelKey: "testimonials",
        type: "list",
        itemFields: [
          { key: "quote", labelKey: "quote", type: "textarea" },
          { key: "name", labelKey: "name", type: "text" },
          { key: "role", labelKey: "role", type: "text" },
          { key: "avatarUrl", labelKey: "avatarUrl", type: "url" },
        ],
      },
    ],
    defaults: {
      title: "Ils nous font confiance",
      items: [
        {
          quote: "Un travail soigné et des délais tenus.",
          name: "Camille D.",
          role: "Cliente",
          avatarUrl: "",
        },
        {
          quote: "Une équipe à l'écoute du début à la fin.",
          name: "Marc L.",
          role: "Client",
          avatarUrl: "",
        },
      ],
    },
  },
  carousel: {
    type: "carousel",
    icon: "◧",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      {
        key: "slides",
        labelKey: "slides",
        type: "list",
        itemFields: [
          { key: "imageUrl", labelKey: "imageUrl", type: "url" },
          { key: "title", labelKey: "title", type: "text" },
          { key: "description", labelKey: "description", type: "text" },
        ],
      },
    ],
    defaults: {
      title: "Réalisations",
      slides: [
        { imageUrl: "", title: "Projet", description: "Courte description." },
      ],
    },
  },
  form: {
    type: "form",
    icon: "✎",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "description", labelKey: "description", type: "textarea" },
      { key: "submitText", labelKey: "submitText", type: "text" },
      { key: "successMessage", labelKey: "successMessage", type: "text" },
      {
        key: "fields",
        labelKey: "formFields",
        type: "list",
        itemFields: [
          { key: "label", labelKey: "label", type: "text" },
          {
            key: "type",
            labelKey: "type",
            type: "select",
            options: ["text", "email", "tel", "textarea", "select"],
          },
          { key: "options", labelKey: "options", type: "text" },
          { key: "required", labelKey: "required", type: "boolean" },
        ],
      },
    ],
    defaults: {
      title: "Demande de devis",
      description: "Décrivez votre besoin, nous revenons vers vous rapidement.",
      submitText: "Envoyer",
      successMessage: "Merci, votre demande a bien été transmise.",
      fields: [
        { label: "Nom", type: "text", options: "", required: true },
        { label: "Email", type: "email", options: "", required: true },
        {
          label: "Votre besoin",
          type: "textarea",
          options: "",
          required: true,
        },
      ],
    },
  },
  contact_form: {
    type: "contact_form",
    icon: "✉",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "description", labelKey: "description", type: "textarea" },
      { key: "email", labelKey: "email", type: "text" },
      { key: "phone", labelKey: "phone", type: "text" },
      { key: "address", labelKey: "address", type: "text" },
    ],
    defaults: {
      title: "Nous contacter",
      description: "Une question ? Écrivez-nous.",
      email: "",
      phone: "",
      address: "",
    },
  },
  product_grid: {
    type: "product_grid",
    icon: "▩",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "category", labelKey: "category", type: "text" },
      { key: "limit", labelKey: "limit", type: "number" },
      { key: "showPrice", labelKey: "showPrice", type: "boolean" },
      {
        key: "columns",
        labelKey: "columns",
        type: "select",
        options: ["2", "3", "4"],
      },
    ],
    defaults: {
      title: "Notre catalogue",
      category: "",
      limit: 6,
      showPrice: true,
      columns: "3",
    },
  },
  booking_form: {
    type: "booking_form",
    icon: "◷",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "description", labelKey: "description", type: "textarea" },
      { key: "duration", labelKey: "duration", type: "number" },
    ],
    defaults: {
      title: "Prendre rendez-vous",
      description: "Choisissez une date, nous confirmons par email.",
      duration: 60,
    },
  },
  faq: {
    type: "faq",
    icon: "?",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      {
        key: "questions",
        labelKey: "questions",
        type: "list",
        itemFields: [
          { key: "question", labelKey: "title", type: "text" },
          { key: "answer", labelKey: "description", type: "textarea" },
        ],
      },
    ],
    defaults: {
      title: "Questions fréquentes",
      questions: [
        {
          question: "Quels sont vos délais d'intervention ou de livraison ?",
          answer: "Nos délais varient de 48 heures à 2 semaines selon la complexité de votre besoin.",
        },
        {
          question: "Proposez-vous des prestations sur-mesure ?",
          answer: "Absolument, chaque projet est étudié avec soin afin de répondre précisément à vos exigences.",
        },
      ],
    },
  },
  stats: {
    type: "stats",
    icon: "%",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      {
        key: "stats",
        labelKey: "statsList",
        type: "list",
        itemFields: [
          { key: "value", labelKey: "title", type: "text" },
          { key: "label", labelKey: "label", type: "text" },
          { key: "description", labelKey: "description", type: "text" },
        ],
      },
    ],
    defaults: {
      title: "Chiffres clés",
      stats: [
        { value: "99%", label: "Satisfaction client", description: "Basé sur plus de 200 retours" },
        { value: "10+", label: "Années d'expertise", description: "Au service de nos partenaires" },
        { value: "24/7", label: "Disponibilité", description: "Une équipe réactive à votre écoute" },
      ],
    },
  },
  pricing_table: {
    type: "pricing_table",
    icon: "🏷",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "subtitle", labelKey: "subtitle", type: "textarea" },
      {
        key: "billingPeriod",
        labelKey: "billingPeriod",
        type: "select",
        options: ["monthly_yearly", "monthly_only"],
      },
      {
        key: "plans",
        labelKey: "plans",
        type: "list",
        itemFields: [
          { key: "name", labelKey: "name", type: "text" },
          { key: "price", labelKey: "price", type: "text" },
          { key: "period", labelKey: "period", type: "text" },
          { key: "description", labelKey: "description", type: "textarea" },
          { key: "buttonText", labelKey: "buttonText", type: "text" },
          { key: "buttonUrl", labelKey: "buttonUrl", type: "text" },
          { key: "isPopular", labelKey: "isPopular", type: "boolean" },
          { key: "popularBadge", labelKey: "popularBadge", type: "text" },
          { key: "featuresList", labelKey: "featuresList", type: "textarea" },
        ],
      },
    ],
    defaults: {
      title: "Des tarifs clairs et transparents",
      subtitle: "Choisissez la formule adaptée à vos besoins. Évoluez en toute liberté.",
      billingPeriod: "monthly_yearly",
      plans: [
        {
          name: "Starter",
          price: "29€",
          period: "/mois",
          description: "Idéal pour lancer votre premier projet professionnel.",
          buttonText: "Démarrer",
          buttonUrl: "/contact",
          isPopular: false,
          popularBadge: "",
          featuresList: "1 site complet et responsive\nSous-domaine sécurisé inclus\nFormulaire de contact & devis\nSupport par email sous 48h",
        },
        {
          name: "Professionnel",
          price: "79€",
          period: "/mois",
          description: "Pour les entreprises et agences en pleine expansion.",
          buttonText: "Essayer Pro",
          buttonUrl: "/contact",
          isPopular: true,
          popularBadge: "Le plus populaire",
          featuresList: "Jusqu'à 5 sites professionnels\nNom de domaine personnalisé\nCatalogue & Réservations\nAnalytics détaillées en direct\nSupport prioritaire 7j/7",
        },
        {
          name: "Sur-mesure",
          price: "199€",
          period: "/mois",
          description: "Pour les projets complexes nécessitant un accompagnement dédié.",
          buttonText: "Nous contacter",
          buttonUrl: "/contact",
          isPopular: false,
          popularBadge: "",
          featuresList: "Sites illimités\nComptes membres & équipe\nIntégrations personnalisées\nChef de projet dédié",
        },
      ],
    },
  },
  bento_grid: {
    type: "bento_grid",
    icon: "⊞",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      { key: "subtitle", labelKey: "subtitle", type: "textarea" },
      {
        key: "cards",
        labelKey: "bentoCards",
        type: "list",
        itemFields: [
          { key: "title", labelKey: "title", type: "text" },
          { key: "description", labelKey: "description", type: "textarea" },
          { key: "badge", labelKey: "badge", type: "text" },
          { key: "imageUrl", labelKey: "imageUrl", type: "url" },
          {
            key: "colSpan",
            labelKey: "colSpan",
            type: "select",
            options: ["1", "2"],
          },
          { key: "buttonUrl", labelKey: "link", type: "text" },
        ],
      },
    ],
    defaults: {
      title: "Conçu pour la performance et l'impact",
      subtitle: "Une suite d'outils modernes pensée pour convertir vos visiteurs en clients fidèles.",
      cards: [
        {
          title: "Vitesse Edge Sub-seconde",
          description: "Votre site s'affiche instantanément partout dans le monde grâce à une architecture distribuée à la pointe.",
          badge: "Score 100/100",
          imageUrl: "",
          colSpan: "2",
          buttonUrl: "",
        },
        {
          title: "Design Responsive",
          description: "Une ergonomie fluide conçue nativement pour mobile, tablette et grand écran.",
          badge: "Mobile First",
          imageUrl: "",
          colSpan: "1",
          buttonUrl: "",
        },
        {
          title: "Multilingue Natif",
          description: "Traduisez vos pages et touchez une clientèle internationale en toute simplicité.",
          badge: "FR / EN",
          imageUrl: "",
          colSpan: "1",
          buttonUrl: "",
        },
        {
          title: "Boîte de Réception Unifiée",
          description: "Centralisez les demandes de contact, devis et réservations dans un espace intuitif.",
          badge: "CRM Intégré",
          imageUrl: "",
          colSpan: "2",
          buttonUrl: "",
        },
      ],
    },
  },
  logo_cloud: {
    type: "logo_cloud",
    icon: "❖",
    fields: [
      { key: "title", labelKey: "title", type: "text" },
      {
        key: "logos",
        labelKey: "logos",
        type: "list",
        itemFields: [
          { key: "name", labelKey: "name", type: "text" },
          { key: "imageUrl", labelKey: "imageUrl", type: "url" },
        ],
      },
    ],
    defaults: {
      title: "Ils propulsent leur activité avec nous",
      logos: [
        { name: "Acme Tech", imageUrl: "" },
        { name: "Studio Pulse", imageUrl: "" },
        { name: "Atelier No17", imageUrl: "" },
        { name: "Nova SaaS", imageUrl: "" },
        { name: "Horizon Conseil", imageUrl: "" },
      ],
    },
  },
  banner: {
    type: "banner",
    icon: "⚡",
    fields: [
      { key: "badge", labelKey: "badge", type: "text" },
      { key: "title", labelKey: "title", type: "text" },
      { key: "buttonText", labelKey: "buttonText", type: "text" },
      { key: "buttonUrl", labelKey: "buttonUrl", type: "text" },
    ],
    defaults: {
      badge: "Nouveauté",
      title: "Découvrez notre toute nouvelle collection et nos services exclusifs pour 2026.",
      buttonText: "Découvrir",
      buttonUrl: "/contact",
    },
  },
};

export function getBlockDef(type: string): BlockDef | undefined {
  return BLOCK_REGISTRY[type as BlockType];
}

/** Blocks that require a feature flag to be usable. */
export const BLOCK_FEATURE_REQUIREMENT: Partial<
  Record<BlockType, "catalog" | "booking" | "quote" | "blog">
> = {
  product_grid: "catalog",
  booking_form: "booking",
};
