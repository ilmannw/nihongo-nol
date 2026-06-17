"use client";
import React from "react";
import { headerInfo, skills, tools, workExperiences, projects } from "@/data/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950 antialiased px-4 sm:px-8 py-12 md:py-20 max-w-5xl mx-auto space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="space-y-6 max-w-3xl pt-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-emerald-400 rounded-full bg-emerald-950/50 border border-emerald-800/50">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          {headerInfo.currentRole} at {headerInfo.company}
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
          Hi, I&apos;m {headerInfo.name}.
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
          A <span className="text-neutral-100 font-normal">Product Manager</span> bridging the gap between <span className="text-emerald-400 font-normal">Technical Complexity</span> and <span className="text-neutral-100 font-normal">User-Centric Design</span>. Based in Indonesia.
        </p>
        
        <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-2xl">
          {headerInfo.bio}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {headerInfo.traits.map((trait, idx) => (
            <span key={idx} className="text-xs bg-neutral-900 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded-md">
              #{trait}
            </span>
          ))}
        </div>
      </section>

      {/* 2. CORE VALUE & SKILLS (BENTO GRID) */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-200">Capabilities</h2>
          <p className="text-sm text-neutral-500">How I approach building products, managing teams, and uncovering user insights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: The Tech PM (Computer Science Background) */}
          <div className="md:col-span-2 group relative rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4 hover:border-neutral-700 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-[60px] rounded-full group-hover:bg-emerald-500/10 transition-all" />
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Technical Foundation</div>
              <h3 className="text-xl font-bold text-neutral-200">Computer Science & Data</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Fluent in technical conversations with engineers. Capable of diving into system designs, managing integration workflows, and querying data autonomously.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {skills.find(s => s.category === "Technical Skills")?.items.map((item, idx) => (
                <span key={idx} className="text-xs font-mono bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300">{item}</span>
              ))}
              {tools.find(t => t.category === "Data Analytics")?.items.slice(0, 4).map((item, idx) => (
                <span key={idx} className="text-xs font-mono bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">{item}</span>
              ))}
            </div>
          </div>

          {/* Card 2: Persona Hobby (Movie Review) */}
          <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Beyond Work</div>
              <h3 className="text-xl font-bold text-neutral-200">The Movie Critic</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {headerInfo.hobbyBio.split('.')[0]}. I share reviews to help people power through a tough week.
              </p>
            </div>
            <div className="mt-4 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80 text-[11px] italic text-neutral-500 flex items-center gap-2">
              <span>🎬</span> "Parsing complex movie plots is just like analyzing user behavior."
            </div>
          </div>

          {/* Card 3: Product Management Core */}
          <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-3 hover:border-neutral-700 transition-all duration-300">
            <h3 className="font-bold text-neutral-200 text-base">Product Execution</h3>
            <ul className="space-y-2">
              {skills.find(s => s.category === "Product Management")?.items.slice(0, 4).map((item, idx) => (
                <li key={idx} className="text-xs text-neutral-400 flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4: Research Engine */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4 hover:border-neutral-700 transition-all duration-300">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">User Obsession</div>
              <h3 className="text-xl font-bold text-neutral-200">Advanced Product Research</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Deep expertise in mixed-method research. I don&apos;t just prioritize features based on gut-feeling; I run data-backed experiments to validate root problems.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.find(s => s.category === "Product Research")?.items.slice(0, 6).map((item, idx) => (
                <span key={idx} className="text-[11px] bg-neutral-950 text-neutral-400 px-2 py-0.5 rounded-full border border-neutral-800">{item}</span>
              ))}
              <span className="text-[11px] text-indigo-400 font-medium px-2 py-0.5">+ More</span>
            </div>
          </div>

        </div>
      </section>

      {/* Bagian Featured Works dan Experience akan kita letakkan di bawah sini nanti */}

      {/* 3. WORK EXPERIENCE TIMELINE */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-200">Work Experience</h2>
          <p className="text-sm text-neutral-500">A decade of building products, leading teams, and driving impact across multiple organizations.</p>
        </div>

        <div className="space-y-6">
          {workExperiences.map((exp, idx) => (
            <div key={idx} className="relative flex gap-4">
              {/* Timeline line and dot */}
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-neutral-950 mt-2" />
                {idx !== workExperiences.length - 1 && (
                  <div className="w-0.5 bg-gradient-to-b from-emerald-500/50 to-emerald-500/0 my-2" style={{ height: '120px' }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 group rounded-xl border border-neutral-800 bg-neutral-900/30 p-5 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-neutral-100 text-lg">{exp.role}</h3>
                      <p className="text-sm text-emerald-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-neutral-500 whitespace-nowrap">{exp.period}</span>
                  </div>

                  {/* Impacts */}
                  <div className="space-y-2 pt-2">
                    {exp.impacts.slice(0, 2).map((impact, impIdx) => (
                      <p key={impIdx} className="text-sm text-neutral-400 leading-relaxed flex gap-2">
                        <span className="text-emerald-500/60 flex-shrink-0 mt-0.5">•</span>
                        <span>{impact}</span>
                      </p>
                    ))}
                    {exp.impacts.length > 2 && (
                      <p className="text-xs text-neutral-600 italic pt-1">+ {exp.impacts.length - 2} more impact{exp.impacts.length - 2 > 1 ? 's' : ''}</p>
                    )}
                  </div>

                  {/* Notable Project */}
                  {exp.notableProject && (
                    <div className="mt-4 pt-4 border-t border-neutral-800/50">
                      <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">✨ Notable Project</div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-neutral-200">{exp.notableProject.title}</p>
                        <p className="text-xs text-neutral-500 leading-relaxed">{exp.notableProject.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SECTION */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-200">Featured Projects</h2>
          <p className="text-sm text-neutral-500">Notable initiatives that shaped product strategy and delivered measurable impact.</p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="group rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-300 flex flex-col">
                {/* Category Badge */}
                <div className="inline-flex w-fit mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-100 mb-2 line-clamp-2">{project.title}</h3>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-grow">{project.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4 py-3 border-y border-neutral-800/50">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="text-neutral-600 font-mono">{metric.label}</p>
                      <p className="text-neutral-300 font-semibold text-sm mt-0.5">{metric.value}</p>
                    </div>
                  ))}
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-neutral-950 text-neutral-500 px-2 py-0.5 rounded border border-neutral-800/50 hover:border-neutral-700 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-8 text-center">
            <p className="text-neutral-500">No projects available at the moment.</p>
          </div>
        )}
      </section>

      {/* 5. FOOTER SECTION */}
      <footer className="mt-24 pt-12 border-t border-neutral-800/50 space-y-4 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} {headerInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-700">
            Built with React, Next.js, and Tailwind CSS
          </p>
        </div>
      </footer>

    </main>
  );
}