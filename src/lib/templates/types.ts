export interface TemplateBlock {
  type: string;
  content: Record<string, unknown>;
}

export interface TemplatePage {
  title: string;
  slug: string;
  isHomepage: boolean;
  blocks: TemplateBlock[];
}

export interface SiteTemplate {
  id: string;
  name: string;
  category: "restaurant" | "tech" | "craft" | "agency" | "consulting" | "retail";
  tagline: string;
  description: string;
  themeId: string;
  previewImage: string;
  badge?: string;
  tags: string[];
  pages: TemplatePage[];
}
