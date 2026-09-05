"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/animations";
import {
  type PublicProduct,
  type BlockViewContext,
} from "./blocks/types";
import HeroBlock from "./blocks/HeroBlock";
import RichTextBlock from "./blocks/RichTextBlock";
import CardGridBlock from "./blocks/CardGridBlock";
import CtaBlock from "./blocks/CtaBlock";
import TestimonialsBlock from "./blocks/TestimonialsBlock";
import CarouselBlock from "./blocks/CarouselBlock";
import ProductGridBlock from "./blocks/ProductGridBlock";
import FaqBlock from "./blocks/FaqBlock";
import StatsBlock from "./blocks/StatsBlock";
import FormBlock from "./blocks/FormBlock";
import PricingBlock from "./blocks/PricingBlock";
import BentoGridBlock from "./blocks/BentoGridBlock";
import LogoCloudBlock from "./blocks/LogoCloudBlock";
import BannerBlock from "./blocks/BannerBlock";

export type { PublicProduct, BlockViewContext };

export interface BlockViewProps {
  type: string;
  content: Record<string, unknown>;
  ctx: BlockViewContext;
}

function AnimatedBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return <div ref={ref}>{children}</div>;
}

function renderBlock(
  type: string,
  content: Record<string, unknown>,
  ctx: BlockViewContext,
): React.ReactNode {
  switch (type) {
    case "hero":
      return <HeroBlock content={content} ctx={ctx} />;
    case "pricing_table":
      return <PricingBlock content={content} ctx={ctx} />;
    case "bento_grid":
      return <BentoGridBlock content={content} ctx={ctx} />;
    case "logo_cloud":
      return <LogoCloudBlock content={content} ctx={ctx} />;
    case "banner":
      return <BannerBlock content={content} ctx={ctx} />;
    case "rich_text":
      return <RichTextBlock content={content} ctx={ctx} />;
    case "card_grid":
      return <CardGridBlock content={content} ctx={ctx} />;
    case "cta":
      return <CtaBlock content={content} ctx={ctx} />;
    case "testimonials":
      return <TestimonialsBlock content={content} ctx={ctx} />;
    case "carousel":
      return <CarouselBlock content={content} ctx={ctx} />;
    case "product_grid":
      return <ProductGridBlock content={content} ctx={ctx} />;
    case "faq":
      return <FaqBlock content={content} ctx={ctx} />;
    case "stats":
      return <StatsBlock content={content} ctx={ctx} />;
    case "form":
    case "contact_form":
    case "booking_form":
      return <FormBlock content={content} ctx={ctx} type={type} />;
    default:
      return null;
  }
}

export default function BlockView({ type, content, ctx }: BlockViewProps) {
  const inner = renderBlock(type, content, ctx);
  if (!inner) return null;
  if (ctx.preview) return inner;
  return <AnimatedBlock>{inner}</AnimatedBlock>;
}
