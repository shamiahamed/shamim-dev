import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Github,
  Mail,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  Code2,
  Database,
  Wrench,
  Layout,
  Server,
  MapPin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const RESUME_URL =
  "https://drive.google.com/file/d/1smGgiBOS3Yni7HSagxwsyf4mG5vDY_cQ/view?usp=sharing";
const GITHUB_URL = "https://github.com/shamiahamed";
const EMAIL = "ahamedshamin5@gmail.com";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
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
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 transition-all ${
        scrolled ? "border-b border-border shadow-sm" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-2xl font-extrabold text-primary tracking-tight"
          aria-label="Home"
        >
          SA
        </button>
        <nav className="hidden md:flex items-center gap-8">
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
          <Button size="sm" className="rounded-full font-semibold">
            <Download className="size-4" /> Resume
          </Button>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div
          className="absolute bottom-0 -right-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl animate-blob"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-4xl text-center"
      >
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-sm font-medium border border-primary/15">
            👋 Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
        >
          Hi, I'm Shamim Ahamed J
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          className="mt-5 text-2xl sm:text-3xl font-semibold text-primary"
        >
          Node.js & React Developer
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Building scalable backend systems and intuitive frontend interfaces.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => scrollTo("projects")}
            className="rounded-full font-semibold shadow-lg shadow-primary/25"
          >
            View My Work
          </Button>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full font-semibold border-primary/30 text-primary hover:bg-primary-soft"
            >
              <Download className="size-4" /> Download Resume
            </Button>
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="size-11 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:-translate-y-0.5 transition-all"
          >
            <Github className="size-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <Reveal className="mb-14 text-center">
      {eyebrow && (
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
    </Reveal>
  );
}

function About() {
  const stats = [
    { icon: "📦", value: "2+", label: "Projects Built" },
    { icon: "🎓", value: "8.15", label: "CGPA" },
    { icon: "📜", value: "1", label: "Certification" },
  ];
  return (
    <section id="about" className="py-24 px-6 bg-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="About Me" />
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <Reveal className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
              <div className="relative size-56 sm:size-64 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-7xl font-extrabold shadow-2xl shadow-primary/30">
                SA
              </div>
            </div>
          </Reveal>
          <Reveal className="md:col-span-3" delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm a B.E. Electronics & Communication Engineering graduate from PSNA College of
              Engineering and Technology, with a strong passion for backend development using
              Node.js and NestJS. I've worked hands-on as a UI Developer Intern, building React
              components, integrating REST APIs, and working with Node.js-based services. I'm
              actively looking for a{" "}
              <span className="text-foreground font-semibold">Node.js or Full Stack Developer</span>{" "}
              role where I can contribute to building scalable, reliable systems.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-3 gap-5 mt-14"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <Card className="p-7 text-center border-border/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-4xl font-extrabold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1 font-medium">{s.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { icon: Server, title: "Backend", items: ["Node.js", "REST API Development", "NestJS"] },
    { icon: Layout, title: "Frontend", items: ["ReactJS", "HTML5", "CSS3", "Bootstrap"] },
    { icon: Database, title: "Databases", items: ["MongoDB", "MySQL", "SQL"] },
    { icon: Code2, title: "Languages", items: ["JavaScript", "Java", "Python"] },
    { icon: Wrench, title: "Tools & Others", items: ["React Hooks", "Git", "GitHub"] },
  ];
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Technical Skills" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <motion.div key={g.title} variants={fadeUp}>
                <Card className="p-6 h-full border-border/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <Badge
                        key={it}
                        variant="secondary"
                        className="bg-primary-soft text-primary hover:bg-primary-soft border-0 rounded-full px-3 py-1 font-medium"
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

function Experience() {
  const jobs = [
    {
      role: "UI Developer Intern",
      company: "CKR Consulting Engineers Pvt Ltd",
      location: "Angamaly, Kerala",
      period: "Sept 2024 – Mar 2025",
      points: [
        "Converted HTML designs into React components using JavaScript, ReactJS, and Bootstrap",
        "Integrated APIs and managed state using React Hooks",
        "Integrated backend APIs with React components and tested endpoints",
        "Worked with Node.js-based API services for data handling",
      ],
    },
    {
      role: "Customer Support Executive",
      company: "iMarque Solution Private Limited",
      location: "",
      period: "Aug 2023 – July 2024",
      points: [
        "Resolved customer queries efficiently",
        "Assisted customers with product/service issues",
        "Provided timely and effective solutions to customer concerns",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-section">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Experience" />
        <div className="relative pl-8 sm:pl-12">
          <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
          {jobs.map((j, i) => (
            <Reveal key={j.role} className="relative mb-12 last:mb-0" delay={i * 0.1}>
              <div className="absolute -left-[26px] sm:-left-[34px] top-2 size-4 rounded-full bg-primary ring-4 ring-section" />
              <Card className="p-7 border-border/60 hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{j.role}</h3>
                    <p className="text-primary font-semibold mt-1 flex items-center gap-1.5">
                      <Briefcase className="size-4" /> {j.company}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1 sm:text-right">
                    <div className="flex items-center gap-1.5 sm:justify-end">
                      <Calendar className="size-3.5" /> {j.period}
                    </div>
                    {j.location && (
                      <div className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin className="size-3.5" /> {j.location}
                      </div>
                    )}
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {j.points.map((p) => (
                    <li
                      key={p}
                      className="text-muted-foreground flex gap-2 leading-relaxed"
                    >
                      <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
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

function Projects() {
  const projects = [
    {
      title: "Student Record Management System",
      stack: ["Node.js", "ReactJS", "MySQL"],
      desc: "A CRUD-based backend system to manage student records, connected with a React frontend and MySQL for persistent storage. Includes basic validations and a clean UI.",
    },
    {
      title: "Simple College Website",
      stack: ["HTML5", "CSS3", "Responsive Design"],
      desc: "A multi-page static website displaying college-related information. Focused on responsive design principles and semantic HTML layout.",
    },
  ];
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Projects" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Card className="p-7 h-full flex flex-col border-border/60 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all">
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.stack.map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="bg-primary-soft text-primary hover:bg-primary-soft border-0 rounded-full"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                <a href="#" className="mt-5">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/30 text-primary hover:bg-primary-soft w-full sm:w-auto"
                  >
                    <Github className="size-4" /> View on GitHub
                    <ExternalLink className="size-3.5" />
                  </Button>
                </a>
              </Card>
            </motion.div>
          ))}
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
    <section id="education" className="py-24 px-6 bg-section">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Education" />
        <div className="space-y-5">
          {items.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <Card className="p-6 border-l-4 border-l-primary border-y border-r border-y-border/60 border-r-border/60 hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex gap-4">
                    <div className="size-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                      <GraduationCap className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-snug">{e.title}</h3>
                      <p className="text-muted-foreground mt-1">{e.inst}</p>
                    </div>
                  </div>
                  <div className="sm:text-right pl-15">
                    <div className="text-sm text-muted-foreground">{e.year}</div>
                    <div className="font-semibold text-primary mt-1">{e.grade}</div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsCerts() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Achievements & Certifications" />
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <Card className="p-7 h-full border-border/60">
              <div className="flex items-center gap-3 mb-5">
                <div className="size-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                  <Trophy className="size-5" />
                </div>
                <h3 className="text-xl font-bold">Achievements</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span className="text-primary mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                  Mentored college juniors during a group project, contributing to a 95% grade — recognized for teamwork and leadership.
                </li>
                <li className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span className="text-primary mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                  Organized and led a successful fundraising campaign with 10 team members for a local charity.
                </li>
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="p-7 h-full border-border/60">
              <div className="flex items-center gap-3 mb-5">
                <div className="size-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                  <Award className="size-5" />
                </div>
                <h3 className="text-xl font-bold">Certifications</h3>
              </div>
              <div className="rounded-xl border border-border/60 p-5">
                <h4 className="font-bold">Full Stack Crash Course</h4>
                <p className="text-primary text-sm font-semibold mt-1">Udemy</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Completed: October 2024
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Covered: HTML, CSS, JavaScript, Bootstrap, MySQL basics
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-section">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading title="Get In Touch" />
        <Reveal>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm currently open to new opportunities. Whether you have a question or just want
            to say hi — my inbox is always open!
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={`mailto:${EMAIL}`}>
              <Button
                size="lg"
                className="rounded-full font-semibold shadow-lg shadow-primary/25"
              >
                <Mail className="size-4" /> Send Me an Email
              </Button>
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-semibold border-primary/30 text-primary hover:bg-primary-soft"
              >
                <Download className="size-4" /> Download Resume
              </Button>
            </a>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="size-4" /> github.com/shamiahamed
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-footer border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          Designed & built by Shamim Ahamed J © 2025
        </p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Github className="size-5" />
        </a>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <AchievementsCerts />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
