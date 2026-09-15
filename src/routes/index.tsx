import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Brain,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Server,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const NAME = "Shamim Ahamed J";
const EMAIL = "ahamedshamin5@gmail.com";
const PHONE = "+91 98945 93190";
const LOCATION = "Madurai, Tamil Nadu, India";
const GITHUB_URL = "https://github.com/shamiahamed";
const LINKEDIN_URL = "https://linkedin.com/in/shamim-ahamed-j-4766b91b5";
const RESUME_URL = "/Shamim-Ahamed-J-Resume.pdf";
const HEADLINE = "Software Engineer · AI & Machine Learning";
const SUMMARY =
  "Software Engineer with one year of professional experience at Tensaw Technologies building AI-driven backend features in Python and FastAPI, using LangGraph and LangChain for multi-agent workflows and retrieval-augmented generation over vector databases.";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shamim Ahamed J | Software Engineer, AI & ML" },
      {
        name: "description",
        content:
          "Shamim Ahamed J — Software Engineer with a year of professional experience building AI-powered backends in Python, FastAPI, LangGraph and RAG systems. Projects, experience and resume.",
      },
      { property: "og:title", content: "Shamim Ahamed J | Software Engineer, AI & ML" },
      {
        property: "og:description",
        content:
          "Python, FastAPI, LangGraph and machine learning projects by Shamim Ahamed J, Software Engineer based in Madurai, India.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: NAME,
          jobTitle: "Software Engineer",
          email: `mailto:${EMAIL}`,
          telephone: PHONE,
          url: "https://shamim-dev.lovable.app",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Madurai",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          alumniOf: "PSNA College of Engineering and Technology",
          worksFor: {
            "@type": "Organization",
            name: "Tensaw Technologies India Private Limited",
          },
          knowsAbout: [
            "Python",
            "FastAPI",
            "LangGraph",
            "LangChain",
            "Retrieval-Augmented Generation",
            "Machine Learning",
            "SQL",
          ],
          sameAs: [GITHUB_URL, LINKEDIN_URL],
        }),
      },
    ],
  }),
  component: Portfolio,
});

/* ---------------------------------- motion --------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tighter">{title}</h2>
      <div className="mt-5 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-mint" />
    </Reveal>
  );
}

/* ---------------------------------- navbar --------------------------------- */

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = ["home", ...SECTIONS.map((s) => s.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass shadow-sm" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 sm:px-6 h-16"
      >
        <a href="#home" className="font-display text-lg font-bold tracking-tight">
          Shamim<span className="text-primary">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active === s.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex rounded-full">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <Download className="size-4" /> Resume
            </a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden size-10 rounded-full glass flex items-center justify-center"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-border px-5 pb-4">
          <ul className="flex flex-col py-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-3 text-sm font-medium rounded-lg ${
                    active === s.id ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild size="sm" className="w-full rounded-full">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <Download className="size-4" /> Download Resume
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}

/* ----------------------------------- hero ---------------------------------- */

const ROLES = [
  "Software Engineer",
  "AI / LLM Engineer",
  "Machine Learning Engineer",
  "Python Backend Developer",
];

function Typewriter() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(ROLES[0]);
  const deleting = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const full = ROLES[index];
    const done = text === full;
    const timeout = setTimeout(
      () => {
        if (!deleting.current) {
          if (done) {
            deleting.current = true;
          } else {
            setText(full.slice(0, text.length + 1));
          }
        } else if (text.length === 0) {
          deleting.current = false;
          setIndex((i) => (i + 1) % ROLES.length);
        } else {
          setText(full.slice(0, text.length - 1));
        }
      },
      done ? 1600 : deleting.current ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [text, index, reduce]);

  return (
    <span>
      {text}
      <span className="animate-blink text-primary">|</span>
    </span>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-24 px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 size-80 rounded-full bg-primary/15 blur-3xl animate-blob" />
        <div className="absolute top-20 right-0 size-96 rounded-full bg-mint/25 blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-butter/40 blur-3xl animate-blob" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" /> Open to Software Engineer &amp; AI/ML roles
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-7 font-display text-4xl sm:text-6xl font-bold tracking-tighter leading-[1.05]">
            <span className="text-gradient">{NAME}</span>
            <span className="sr-only"> — {HEADLINE}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-5 text-xl sm:text-2xl font-display font-semibold text-foreground/90 min-h-[2.2em]">
            <Typewriter />
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {SUMMARY}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                <Download className="size-4" /> Download Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#projects">
                View Projects <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github className="size-4" /> GitHub
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { k: "1 year", v: "Professional experience" },
              { k: "Python", v: "Primary language" },
              { k: "FastAPI", v: "Backend & REST APIs" },
              { k: "LangGraph", v: "Multi-agent AI systems" },
            ].map((s) => (
              <Card key={s.k} className="glass rounded-2xl px-4 py-5 text-center">
                <dt className="font-display text-lg font-bold text-primary">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </Card>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- about ---------------------------------- */

function About() {
  return (
    <section id="about" className="py-24 px-6 bg-section/60">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="About me" title="Who I Am" />
        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-3">
            <Card className="glass rounded-3xl p-7 sm:p-9 h-full">
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m a B.E. (Electronics and Communication Engineering) graduate and
                Python-focused engineer. Over the past year at Tensaw Technologies I worked as a
                Software Engineer on a clinical AI application, building FastAPI services and
                LangGraph multi-agent workflows that put large language models to work on document
                processing and clinical decision support.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Alongside that I built a wireless network quality prediction model, comparing
                XGBoost, Decision Tree and SVM classifiers across the full machine learning
                workflow — preprocessing, feature engineering and evaluation. I keep shipping
                full-stack and AI side projects on GitHub, so most of what you see here you can
                open and read.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                I&apos;m comfortable across the software development life cycle, from data handling
                and API design through to backend integration and testing.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <Card className="glass rounded-3xl p-7 h-full">
              <h3 className="font-display font-semibold text-lg">Quick facts</h3>
              <ul className="mt-5 space-y-4 text-sm">
                {[
                  { icon: MapPin, label: "Based in", value: LOCATION },
                  { icon: Code2, label: "Focus", value: "Python backend, LLM & ML systems" },
                  { icon: Brain, label: "Currently", value: "Software Engineer at Tensaw Technologies" },
                  { icon: GraduationCap, label: "Education", value: "B.E. ECE, CGPA 8.15 / 10" },
                ].map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex gap-3">
                    <span className="size-9 shrink-0 rounded-xl bg-primary-soft text-primary flex items-center justify-center border border-primary/20">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        {label}
                      </span>
                      <span className="font-medium">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- projects -------------------------------- */

type Project = {
  name: string;
  tagline: string;
  tags: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  objective: string;
  details: string[];
};

const PROJECTS: Project[] = [
  {
    name: "DocMind AI",
    tagline: "Multi-agent document intelligence with RAG",
    tags: ["LangGraph", "LangChain", "FastAPI", "ChromaDB", "React", "Python"],
    repoUrl: "https://github.com/shamiahamed/docmind-ai",
    demoUrl: "http://13.222.21.162:3000/",
    objective:
      "Semantic search and question answering over uploaded documents using retrieval-augmented generation.",
    details: [
      "A supervisor agent plans each question and routes it to specialist agents (retriever, summarizer, synthesizer).",
      "ChromaDB vector search retrieves the exact source pages, so answers stay grounded in the document.",
      "A critic agent verifies every draft answer against the source text and sends hallucinations back for correction.",
      "FastAPI backend streams verified answers to a React frontend; auth and row-level security handled in the data layer.",
    ],
  },
  {
    name: "AIVOA Complaint Management",
    tagline: "AI complaint intake for pharmaceutical manufacturing",
    tags: ["LangGraph", "Groq", "FastAPI", "React", "Redux Toolkit", "SQLAlchemy"],
    repoUrl: "https://github.com/shamiahamed/aivoa-complaint-system",
    demoUrl: null,
    objective:
      "Turn a raw customer complaint email or document into a structured, risk-assessed complaint record ready for review.",
    details: [
      "A seven-node LangGraph pipeline extracts complaint fields, then runs completeness, duplicate and risk checks.",
      "Recommends a root cause and CAPA, auto-filling the complaint form for a human to review and file.",
      "Paste an email or drop in a PDF, DOCX, TXT or EML file through the Copilot panel.",
      "SQLAlchemy persistence with Postgres, and a SQLite fallback so the app runs with zero setup.",
    ],
  },
  {
    name: "ClinicCore",
    tagline: "Secure clinic management REST API",
    tags: ["FastAPI", "Async SQLAlchemy", "PostgreSQL", "JWT", "RBAC"],
    repoUrl: "https://github.com/shamiahamed/Clinic-Management-System",
    demoUrl: null,
    objective:
      "A modular backend API to manage clinics, doctors, patients and appointments with multi-role access.",
    details: [
      "JWT authentication with role-based access control across every endpoint.",
      "Layered architecture on async SQLAlchemy, with reusable service functions and clean separation of concerns.",
      "Appointment scheduling plus full CRUD for clinics, doctors and patients.",
      "Delivered as a functional, secure multi-role API modelled on real clinic operations.",
    ],
  },
  {
    name: "WirelessIQ",
    tagline: "Wireless network quality prediction (machine learning)",
    tags: ["Python", "XGBoost", "Decision Trees", "SVM", "Pandas", "NumPy"],
    repoUrl: null,
    demoUrl: null,
    objective:
      "Classify wireless link quality as Good, Moderate or Poor from signal parameters.",
    details: [
      "Collected and preprocessed signal data (RSSI, SNR, path loss) and engineered the model input features.",
      "Trained and compared XGBoost, Decision Tree and SVM classifiers to find the best-performing approach.",
      "Evaluated with accuracy, precision, recall and confusion-matrix analysis.",
      "The tuned XGBoost model achieved high classification accuracy against simulated channel conditions.",
    ],
  },
  {
    name: "LinkedIn Job Auto-Apply",
    tagline: "Capture job posts, extract contacts, apply by email",
    tags: ["Python", "FastAPI", "Groq", "OCR", "Postgres", "Chrome Extension"],
    repoUrl: "https://github.com/shamiahamed/Linkedin_Job_Automation",
    demoUrl: null,
    objective:
      "Automate the repetitive part of a job hunt: capture a LinkedIn post, find the contact, send a tailored application.",
    details: [
      "A Chrome extension captures job posts; the backend extracts contact details using Groq plus OCR.",
      "Applications are sent from a real Gmail account through the Gmail API with the resume attached.",
      "A dashboard tracks every captured job and sent application, installable as a PWA on mobile.",
      "Dockerised backend with Postgres, deployable to any host.",
    ],
  },
  {
    name: "IT Support Desk",
    tagline: "Full-stack ticketing for employees and support engineers",
    tags: ["React", "Express", "SQLite", "JWT", "bcrypt"],
    repoUrl: "https://github.com/shamiahamed/IT-Support-Desk",
    demoUrl: null,
    objective:
      "Let employees raise IT support tickets while engineers assign, track and resolve them.",
    details: [
      "Role-separated flows for employees and support engineers with JWT and bcrypt authentication.",
      "Express API layered as routes → auth middleware → controllers → models.",
      "SQLite through Node's built-in driver, so there is no database server to install.",
      "React (Vite) frontend with Axios and protected routes.",
    ],
  },
];

const MORE_REPOS = [
  {
    name: "Employee Management Dashboard",
    note: "React 19 dashboard with auth, CRUD, filtering and Recharts analytics",
    url: "https://github.com/shamiahamed/Employee-Management-Dashboard",
  },
  {
    name: "TaskFlow",
    note: "Trello-style task board — React + Vite, Express, SQLite, Jest tests",
    url: "https://github.com/shamiahamed/taskflow",
  },
  {
    name: "Aura Chat",
    note: "Real-time chat with React Native (Expo), Socket.io and SQLite history",
    url: "https://github.com/shamiahamed/realtime-chat-app",
  },
  {
    name: "Security Audit Log Dashboard",
    note: "React + Express + MongoDB dashboard for bulk audit-log investigation",
    url: "https://github.com/shamiahamed/Audit-Log-Dashboard",
  },
  {
    name: "MCQ Assessment",
    note: "MERN assessment platform with scoring, result storage and filtering",
    url: "https://github.com/shamiahamed/MCQ-Assessment-",
  },
  {
    name: "FastAPI User Management",
    note: "REST API with authentication, RBAC and clean layered architecture",
    url: "https://github.com/shamiahamed/fastapi-user-management",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `project-details-${index}`;
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <Card className="glass rounded-3xl p-7 h-full flex flex-col transition-all hover:-translate-y-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold">{project.name}</h3>
          <span className="size-10 shrink-0 rounded-xl bg-primary-soft text-primary flex items-center justify-center border border-primary/20">
            <Code2 className="size-5" />
          </span>
        </div>
        <p className="mt-1.5 text-sm font-medium text-primary">{project.tagline}</p>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{project.objective}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
            >
              {t}
            </Badge>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary self-start hover:underline"
        >
          {open ? "Hide details" : "How it works"}
          <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <div id={panelId} hidden={!open}>
          <ul className="mt-4 space-y-2.5">
            {project.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {(project.repoUrl || project.demoUrl) && (
          <div className="mt-7 pt-5 border-t border-border flex flex-wrap gap-2">
            {project.repoUrl && (
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" /> Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button asChild size="sm" className="rounded-full">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" /> Live Demo
                </a>
              </Button>
            )}
          </div>
        )}
      </Card>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Selected work" title="Projects" />
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-14">
          <Card className="glass rounded-3xl p-7">
            <h3 className="font-display text-lg font-bold">More on GitHub</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Additional full-stack builds and assessment projects, all public.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {MORE_REPOS.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-primary-soft"
                  >
                    <Github className="size-4 mt-0.5 shrink-0 text-primary" />
                    <span>
                      <span className="block text-sm font-semibold group-hover:text-primary">
                        {r.name}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5">{r.note}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- experience ------------------------------- */

function Experience() {
  const roles = [
    {
      role: "Software Engineer",
      company: "Tensaw Technologies India Private Limited",
      period: "May 2025 – May 2026",
      location: "Kochi, Kerala",
      points: [
        "Developed features for a clinical AI application using Python, FastAPI and LangGraph for multi-agent workflow orchestration, following structured SDLC practices.",
        "Integrated large language models into backend services to support intelligent document processing and clinical decision workflows.",
        "Designed and consumed REST APIs connecting AI agent pipelines with application data and frontend interfaces.",
        "Built and tested backend logic in Python, focusing on API reliability, structured data flow between agents and consistent output formatting.",
        "Gained practical experience in AI application architecture, prompt and workflow design, Git-based version control and backend engineering best practices.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-section/60">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Career" title="Experience" />
        <ol className="relative border-l-2 border-border ml-3 space-y-8">
          {roles.map((j, i) => (
            <li key={j.role} className="pl-7 sm:pl-9">
              <span
                aria-hidden
                className="absolute -left-[9px] mt-6 size-4 rounded-full bg-primary ring-4 ring-background"
              />
              <Reveal delay={i * 0.08}>
                <Card className="glass rounded-3xl p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-bold">{j.role}</h3>
                      <p className="text-sm font-medium text-primary mt-1">{j.company}</p>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1 sm:text-right">
                      <div>{j.period}</div>
                      <div className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin className="size-3.5" /> {j.location}
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {j.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------- skills --------------------------------- */

function Skills() {
  const groups = [
    { icon: Code2, title: "Languages", items: ["Python", "SQL", "JavaScript"] },
    {
      icon: Brain,
      title: "AI / LLM Systems",
      items: ["LangChain", "LangGraph", "OpenAI APIs", "RAG", "ChromaDB", "Prompt & workflow design"],
    },
    {
      icon: Sparkles,
      title: "Machine Learning",
      items: ["XGBoost", "Decision Trees", "SVM", "Feature engineering", "Model evaluation"],
    },
    {
      icon: Server,
      title: "Backend & APIs",
      items: ["FastAPI", "REST APIs", "Node.js", "JWT authentication"],
    },
    {
      icon: Database,
      title: "Data & Databases",
      items: ["MySQL", "MongoDB", "Pandas", "NumPy", "SQLAlchemy"],
    },
    {
      icon: Wrench,
      title: "Tools & Practices",
      items: ["Git", "GitHub", "Docker", "Postman", "VS Code", "SDLC"],
    },
    {
      icon: Layout,
      title: "Frontend",
      items: ["React.js", "HTML5", "CSS3", "Bootstrap"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="My toolkit" title="Skills" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <motion.div key={g.title} variants={fadeUp}>
                <Card className="glass rounded-3xl p-6 h-full transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="size-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center border border-primary/20">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display font-semibold text-lg">{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <Badge
                        key={it}
                        variant="secondary"
                        className="rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary-soft hover:text-primary"
                      >
                        {it}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------- education -------------------------------- */

function Education() {
  const items = [
    {
      title: "B.E. Electronics and Communication Engineering",
      inst: "PSNA College of Engineering and Technology",
      year: "2019 – 2023",
      grade: "CGPA 8.15 / 10",
    },
    {
      title: "HSC (Higher Secondary)",
      inst: "St. Mary's Higher Secondary School",
      year: "2018 – 2019",
      grade: "87.5%",
    },
    {
      title: "SSLC",
      inst: "Annai Teresa Matric Higher Secondary School",
      year: "2016 – 2017",
      grade: "94.6%",
    },
  ];

  const certs = [
    { title: "Claude Code in Action", issuer: "Anthropic", note: "AI-assisted development workflows" },
    {
      title: "Full Stack Crash Course",
      issuer: "Udemy",
      note: "October 2024 · React.js, HTML, CSS, JavaScript, Bootstrap, MySQL",
    },
  ];

  return (
    <section id="education" className="py-24 px-6 bg-section/60">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Academics" title="Education" />
        <div className="space-y-4">
          {items.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <Card className="glass rounded-2xl p-6 border-l-4 border-l-primary transition-all hover:-translate-y-0.5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex gap-4">
                    <span className="size-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 border border-primary/20">
                      <GraduationCap className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-bold leading-snug">{e.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{e.inst}</p>
                    </div>
                  </div>
                  <div className="sm:text-right pl-15 sm:pl-0">
                    <div className="text-xs text-muted-foreground">{e.year}</div>
                    <div className="font-semibold text-primary text-sm mt-1">{e.grade}</div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Reveal className="mb-8 text-center">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
              Credentials
            </p>
            <h3 className="font-display text-3xl font-bold tracking-tighter">Certifications</h3>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {certs.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <Card className="glass rounded-2xl p-6 h-full">
                  <div className="flex items-start gap-4">
                    <span className="size-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 border border-primary/20">
                      <Award className="size-6" />
                    </span>
                    <div>
                      <h4 className="font-bold">{c.title}</h4>
                      <p className="text-sm text-primary font-medium mt-0.5">{c.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-2">{c.note}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- contact --------------------------------- */

function Contact() {
  const items = [
    { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
    { icon: Github, label: "github.com/shamiahamed", href: GITHUB_URL },
    { icon: Linkedin, label: "linkedin.com/in/shamim-ahamed-j", href: LINKEDIN_URL },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading eyebrow="Let's connect" title="Get In Touch" />
        <Reveal>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Open to{" "}
            <span className="text-foreground font-semibold">
              Software Engineer, Python/FastAPI backend and AI/ML Engineer
            </span>{" "}
            roles. Send me a note and I&apos;ll get back to you.
          </p>
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-11 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          {items.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              variants={fadeUp}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="glass rounded-2xl p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5 text-left group"
            >
              <span className="size-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center border border-primary/20 shrink-0">
                <Icon className="size-5" />
              </span>
              <span className="text-sm text-foreground/90 group-hover:text-primary transition-colors truncate">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
        <Reveal delay={0.12}>
          <Button asChild size="lg" className="mt-10 rounded-full">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <Download className="size-4" /> Download Resume
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-footer/70 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {NAME} · {HEADLINE} · {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="size-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="size-4" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="size-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Send an email"
            className="size-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
