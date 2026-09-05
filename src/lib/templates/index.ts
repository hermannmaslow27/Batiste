import type { SiteTemplate } from "./types";
import { restaurantTemplate } from "./restaurant";
import { techSaasTemplate } from "./tech-saas";
import { craftArtisanTemplate } from "./craft-artisan";
import { creativeStudioTemplate } from "./creative-studio";
import { consultantTemplate } from "./consultant";
import { boutiqueTemplate } from "./boutique";

export * from "./types";

export const SITE_TEMPLATES: SiteTemplate[] = [
  restaurantTemplate,
  techSaasTemplate,
  craftArtisanTemplate,
  creativeStudioTemplate,
  consultantTemplate,
  boutiqueTemplate,
];

export function getTemplateById(id: string): SiteTemplate | undefined {
  return SITE_TEMPLATES.find((t) => t.id === id);
}
