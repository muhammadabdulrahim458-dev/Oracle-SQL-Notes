"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Database,
  Search,
  Workflow,
  GraduationCap,
  Moon,
  Check,
  ChevronRight,
  ArrowRight,
  Terminal,
  Layers,
  Sparkles,
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }, //
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

// ── Counter hook ──────────────────────────────────────────────────────────────
function useCounter(
  target: number,
  duration = 900,
  triggered: boolean = false,
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = p * p * (3 - 2 * p);
      setValue(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, triggered]);
  return value;
}

// ── Terminal typewriter ───────────────────────────────────────────────────────
const SQL_LINES = [
  { cls: "text-zinc-500 dark:text-zinc-600", text: "-- Connect to HR schema" },
  { cls: "text-blue-500 dark:text-blue-400", text: "CONNECT hr/hr@ORCL;" },
  { cls: "text-emerald-500", text: "Connected." },
  { cls: "", text: "" },
  {
    cls: "text-zinc-500 dark:text-zinc-600",
    text: "-- Employees per department",
  },
  {
    cls: "text-blue-500 dark:text-blue-400",
    text: "SELECT e.first_name, d.department_name",
  },
  { cls: "text-blue-500 dark:text-blue-400", text: "FROM   employees e" },
  {
    cls: "text-blue-500 dark:text-blue-400",
    text: "JOIN   departments d USING (department_id)",
  },
  {
    cls: "text-blue-500 dark:text-blue-400",
    text: "WHERE  d.location_id = 1700;",
  },
  { cls: "", text: "" },
  {
    cls: "text-amber-500 dark:text-amber-400",
    text: "FIRST_NAME     DEPARTMENT_NAME",
  },
  {
    cls: "text-amber-500 dark:text-amber-400",
    text: "-------------- -----------------",
  },
  { cls: "text-zinc-700 dark:text-zinc-300", text: "Steven         Executive" },
  { cls: "text-zinc-700 dark:text-zinc-300", text: "Neena          Executive" },
  { cls: "text-zinc-700 dark:text-zinc-300", text: "Lex            Executive" },
  { cls: "", text: "" },
  { cls: "text-emerald-500", text: "3 rows selected." },
];

function Terminal_Mockup() {
  const [lines, setLines] = useState<{ cls: string; text: string }[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    if (done) return;
    if (lineIdx >= SQL_LINES.length) {
      setDone(true);
      return;
    }

    const line = SQL_LINES[lineIdx];

    if (line.text === "") {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, { cls: line.cls, text: "" }]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
        setCurrentText("");
      }, 60);
      return () => clearTimeout(timer);
    }

    if (charIdx < line.text.length) {
      const speed = line.cls.includes("zinc-5") ? 12 : 18;
      const timer = setTimeout(() => {
        setCurrentText(line.text.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const pause = lineIdx % 3 === 0 ? 200 : 40;
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, { cls: line.cls, text: line.text }]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
        setCurrentText("");
      }, pause);
      return () => clearTimeout(timer);
    }
  }, [inView, lineIdx, charIdx, done]);

  return (
    <div
      ref={ref}
      className="rounded-lg border overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.04)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)] border-zinc-200 bg-white dark:border-zinc-800/80 dark:bg-zinc-950/90 backdrop-blur-sm"
    >
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/40">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
          oracle-sql-session
        </span>
      </div>
      {/* Body */}
      <div className="p-6 font-mono text-[13px] leading-[1.8] min-h-[280px]">
        <div className="text-zinc-500 dark:text-zinc-600 mb-1">
          -- Oracle SQL · Session started
        </div>
        {lines.map((l, i) =>
          l.text === "" ? (
            <div key={i} className="h-4" />
          ) : (
            <div key={i} className={l.cls}>
              {l.text}
            </div>
          ),
        )}
        {!done && lineIdx < SQL_LINES.length && (
          <div className={SQL_LINES[lineIdx]?.cls}>
            {currentText}
            <span className="inline-block w-[7px] h-[14px] bg-blue-500 animate-[blink_.9s_step-end_infinite] align-middle ml-[1px]" />
          </div>
        )}
        {done && (
          <span className="inline-block w-[7px] h-[14px] bg-blue-500 animate-[blink_.9s_step-end_infinite] align-middle" />
        )}
      </div>
    </div>
  );
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useCounter(target, 900, inView);
  return (
    <div ref={ref} className="text-left relative z-10">
      <div className="text-3xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {value}
        <span className="text-blue-500">{suffix}</span>
      </div>
      <div className="text-xs font-medium mt-1 text-zinc-400 dark:text-zinc-500">
        {label}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    /* Added "isolate" class to lock the stacking context so z-[-1] is visible */
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#030303] text-zinc-800 dark:text-zinc-200 antialiased overflow-x-hidden transition-colors duration-300 relative isolate">
      {/* Grid background layer */}
      <div className="absolute inset-0 pointer-events-none z-[-1] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_50%,transparent_100%)]" />

      {/* ── HERO ── */}
      <section className="relative z-10 px-6 pt-20 pb-20 lg:pt-28 lg:pb-28 max-w-5xl mx-auto border-b border-zinc-200 dark:border-zinc-900">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono mb-8 border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 shadow-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            v2.0 &nbsp;·&nbsp; Oracle SQL + DBMS Notes
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.05]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
              Master{" "}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-300">
              Database Systems
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
              one concept at a time
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed text-zinc-500 dark:text-zinc-400"
          >
            Comprehensive lecture notes, Oracle SQL labs, ER diagrams, and
            exam-ready blueprints — all in one clean documentation hub.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white transition-colors shadow-sm"
              >
                Start reading
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="/docs/Labs/lab3"
                className="inline-flex items-center gap-2 rounded-md border px-6 py-2.5 text-sm font-medium border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors shadow-sm"
              >
                <Terminal className="h-3.5 w-3.5" />
                Browse SQL labs
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TERMINAL ── */}
      <section className="relative z-10 px-6 py-20 border-b bg-zinc-50/70 dark:bg-[#060606]/70 backdrop-blur-[2px] border-zinc-200 dark:border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Terminal_Mockup />
          </motion.div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="relative z-10 px-6 py-16 max-w-5xl mx-auto border-b border-zinc-200 dark:border-zinc-900">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard target={12} suffix="+" label="Lecture modules" />
          <MetricCard target={150} suffix="+" label="SQL examples" />
          <MetricCard target={50} suffix="+" label="Schema blueprints" />
          <MetricCard target={100} suffix="%" label="Open source" />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative z-10 px-6 py-24 max-w-5xl mx-auto border-b border-zinc-200 dark:border-zinc-900">
        <div className="mb-14">
          <p className="text-xs font-mono uppercase tracking-widest mb-2 text-zinc-400 dark:text-zinc-500">
            Core features
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Built for engineers who mean business
          </h2>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border rounded-lg overflow-hidden bg-zinc-200 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-900 shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {[
            {
              icon: BookOpen,
              title: "ER diagrams & modeling",
              desc: "Entity mappings, cardinality, weak entities, and relationship constraints — all visualized.",
            },
            {
              icon: Database,
              title: "Oracle SQL labs",
              desc: "Production-ready DDL/DML templates — joins, subqueries, aggregates, and window functions.",
            },
            {
              icon: Layers,
              title: "Normalization theory",
              desc: "Structured breakdowns from 1NF through BCNF with worked decomposition examples.",
            },
            {
              icon: GraduationCap,
              title: "Exam-first structure",
              desc: "Every topic organized around what actually appears in assessments. No filler.",
            },
            {
              icon: Sparkles,
              title: "PL/SQL & triggers",
              desc: "Stored procedures, cursors, exception handlers, and transaction control logic.",
            },
            {
              icon: Search,
              title: "Performance tuning",
              desc: "Indexing strategies, B-Tree internals, query cost models, and EXPLAIN PLAN walkthroughs.",
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.015, y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="group p-8 bg-white hover:bg-zinc-50/50 dark:bg-[#060606] dark:hover:bg-zinc-900/40 transition-colors cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -8, 0] }}
                transition={{ duration: 0.45 }}
                className="w-8 h-8 rounded border flex items-center justify-center mb-5 border-zinc-200 bg-zinc-50 text-zinc-500 group-hover:text-blue-500 group-hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-900/30 dark:group-hover:border-blue-900 transition-colors"
              >
                <feat.icon className="w-4 h-4" />
              </motion.div>
              <h3 className="text-sm font-medium mb-2 tracking-tight group-hover:text-blue-500 transition-colors text-zinc-800 dark:text-zinc-200">
                {feat.title}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-500">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SYLLABUS ── */}
      <section className="relative z-10 px-6 py-24 max-w-5xl mx-auto border-b border-zinc-200 dark:border-zinc-900">
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest mb-2 text-zinc-400 dark:text-zinc-500">
            Syllabus index
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Jump into any topic
          </h2>
        </div>
        <motion.div
          className="flex flex-col gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {[
            {
              icon: Database,
              title: "Relational model & algebra",
              sub: "Selection, projection, join, division",
            },
            {
              icon: Workflow,
              title: "SQL joins deep dive",
              sub: "Inner, outer, natural, self, cross",
            },
            {
              icon: Layers,
              title: "Transaction management",
              sub: "ACID, serializability, deadlock handling",
            },
            {
              icon: BookOpen,
              title: "Schema design & normalization",
              sub: "FDs, closures, BCNF decomposition",
            },
            {
              icon: Search,
              title: "Correlated subqueries",
              sub: "EXISTS, NOT EXISTS, nested selects",
            },
            {
              icon: Sparkles,
              title: "Indexing & query optimization",
              sub: "B-Trees, clustering, cost estimation",
            },
          ].map((topic, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Link
                href="/docs"
                className="group flex items-center justify-between p-4 rounded-md border border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 dark:border-zinc-900 dark:bg-zinc-950/80 dark:hover:border-blue-900 dark:hover:bg-blue-950/20 shadow-sm transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 border-zinc-200 bg-zinc-50 text-zinc-400 group-hover:text-blue-500 group-hover:border-blue-200 dark:border-zinc-900 dark:bg-zinc-900/50 dark:group-hover:border-blue-900 transition-colors">
                    <topic.icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium tracking-tight group-hover:text-blue-500 transition-colors text-zinc-800 dark:text-zinc-300">
                      {topic.title}
                    </div>
                    <div className="text-[11px] mt-0.5 text-zinc-400 dark:text-zinc-600">
                      {topic.sub}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-zinc-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all dark:text-zinc-700" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── ARCHITECTURE PROSE ── */}
      <section className="relative z-10 px-6 py-24 max-w-5xl mx-auto border-b border-zinc-200 dark:border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100"
            >
              A documentation framework optimized for engineering performance.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-zinc-500 text-sm leading-relaxed mb-8"
            >
              No fluff. Concepts are split into functional blocks with clean
              logical structures and standard code patterns that mirror real
              production stacks.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {[
                "Exam focused metrics",
                "Visual architecture labs",
                "Clean markdown specs",
                "Industry syntax standards",
                "Fully responsive",
                "100% open source",
              ].map((pt) => (
                <motion.div
                  key={pt}
                  variants={fadeInUp}
                  className="flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {pt}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg border p-6 font-mono text-xs shadow-xl border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950/90 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 mb-5 text-[10px] text-zinc-400 dark:text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              schema.config.json
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-1.5 leading-relaxed"
            >
              {[
                <>
                  <span className="text-zinc-400">{"{"}</span>
                </>,
                <div className="pl-4">
                  <span className="text-zinc-400">"service"</span>:{" "}
                  <span className="text-zinc-700 dark:text-zinc-300">
                    "Database Systems Hub"
                  </span>
                  ,
                </div>,
                <div className="pl-4">
                  <span className="text-zinc-400">"engine"</span>:{" "}
                  <span className="text-zinc-700 dark:text-zinc-300">
                    "Next.js + FumaDocs"
                  </span>
                  ,
                </div>,
                <div className="pl-4">
                  <span className="text-zinc-400">"syntax"</span>:{" "}
                  <span className="text-zinc-700 dark:text-zinc-300">
                    ["Oracle SQL", "PL/SQL"]
                  </span>
                  ,
                </div>,
                <div className="pl-4">
                  <span className="text-zinc-400">"optimization"</span>:{" "}
                  <span className="text-blue-500">true</span>
                </div>,
                <>
                  <span className="text-zinc-400">{"}"}</span>
                </>,
              ].map((line, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="text-zinc-500"
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-6 py-28 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
            Ready to level up your DBMS knowledge?
          </h2>
          <p className="text-sm max-w-md mx-auto mb-8 text-zinc-400">
            Everything you need — structured notes, worked SQL, and exam-focused
            breakdowns — waiting for you.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="inline-block"
          >
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-md px-8 py-3 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white transition-colors shadow-md"
            >
              Open the docs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t py-12 px-6 border-zinc-200 bg-zinc-50/70 dark:border-zinc-900 dark:bg-[#020202]/70 backdrop-blur-[2px]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5 cursor-default"
          >
            <div className="w-6 h-6 rounded border flex items-center justify-center font-mono text-xs font-semibold border-zinc-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
              DB
            </div>
            <span className="font-medium text-xs font-mono tracking-tight text-zinc-600 dark:text-zinc-400">
              DBMS Hub
            </span>
          </motion.div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            <Link
              href="/docs"
              className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="https://github.com/muhammadabdulrahim458-dev/Oracle-SQL-Notes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
            >
              <GithubIcon className="w-3 h-3" /> GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/muhammad-abdul-rahim-attari/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
            >
              <LinkedinIcon className="w-3 h-3" /> LinkedIn
            </Link>
          </nav>
          <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} DBMS Hub. MIT License.
          </p>
        </div>
      </footer>
    </main>
  );
}
