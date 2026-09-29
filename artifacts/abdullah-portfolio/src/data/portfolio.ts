/**
 * Central content config — edit everything here.
 * Placeholders are intentionally labeled; replace them with real data.
 */

export const profile = {
  name: "Abdullah Gardezi",
  role: "GoHighLevel Specialist",
  location: "Pakistan",
  education: "Bachelor's in Computer Science",
  experience: "3+ Years",
  profileImage: `${import.meta.env.BASE_URL}abdullah-profile.jpeg`,
  aboutImage: `${import.meta.env.BASE_URL}abdullah-profile.jpeg`,
};

/** Contact placeholders — set `href` to real URLs when available. null = not yet provided. */
export const contactLinks: { id: string; label: string; placeholder: string; href: string | null }[] = [
  { id: "email", label: "Email", placeholder: "[EMAIL PLACEHOLDER]", href: null },
  { id: "linkedin", label: "LinkedIn", placeholder: "[LINKEDIN URL PLACEHOLDER]", href: null },
  { id: "whatsapp", label: "WhatsApp", placeholder: "[WHATSAPP NUMBER PLACEHOLDER]", href: null },
  { id: "portfolio", label: "Portfolio / GHL links", placeholder: "[PROJECT LINKS PLACEHOLDER]", href: null },
];

export const services = [
  { id: "funnels", code: "FN", title: "Funnel Design", desc: "High-converting GHL funnels designed around the customer journey, lead generation, and conversion." },
  { id: "websites", code: "WB", title: "Website Design", desc: "Modern, responsive websites and landing pages built with a strong focus on user experience and conversion." },
  { id: "automation", code: "AU", title: "Automation", desc: "Lead nurturing, follow-ups, appointment workflows, notifications, pipelines, tags, and other GHL automations." },
  { id: "a2p", code: "A2", title: "A2P / 10DLC", desc: "GHL phone setup, A2P registration workflows, messaging compliance setup, and troubleshooting." },
  { id: "integrations", code: "IN", title: "Integrations", desc: "Connecting GHL with external platforms and business tools to create seamless workflows." },
  { id: "onboarding", code: "ON", title: "Client Onboarding", desc: "Complete GHL account setup, configuration, organization, and onboarding systems for new clients." },
] as const;

export const skillGroups = [
  { label: "Build", skills: ["GoHighLevel", "Funnel Building", "Landing Pages", "Website Design"] },
  { label: "Automate", skills: ["Workflow Automation", "Pipelines", "Forms & Surveys", "Calendars"] },
  { label: "Communicate", skills: ["Email Marketing", "SMS Marketing", "A2P / 10DLC"] },
  { label: "Operate", skills: ["CRM Setup", "API / Integrations", "Client Onboarding", "Lead Management"] },
];

/**
 * Reference project previews. These are EXAMPLES of GHL-style builds shown for
 * reference only — they are not claimed as Abdullah's work. Replace with real projects.
 */
export const projects = [
  { id: "p1", title: "Lead Generation Funnel", url: "https://theainetwork.com/", desc: "Placeholder project description — outline the goal, the funnel structure, and the outcome.", services: ["Funnels", "Forms", "Automation"] },
  { id: "p2", title: "GHL Automation System", url: "https://ghltechy.com/", desc: "Placeholder project description — describe the workflows, triggers, and follow-up logic.", services: ["Workflows", "Pipelines", "SMS"] },
  { id: "p3", title: "Service Business Website", url: "https://gowa.app/", desc: "Placeholder project description — describe the site structure, pages, and conversion points.", services: ["Website", "Landing Pages"] },
  { id: "p4", title: "Appointment Booking Funnel", url: "https://ouradmin.ca/", desc: "Placeholder project description — describe the calendar setup, reminders, and booking flow.", services: ["Calendars", "Reminders", "Funnels"] },
  { id: "p5", title: "Client Onboarding System", url: "https://preview-1786139725805091849.vibepreview.com/", desc: "Placeholder project description — describe the sub-account setup and onboarding sequence.", services: ["Onboarding", "CRM Setup"] },
  { id: "p6", title: "CRM & Integration Setup", url: "https://preview-1786133263671145046.vibepreview.com/", desc: "Placeholder project description — describe the connected tools and data flow.", services: ["API", "Integrations", "CRM"] },
];

export const processSteps = [
  { n: "01", title: "Discover", desc: "Understand the business, goals, audience, and requirements." },
  { n: "02", title: "Plan", desc: "Structure the funnel, website, CRM, automation, and integrations." },
  { n: "03", title: "Build", desc: "Develop the GHL assets and connect the required systems." },
  { n: "04", title: "Test", desc: "Test forms, workflows, notifications, integrations, and user journeys." },
  { n: "05", title: "Launch", desc: "Finalize the system and hand over a clean, functional GHL setup." },
];

export const reasons = [
  { title: "3+ Years of GHL Experience", desc: "Hands-on time inside GoHighLevel across funnels, workflows, phone setup, and sub-account configuration." },
  { title: "Technical Background in Computer Science", desc: "A CS degree means integrations, logic, and data flow are approached as engineering problems, not guesswork." },
  { title: "End-to-End GHL Knowledge", desc: "From the first landing page to the last automation — one person who understands how the pieces connect." },
  { title: "Focus on Clean & Scalable Systems", desc: "Named workflows, organized pipelines, consistent tags. Systems your team can manage after handover." },
  { title: "Strong Attention to Detail", desc: "Every form, trigger, and notification is tested before launch — not after a client finds the bug." },
];

/** Testimonial placeholders — replace with real, approved client quotes only. */
export const testimonials = [
  { id: "t1", quote: "Client testimonial goes here.", name: "Client Name", role: "Company / Role", photo: null as string | null },
  { id: "t2", quote: "Client testimonial goes here.", name: "Client Name", role: "Company / Role", photo: null as string | null },
  { id: "t3", quote: "Client testimonial goes here.", name: "Client Name", role: "Company / Role", photo: null as string | null },
];

export const projectTypes = ["Funnel Design", "Website Design", "Automation", "A2P / 10DLC", "Integrations", "Client Onboarding", "Complete GHL Setup", "Other"];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Portfolio" },
  { href: "#automations", label: "Automations" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];
