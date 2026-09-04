import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  image: text("image"),
  passwordHash: text("password_hash"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatarUrl: text("avatar_url"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
});

export const accounts = sqliteTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => [
    primaryKey({ columns: [table.provider, table.providerAccountId] }),
    index("accounts_user_idx").on(table.userId),
  ],
);

export const sessions = sqliteTable(
  "sessions",
  {
    sessionToken: text("session_token").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (table) => [index("sessions_user_idx").on(table.userId)],
);

export const verificationTokens = sqliteTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })],
);

export const themes = sqliteTable("themes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  colors: text("colors", { mode: "json" }).notNull(),
  fonts: text("fonts", { mode: "json" }).notNull(),
  borderRadius: text("border_radius").default("0.5rem"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  previewImage: text("preview_image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const sites = sqliteTable(
  "sites",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    subdomain: text("subdomain").notNull().unique(),
    themeId: text("theme_id")
      .notNull()
      .references(() => themes.id, { onDelete: "restrict" }),
    defaultLanguage: text("default_language").notNull().default("fr"),
    supportedLanguages: text("supported_languages", { mode: "json" }).notNull(),
    status: text("status").notNull().default("draft"),
    customDomain: text("custom_domain"),
    logoUrl: text("logo_url"),
    faviconUrl: text("favicon_url"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    seoImage: text("seo_image"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("sites_subdomain_idx").on(table.subdomain),
    index("sites_owner_idx").on(table.ownerId),
  ],
);

export const siteMembers = sqliteTable(
  "site_members",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    invitedAt: integer("invited_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    uniqueIndex("site_members_site_user_unique").on(table.siteId, table.userId),
    index("site_members_site_idx").on(table.siteId),
    index("site_members_user_idx").on(table.userId),
  ],
);

export const pages = sqliteTable(
  "pages",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    language: text("language").notNull().default("fr"),
    title: text("title").notNull(),
    status: text("status").notNull().default("draft"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    seoKeywords: text("seo_keywords"),
    isHomepage: integer("is_homepage", { mode: "boolean" }).notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("pages_site_slug_language_unique").on(
      table.siteId,
      table.slug,
      table.language,
    ),
    index("pages_site_idx").on(table.siteId),
  ],
);

export const blocks = sqliteTable(
  "blocks",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    pageId: text("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    position: integer("position").notNull(),
    content: text("content", { mode: "json" }).notNull(),
    isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("blocks_page_idx").on(table.pageId),
    uniqueIndex("blocks_page_position_unique").on(table.pageId, table.position),
  ],
);

export const products = sqliteTable(
  "products",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    price: integer("price"),
    currency: text("currency").default("EUR"),
    images: text("images", { mode: "json" }),
    category: text("category"),
    customAttributes: text("custom_attributes", { mode: "json" }),
    status: text("status").notNull().default("draft"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_site_idx").on(table.siteId),
    index("products_site_status_idx").on(table.siteId, table.status),
  ],
);

export const formSubmissions = sqliteTable(
  "form_submissions",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    formType: text("form_type").notNull(),
    pageId: text("page_id").references(() => pages.id, { onDelete: "set null" }),
    data: text("data", { mode: "json" }).notNull(),
    status: text("status").notNull().default("new"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    index("form_submissions_site_idx").on(table.siteId),
    index("form_submissions_site_status_idx").on(table.siteId, table.status),
  ],
);

export const media = sqliteTable(
  "media",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    provider: text("provider").notNull().default("cloudinary"),
    providerAssetId: text("provider_asset_id"),
    filename: text("filename").notNull(),
    mimeType: text("mime_type").notNull(),
    size: integer("size").notNull(),
    width: integer("width"),
    height: integer("height"),
    alt: text("alt"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [index("media_site_idx").on(table.siteId)],
);

export const featureFlags = sqliteTable(
  "feature_flags",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    feature: text("feature").notNull(),
    isEnabled: integer("is_enabled", { mode: "boolean" }).notNull().default(false),
    config: text("config", { mode: "json" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("feature_flags_site_idx").on(table.siteId),
    uniqueIndex("feature_flags_site_feature_unique").on(table.siteId, table.feature),
  ],
);

export const analyticsEvents = sqliteTable(
  "analytics_events",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    path: text("path").notNull(),
    visitorId: text("visitor_id").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    index("analytics_events_site_created_idx").on(table.siteId, table.createdAt),
    index("analytics_events_site_visitor_idx").on(table.siteId, table.visitorId),
  ],
);

export const testimonials = sqliteTable(
  "testimonials",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    authorName: text("author_name").notNull(),
    role: text("role"),
    quote: text("quote").notNull(),
    rating: integer("rating").notNull().default(5),
    status: text("status").notNull().default("pending"),
    source: text("source").notNull().default("dashboard"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [index("testimonials_site_status_idx").on(table.siteId, table.status)],
);

export const blogPosts = sqliteTable(
  "blog_posts",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    language: text("language").notNull().default("fr"),
    title: text("title").notNull(),
    content: text("content").notNull(),
    excerpt: text("excerpt"),
    coverImage: text("cover_image"),
    category: text("category"),
    tags: text("tags", { mode: "json" }),
    authorId: text("author_id").references(() => users.id, { onDelete: "set null" }),
    status: text("status").notNull().default("draft"),
    publishedAt: integer("published_at", { mode: "timestamp" }),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("blog_posts_site_idx").on(table.siteId),
    index("blog_posts_site_status_idx").on(table.siteId, table.status),
    uniqueIndex("blog_posts_site_slug_language_unique").on(
      table.siteId,
      table.slug,
      table.language,
    ),
  ],
);

export const plans = sqliteTable("plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  priceMonthly: integer("price_monthly").notNull().default(0),
  priceYearly: integer("price_yearly").notNull().default(0),
  stripePriceMonthlyId: text("stripe_price_monthly_id"),
  stripePriceYearlyId: text("stripe_price_yearly_id"),
  maxSites: integer("max_sites").notNull().default(1),
  maxPagesPerSite: integer("max_pages_per_site").notNull().default(5),
  maxProductsPerSite: integer("max_products_per_site").notNull().default(10),
  maxPostsPerSite: integer("max_posts_per_site").notNull().default(10),
  maxMembersPerSite: integer("max_members_per_site").notNull().default(1),
  canUseCustomDomain: integer("can_use_custom_domain", { mode: "boolean" }).notNull().default(false),
  canRemoveBranding: integer("can_remove_branding", { mode: "boolean" }).notNull().default(false),
  canUseBooking: integer("can_use_booking", { mode: "boolean" }).notNull().default(false),
  canUseAnalytics: integer("can_use_analytics", { mode: "boolean" }).notNull().default(false),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const subscriptions = sqliteTable(
  "subscriptions",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    planId: text("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "restrict" }),
    status: text("status").notNull().default("active"),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    currentPeriodStart: integer("current_period_start", { mode: "timestamp" }),
    currentPeriodEnd: integer("current_period_end", { mode: "timestamp" }),
    cancelAtPeriodEnd: integer("cancel_at_period_end", { mode: "boolean" }).notNull().default(false),
    trialEnd: integer("trial_end", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("subscriptions_user_idx").on(table.userId),
    index("subscriptions_stripe_customer_idx").on(table.stripeCustomerId),
    index("subscriptions_stripe_sub_idx").on(table.stripeSubscriptionId),
  ],
);

export const siteInvitations = sqliteTable(
  "site_invitations",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role").notNull().default("editor"),
    token: text("token").notNull().unique(),
    invitedBy: text("invited_by").references(() => users.id, { onDelete: "set null" }),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    acceptedAt: integer("accepted_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    index("site_invitations_site_idx").on(table.siteId),
    index("site_invitations_token_idx").on(table.token),
  ],
);

export const siteThemeOverrides = sqliteTable(
  "site_theme_overrides",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    siteId: text("site_id")
      .notNull()
      .unique()
      .references(() => sites.id, { onDelete: "cascade" }),
    colorPrimary: text("color_primary"),
    colorOnPrimary: text("color_on_primary"),
    colorBackground: text("color_background"),
    colorSurface: text("color_surface"),
    colorText: text("color_text"),
    colorMuted: text("color_muted"),
    colorBorder: text("color_border"),
    colorAccent: text("color_accent"),
    fontHeading: text("font_heading"),
    fontBody: text("font_body"),
    borderRadius: text("border_radius"),
    customCss: text("custom_css"),
    navLinks: text("nav_links", { mode: "json" }),
    footerText: text("footer_text"),
    footerLinks: text("footer_links", { mode: "json" }),
    socialLinks: text("social_links", { mode: "json" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),
  },
  (table) => [index("site_theme_overrides_site_idx").on(table.siteId)],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Theme = typeof themes.$inferSelect;
export type NewTheme = typeof themes.$inferInsert;
export type Site = typeof sites.$inferSelect;
export type NewSite = typeof sites.$inferInsert;
export type SiteMember = typeof siteMembers.$inferSelect;
export type NewSiteMember = typeof siteMembers.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
export type Block = typeof blocks.$inferSelect;
export type NewBlock = typeof blocks.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type NewFormSubmission = typeof formSubmissions.$inferInsert;
export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
export type FeatureFlag = typeof featureFlags.$inferSelect;
export type NewFeatureFlag = typeof featureFlags.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
export type Plan = typeof plans.$inferSelect;
export type NewPlan = typeof plans.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type SiteInvitation = typeof siteInvitations.$inferSelect;
export type NewSiteInvitation = typeof siteInvitations.$inferInsert;
export type SiteThemeOverride = typeof siteThemeOverrides.$inferSelect;
export type NewSiteThemeOverride = typeof siteThemeOverrides.$inferInsert;