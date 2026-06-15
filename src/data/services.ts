export type ConsultingServiceSlug =
  | "payload-cms-consultant"
  | "full-stack-javascript-consultant"
  | "remote-web-developer-europe";

export type ConsultingService = {
  slug: ConsultingServiceSlug;
  href: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  serviceType: string;
  keywords: string[];
  audience: string;
  heroPoints: string[];
  stats: Array<{
    label: string;
    value: string;
  }>;
  outcomes: Array<{
    title: string;
    description: string;
  }>;
  sections: Array<{
    title: string;
    description: string;
    items: string[];
  }>;
  process: Array<{
    title: string;
    description: string;
  }>;
  proof: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const consultingServices: ConsultingService[] = [
  {
    slug: "payload-cms-consultant",
    href: "/payload-cms-consultant",
    title: "Payload CMS Consultant",
    seoTitle: "Payload CMS Consultant for Remote European Teams | Ahmed Hrabi",
    description:
      "Payload CMS consultant for Next.js and TypeScript teams that need clean architecture, collections, access control, localization, admin workflows, SEO, migrations, and deployment support.",
    eyebrow: "Payload CMS consulting",
    h1: "Payload CMS Consultant for Next.js and TypeScript Projects",
    lead:
      "I help remote product teams design, build, and improve Payload CMS platforms that are maintainable for developers, usable for content teams, and ready for SEO-driven growth.",
    serviceType: "Payload CMS consulting",
    audience:
      "Remote startups, agencies, and product teams in Europe that need a Payload CMS consultant for Next.js, TypeScript, and content-heavy web platforms.",
    keywords: [
      "Payload CMS consultant",
      "Payload CMS developer",
      "Next.js Payload CMS",
      "Payload CMS TypeScript",
      "headless CMS consultant",
      "remote Payload CMS developer Europe",
    ],
    heroPoints: [
      "Payload architecture, collection modeling, globals, blocks, and relationship design.",
      "Access control, admin workflows, editorial previews, localization, and content governance.",
      "Technical SEO, structured content, migrations, deployment, and performance-oriented delivery.",
    ],
    stats: [
      { label: "CMS focus", value: "Payload" },
      { label: "Stack", value: "Next.js" },
      { label: "Delivery", value: "Remote" },
    ],
    outcomes: [
      {
        title: "A CMS your team can actually operate",
        description:
          "Collections, fields, blocks, permissions, preview flows, and admin screens are planned around the daily work of editors, marketers, and developers.",
      },
      {
        title: "A codebase that scales past the first launch",
        description:
          "TypeScript models, reusable blocks, stable APIs, and clear boundaries keep Payload from becoming a fragile custom admin panel.",
      },
      {
        title: "SEO foundations built into the content model",
        description:
          "Metadata, canonical fields, localized slugs, sitemap data, Open Graph images, and structured content are designed before content migration starts.",
      },
    ],
    sections: [
      {
        title: "Payload architecture and content modeling",
        description:
          "I design the data model before implementation, so collections and blocks match the real business workflow instead of mirroring a generic CMS demo.",
        items: [
          "Collections, globals, blocks, relationships, uploads, drafts, revisions, and field groups.",
          "Type-safe content contracts between Payload, Next.js, API consumers, and frontend components.",
          "Reusable page-builder blocks for landing pages, articles, product pages, case studies, and resource hubs.",
          "Database-aware modeling for MongoDB or PostgreSQL depending on project constraints.",
        ],
      },
      {
        title: "Access control, admin UX, and editorial workflows",
        description:
          "Payload is strongest when developers use its access-control model carefully. I build the permission layer and admin experience around your roles.",
        items: [
          "Role-based access for admins, editors, clients, contributors, partners, and internal teams.",
          "Custom validation, conditional fields, status workflows, and safe publishing processes.",
          "Live preview, draft preview, reusable email templates, and content QA flows.",
          "Admin UI improvements that reduce confusion and make non-technical teams faster.",
        ],
      },
      {
        title: "Localization, technical SEO, and structured content",
        description:
          "For European and international sites, the CMS model needs to handle language, routing, metadata, and content reuse cleanly from the start.",
        items: [
          "Localized content fields, language-aware URLs, canonical rules, and fallback behavior.",
          "Page metadata, Open Graph data, sitemap fields, noindex controls, redirects, and schema-ready content.",
          "Structured data support for articles, services, breadcrumbs, products, FAQs, and case studies.",
          "Performance-minded rendering with Next.js App Router, ISR, image optimization, and cache strategy.",
        ],
      },
      {
        title: "Migrations, deployment, and long-term maintenance",
        description:
          "I can help move content from older systems into Payload and prepare the platform for reliable production operations.",
        items: [
          "Migration planning from WordPress, Strapi, Notion, custom admin panels, spreadsheets, or legacy APIs.",
          "Import scripts, data cleanup rules, slug preservation, redirect mapping, and media migration.",
          "Deployment support for Vercel, Docker-based infrastructure, managed databases, and storage providers.",
          "Documentation, handover, bug fixing, and incremental feature delivery after launch.",
        ],
      },
    ],
    process: [
      {
        title: "Audit the content and workflow",
        description:
          "We map the content types, user roles, publishing process, SEO requirements, integrations, and migration risks.",
      },
      {
        title: "Design the Payload model",
        description:
          "I define collections, fields, access rules, admin UX, reusable blocks, frontend contracts, and deployment assumptions.",
      },
      {
        title: "Build in focused delivery cycles",
        description:
          "Implementation is split into reviewable increments: CMS setup, frontend integration, previews, SEO, migration, and launch checks.",
      },
      {
        title: "Launch and stabilize",
        description:
          "We verify content editing, page rendering, redirects, metadata, sitemaps, schema, performance, and team handover.",
      },
    ],
    proof: [
      {
        title: "Car rental platform with Payload CMS",
        description:
          "Built CMS-managed content, media, seasonal pricing support, editable email templates, preview flows, metadata, Open Graph, sitemaps, and optimized delivery for a production car rental platform.",
      },
      {
        title: "E-learning platform with Payload CMS",
        description:
          "Worked on multi-tenant learning flows, role-based dashboards, quiz management, lesson structures, document libraries, analytics, and reusable admin workflows.",
      },
      {
        title: "SEO-aware CMS implementation",
        description:
          "I connect the CMS model to actual search requirements: canonical URLs, metadata controls, clean internal links, structured data, and content templates editors can reuse.",
      },
    ],
    faqs: [
      {
        question: "Can you join an existing Payload CMS project?",
        answer:
          "Yes. I can audit an existing Payload CMS codebase, improve collection models, fix access-control issues, add localization, optimize the admin experience, or help stabilize a production launch.",
      },
      {
        question: "Do you work with Payload CMS and Next.js together?",
        answer:
          "Yes. My preferred Payload CMS work is with Next.js, TypeScript, server components, preview routes, cache strategy, SEO metadata, and reusable frontend blocks.",
      },
      {
        question: "Can you migrate content into Payload CMS?",
        answer:
          "Yes. I can plan and implement migrations from WordPress, Strapi, Notion, custom databases, spreadsheets, or legacy APIs, including media migration and redirect mapping.",
      },
      {
        question: "Can you work remotely with European teams?",
        answer:
          "Yes. I work from Tunisia with strong overlap for European teams, especially CET and CEST schedules, and I can communicate in English and French.",
      },
    ],
  },
  {
    slug: "full-stack-javascript-consultant",
    href: "/full-stack-javascript-consultant",
    title: "Full-Stack JavaScript Consultant",
    seoTitle:
      "Full-Stack JavaScript Developer Consultant | Next.js, Node.js, NestJS",
    description:
      "Full-stack JavaScript developer consultant for teams that need Next.js, React, Node.js, NestJS, APIs, databases, CMS integration, performance, technical SEO, and remote delivery.",
    eyebrow: "Full-stack JavaScript consulting",
    h1: "Full-Stack JavaScript Developer Consultant",
    lead:
      "I help teams turn product requirements into reliable web applications using Next.js, React, TypeScript, Node.js, NestJS, APIs, databases, and CMS-driven workflows.",
    serviceType: "Full-stack JavaScript development consulting",
    audience:
      "Startups, agencies, and product companies that need a remote full-stack JavaScript consultant for frontend, backend, CMS, APIs, performance, and SEO-sensitive web platforms.",
    keywords: [
      "full-stack JavaScript consultant",
      "full-stack JS developer",
      "Next.js consultant",
      "Node.js consultant",
      "NestJS developer",
      "remote full-stack developer Europe",
    ],
    heroPoints: [
      "Frontend delivery with Next.js, React, Angular, TypeScript, responsive UI, and accessible components.",
      "Backend delivery with Node.js, NestJS, Express, REST, GraphQL, authentication, and database design.",
      "Performance, technical SEO, CMS integrations, remote execution, and production-minded engineering.",
    ],
    stats: [
      { label: "Frontend", value: "Next.js" },
      { label: "Backend", value: "NestJS" },
      { label: "Focus", value: "Product" },
    ],
    outcomes: [
      {
        title: "A practical full-stack partner",
        description:
          "I can work across UI, API, database, CMS, deployment, and SEO details without forcing every task through separate handoffs.",
      },
      {
        title: "Cleaner technical decisions",
        description:
          "I prioritize maintainable TypeScript, clear boundaries, predictable APIs, and readable implementation over fragile shortcuts.",
      },
      {
        title: "A product that is easier to ship and improve",
        description:
          "The goal is not only to write features. It is to reduce friction for users, editors, developers, and the team that owns the platform after launch.",
      },
    ],
    sections: [
      {
        title: "Frontend application development",
        description:
          "I build frontend experiences that are fast, accessible, responsive, and maintainable for real product workflows.",
        items: [
          "Next.js App Router, React server components, client components, routing, forms, and state boundaries.",
          "Angular and React interfaces for dashboards, admin panels, marketplaces, healthcare apps, and e-learning products.",
          "Design-system friendly components, responsive layouts, reusable UI patterns, and accessibility-focused interactions.",
          "Performance checks for images, fonts, route loading, caching, bundle size, and Core Web Vitals.",
        ],
      },
      {
        title: "Backend APIs, databases, and integrations",
        description:
          "I implement backend services that expose clean contracts and support product growth without becoming difficult to change.",
        items: [
          "Node.js, NestJS, Express, REST APIs, GraphQL endpoints, validation, authentication, and authorization.",
          "Database modeling with MongoDB, MySQL, and relational workflows where data integrity matters.",
          "Integrations with CMS platforms, email providers, storage, maps, payment-like flows, and third-party APIs.",
          "Testing strategy, error handling, logging assumptions, deployment checks, and production debugging.",
        ],
      },
      {
        title: "CMS-driven web platforms",
        description:
          "For marketing sites, marketplaces, directories, and content platforms, I connect frontend performance with editorial flexibility.",
        items: [
          "Payload CMS, Notion API, structured content, reusable blocks, media workflows, and preview routes.",
          "Admin dashboards, role-based content workflows, document libraries, email templates, and analytics views.",
          "Metadata, canonical URLs, Open Graph, sitemaps, redirects, and JSON-LD schema support.",
          "Content model design that lets editors update pages without breaking layouts or SEO basics.",
        ],
      },
      {
        title: "Performance, SEO, and remote delivery",
        description:
          "I treat performance and SEO as engineering requirements, not late-stage polish.",
        items: [
          "Technical SEO audits for crawlability, metadata, headings, internal links, structured data, and indexing signals.",
          "Next.js caching, ISR, Cloudflare or CDN behavior, Redis use cases, and page speed improvements.",
          "Remote-friendly planning with scoped deliverables, async updates, review links, and short feedback loops.",
          "Documentation and handover so the product can keep moving after my engagement ends.",
        ],
      },
    ],
    process: [
      {
        title: "Clarify the product and technical scope",
        description:
          "We define the users, workflows, constraints, data model, integrations, deadlines, and what success should look like.",
      },
      {
        title: "Choose the simplest reliable architecture",
        description:
          "I propose an implementation plan that fits your current codebase, team size, and future maintenance needs.",
      },
      {
        title: "Ship in reviewable increments",
        description:
          "You get focused pull requests, demos, async updates, and clear decisions instead of hidden implementation work.",
      },
      {
        title: "Measure and improve",
        description:
          "We verify behavior, performance, SEO basics, accessibility, and production readiness before expanding scope.",
      },
    ],
    proof: [
      {
        title: "E-learning platform",
        description:
          "Built multi-tenant access, role-based dashboards, quiz flows, lesson management, notifications, document libraries, and analytics features.",
      },
      {
        title: "Healthcare matching platform",
        description:
          "Designed and delivered a specialist matching application with admin and doctor workflows, questionnaires, filtering, and map-based discovery.",
      },
      {
        title: "Marketplace and CRM experience",
        description:
          "Worked on candidate management, employer dashboards, company profiles, CRM workflows, drag-and-drop interfaces, and filtering-heavy admin screens.",
      },
    ],
    faqs: [
      {
        question: "Can you handle both frontend and backend work?",
        answer:
          "Yes. I work across frontend, backend, databases, CMS integration, APIs, admin dashboards, performance, and technical SEO. I am most effective when the product needs connected full-stack thinking.",
      },
      {
        question: "Which JavaScript stack do you prefer?",
        answer:
          "For new full-stack projects I usually prefer Next.js, TypeScript, Node.js, NestJS, and a CMS or database that fits the product. I also work with Angular and Express when the project already uses them.",
      },
      {
        question: "Can you improve an existing product instead of building from scratch?",
        answer:
          "Yes. I can join an existing codebase to fix bugs, improve architecture, add features, optimize performance, clean up APIs, or improve SEO and content workflows.",
      },
      {
        question: "How do you work with remote teams?",
        answer:
          "I work with scoped tasks, async updates, review links, documented decisions, and regular check-ins. This works well for European teams because Tunisia provides strong CET and CEST overlap.",
      },
    ],
  },
  {
    slug: "remote-web-developer-europe",
    href: "/remote-web-developer-europe",
    title: "Remote Web Developer for Europe",
    seoTitle: "Remote Full-Stack Developer for European Companies | Ahmed Hrabi",
    description:
      "Remote full-stack developer for European companies that need CET-friendly collaboration, English and French communication, async delivery, Next.js, Node.js, Payload CMS, and flexible hiring models.",
    eyebrow: "Remote Europe collaboration",
    h1: "Remote Full-Stack Developer for European Companies",
    lead:
      "I work from Tunisia with strong European timezone overlap, clear async communication, and full-stack delivery for teams that need reliable remote execution.",
    serviceType: "Remote full-stack web development",
    audience:
      "European companies, agencies, SaaS teams, and startups that want to hire a remote full-stack developer with Next.js, Node.js, TypeScript, CMS, and technical SEO experience.",
    keywords: [
      "remote full-stack developer Europe",
      "remote web developer Europe",
      "hire remote full-stack developer",
      "CET friendly developer",
      "English French web developer",
      "remote Next.js developer Europe",
    ],
    heroPoints: [
      "CET and CEST-friendly collaboration from Tunisia with overlap for European working hours.",
      "English and French communication for product, technical, and client-facing work.",
      "Flexible remote delivery for feature work, consulting, product builds, technical SEO, and long-term support.",
    ],
    stats: [
      { label: "Timezone", value: "UTC+1" },
      { label: "Languages", value: "EN / FR" },
      { label: "Mode", value: "Remote" },
    ],
    outcomes: [
      {
        title: "Timezone overlap without heavy coordination cost",
        description:
          "Tunisia runs on UTC+1, giving practical overlap with France, Germany, the Netherlands, Belgium, Switzerland, Spain, Italy, and the UK.",
      },
      {
        title: "Remote communication that keeps work visible",
        description:
          "I keep tasks, decisions, blockers, and review points clear through async updates, concise documentation, and demos when needed.",
      },
      {
        title: "Flexible collaboration for different hiring needs",
        description:
          "I can support short consulting engagements, project-based delivery, part-time remote work, or longer full-stack development roles.",
      },
    ],
    sections: [
      {
        title: "CET-friendly collaboration from Tunisia",
        description:
          "European teams usually need a developer who can collaborate during normal business hours without forcing late meetings or slow feedback cycles.",
        items: [
          "Strong overlap with CET and CEST schedules for planning, reviews, demos, and technical discussions.",
          "Experience working remotely with companies and clients outside Tunisia, including Canada and remote-first teams.",
          "Comfortable joining existing workflows in Slack, Linear, Jira, GitHub, GitLab, Notion, and similar tools.",
          "Practical meeting rhythm: enough live discussion to align, enough async work to protect delivery time.",
        ],
      },
      {
        title: "English and French communication",
        description:
          "For European teams, communication quality matters as much as technical skill. I can work in English and French across product and engineering discussions.",
        items: [
          "Clear written updates for progress, blockers, trade-offs, and decisions.",
          "Technical explanations that help non-technical stakeholders understand impact and priority.",
          "English collaboration for engineering teams, product managers, founders, and international clients.",
          "French communication for teams, agencies, and clients that prefer French during planning or review.",
        ],
      },
      {
        title: "Remote workflow and async delivery",
        description:
          "My remote workflow is built around visible progress, reviewable changes, and fewer surprises near deadlines.",
        items: [
          "Scoped tickets, implementation notes, pull requests, preview deployments, and handover documentation.",
          "Regular async check-ins that explain what changed, what is blocked, and what should be reviewed next.",
          "Small delivery increments for UI, APIs, CMS, database changes, performance improvements, and SEO work.",
          "Production-minded review of metadata, redirects, forms, validation, responsive behavior, and accessibility.",
        ],
      },
      {
        title: "Hiring models and availability",
        description:
          "Different teams need different levels of commitment. I can adapt the engagement model to the amount of ownership required.",
        items: [
          "Project-based delivery for landing pages, CMS builds, dashboards, and full-stack product features.",
          "Part-time consulting for Payload CMS, Next.js, technical SEO, architecture, or performance improvements.",
          "Longer remote collaboration for companies that need a reliable full-stack JavaScript developer.",
          "Discovery calls to define scope, timeline, communication expectations, and success criteria before starting.",
        ],
      },
    ],
    process: [
      {
        title: "Start with a focused discovery call",
        description:
          "We clarify the product, team setup, timezone expectations, communication tools, scope, and delivery model.",
      },
      {
        title: "Create a practical work plan",
        description:
          "I break the work into concrete tasks, risks, review points, and the first deliverables your team can validate.",
      },
      {
        title: "Deliver with async visibility",
        description:
          "You get progress updates, reviewable changes, and clear blockers without needing to chase status every day.",
      },
      {
        title: "Keep the relationship easy to extend",
        description:
          "Documentation, clean handover, and stable delivery make it easy to continue part-time, full-time, or project by project.",
      },
    ],
    proof: [
      {
        title: "Remote healthcare platform work",
        description:
          "Collaborated remotely on a healthcare matching platform with Angular, Next.js, Node.js, MySQL, maps, filtering, and admin workflows.",
      },
      {
        title: "Remote-friendly full-stack product delivery",
        description:
          "Delivered features across frontend, backend, dashboards, APIs, CMS workflows, email templates, and analytics with structured communication.",
      },
      {
        title: "European-compatible timezone and communication",
        description:
          "Tunisia's UTC+1 timezone creates useful overlap for European teams, and I can collaborate in English and French depending on the team context.",
      },
    ],
    faqs: [
      {
        question: "Can European companies hire you remotely?",
        answer:
          "Yes. I am based in Tunisia and available for remote collaboration with European companies, agencies, and startups that need full-stack JavaScript or Payload CMS support.",
      },
      {
        question: "Which timezones do you overlap with?",
        answer:
          "I work from UTC+1, which gives strong overlap with CET and practical overlap with CEST, the UK, Ireland, France, Germany, Belgium, the Netherlands, Switzerland, Spain, Italy, and nearby European timezones.",
      },
      {
        question: "Do you communicate in English and French?",
        answer:
          "Yes. I can work in English and French for planning, async updates, reviews, technical discussion, and client-facing collaboration.",
      },
      {
        question: "What hiring models do you support?",
        answer:
          "I can support project-based work, part-time consulting, technical audits, ongoing feature delivery, or longer remote full-stack developer engagements depending on scope and availability.",
      },
    ],
  },
];

export function getConsultingService(slug: ConsultingServiceSlug) {
  return consultingServices.find((service) => service.slug === slug);
}
