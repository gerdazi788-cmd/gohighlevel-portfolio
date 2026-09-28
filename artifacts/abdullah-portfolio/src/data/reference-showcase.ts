/**
 * Reference examples sourced from Subhan Khan's portfolio (https://subhankhan.website/).
 * Shown for reference only — these are NOT Abdullah's projects or results.
 */
export const referenceSource = { name: "Subhan Khan", url: "https://subhankhan.website/" };

export const refAsset = (file: string) => `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}reference/${file}`;

export type RefSite = { id: string; type: "Funnel" | "Website" | "Landing Page"; domain: string; niche: string; kind: string; image: string };

export const referenceSites: RefSite[] = [
  { id: "horizon", type: "Funnel", domain: "horizon.viralcoach.com", niche: "Kids Education & Coaching", kind: "Lead Generation Funnel", image: "horizon-hd.jpg" },
  { id: "backyard", type: "Website", domain: "thebackyardnursery.viralcoach.com", niche: "Garden & Nursery", kind: "Landscaping Website", image: "thebackyardnursery-hd.jpg" },
  { id: "naturalscapes", type: "Website", domain: "naturalscapes.viralcoach.com", niche: "Landscape Design & Build", kind: "Corporate Website", image: "naturalscapes-hd.jpg" },
  { id: "brightpath", type: "Landing Page", domain: "brightpathwellness.viralcoach.com", niche: "Wellness & Weight Care", kind: "Sales Landing Page", image: "brightpathwellness-hd.jpg" },
  { id: "k9", type: "Funnel", domain: "k9kountry.viralcoach.com", niche: "Dog Boarding & Daycare", kind: "Booking Funnel", image: "k9kountry-hd.jpg" },
  { id: "impact", type: "Website", domain: "impactprofessionals.viralcoach.com", niche: "Business Coaching", kind: "Consultation Funnel", image: "impactprofessionals-hd.jpg" },
  { id: "gordy", type: "Landing Page", domain: "michaelgordyfinancialservice.viralcoach.com", niche: "Insurance & Financial Services", kind: "Quote Funnel", image: "michaelgordyfinancialservice-hd.jpg" },
  { id: "lawncare", type: "Funnel", domain: "lawncarelaunch.viralcoach.com", niche: "Lawn Care Services", kind: "Lead Generation Funnel", image: "lawncarelaunch-hd.jpg" },
  { id: "insight", type: "Website", domain: "insightbehavioralhealthinc.viralcoach.com", niche: "Behavioral Health Clinic", kind: "Patient Intake Website", image: "insightbehavioralhealthinc-hd.jpg" },
  { id: "flightstars", type: "Website", domain: "flightstarsllc.viralcoach.com", niche: "Aviation Flight Training", kind: "Enrollment Website", image: "flightstarsllc-hd.jpg" },
];

export type RefFlow = { id: string; platform: string; tag: string; title: string; problem: string; solution: string; outcome?: string; image: string };

export const referenceFlows: RefFlow[] = [
  { id: "meeting-ai", platform: "Zapier", tag: "Case Study", title: "AI Meeting Intelligence Automation", image: "flow1.jpg",
    problem: "After every Zoom sales call, the client had to manually re-listen to the recording, hunt for specific discovery answers, and type them into the contact's CRM notes by hand — slow, repetitive, and easy to get wrong.",
    solution: "Fathom AI was connected directly to Zoom to auto-transcribe every call. That transcript is passed to an AI agent trained to extract exactly the fields the sales team needs — and the results are written straight into the contact's CRM notes, fully hands-free.",
    outcome: "Manual note-taking eliminated — every call documented automatically, the moment it ends." },
  { id: "appt-confirm", platform: "GoHighLevel", tag: "Fewer no-shows", title: "Appointment Confirmation & Nurture Sequence", image: "flow2.jpg",
    problem: "Booked leads were going cold between scheduling and the actual call.",
    solution: "The moment a call is booked, the contact is auto-tagged, moved into the right pipeline stage, and enrolled in a confirmation + reminder email sequence that keeps the appointment top of mind." },
  { id: "no-show", platform: "GoHighLevel", tag: "Automatic recovery", title: "No-Show Recovery Automation", image: "flow3.jpg",
    problem: "Missed appointments often sat untouched until a rep noticed and manually chased the lead.",
    solution: "A \u201cno-show\u201d status change automatically swaps the contact's tag, updates the pipeline stage, and triggers a re-engagement email sequence inviting them to rebook — no manual follow-up required." },
  { id: "win-back", platform: "GoHighLevel", tag: "Turns losses into rebookings", title: "Cancellation Win-Back Automation", image: "flow4.jpg",
    problem: "A cancelled appointment usually meant a lost opportunity with no structured way to bring the lead back.",
    solution: "Every cancellation automatically re-tags the contact, shifts the pipeline stage, and fires a follow-up sequence with a direct rebooking link — converting a cancellation into a second chance." },
  { id: "engagement", platform: "GoHighLevel", tag: "Surfaces hot leads instantly", title: "Engagement Detection & Lead Routing", image: "flow5.jpg",
    problem: "Reps had no reliable way to know which leads were actively engaging versus going cold.",
    solution: "The moment a contact replies or gets tagged as \u201cengaged,\u201d the system detects the signal in real time and routes them straight into a prioritized follow-up track." },
  { id: "intake", platform: "GoHighLevel", tag: "Zero-delay follow-up", title: "New Lead Intake & Nurture Automation", image: "flow6.jpg",
    problem: "Leads from Facebook and website forms needed manual entry before any follow-up could even begin.",
    solution: "Every form submission instantly creates an opportunity, tags the contact, and kicks off a structured nurture sequence — from form fill to first follow-up in seconds." },
  { id: "won-onboard", platform: "GoHighLevel", tag: "Consistent, instant onboarding", title: "Won-Deal Client Onboarding Automation", image: "flow4.jpg",
    problem: "Onboarding after a closed deal was inconsistent and often kicked off manually — creating friction in the client's first experience.",
    solution: "The instant an opportunity is marked \u201cWon,\u201d the pipeline stage updates and the client is automatically routed into a structured onboarding sequence — the same polished experience, every time." },
  { id: "capi-forms", platform: "Meta Conversion API", tag: "More accurate attribution", title: "Server-Side Conversion Tracking · Form Leads", image: "flow5.jpg",
    problem: "Ad blockers, browser restrictions, and iOS privacy limits were causing real conversions to go unreported to Meta.",
    solution: "Every form submission is sent server-side directly to Meta's Conversion API — restoring accurate attribution straight from the source, independent of the visitor's browser." },
  { id: "capi-calls", platform: "Meta Conversion API", tag: "Cleaner signal for optimization", title: "Server-Side Conversion Tracking · Booked Calls", image: "flow6.jpg",
    problem: "High-value \u201cbooked call\u201d conversions weren't reliably reaching the ad platform, skewing campaign optimization.",
    solution: "Every booked appointment fires a server-side event straight to Meta's Conversion API, giving campaigns clean, reliable signal to optimize toward the actions that actually matter." },
  { id: "reputation", platform: "GoHighLevel", tag: "Protects online reputation", title: "Reputation Management & Review Routing", image: "flow1.jpg",
    problem: "Every new review was treated the same way, with no system to promote 5-star praise or catch lower ratings before they escalated.",
    solution: "New Google reviews trigger automatic branching by star rating — 5-star reviews are routed toward public promotion, while lower ratings are flagged instantly for private, direct follow-up." },
  { id: "multichannel", platform: "GoHighLevel", tag: "No lead falls through the cracks", title: "Multi-Channel Engagement Routing", image: "flow2.jpg",
    problem: "Leads reaching out across SMS, email, and social DMs were handled inconsistently depending on which channel they used.",
    solution: "Incoming engagement across every channel is automatically detected and routed into one unified follow-up flow — same speed, same quality response, no matter how the lead reaches out." },
];
