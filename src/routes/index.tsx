import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Database,
  Brain,
  Layout,
  Server,
  Wrench,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Shamim Ahamed J",
          jobTitle: "Python Developer & AI Engineer",
          email: "mailto:ahamedshamin5@gmail.com",
          telephone: "+91 98945 93190",
          sameAs: [
            "https://github.com/shamiahamed",
            "https://linkedin.com/in/shamim-ahamed-j-4766b91b5",
          ],
        }),
      },
    ],
  }),
});

const RESUME_URL = "https://drive.google.com/file/d/1sfpRvGbHBsz1uOJVOjeklbEGL63z2Zac/view?usp=sharing";
const GITHUB_URL = "https://github.com/shamiahamed";
const LINKEDIN_URL = "https://linkedin.com/in/shamim-ahamed-j-4766b91b5";
const EMAIL = "ahamedshamin5@gmail.com";
const PHONE = "+91 98945 93190";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const NAV = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="font-display text-xl font-bold tracking-tight"
          aria-label="Home"
        >
          Shamim<span className="text-primary">.</span>
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          <Button
            size="sm"
            className="rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="size-4" /> Resume
          </Button>
        </a>
      </div>
    </header>
  );
}

const ROLES = [
  "Python Developer",
  "FastAPI Backend Engineer",
  "AI / LangGraph Developer",
  "Clinical AI Systems Builder",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = ROLES[idx];
    const speed = del ? 40 : 75;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, sub.length + 1);
        setSub(next);
        if (next === current) {
          setTimeout(() => setDel(true), 1400);
        }
      } else {
        const next = current.slice(0, sub.length - 1);
        setSub(next);
        if (next === "") {
          setDel(false);
          setIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [sub, del, idx]);

  return (
    <span className="text-primary">
      {sub}
      <span className="inline-block w-[3px] h-[0.9em] -mb-1 ml-1 bg-primary animate-blink" />
    </span>
  );
}

function Particles() {
  const dots = Array.from({ length: 28 });
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div
        className="absolute bottom-0 -right-32 w-[600px] h-[600px] rounded-full bg-accent-cyan/15 blur-3xl animate-blob"
        style={{ animationDelay: "6s" }}
      />
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = (i % 3) + 2;
        const delay = (i % 8) * 0.7;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/40 animate-float"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <Particles />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-4xl text-center"
      >
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-medium border border-primary/30">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Available for Python / AI Engineer roles
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-7 font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.02] text-gradient"
        >
          SHAMIM AHAMED J
          <span className="sr-only"> — Python Developer & AI Engineer</span>
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          className="mt-6 text-2xl sm:text-3xl md:text-4xl font-semibold min-h-[1.4em]"
        >
          <Typewriter />
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Building intelligent backend systems with Python, FastAPI, and LangGraph.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => scrollTo("projects")}
            className="rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_-8px] shadow-primary/60"
          >
            View Projects <ArrowRight className="size-4" />
          </Button>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full font-semibold border-border bg-transparent hover:bg-primary-soft hover:text-foreground hover:border-primary/40"
            >
              <Download className="size-4" /> Download Resume
            </Button>
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-3">
          {[
            { href: GITHUB_URL, icon: Github, label: "GitHub" },
            { href: LINKEDIN_URL, icon: Linkedin, label: "LinkedIn" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="size-11 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <Reveal className="mb-14 text-center">
      {eyebrow && (
        <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-primary to-accent-cyan" />
    </Reveal>
  );
}

function About() {
  const highlights = ["Python", "FastAPI", "LangGraph", "PostgreSQL", "React.js", "Docker"];
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Who I am" title="About Me" />
        <Reveal>
          <Card className="glass p-8 sm:p-12 rounded-2xl shadow-2xl shadow-primary/5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm a B.E. ECE graduate who transitioned into software engineering through
              self-learning and hands-on building. Currently interning at{" "}
              <span className="text-foreground font-semibold">
                Tensaw Technologies, Kochi
              </span>
              , where I build real-world clinical AI systems using LangGraph, FastAPI, and LLM
              integration. I'm passionate about backend architecture, AI workflow
              orchestration, and building systems that solve real problems.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <Badge
                  key={h}
                  className="bg-primary-soft text-primary border border-primary/30 hover:bg-primary-soft rounded-full px-4 py-1.5 text-sm font-medium"
                >
                  {h}
                </Badge>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "ClinicCore",
      subtitle: "Clinic Management System",
      stack: ["FastAPI", "Async SQLAlchemy", "PostgreSQL", "JWT", "RBAC", "Pydantic"],
      desc: "A production-ready REST API for managing clinics, doctors, patients, and appointments. Features JWT auth, Role-Based Access Control, and a clean layered architecture built for real healthcare workflows.",
      demoUrl: null,
    },
    {
      title: "DocMind",
      subtitle: "LLM Document Intelligence Agent",
      stack: ["LangGraph", "LangChain", "OpenAI GPT-4o", "ChromaDB", "FastAPI", "RAG"],
      desc: "A multi-agent AI workflow using LangGraph that ingests documents, performs semantic retrieval via RAG, and generates context-aware answers. Built with stateful memory and a streaming FastAPI endpoint.",
      demoUrl: "http://13.222.21.162:3000/",
    },
    {
      title: "EduTrack",
      subtitle: "Student Record Management",
      stack: ["React.js", "MySQL", "Python", "REST API", "CRUD"],
      desc: "A full-stack CRUD system for managing student records with a React frontend connected to a RESTful backend, with statistical summaries and performance insights.",
      demoUrl: null,
    },
  ];

  return (
    <section id="projects" className="py-28 px-6 bg-section/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="What I've built" title="Projects" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Card className="glass rounded-2xl p-7 h-full flex flex-col hover:-translate-y-1 transition-all group">
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-1">{p.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 my-5">
                  {p.stack.map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="bg-white/5 text-muted-foreground border border-white/10 rounded-md text-[11px] font-medium"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {p.desc}
                </p>
                <div className="mt-6 flex gap-2">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-full border-border bg-transparent hover:bg-primary-soft hover:border-primary/40"
                    >
                      <Github className="size-4" /> GitHub
                    </Button>
                  </a>
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button
                        size="sm"
                        className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Live Demo <ExternalLink className="size-3.5" />
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  const jobs = [
    {
      role: "Software Engineer Intern",
      company: "Tensaw Technologies India Private Limited",
      location: "Kochi, Kerala",
      period: "Nov 2025 – Jun 2026",
      points: [
        "Built real-world clinical AI workflow using LangGraph, FastAPI, and LLM",
        "Developed async API endpoints and multi-step AI orchestration pipelines",
        "Worked on prompt engineering and stateful memory across LangGraph nodes",
      ],
    },
  ];

  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="My journey" title="Experience" />
        <div className="relative pl-8 sm:pl-12">
          <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
          {jobs.map((j, i) => (
            <Reveal key={j.role} className="relative mb-10 last:mb-0" delay={i * 0.1}>
              <div className="absolute -left-[26px] sm:-left-[34px] top-3 size-4 rounded-full bg-primary ring-4 ring-background shadow-[0_0_20px] shadow-primary/60" />
              <Card className="glass rounded-2xl p-7">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{j.role}</h3>
                    <p className="text-primary font-medium mt-1 flex items-center gap-1.5">
                      <Briefcase className="size-4" /> {j.company}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1 sm:text-right">
                    <div className="flex items-center gap-1.5 sm:justify-end">
                      <Calendar className="size-3.5" /> {j.period}
                    </div>
                    <div className="flex items-center gap-1.5 sm:justify-end">
                      <MapPin className="size-3.5" /> {j.location}
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {j.points.map((p) => (
                    <li
                      key={p}
                      className="text-sm text-muted-foreground flex gap-3 leading-relaxed"
                    >
                      <span className="text-primary mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { icon: Server, title: "Backend", items: ["Python", "FastAPI", "Node.js", "REST API"] },
    {
      icon: Brain,
      title: "AI / ML",
      items: ["LangGraph", "LangChain", "OpenAI API", "RAG", "ChromaDB"],
    },
    {
      icon: Database,
      title: "Database",
      items: ["PostgreSQL", "MongoDB", "MySQL", "SQLAlchemy"],
    },
    {
      icon: Layout,
      title: "Frontend",
      items: ["React.js", "HTML5", "CSS3", "Bootstrap"],
    },
    {
      icon: Wrench,
      title: "Tools",
      items: ["Docker", "Git", "GitHub", "Postman", "VS Code"],
    },
    {
      icon: Code2,
      title: "Languages",
      items: ["Python", "JavaScript", "Java", "SQL"],
    },
  ];
  return (
    <section id="skills" className="py-28 px-6 bg-section/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="My toolkit" title="Tech Stack" />
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
                <Card className="glass rounded-2xl p-6 h-full hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center border border-primary/30">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <Badge
                        key={it}
                        className="bg-white/5 text-foreground/80 border border-white/10 hover:bg-primary-soft hover:text-primary hover:border-primary/30 rounded-md text-xs font-medium"
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

function Education() {
  const items = [
    {
      title: "B.E. in Electronics and Communication Engineering",
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
  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Academics" title="Education" />
        <div className="space-y-4">
          {items.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <Card className="glass rounded-xl p-6 border-l-2 border-l-primary hover:-translate-y-0.5 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex gap-4">
                    <div className="size-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 border border-primary/30">
                      <GraduationCap className="size-5" />
                    </div>
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

        {/* Certifications */}
        <div className="mt-16">
          <Reveal className="mb-8 text-center">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
              Credentials
            </p>
            <h3 className="font-display text-3xl font-bold tracking-tighter">
              Certifications
            </h3>
          </Reveal>
          <Reveal>
            <Card className="glass rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 border border-primary/30">
                  <Award className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold">Full Stack Crash Course</h4>
                  <p className="text-sm text-primary font-medium mt-0.5">Udemy</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Completed: October 2024
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
    { icon: Github, label: "github.com/shamiahamed", href: GITHUB_URL },
    { icon: Linkedin, label: "linkedin.com/in/shamim-ahamed-j", href: LINKEDIN_URL },
  ];
  return (
    <section id="contact" className="py-28 px-6 bg-section/40">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading eyebrow="Let's connect" title="Get In Touch" />
        <Reveal>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Open to{" "}
            <span className="text-foreground font-semibold">
              Python Developer, FastAPI Backend, and AI Engineer
            </span>{" "}
            roles. Drop me a line — I'd love to hear about what you're building.
          </p>
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          {items.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              variants={fadeUp}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="glass rounded-xl p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-all text-left group"
            >
              <div className="size-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center border border-primary/30 shrink-0">
                <Icon className="size-5" />
              </div>
              <span className="text-sm text-foreground/90 group-hover:text-primary transition-colors truncate">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-footer/60 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Built by Shamim Ahamed J · 2026
        </p>
        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="size-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="size-4" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="size-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="size-4" />
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
