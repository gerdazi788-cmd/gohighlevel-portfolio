import { useEffect, useRef, useState, type ReactNode, type FormEvent, type CSSProperties } from "react";
import {
  ArrowRight, ArrowUpRight, Menu, X, Filter, Globe, Workflow, MessageSquareText, Plug, UserCheck,
  MapPin, GraduationCap, Mail, Linkedin, Phone, Link2, Check, Quote, ImageIcon, ShieldCheck, Code2,
  Layers, Boxes, ScanEye, TriangleAlert, Terminal,
} from "lucide-react";
import {
  profile, contactLinks, services, skillGroups, projects, processSteps, reasons, testimonials, projectTypes, navLinks,
} from "@/data/portfolio";
import { ReferenceSitesSection, ReferenceAutomationsSection } from "@/components/reference-showcase";

const serviceIcons = { funnels: Filter, websites: Globe, automation: Workflow, a2p: MessageSquareText, integrations: Plug, onboarding: UserCheck };
const reasonIcons = [Layers, Code2, Boxes, ShieldCheck, ScanEye];
const contactIcons: Record<string, typeof Mail> = { email: Mail, linkedin: Linkedin, whatsapp: Phone, portfolio: Link2 };

/* ---------- reveal ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ---------- primitives ---------- */
function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
      <span className="text-muted-foreground">{index}</span>
      <span className="h-px w-8 bg-primary/60" />
      {children}
    </div>
  );
}

function Btn({ href, children, variant = "primary", testId }: { href: string; children: ReactNode; variant?: "primary" | "ghost"; testId: string }) {
  const base = "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const v = variant === "primary"
    ? "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_hsl(186_95%_55%/.7)]"
    : "border border-border bg-card/40 text-foreground backdrop-blur hover:border-accent/60 hover:bg-accent/10";
  return (
    <a href={href} className={`${base} ${v}`} data-testid={testId}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </a>
  );
}

function Placeholder({ label, className = "", compact = false }: { label: string; className?: string; compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[radial-gradient(circle_at_30%_20%,hsl(186_95%_55%/.18),transparent_55%),radial-gradient(circle_at_80%_90%,hsl(262_80%_66%/.25),transparent_55%)] ${className}`} role="img" aria-label={label}>
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="anim-scan absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <ImageIcon className={compact ? "h-4 w-4 text-primary/80" : "h-7 w-7 text-primary/80"} aria-hidden />
        <span className={`font-mono uppercase tracking-[0.18em] text-muted-foreground ${compact ? "text-[8px]" : "text-[10px]"}`}>{label}</span>
      </div>
      {!compact && ["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
        <span key={c} className={`absolute h-4 w-4 border-primary/70 ${c}`} />
      ))}
    </div>
  );
}

/* ---------- nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "border-b border-border/70 bg-background/80 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Primary">
        <a href="#home" className="flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-testid="link-logo">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-primary/40 bg-primary/10 font-display text-sm font-bold text-primary">AG</span>
          <span className="hidden font-display text-[15px] font-semibold sm:block">Abdullah Gardezi</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-testid={`link-nav-${l.label.toLowerCase()}`}>
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden min-h-10 items-center gap-2 rounded-full border border-primary/40 px-4 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex" data-testid="button-nav-cta">
            <span className="anim-pulse h-1.5 w-1.5 rounded-full bg-current" /> Available for projects
          </a>
          <button onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-full border border-border lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} data-testid="button-menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-border/70 px-5 pb-6 lg:hidden">
          <ul className="flex flex-col pt-2">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-between border-b border-border/50 font-display text-2xl" data-testid={`link-mobile-${l.label.toLowerCase()}`}>
                  {l.label}<span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="anim-drift absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[120px]" aria-hidden />
      <div className="anim-drift absolute -right-32 top-40 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[130px]" style={{ animationDelay: "-9s" }} aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="reveal mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="anim-pulse h-1.5 w-1.5 rounded-full bg-primary" /> GHL Systems Online — {profile.location}
          </div>
          <h1 className="reveal font-display text-[2.6rem] font-bold leading-[0.98] sm:text-6xl lg:text-[4.6rem]" style={d(80)}>
            GoHighLevel Specialist Building <span className="text-grad">Funnels, Automations</span> &amp; High-Converting Digital Systems
          </h1>
          <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground" style={d(180)}>
            Hi, I'm Abdullah Gardezi — a GoHighLevel specialist with 3+ years of experience helping businesses build funnels, websites, automations, integrations, and complete GHL systems.
          </p>
          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row" style={d(280)}>
            <Btn href="#work" testId="button-view-work">View My Work</Btn>
            <Btn href="#contact" variant="ghost" testId="button-work-together">Let's Work Together</Btn>
          </div>
        </div>
        <div className="reveal relative mx-auto w-full max-w-md" style={d(200)}>
          <div className="group relative rounded-[28px] border border-border bg-card/60 p-3 backdrop-blur transition-all duration-500 hover:border-primary/50 hover:shadow-[0_30px_80px_-30px_hsl(186_95%_55%/.45)]">
            <div className="flex items-center justify-between px-2 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>operator.profile</span><span className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-border" />)}</span>
            </div>
            <div className="overflow-hidden rounded-[20px]">
              {profile.profileImage
                ? <img src={profile.profileImage} alt="Abdullah Gardezi" fetchPriority="high" className="aspect-[4/5] w-full object-cover object-[60%_center] transition-transform duration-700 group-hover:scale-105" />
                : <Placeholder label="[PROFILE IMAGE PLACEHOLDER]" className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.03]" />}
            </div>
          </div>
          <div className="anim-float absolute -left-6 bottom-16 rounded-2xl border border-border bg-background/90 px-4 py-3 backdrop-blur md:-left-12">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Experience</div>
            <div className="font-display text-2xl font-bold text-primary">3+ yrs</div>
          </div>
          <div className="anim-float absolute -right-4 top-20 rounded-2xl border border-border bg-background/90 px-4 py-3 backdrop-blur md:-right-10" style={{ animationDelay: "-3s" }}>
            <div className="flex items-center gap-2 text-sm"><Workflow className="h-4 w-4 text-accent" /> Workflow active</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [["3+ Years", "GoHighLevel Experience"], ["6+", "Core GHL Services"], ["Funnels", "Automation & Conversion"], ["End-to-End", "GHL Implementation"]];
  return (
    <section aria-label="Experience highlights" className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {items.map(([a, b], i) => (
          <div key={a} className={`reveal px-5 py-8 md:px-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} md:border-l first:md:border-l-0 border-border`} style={d(i * 90)}>
            <div className="font-display text-2xl font-bold md:text-3xl" data-testid={`text-stat-${i}`}>{a}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div className="reveal group order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[28px] border border-border">
            {profile.aboutImage
              ? <img src={profile.aboutImage} alt="Abdullah Gardezi in a navy suit" loading="lazy" className="aspect-[5/4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              : <Placeholder label="[ABOUT IMAGE PLACEHOLDER]" className="aspect-[5/4] w-full transition-transform duration-700 group-hover:scale-[1.03]" />}
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-3">
            {[[MapPin, "Based in", profile.location], [GraduationCap, "Degree", "BS Computer Science"], [Terminal, "GHL", profile.experience]].map(([I, k, v]) => {
              const Icon = I as typeof MapPin;
              return (
                <div key={k as string} className="rounded-2xl border border-border bg-card/60 p-4">
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                  <dt className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k as string}</dt>
                  <dd className="mt-1 text-sm font-medium">{v as string}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div className="order-1 lg:order-2">
          <Eyebrow index="01">About Me</Eyebrow>
          <h2 className="reveal mt-6 font-display text-4xl font-bold leading-[1.02] md:text-6xl" style={d(80)}>Building GHL Systems That <span className="text-grad">Actually Work</span></h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p className="reveal" style={d(140)}>I'm Abdullah Gardezi, a Computer Science graduate from Pakistan with 3+ years of hands-on experience working with GoHighLevel.</p>
            <p className="reveal" style={d(200)}>I specialize in building complete GHL systems — from funnel and website design to automation, integrations, A2P/10DLC setup, and client onboarding.</p>
            <p className="reveal border-l-2 border-primary pl-5 text-foreground" style={d(260)}>My focus is not just making things look good. I build systems that are structured, functional, easy to manage, and designed around the client's business goals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow index="02">Services / Expertise</Eyebrow>
            <h2 className="reveal mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.02] md:text-6xl" style={d(80)}>Six modules. One connected system.</h2>
          </div>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id];
            return (
              <article key={s.id} className="reveal group relative bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10" style={d(i * 70)} data-testid={`card-service-${s.id}`}>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,hsl(186_95%_55%/.12),transparent_60%)]" />
                <div className="relative transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-card text-primary transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-[0_0_0_6px_hsl(186_95%_55%/.08)]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{s.code}/0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const all = skillGroups.flatMap((g) => g.skills);
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden border-y border-border bg-card/30 py-24 md:py-32">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow index="03">My GHL Skills</Eyebrow>
        <h2 id="skills-title" className="reveal mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.02] md:text-6xl" style={d(80)}>The full stack of the platform — <span className="text-muted-foreground">not just the page builder.</span></h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, gi) => (
            <div key={g.label} className="reveal rounded-3xl border border-border bg-background/70 p-6" style={d(gi * 90)}>
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
                <span className="text-accent">{g.label}</span><span className="text-muted-foreground">{String(g.skills.length).padStart(2, "0")}</span>
              </div>
              <ul className="mt-6 space-y-2">
                {g.skills.map((s) => (
                  <li key={s} className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5" data-testid={`badge-skill-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                    <span className="text-[15px]">{s}</span>
                    <Check className="h-4 w-4 text-primary opacity-40 transition-opacity group-hover:opacity-100" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-16 overflow-hidden border-t border-border py-5" aria-hidden>
        <div className="anim-marquee flex w-max gap-10 whitespace-nowrap font-display text-3xl font-semibold text-muted-foreground/40">
          {[...all, ...all].map((s, i) => <span key={i} className="flex items-center gap-10">{s}<span className="h-2 w-2 rotate-45 bg-primary/50" /></span>)}
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ url, title }: { url: string; title: string }) {
  const [state, setState] = useState<"loading" | "loaded" | "blocked">("loading");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const domain = new URL(url).hostname.replace(/^www\./, "");
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: "300px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setState((s) => (s === "loading" ? "blocked" : s)), 12000);
    return () => clearTimeout(t);
  }, [visible]);
  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden bg-card">
      {visible && state !== "blocked" && (
        <iframe
          src={url}
          title={`Reference preview: ${title} (${domain})`}
          loading="lazy"
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setState("loaded")}
          onError={() => setState("blocked")}
          className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-25 border-0 transition-transform duration-[1.2s] group-hover:scale-[0.26]"
        />
      )}
      {state === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,hsl(var(--card)),hsl(var(--muted)),hsl(var(--card)))]">
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Loading {domain}</div>
        </div>
      )}
      {state === "blocked" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="grid-bg absolute inset-0 opacity-60" />
          <TriangleAlert className="relative h-6 w-6 text-accent" aria-hidden />
          <p className="relative font-display text-xl font-semibold">{domain}</p>
          <p className="relative text-xs text-muted-foreground">This site doesn't allow embedded previews.</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="relative inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm hover:border-primary hover:text-primary">
            Open site <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow index="04">Selected Work</Eyebrow>
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="reveal max-w-2xl font-display text-4xl font-bold leading-[1.02] md:text-6xl" style={d(80)}>Project showcase</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <article key={p.id} className="reveal group overflow-hidden rounded-[24px] border border-border bg-card/50 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_30px_70px_-35px_hsl(186_95%_55%/.5)]" style={d((i % 2) * 100)} data-testid={`card-project-${p.id}`}>
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="flex gap-1.5">{[0, 1, 2].map((k) => <span key={k} className="h-2 w-2 rounded-full bg-border" />)}</span>
                <span className="ml-2 truncate rounded-md bg-background/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">{new URL(p.url).hostname}</span>
                <span className="ml-auto shrink-0 rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">Reference</span>
              </div>
              <div className="relative">
                <ProjectPreview url={p.url} title={p.title} />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Example preview — placeholder project</span>
                </div>
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2" aria-label="Services used">
                    {p.services.map((s) => <li key={s} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">{s}</li>)}
                  </ul>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-foreground/5 px-4 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-testid={`link-project-${p.id}`}>
                    View Project <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only">(reference site, opens in new tab)</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative border-y border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow index="05">My Process</Eyebrow>
        <h2 className="reveal mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.02] md:text-6xl" style={d(80)}>From brief to handover in five passes.</h2>
        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r" aria-hidden />
          {processSteps.map((s, i) => (
            <li key={s.n} className="reveal group relative pl-14 lg:pl-0 lg:pt-16" style={d(i * 110)} data-testid={`step-process-${s.n}`}>
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-primary/50 bg-background font-mono text-xs text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">{s.n}</span>
              <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow index="06">Why Work With Me</Eyebrow>
          <h2 id="why-title" className="reveal mt-6 font-display text-4xl font-bold leading-[1.02] md:text-6xl" style={d(80)}>Plain reasons. <span className="text-grad">No inflated claims.</span></h2>
          <p className="reveal mt-6 max-w-sm text-muted-foreground" style={d(140)}>What you get when a CS graduate treats your GoHighLevel account like software.</p>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {reasons.map((r, i) => {
            const Icon = reasonIcons[i];
            return (
              <li key={r.title} className="reveal group grid grid-cols-[auto_1fr] gap-6 py-7 transition-colors" style={d(i * 70)}>
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"><Icon className="h-5 w-5" aria-hidden /></span>
                <div className="transition-transform duration-300 group-hover:translate-x-1">
                  <h3 className="font-display text-xl font-semibold md:text-2xl">{r.title}</h3>
                  <p className="mt-2 text-muted-foreground">{r.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="t-title" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow index="07">Testimonials</Eyebrow>
        <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="t-title" className="reveal font-display text-4xl font-bold md:text-6xl" style={d(80)}>Client words</h2>
          <span className="reveal font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground" style={d(120)}>Placeholder slots — awaiting real testimonials</span>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={t.id} className={`reveal group relative rounded-[24px] border border-dashed border-border bg-card/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 ${i === 1 ? "md:translate-y-8 md:hover:translate-y-7" : ""}`} style={d(i * 100)} data-testid={`card-testimonial-${t.id}`}>
              <Quote className="h-7 w-7 text-primary/60" aria-hidden />
              <blockquote className="mt-6 font-display text-xl leading-snug text-muted-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-5">
                {t.photo
                  ? <img src={t.photo} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                  : <Placeholder label="[CLIENT PHOTO PLACEHOLDER]" compact className="h-12 w-12 shrink-0 rounded-full border border-border" />}
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section aria-labelledby="cta-title" className="px-5 py-16 md:px-8">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-border bg-card px-6 py-20 text-center md:py-28">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="anim-drift absolute left-1/4 top-0 h-80 w-80 rounded-full bg-primary/25 blur-[110px]" aria-hidden />
        <div className="anim-drift absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-accent/30 blur-[110px]" style={{ animationDelay: "-7s" }} aria-hidden />
        <div className="relative">
          <h2 id="cta-title" className="mx-auto max-w-4xl font-display text-4xl font-bold leading-[1] md:text-7xl">Have a GHL Project in Mind?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Whether you need a funnel, website, automation system, integration, or complete GHL setup, let's discuss what you're building.</p>
          <div className="mt-10 flex justify-center"><Btn href="#contact" testId="button-cta-work-together">Let's Work Together</Btn></div>
        </div>
      </div>
    </section>
  );
}

type Errors = Partial<Record<"name" | "email" | "type" | "message", string>>;
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: undefined })); };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Please enter a valid email address.";
    if (!form.type) er.type = "Please choose a project type.";
    if (form.message.trim().length < 10) er.message = "Tell me a little more (at least 10 characters).";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };
  const field = "w-full min-h-12 rounded-xl border border-input bg-background/60 px-4 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-err`} className="mt-1.5 text-sm text-destructive" role="alert">{errors[k]}</p>;
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Eyebrow index="08">Contact</Eyebrow>
          <h2 className="reveal mt-6 font-display text-4xl font-bold leading-[1.02] md:text-6xl" style={d(80)}>Start the conversation.</h2>
          <dl className="reveal mt-10 space-y-4" style={d(140)}>
            {[["Name", profile.name], ["Location", profile.location], ["Specialization", profile.role]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="reveal mt-8 grid gap-3 sm:grid-cols-2" style={d(200)}>
            {contactLinks.map((c) => {
              const Icon = contactIcons[c.id];
              const inner = (<><Icon className="h-4 w-4 text-primary" aria-hidden /><span className="min-w-0"><span className="block text-sm font-medium">{c.label}</span><span className="block truncate font-mono text-[10px] text-muted-foreground">{c.href ?? c.placeholder}</span></span></>);
              return (
                <li key={c.id}>
                  {c.href
                    ? <a href={c.href} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-3 rounded-2xl border border-border bg-card/50 px-4 hover:border-primary/50" data-testid={`link-contact-${c.id}`}>{inner}</a>
                    : <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-dashed border-border bg-card/30 px-4" data-testid={`text-contact-${c.id}`} aria-label={`${c.label}: placeholder, not yet provided`}>{inner}</div>}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="reveal rounded-[28px] border border-border bg-card/60 p-6 backdrop-blur md:p-10" style={d(120)}>
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center" role="status" data-testid="status-form-success">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary"><Check className="h-6 w-6" /></span>
              <h3 className="mt-6 font-display text-3xl font-semibold">Thanks, {form.name.split(" ")[0]}.</h3>
              <p className="mt-3 max-w-md text-muted-foreground">Your details passed validation. <strong className="text-foreground">This is a demo form</strong> — nothing was sent yet. It's ready to be connected to a backend or form service.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", type: "", message: "" }); }} className="mt-8 min-h-11 rounded-full border border-border px-5 text-sm hover:border-primary hover:text-primary" data-testid="button-form-reset">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5" aria-label="Contact form">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"><span>New project brief</span><span className="text-accent">Demo mode</span></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm">Name</label>
                  <input id="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} data-testid="input-name" />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm">Email</label>
                  <input id="email" type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} data-testid="input-email" />
                  {err("email")}
                </div>
              </div>
              <div>
                <label htmlFor="type" className="mb-2 block text-sm">Project Type</label>
                <select id="type" className={`${field} appearance-none`} value={form.type} onChange={set("type")} aria-invalid={!!errors.type} aria-describedby={errors.type ? "type-err" : undefined} data-testid="select-project-type">
                  <option value="">Select a project type</option>
                  {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {err("type")}
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm">Message</label>
                <textarea id="message" rows={6} className={`${field} py-3`} value={form.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} data-testid="input-message" />
                {err("message")}
              </div>
              <button type="submit" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_hsl(186_95%_55%/.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-testid="button-submit">
                Submit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = navLinks.filter((l) => l.label !== "Process");
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="font-display text-3xl font-bold">Abdullah Gardezi</div>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">GoHighLevel Specialist | Funnels | Automation | Integrations</p>
          </div>
          <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((l) => <li key={l.href}><a href={l.href} className="text-sm text-muted-foreground hover:text-primary" data-testid={`link-footer-${l.label.toLowerCase()}`}>{l.label}</a></li>)}
          </ul></nav>
        </div>
        <div className="mt-12 flex flex-col-reverse justify-between gap-6 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">© 2026 Abdullah Gardezi. All rights reserved.</p>
          <ul className="flex gap-2" aria-label="Social links (placeholders)">
            {contactLinks.slice(0, 3).map((c) => {
              const Icon = contactIcons[c.id];
              return <li key={c.id}>{c.href
                ? <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.label} className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Icon className="h-4 w-4" /></a>
                : <span title={`${c.label} — placeholder`} aria-label={`${c.label} placeholder`} className="grid h-11 w-11 place-items-center rounded-full border border-dashed border-border text-muted-foreground"><Icon className="h-4 w-4" /></span>}</li>;
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useReveal();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero /><TrustStrip /><About /><Services /><Skills /><Work /><ReferenceSitesSection /><ReferenceAutomationsSection /><Process /><Why /><Testimonials /><CTA /><Contact />
      </main>
      <Footer />
    </>
  );
}
