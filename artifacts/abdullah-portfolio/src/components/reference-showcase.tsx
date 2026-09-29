import { useEffect, useRef, useState, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, Pause, Play, X } from "lucide-react";
import { referenceSites, referenceFlows, referenceSource, refAsset } from "@/data/reference-showcase";

type LightboxItem = { title: string; subtitle: string; image: string };

function Lightbox({ items, index, onIndex }: { items: LightboxItem[]; index: number | null; onIndex: (i: number | null) => void }) {
  const item = index === null ? null : items[index];
  const scrollRef = useRef<HTMLDivElement>(null);
  const go = (delta: number) => {
    if (index === null) return;
    onIndex((index + delta + items.length) % items.length);
    scrollRef.current?.scrollTo({ top: 0 });
  };
  return (
    <DialogPrimitive.Root open={item !== null} onOpenChange={(o) => !o && onIndex(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-background/85 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <DialogPrimitive.Content
          className="fixed inset-2 z-[71] mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_40px_120px_-40px_hsl(186_95%_55%/.45)] focus:outline-none sm:inset-6"
          onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
          data-testid="dialog-reference-lightbox"
        >
          {item && (
            <>
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <div className="min-w-0 flex-1">
                  <DialogPrimitive.Title className="truncate font-display text-lg font-semibold">{item.title}</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.subtitle} · Reference example from {referenceSource.name} · {index! + 1}/{items.length}
                  </DialogPrimitive.Description>
                </div>
                <button onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Previous screenshot" data-testid="button-lightbox-prev"><ArrowLeft className="h-4 w-4" /></button>
                <button onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Next screenshot" data-testid="button-lightbox-next"><ArrowRight className="h-4 w-4" /></button>
                <DialogPrimitive.Close className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card" data-testid="button-lightbox-close">
                  <X className="h-4 w-4" aria-hidden /> Close
                </DialogPrimitive.Close>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain bg-background" tabIndex={0} aria-label="Full screenshot, scrollable">
                <img src={refAsset(item.image)} alt={`Full screenshot: ${item.title}`} className="mx-auto block w-full max-w-4xl" />
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function Rail({ label, children, testId, autoSlide = false, suspended = false }: { label: string; children: ReactNode; testId: string; autoSlide?: boolean; suspended?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const resumeAfter = useRef(0);

  useEffect(() => {
    if (!autoSlide) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, [autoSlide]);

  useEffect(() => {
    if (!autoSlide || paused || hovered || focused || reducedMotion || suspended || !visible) return;
    const timer = window.setInterval(() => {
      const el = ref.current;
      if (!el || document.hidden || Date.now() < resumeAfter.current) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const cards = el.children;
      const step = cards.length > 1
        ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
        : el.clientWidth;
      el.scrollTo({ left: el.scrollLeft >= max - 2 ? 0 : Math.min(el.scrollLeft + step, max), behavior: "smooth" });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [autoSlide, paused, hovered, focused, reducedMotion, suspended, visible]);

  const delaySlide = () => { resumeAfter.current = Date.now() + 8000; };
  const scroll = (dir: number) => {
    const el = ref.current; if (!el) return;
    delaySlide();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };
  const btn = "grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <div
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }}
    >
      <div className="mb-5 flex justify-end gap-2">
        {autoSlide && !reducedMotion && (
          <button onClick={() => setPaused((value) => !value)} className={btn} aria-label={paused ? "Play automation slideshow" : "Pause automation slideshow"} aria-pressed={paused} data-testid="button-flows-autoplay">
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        )}
        <button onClick={() => scroll(-1)} className={btn} aria-label={`Scroll ${label} back`} data-testid={`button-${testId}-prev`}><ArrowLeft className="h-4 w-4" /></button>
        <button onClick={() => scroll(1)} className={btn} aria-label={`Scroll ${label} forward`} data-testid={`button-${testId}-next`}><ArrowRight className="h-4 w-4" /></button>
      </div>
      <div ref={ref} role="region" aria-label={label} tabIndex={0} onPointerDown={delaySlide} onWheel={delaySlide}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 focus-visible:outline-none md:-mx-8 md:scroll-px-8 md:px-8 [scrollbar-width:thin]">
        {children}
      </div>
    </div>
  );
}

function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
      <span className="text-muted-foreground">{index}</span><span className="h-px w-8 bg-primary/60" />{children}
    </div>
  );
}

export function ReferenceSitesSection() {
  const [open, setOpen] = useState<number | null>(null);
  const items = referenceSites.map((s) => ({ title: s.domain, subtitle: `${s.type} — ${s.niche} · ${s.kind}`, image: s.image }));
  return (
    <section id="reference-builds" aria-labelledby="ref-sites-title" className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow index="04.1">Reference Builds</Eyebrow>
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 id="ref-sites-title" className="reveal max-w-2xl font-display text-4xl font-bold leading-[1.02] md:text-6xl">Precision-built for real businesses</h2>
            <p className="reveal mt-5 max-w-lg text-muted-foreground">Funnels, websites, and CRM pages — tap any card to view the full-page screenshot.</p>
          </div>
        </div>
        <div className="mt-12">
          <Rail label="Reference website builds" testId="sites">
            {referenceSites.map((s, i) => (
              <article key={s.id} className="group w-[82%] shrink-0 snap-start sm:w-[380px]" data-testid={`card-refsite-${s.id}`}>
                <button onClick={() => setOpen(i)} className="block w-full overflow-hidden rounded-[22px] border border-border bg-card/50 text-left transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0" aria-label={`View full screenshot of ${s.domain}`} data-testid={`button-view-refsite-${s.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-background">
                    <img src={refAsset(s.image)} alt="" loading="lazy" className="w-full object-cover object-top transition-transform duration-[2.5s] ease-out group-hover:-translate-y-[8%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">{s.type}</span>
                    <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1.5 text-xs backdrop-blur transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Maximize2 className="h-3.5 w-3.5" aria-hidden /> View full</span>
                  </div>
                  <div className="p-5">
                    <h3 className="truncate font-display text-lg font-semibold">{s.domain}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.niche} · {s.kind}</p>
                  </div>
                </button>
              </article>
            ))}
          </Rail>
        </div>
      </div>
      <Lightbox items={items} index={open} onIndex={setOpen} />
    </section>
  );
}

export function ReferenceAutomationsSection() {
  const [open, setOpen] = useState<number | null>(null);
  const items = referenceFlows.map((f) => ({ title: f.title, subtitle: `${f.platform} · ${f.tag}`, image: f.image }));
  return (
    <section id="automations" aria-labelledby="ref-flows-title" className="relative overflow-hidden border-t border-border bg-card/20 py-24 md:py-32">
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow index="04.2">Automation Workflow Showcase</Eyebrow>
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 id="ref-flows-title" className="reveal max-w-2xl font-display text-4xl font-bold leading-[1.02] md:text-6xl">Enterprise-grade automations in production</h2>
            <p className="reveal mt-5 max-w-lg text-muted-foreground">Problem-to-solution breakdowns of real workflow builds — the kind of logic Abdullah designs inside GoHighLevel.</p>
          </div>
        </div>
        <div className="mt-12">
          <Rail label="Reference automation workflows" testId="flows" autoSlide suspended={open !== null}>
            {referenceFlows.map((f, i) => (
              <article key={f.id} className="flex w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-border bg-background/70 sm:w-[420px]" data-testid={`card-refflow-${f.id}`}>
                <button onClick={() => setOpen(i)} className="group relative block aspect-[16/9] overflow-hidden border-b border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring" aria-label={`View full workflow screenshot: ${f.title}`} data-testid={`button-view-refflow-${f.id}`}>
                  <img src={refAsset(f.image)} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs backdrop-blur transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Maximize2 className="h-3.5 w-3.5" aria-hidden /> View full</span>
                </button>
                <div className="flex flex-1 flex-col p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em]"><span className="text-accent">{f.platform}</span><span className="text-muted-foreground"> · {f.tag}</span></div>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-tight">{f.title}</h3>
                  <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                    <div><dt className="font-mono text-[10px] uppercase tracking-widest text-destructive/90">Problem</dt><dd className="mt-1 text-muted-foreground">{f.problem}</dd></div>
                    <div><dt className="font-mono text-[10px] uppercase tracking-widest text-primary">Solution</dt><dd className="mt-1 text-foreground/90">{f.solution}</dd></div>
                  </dl>
                  {f.outcome && <p className="mt-4 border-l-2 border-primary pl-3 text-sm text-foreground/80">{f.outcome} <span className="text-muted-foreground">(source's reported result)</span></p>}
                </div>
              </article>
            ))}
          </Rail>
          <a href={referenceSource.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary" data-testid="link-reference-source-footer">
            Source: {referenceSource.url.replace(/^https:\/\/|\/$/g, "")} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
      <Lightbox items={items} index={open} onIndex={setOpen} />
    </section>
  );
}
