import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      { title: "Himanshu Dutt Sharma — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Himanshu Dutt Sharma — a full stack developer building responsive, user-friendly web applications with React, Node.js, and MongoDB.",
      },
      { property: "og:title", content: "Himanshu Dutt Sharma — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Projects, experience, and contact info for Himanshu Dutt Sharma — full stack developer based in Jaipur, India.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              name: "Himanshu Dutt Sharma",
              jobTitle: "Full Stack Developer",
              url: "https://hdsportfolio.lovable.app",
              sameAs: [
                "https://github.com/hds05",
                "https://www.linkedin.com/in/himanshu-dutt-sharma-9769191b1",
                "https://leetcode.com/u/himanshudutt/",
              ],
            },
            {
              "@type": "WebSite",
              name: "Himanshu Dutt Sharma — Portfolio",
              url: "https://hdsportfolio.lovable.app",
            },
          ],
        }),
      },
    ],
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
  { href: "https://github.com/hds05", label: "GitHub", Icon: Github },
  { href: "www.linkedin.com/in/himanshu-dutt-sharma-9769191b1", label: "LinkedIn", Icon: Linkedin },
  { href: "https://leetcode.com/u/himanshudutt/", label: "LeetCode", Icon: Code2 },
  { href: "https://instagram.com/yourusername", label: "Instagram", Icon: Instagram },
];

const SKILLS: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript"],
  Frontend: [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    // "TypeScript",
    "React",
    "Next.js",
    "Redux Toolkit",
    "React Router",
    "Tailwind CSS",
    "Bootstrap",
    "Framer Motion",
    "Axios",
    "Shadcn UI",
  ],
  Backend: ["Node.js", "Express.js", "REST API", "JWT Authentication", "Bcrypt", "Mongoose"],
  Databases: ["MongoDB", "Supabase"],
  // Databases: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  "Tools / Platforms": [
    "Git",
    "GitHub",
    "Vercel",
    "Render",
    "Netlify",
    "Postman",
    "Thunder Client",
    "VS Code",
  ],
};
// const CERTIFICATES = [
//   {
//     title: "AI For Business Leaders Bootcamp",
//     issuer: "Outskill",
//     date: "2026",
//     img: "outskill.png",
//     credential:
//       "https://api.growthschool.io/certificate/20afe27c-87af-41d1-bc2a-b84ff09bc042/outskill",
//   },
//   {
//     title: "Full stack development with AI",
//     issuer: "Internshala Training",
//     date: "2026",
//     img: "Internshala.png",
//     // credential:
//     //   "https://trainings.internshala.com/verify_certificate",
//   },
//   {
//     title: "Full stack development specialization with AI",
//     issuer: "Skill Inida- NSDC",
//     date: "2026",
//     img: "NSDC-internshala-img.png",
//     // credential:
//     //   "file:///D:/Internshala/Internshala%20certificates/CAN_38926281_5301860.pdf",
//   },
// ];
const PROJECTS = [
  {
    title: "AI-Chatbot",
    desc: "An interactive AI chatbot featuring a 3D avatar interface, real-time conversations, and intelligent responses powered by OpenAI APIs.",
    tags: ["React.js", "OpenAI API", "ThreeJS", "ExpressJS", "NodeJS"],
    img: "AI-chatbot.png",
    live: "https://ai-chatbot-frontend-git-main-hds05s-projects.vercel.app/",
    repo: "https://github.com/hds05/AI_ChatBot.git",
  },
  {
    title: "Youtube-Clone",
    desc: "A full-stack video platform with secure JWT authentication, video uploads, search functionality, and a responsive YouTube-inspired interface.",
    tags: [
      "React.js",
      "React-Router-DOM",
      "Axios",
      "Vite",
      "Tailwind css",
      "MongoDB",
      "jwt Auth",
      "NodeJS",
    ],
    img: "youtube_clone.png",
    live: "https://youtube-clone-frontend-iota-seven.vercel.app/",
    repo: "https://github.com/hds05/Youtube_Clone_Frontend.git",
  },
  {
    title: "Wheather Forcast Application",
    desc: "A responsive weather application that provides real-time weather conditions, temperature forecasts, humidity, and wind details using external weather APIs.",
    tags: ["JavaScript", "Tailwind css", "Responsive design", "openweather API"],
    img: "weatherforecastupdate.png",
    live: "https://weatherlyforecastupdate.netlify.app/",
    repo: "",
  },
  {
    title: "ANIME.Utopia",
    desc: "An anime discovery platform where users can explore anime details, ratings, and reviews through a clean and engaging user experience.",
    tags: ["ReactJS", "Firebase", "Responsive Design"],
    img: "animeUtopia.png",
    live: "https://animationreview.netlify.app/",
    repo: "https://github.com/hds05/aniwatch.git",
  },
  {
    title: "To-Do-Flow",
    desc: "A lightweight task management application that helps users organize daily activities with persistent local storage and a fully responsive interface.",
    tags: ["Javascript", "localstorage", "Responsive design"],
    img: "to-do-flow.jpeg",
    live: "https://todolistflow.netlify.app/",
    repo: "https://github.com/hds05/To-Do-Flow.git",
  },
{
  title: "Shoppy Globe",
  desc: "A modern e-commerce application featuring API-driven product browsing, custom hooks, Redux-powered cart management, search and category filtering, lazy loading, and a fully responsive shopping experience.",
  tags: [
    "React.js",
    "Redux Toolkit",
    "React Router",
    "Axios",
    "Custom Hooks",
    "Tailwind CSS"
  ],
  img: "shoppyGlobe.png",
  live: "https://shoppy-globe-git-master-hds05s-projects.vercel.app/",
  repo: "https://github.com/hds05/Shoppy-Globe.git"
},
  {
    title: "More Coming Soon",
    desc: "This portfolio is still growing — more creative projects, experiments, and polished builds are on the way.",
    tags: ["And much more...", "Stay tuned", "More to explore"],
    img: "https://pplx-res.cloudinary.com/image/upload/t_thumbnail_512_smart/pplx_search_images/72749590c77cb6f05259182bd6d91b07dedc149b.jpg",
  },
];

const TIMELINE = [
  {
    role: "Full Stack Developer Intern",
    org: "Siddha Corporation (in collaboration with White Cinette)",
    dates: "Dec, 2024 — March, 2025",
    desc: "Contributed to the development of Siddha Connect by building frontend components, developing an HR dashboard, creating RESTful APIs, integrating backend services with React applications, resolving bugs, and optimizing data presentation for a seamless user experience.",
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
        {/* <Certificates /> */}
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
          H<span className="text-primary italic">D</span>S
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active === l.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
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
          <p className="font-mono-label mb-6 font-bold">
            Full Stack Developer · Available for work
          </p>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            Himanshu <span className="italic text-primary">Dutt</span> Sharma
            <span className="sr-only"> — Full Stack Developer</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Motivated Full Stack Web Developer with hands-on experience in front-end and back-end
            technologies like HTML, CSS, JavaScript, React, and Node.js. Passionate about building
            responsive, user-friendly applications and eager to apply and grow my skills in a
            collaborative environment
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Spotlight tilt className="p-4 rounded-full" glow="oklch(1 0 0 / 0.25)" size={220}>
              <a
                href="/HimanshuDutt_Profile.pdf"
                download={"HimanshuDutt-Profile.pdf"}
                className="block rounded-full  hover:text-primary border border-border hover:font-bold px-6 py-3 text-sm font-medium  transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_18px_40px_-12px_oklch(0.82_0.13_78_/_0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Download Resume
              </a>
            </Spotlight>
            <Spotlight tilt className="p-4 rounded-full" glow="oklch(1 0 0 / 0.25)" size={220}>
              <a
                href="#contact"
                className="block rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary hover:shadow-[0_18px_40px_-18px_oklch(0.82_0.13_78_/_0.6)]"
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
          <Spotlight tilt>
            <div className="relative">
              <div className="absolute -inset-6 rounded-2xl bg-[var(--gradient-glow)] blur-2xl" />
              <div className="relative h-56 w-56 rounded-2xl border border-primary/30 p-[3px] shadow-[var(--shadow-glow)] sm:h-[400px] sm:w-72">
                <div className="h-full w-full overflow-hidden rounded-2xl border border-border bg-card">
                  <img
                    src="/hds-2.jpeg"
                    alt="Portrait of Your Name"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute inset-0 -z-10 rounded-full border border-primary/20" />
              </div>
            </div>
          </Spotlight>
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

  const [visible, setVisible] = useState(false);
  const aboutVisibility = () => {
    setVisible(!visible);
  };
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="01 — About" title="A bit about me." />
      <div ref={ref} className="reveal grid grid-cols-1 items-center gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="relative mx-auto max-w-sm">
            <Spotlight tilt className="">
              <div className="absolute -inset-2 rounded-2xl border border-primary/25 overflow-hidden" />
              <img
                src="/hds-work.jpeg"
                alt="A second portrait of Your Name"
                className="relative aspect-[4/5] w-full rounded-2xl border border-border object-cover"
              />
            </Spotlight>
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-lg leading-relaxed text-muted-foreground">
            <span className="text-primary text-6xl">H</span>ello.. I’m Himanshu Dutt Sharma, a
            full-stack developer who proudly lives by the motto: “I write code that works…
            eventually.” I love creating things that blend logic, creativity, and just the right
            amount of chaos only developers truly understand. Whether I’m building front-end
            interfaces that feel smooth or back-end systems that secretly run on caffeine, I enjoy
            turning ideas into functional, real-world solutions. I believe every bug teaches
            something new (even if it tests my patience first).
          </p>
          {visible && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              When I’m not coding, I’m probably debugging something I wrote at 2 a.m. the night
              before. Always learning, always building! I care about thoughtful UX, clean APIs, and
              shipping. Outside of work you'll find me playing guitar, singing, sketching and
              occasionally testing my chess skills online..
            </p>
          )}

          <div className="relative inline-block overflow-hidden rounded-full mt-4">
            <Spotlight>
              <button
                onClick={() => aboutVisibility()}
                className="inline rounded-full border border-border px-6 py-3 text-sm text-foreground transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary hover:shadow-[0_18px_40px_-18px_oklch(0.82_0.13_78_/_0.6)]"
              >
                {visible ? "Show less" : "Show More"}
              </button>
            </Spotlight>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Jaipur, Rajasthan, India | Open to Remote
              Opportunities
            </span>
            {/* <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> duttsharmahimanshu96@gmail.com
            </span> */}
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
            tilt
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
  const [page, setPage] = useState(0);

  const CARDS_PER_PAGE = 2;
  const totalPages = Math.ceil(PROJECTS.length / CARDS_PER_PAGE);
  const paginated = PROJECTS.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="03 — Selected work" title="Things I've built." />

      <div ref={ref} className="reveal grid grid-cols-1 gap-8 md:grid-cols-2">
        {paginated.map((p) => (
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
                    href={p.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    Live demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={p.repo}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-9 w-9 rounded-full border text-sm transition-colors ${
                i === page
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}

// function Certificates() {
//   const ref = useReveal<HTMLDivElement>();

//   return (
//     <section
//       id="certificates"
//       className="mx-auto max-w-6xl px-6 py-28"
//     >
//       <SectionHeading
//         kicker="04 — Certifications"
//         title="Proof of continuous learning."
//       />

//       <div
//         ref={ref}
//         className="reveal mt-12 flex flex-wrap justify-center gap-10"
//       >
//         {CERTIFICATES.map((cert, index) => (
//           <a
//             key={cert.title}
//             href={cert.credential}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`
//               relative w-[320px]
//               transition-all duration-500
//               hover:z-20 hover:scale-105 hover:rotate-0
//               ${index % 2 === 0 ? "-rotate-3" : "rotate-3"}
//             `}
//           >
//             <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
//               <img
//                 src={cert.img}
//                 alt={cert.title}
//                 className="h-[220px] w-full object-cover"
//               />

//               <div className="p-5">
//                 <h3 className="font-display text-lg">
//                   {cert.title}
//                 </h3>

//                 <p className="mt-1 text-sm text-muted-foreground">
//                   {cert.issuer}
//                 </p>

//                 <p className="mt-3 text-xs text-primary">
//                   View Credential →
//                 </p>
//               </div>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// }

function Experience() {
  const ref = useReveal<HTMLOListElement>();
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="04 — Experience" title="The road so far." />
      {/* <SectionHeading kicker="05 — Experience" title="The road so far." /> */}
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

    const phone = import.meta.env.VITE_WHATSAPP_NUMBER;

    const text = `Hi, I'm ${name} (${email}).\n\n${message}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    toast.success("Opening WhatsApp — send the message there!");
    form.reset();
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      {/* <SectionHeading kicker="06 — Contact" title="Let's build something." /> */}
      <SectionHeading kicker="05 — Contact" title="Let's build something." />
      <div ref={ref} className="reveal grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <p className="text-lg text-muted-foreground">
            Have a project in mind, a role to discuss, or just want to say hi? My inbox is open.
          </p>
          <a
            href="mailto:duttsharmahimanshu96@gmail.com"
            className="mt-6 inline-flex items-center gap-2 font-display text-3xl text-primary hover:underline"
          >
            <Mail className="h-6 w-6" /> duttsharmahimanshu96@gmail.com
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
        {/* <Spotlight className="rounded-2xl border border-border bg-card/40 hover:border-primary/40">
          <form onSubmit={onSubmit} className="p-6 sm:p-8" noValidate>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Label htmlFor="name" className="font-mono-label">
                  Name
                </Label>
                <Input id="name" name="name" required className="mt-2 bg-background/40" />
              </div>
              <div>
                <Label htmlFor="email" className="font-mono-label">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 bg-background/40"
                />
              </div>
              <div>
                <Label htmlFor="message" className="font-mono-label">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 bg-background/40"
                />
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
        </Spotlight> */}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Himanshu Dutt Sharma. Crafted with care.
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
