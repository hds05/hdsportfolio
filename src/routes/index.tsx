import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Code2,
  ArrowDown,
  Mail,
  ArrowUp,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Hero3D } from "@/components/portfolio/Hero3D";
import { useReveal } from "@/components/portfolio/useReveal";
import { Spotlight } from "@/components/portfolio/Spotlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Your Name — a full stack developer building thoughtful, performant web products end-to-end.",
      },
      { property: "og:title", content: "Your Name — Full Stack Developer" },
      {
        property: "og:description",
        content: "Portfolio, projects, and contact for Your Name.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/yourusername", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/yourusername", label: "LinkedIn", Icon: Linkedin },
  { href: "https://leetcode.com/yourusername", label: "LeetCode", Icon: Code2 },
  { href: "https://instagram.com/yourusername", label: "Instagram", Icon: Instagram },
];

const SKILLS: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
  Frontend: ["React", "Next.js", "TanStack", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express", "tRPC", "GraphQL", "REST"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  "Tools / DevOps": ["Git", "Docker", "AWS", "Vercel", "GitHub Actions"],
};

const PROJECTS = [
  {
    title: "Atlas Analytics",
    desc: "Realtime product analytics dashboard with custom SQL explorer and shareable boards.",
    tags: ["Next.js", "ClickHouse", "tRPC"],
    img: "https://picsum.photos/seed/atlas/800/500",
  },
  {
    title: "Quill Editor",
    desc: "Collaborative markdown editor with offline-first sync and end-to-end encrypted notes.",
    tags: ["React", "CRDT", "Rust/WASM"],
    img: "https://picsum.photos/seed/quill/800/500",
  },
  {
    title: "Forge CI",
    desc: "Lightweight self-hosted CI runner with parallel matrix builds and slick log streaming.",
    tags: ["Go", "Docker", "WebSockets"],
    img: "https://picsum.photos/seed/forge/800/500",
  },
  {
    title: "Pocket Studio",
    desc: "Tiny audio looper and beat sequencer that runs entirely in the browser via WebAudio.",
    tags: ["TypeScript", "WebAudio", "Canvas"],
    img: "https://picsum.photos/seed/pocket/800/500",
  },
];

const TIMELINE = [
  {
    role: "Senior Full Stack Engineer",
    org: "Acme Labs",
    dates: "2023 — Present",
    desc: "Leading the platform team, shipping core APIs and a redesigned web app used by 200k+ users.",
  },
  {
    role: "Full Stack Developer",
    org: "Northbeam Studio",
    dates: "2021 — 2023",
    desc: "Built dashboards, billing flows and infrastructure for several venture-backed product launches.",
  },
  {
    role: "B.Sc. Computer Science",
    org: "State University",
    dates: "2017 — 2021",
    desc: "Focus on distributed systems and human–computer interaction. Graduated with honors.",
  },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...NAV_LINKS.map((l) => l.id)];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Toaster theme="dark" position="bottom-right" />
      <Navbar scrolled={scrolled} active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar({
  scrolled,
  active,
  menuOpen,
  setMenuOpen,
}: {
  scrolled: boolean;
  active: string;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-display text-2xl tracking-tight">
          YN<span className="text-primary">.</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active === l.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full border border-primary/40 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-block"
        >
          Let's talk
        </a>
        <button
          className="md:hidden rounded-md border border-border px-3 py-2 text-xs"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>
      {menuOpen && (
        <div className="border-t border-border bg-background/95 md:hidden">
          <ul className="flex flex-col px-6 py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Hero3D />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_85%)]" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-32 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="order-2 md:order-1">
          <p className="font-mono-label mb-6">Full Stack Developer · Available for work</p>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            Your <span className="italic text-primary">Name</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            I design and build fast, considered web products — from database schemas to the last
            pixel.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Spotlight
              className="rounded-full"
              glow="oklch(1 0 0 / 0.25)"
              size={220}
            >
              <a
                href="#projects"
                className="block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_18px_40px_-12px_oklch(0.82_0.13_78_/_0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View my work
              </a>
            </Spotlight>
            <Spotlight className="rounded-full" size={220}>
              <a
                href="#contact"
                className="block rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_18px_40px_-18px_oklch(0.82_0.13_78_/_0.6)]"
              >
                Get in touch
              </a>
            </Spotlight>
          </div>
          <ul className="mt-10 flex items-center gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-[var(--gradient-glow)] blur-2xl" />
            <div className="relative h-56 w-56 rounded-full border border-primary/30 p-[3px] shadow-[var(--shadow-glow)] sm:h-72 sm:w-72">
              <div className="h-full w-full overflow-hidden rounded-full border border-border bg-card">
                <img
                  src="https://i.pravatar.cc/600?img=12"
                  alt="Portrait of Your Name"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute inset-0 -z-10 rounded-full border border-primary/20" />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        <span className="font-mono-label">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-14 flex items-end justify-between gap-6 border-b border-border pb-6">
      <div>
        <p className="font-mono-label mb-3">{kicker}</p>
        <h2 className="font-display text-4xl sm:text-5xl">{title}</h2>
      </div>
    </div>
  );
}

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="01 — About" title="A bit about me." />
      <div ref={ref} className="reveal grid grid-cols-1 items-center gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-2 rounded-2xl border border-primary/25" />
            <img
              src="https://picsum.photos/seed/portrait/700/800"
              alt="A second portrait of Your Name"
              className="relative aspect-[4/5] w-full rounded-2xl border border-border object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a full stack developer who likes the messy middle — the place between a product
            idea and a fast, reliable interface. Over the last few years I've built design systems,
            payment platforms, realtime dashboards and a few too many side projects.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            I care about thoughtful UX, clean APIs, and shipping. Outside of work I read sci-fi,
            tinker with synthesizers, and lose at chess online.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Based in Your City
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> your.email@example.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="02 — Skills" title="Tools of the trade." />
      <div ref={ref} className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(SKILLS).map(([cat, items]) => (
          <Spotlight
            key={cat}
            className="rounded-2xl border border-border bg-card/40 hover:border-primary/50 hover:-translate-y-1"
          >
            <div className="p-6">
              <p className="font-mono-label mb-4">{cat}</p>
              <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-background/40 px-3 py-1 text-sm text-foreground/90 transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Spotlight>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="03 — Selected work" title="Things I've built." />
      <div ref={ref} className="reveal grid grid-cols-1 gap-8 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Spotlight
            key={p.title}
            tilt
            size={520}
            className="group rounded-2xl border border-border bg-card/40 hover:border-primary/50 hover:-translate-y-1"
          >
            <article>
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={p.img}
                alt={`${p.title} preview`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-5 text-sm">
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-primary hover:underline"
                >
                  Live demo <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  GitHub <Github className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            </article>
          </Spotlight>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const ref = useReveal<HTMLOListElement>();
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="04 — Experience" title="The road so far." />
      <ol ref={ref} className="reveal relative ml-3 border-l border-border">
        {TIMELINE.map((e, i) => (
          <li key={i} className="relative pl-8 pb-12 last:pb-0">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border border-primary bg-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl">{e.role}</h3>
              <span className="font-mono-label">{e.dates}</span>
            </div>
            <p className="mt-1 text-primary">{e.org}</p>
            <p className="mt-3 max-w-2xl text-muted-foreground">{e.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent — I'll get back to you soon.");
      form.reset();
    }, 700);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="05 — Contact" title="Let's build something." />
      <div ref={ref} className="reveal grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <p className="text-lg text-muted-foreground">
            Have a project in mind, a role to discuss, or just want to say hi? My inbox is open.
          </p>
          <a
            href="mailto:your.email@example.com"
            className="mt-6 inline-flex items-center gap-2 font-display text-3xl text-primary hover:underline"
          >
            <Mail className="h-6 w-6" /> your.email@example.com
          </a>
          <ul className="mt-10 flex items-center gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Spotlight className="rounded-2xl border border-border bg-card/40 hover:border-primary/40">
          <form onSubmit={onSubmit} className="p-6 sm:p-8" noValidate>
            <div className="grid grid-cols-1 gap-5">
            <div>
              <Label htmlFor="name" className="font-mono-label">Name</Label>
              <Input id="name" name="name" required className="mt-2 bg-background/40" />
            </div>
            <div>
              <Label htmlFor="email" className="font-mono-label">Email</Label>
              <Input id="email" name="email" type="email" required className="mt-2 bg-background/40" />
            </div>
            <div>
              <Label htmlFor="message" className="font-mono-label">Message</Label>
              <Textarea id="message" name="message" rows={5} required className="mt-2 bg-background/40" />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_18px_40px_-12px_oklch(0.82_0.13_78_/_0.7)]"
            >
              {submitting ? "Sending..." : "Send message"}
            </Button>
            </div>
          </form>
        </Spotlight>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Name. Crafted with care.
        </p>
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
