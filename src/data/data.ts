export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  impacts: string[];
  notableProject?: {
    title: string;
    description: string;
  };
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ToolCategory {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  tools: string[];
}

export const headerInfo = {
  name: "Ilman",
  currentRole: "Product Manager (IT & Digital Transformation Assistant Manager)",
  company: "TUV NORD Indonesia",
  bio: "Ilman is a Product Manager with a Computer Science background and over six years of experience spanning product management, technology, analytics, and design. He leads cross-functional teams to drive company-wide digitalization initiatives, translating business strategy into scalable digital solutions that optimize processes and deliver measurable results. He oversees the end-to-end product development lifecycle, from project prioritization, roadmap planning, and requirements gathering to PRD creation, UI/UX design, development, UAT, rollout, and ongoing maintenance.",
  traits: ["Highly organized", "Accountable", "Proactive", "Adaptable", "Collaborative"],
  hobbyBio: "Aside from his professional life, Ilman loves movies for their ability to convey messages, emotions, and new perspectives. To make the most of his movie-watching experience, he shares his reviews on his social media account to help people power through a tough week."
};

export const workExperiences: WorkExperience[] = [
  {
    company: "TUV NORD Indonesia",
    role: "Product Manager (IT & Digital Transformation Assistant Manager)",
    period: "May 2025 - Present",
    impacts: [
      "Led a cross-functional team of 5 members (Project Managers, UI/UX Designers, and Developers) and managed external vendor development team to deliver 10+ internal digital initiatives per year, ensuring 90% on-time project delivery and improving cross-functional collaboration efficiency.",
      "Spearheaded company-wide digital transformation across 6+ business units by managing and optimizing 15+ internal digital products, successfully digitizing 70% of manual workflows, reducing operational turnaround time by 30%, and minimizing recurring operational errors by 25%.",
      "Oversaw end-to-end product lifecycle (discovery to post-launch), including business requirement gathering, PRD preparation, UI/UX validation, development, UAT, deployment, and maintenance.",
      "Improved team workflow by defining standardized tools, documentation frameworks, and delivery processes, resulting in 20% faster development cycles and <10% major post-launch incidents across product releases.",
      "Managed and prioritized project pipeline through structured roadmap planning and WIP limit control, ensuring development timelines and product quality were maintained while proactively managing stakeholder expectations across departments."
    ]
  },
  {
    company: "Treasury (PT Indonesia Logam Pratama)",
    role: "Product Owner",
    period: "February 2024 - May 2025",
    impacts: [
      "Translated business and user requirements into clear technical specifications by collaborating with 5+ stakeholders across Product, Engineering, Business, Marketing, Partnership, and Customer Service, reducing requirement ambiguity by 30% and minimizing rework during development cycles.",
      "Led end-to-end delivery execution from backlog grooming, sprint planning, development monitoring, to deployment, ensuring 95% on-time release delivery and maintaining high-quality standards with zero critical production issues post-launch."
    ],
    notableProject: {
      title: "Expansion to Singapore",
      description: "Appointed as Product PIC for Treasury’s expansion to Singapore, orchestrating cross-functional execution to localize and enhance the existing product for a new market. Successfully delivered the initiative within timeline and compliance requirements, enabling seamless market entry without major operational disruption."
    }
  },
  {
    company: "Hudoro Solusi Digital",
    role: "Product Manager (Freelance)",
    period: "April 2024 - May 2025",
    impacts: [
      "Partnered with clients to gather and translate business requirements into comprehensive technical specifications, collaborating closely with UI/UX and development teams to ensure seamless execution and high-quality delivery.",
      "Delivered end-to-end PRDs and validated UI/UX designs within 2–4 weeks per project, accelerating project kickoff timelines by 20% and maintaining 95% client satisfaction, resulting in repeat engagements and continued project partnerships."
    ]
  },
  {
    company: "Bukalapak",
    role: "Product Researcher",
    period: "December 2021 - September 2023",
    impacts: [
      "Acted as a strategic thinking partner and user advocate, collaborating with Product, Business, and Design teams to align user insights with key business metrics and product objectives.",
      "Designed and executed end-to-end qualitative and quantitative research (user interviews, usability testing, surveys, and behavioral analysis) to validate product initiatives and reduce assumption-driven decisions by 40%."
    ],
    notableProject: {
      title: "Mixed-Method User Research",
      description: "Identified critical user pain points through mixed-method research, validated root causes, and recommended data-backed design improvements, driving a 90% increase in GMV and significantly improving user engagement and transaction completion rates."
    }
  },
  {
    company: "Rakamin Academy",
    role: "UI UX Design & Product Development Tutor (Freelance)",
    period: "July 2023 - March 2024",
    impacts: [
      "Mentored and guided 20+ mentees in digital product and UX fundamentals by delivering structured learning sessions, real-world case discussions, and actionable feedback, improving mentees’ practical understanding and portfolio readiness.",
      "Provided personalized feedback and career guidance, helping 70%+: of mentees successfully refine their project work and increase their confidence in applying industry best practices."
    ]
  },
  {
    company: "Telkom Indonesia",
    role: "UX Researcher",
    period: "January 2021 - November 2021",
    impacts: [
      "Served as a UX consultant supporting multiple Telkom Indonesia digital products, executing end-to-end research initiatives (discovery to validation) and translating findings into actionable product recommendations adopted by cross-functional teams.",
      "Strengthened Research Operations by optimizing participant recruitment processes, reducing recruitment lead time by 30%, shortening overall research cycle time by 20%, improving insight quality standards, and managing research budgets efficiently to stay within 100% planned allocation."
    ],
    notableProject: {
      title: "Poultry Supply Chain Ethnographic Research",
      description: "Led end-to-end ethnographic research to uncover systemic inefficiencies within the poultry supply chain, delivering strategic insights and product recommendations that informed the development of a new digital platform."
    }
  },
  {
    company: "Telkom Indonesia",
    role: "UX Designer",
    period: "August 2020 - December 2020",
    impacts: [
      "Led experience enhancement initiatives for the Truck Marketplace & Port digital products, collaborating with Product, Business, and Design teams to align user experience improvements with operational and commercial objectives.",
      "Established and standardized early-stage design and discovery processes during the company’s digital transformation phase, ensuring structured execution across teams and reducing iteration cycles by 25–30%."
    ]
  },
  {
    company: "Warung Pintar",
    role: "UX Researcher",
    period: "July 2019 - July 2020",
    impacts: [
      "Executed end-to-end qualitative and quantitative research initiatives to uncover strategic insights for Merchant products, partnering with squads across Acquisition, Growth, and Transaction to ensure data-driven product decisions.",
      "Reduced assumption-based feature development by 35% by validating hypotheses through user interviews, usability testing, surveys, and behavioral analysis, directly influencing product prioritization and experimentation strategy."
    ],
    notableProject: {
      title: "C-Level Ethnographic Study",
      description: "Selected to join a one-month ethnographic study alongside C-level executives, Product, Design, and Sales leaders to co-create and validate a new product concept. Delivered field insights and opportunity mapping that shaped the product value proposition and go-to-market direction."
    }
  },
  {
    company: "UX Indonesia",
    role: "Research Assistant",
    period: "September 2018 - March 2019",
    impacts: [
      "Responsible for providing research support on external and internal projects at UX Indonesia."
    ]
  }
];

export const skills: SkillCategory[] = [
  {
    category: "Product Management",
    items: ["PRD Creation", "Roadmap Creation & Prioritization", "Data Analysis", "Project Management", "Stakeholder Management", "Team Management"]
  },
  {
    category: "Technical Skills",
    items: ["API", "SQL"]
  },
  {
    category: "Co-Creation",
    items: ["Design Sprint", "Ideation", "Design Facilitation"]
  },
  {
    category: "Product Research",
    items: ["In-depth Interview", "Survey", "Usability Testing", "Concept Testing", "Card Sorting", "Customer Journey Map", "Persona", "Ethnographic Field Research", "Diary Study", "Focus Group Discussion", "Descriptive Statistics", "Kano Analysis", "MaxDiff Analysis", "Gabor-Granger Pricing Analysis"]
  },
  {
    category: "Product Design",
    items: ["Competitive Analysis", "Heuristic Evaluation", "User Flow", "Information Architecture", "Wireframe", "Low Fidelity Prototype"]
  },
  {
    category: "Research Operations",
    items: ["Participant Recruitment Management", "Participant Database Management", "Tools Management", "Budget Management", "Vendor Management", "Enhancing Research Quality"]
  }
];

export const tools: ToolCategory[] = [
  {
    category: "AI Assistant",
    items: ["ChatGPT", "Claude"]
  },
  {
    category: "Product",
    items: ["Miro", "Google Slides", "Google Docs", "Visual Studio Code"]
  },
  {
    category: "Documentation",
    items: ["Confluence", "Jira", "Trello", "Notion", "Plane.so"]
  },
  {
    category: "Data Analytics",
    items: ["Google Sheets", "Looker", "Google Analytics", "SQL", "DBeaver"]
  },
  {
    category: "Research",
    items: ["Google Forms", "Conjointly", "Typeform", "Maze", "Airtable"]
  },
  {
    category: "Design",
    items: ["Figma", "Whimsical", "Balsamiq"]
  }
];

export const projects: Project[] = [
  {
    id: "tuv-digitalization",
    title: "Company-Wide Digital Transformation",
    category: "Digital Transformation",
    description: "Led end-to-end digitalization across 6+ business units, managing 15+ internal digital products. Successfully digitized 70% of manual workflows and reduced operational turnaround time by 30%.",
    metrics: [
      { label: "Business Units", value: "6+" },
      { label: "Digital Products", value: "15+" },
      { label: "Process Optimization", value: "70%" },
      { label: "Turnaround Time Reduction", value: "30%" }
    ],
    tools: ["Jira", "Confluence", "Google Analytics", "SQL"]
  },
  {
    id: "treasury-singapore",
    title: "Market Expansion: Singapore Launch",
    category: "Product Strategy",
    description: "Orchestrated cross-functional execution to localize and enhance Treasury's product for Singapore market entry. Delivered initiative within timeline and compliance requirements.",
    metrics: [
      { label: "Time to Market", value: "On-time" },
      { label: "Compliance", value: "100%" },
      { label: "Stakeholders Aligned", value: "5+" }
    ],
    tools: ["Miro", "Google Slides", "Notion"]
  },
  {
    id: "user-research-gmv",
    title: "Mixed-Method Research & GMV Impact",
    category: "Product Research",
    description: "Identified critical user pain points through mixed-method research, validating root causes with data-backed design improvements. Directly drove business outcomes.",
    metrics: [
      { label: "GMV Increase", value: "90%" },
      { label: "Research Methods", value: "5+" },
      { label: "Engagement Improvement", value: "Significant" }
    ],
    tools: ["Google Forms", "Typeform", "Maze", "Google Sheets"]
  },
  {
    id: "prd-delivery",
    title: "Rapid PRD & Design Validation",
    category: "Execution",
    description: "Delivered end-to-end PRDs and validated UI/UX designs within 2-4 weeks per project. Accelerated kickoff timelines while maintaining high client satisfaction.",
    metrics: [
      { label: "Delivery Time", value: "2-4 weeks" },
      { label: "Client Satisfaction", value: "95%" },
      { label: "Timeline Acceleration", value: "20%" }
    ],
    tools: ["Figma", "Google Docs", "Visual Studio Code"]
  },
  {
    id: "supply-chain-research",
    title: "Ethnographic Supply Chain Research",
    category: "Product Research",
    description: "Led comprehensive ethnographic field research to uncover systemic inefficiencies in the poultry supply chain. Delivered strategic insights that informed new digital platform development.",
    metrics: [
      { label: "Field Duration", value: "Multi-week" },
      { label: "Insights Delivered", value: "Strategic" },
      { label: "Platform Outcomes", value: "New initiative" }
    ],
    tools: ["Airtable", "Google Sheets", "Miro"]
  }
];