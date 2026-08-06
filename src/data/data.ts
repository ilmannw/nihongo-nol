export interface WorkExperienceRole {
  role: string;
  period: string;
  impacts: string[];
  notableProject?: {
    title: string;
    description: string;
  };
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location?: string;
  logo?: string;
  impacts: string[];
  notableProject?: {
    title: string;
    description: string;
  };
  roles?: WorkExperienceRole[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ToolCategory {
  category: string;
  items: string[];
}

export interface CaseStudySection {
  title: string;
  content?: any;
  type?: 'text' | 'bullets' | 'callout' | 'steps' | 'numbered' | 'image' | 'columns' | 'quote' | 'table';
  start?: number;
  tableData?: { headers: string[]; rows: string[][] };
}

export interface CaseStudy {
  tags: string[];
  description: string;
  note?: string;
  sections: CaseStudySection[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage?: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  tools: string[];
  caseStudy?: CaseStudy;
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
    role: "IT & Digital Transformation Assistant Manager",
    period: "May 2025 – Present",
    location: "Jakarta, Indonesia",
    logo: "/logos/tuvnord.png",
    impacts: [
      "**Slashed monthly development costs by 60%** for concurrent digital projects by strategically transitioning from high-cost external vendors to an optimized internal model using **outsourced talent** and **AI-assisted development tools**.",
      "**Maximized operational efficiency and data integrity** across **6+ business units** by optimizing a portfolio of **15+ digital products**, effectively eliminating manual effort and human errors through automated workflows.",
      "**Achieved a 90% on-time project delivery rate** for **10+ annual digital initiatives** by driving high-performing alignment between an agile, cross-functional team of internal developers and external vendors.",
      "**Enhanced cross-departmental alignment and roadmap predictability** by establishing an **ITSM Development module** that converted company-wide digitization requests into a structured, prioritized product roadmap.",
      "**Minimized business disruption and accelerated issue resolution** by deploying an **ITSM Operational module** that centralized technical support, establishing clear SLAs and full transparency into ticket status and IT performance."
    ],
    notableProject: {
      title: "Regional Certification Management System",
      description: "Delivered a **regional Certification Management System for the Asia region** on time with minimal issues, adapting and enhancing Indonesia's Certification system to bridge regional technological gaps through effective cross-border stakeholder coordination."
    }
  },
  {
    company: "Treasury (PT Indonesia Logam Pratama)",
    role: "Product Owner",
    period: "February 2024 – May 2025",
    location: "South Tangerang, Indonesia",
    logo: "/logos/treasury.png",
    impacts: [
      "**Drove high-velocity product execution** by launching the **\"Gold for Good\"** feature within a strict timeline, successfully capturing **12,000+ distinct users** and securing **over IDR 30 million in donations** within 4 months of release.",
      "**Achieved a 90%+ on-time feature deployment rate** by translating cross-functional business needs into PRDs and leading both internal dev teams and third-party vendors through the full lifecycle from grooming to launch.",
      "**Consistently outperformed KPIs**, earning an **'Exceeds Expectations'** performance evaluation."
    ],
    notableProject: {
      title: "Singapore Market Expansion",
      description: "Spearheaded Treasury’s **market expansion into Singapore** as lead Product PIC, successfully navigating strict regional compliance and cross-functional execution to enable a seamless market entry within deadline and with zero operational disruption."
    }
  },
  {
    company: "Hudoro Solusi Digital",
    role: "Product Manager (Freelance)",
    period: "April 2024 – May 2025",
    location: "South Tangerang, Indonesia",
    logo: "/logos/hudoro.png",
    impacts: [
      "**Accelerated client project kickoffs by 20%** by optimizing the requirement-gathering process into technical specifications and UI/UX validation within tight **2–4 week cycles**.",
      "**Secured repeat client engagements and long-term partnerships** by maintaining a **95% client satisfaction rate** through close cross-functional alignment with UI/UX and development teams to guarantee high-quality product delivery."
    ]
  },
  {
    company: "Rakamin Academy",
    role: "Product Development & UI UX Design Tutor (Freelance)",
    period: "June 2023 – March 2024",
    location: "Jakarta, Indonesia",
    logo: "/logos/rakamin.png",
    impacts: [
      "**Achieved a 70%+ portfolio-readiness and project success rate** by mentoring **20+ individuals** in digital product management and UX fundamentals through structured, real-world case studies.",
      "**Elevated mentee competency and adherence to industry best practices** by delivering personalized career guidance and actionable product feedback, resulting in refined, market-ready project work."
    ]
  },
  {
    company: "Bukalapak",
    role: "Product Researcher",
    period: "December 2021 – September 2023",
    location: "Jakarta, Indonesia",
    logo: "/logos/bukalapak.png",
    impacts: [
      "**Mitigated product risk and slashed assumption-driven decisions by 40%** by designing and executing end-to-end qualitative and quantitative research, including usability testing and behavioral analysis.",
      "**Bridged user insights with key business metrics** and product objectives as a strategic partner, ensuring cross-functional alignment across Product, Business, and Design teams to maximize feature adoption."
    ],
    notableProject: {
      title: "Mixed-Method User Research & GMV Impact",
      description: "Drove a **90% increase in GMV** and enhanced transaction completion rates by identifying critical pain points via **mixed-method research**, validating root causes, and delivering data-backed design recommendations."
    }
  },
  {
    company: "Telkom Indonesia",
    role: "UX Researcher & UX Designer",
    period: "August 2020 – December 2021",
    location: "Jakarta, Indonesia",
    logo: "/logos/telkom.png",
    impacts: [],
    roles: [
      {
        role: "UX Researcher",
        period: "January 2021 – December 2021",
        impacts: [
          "**Accelerated Research Operations**, slashing recruitment lead time by **30%** and research cycle time by **20%** while elevating insight quality standards and maintaining strict compliance within **100% of planned budget**.",
          "**Influenced the product roadmap** of multiple Telkom Indonesia digital products by delivering actionable user insights from discovery to validation that were successfully adopted by cross-functional teams."
        ],
        notableProject: {
          title: "Poultry Supply Chain Ethnographic Research",
          description: "Informed the foundational development of a new digital platform by leading end-to-end **ethnographic research** that uncovered systemic inefficiencies within the poultry supply chain and delivered high-impact strategic recommendations."
        }
      },
      {
        role: "UX Designer",
        period: "August 2020 – January 2021",
        impacts: [
          "**Slashed design and development iteration cycles by 25–30%** by establishing and standardizing early-stage discovery frameworks during the company’s digital transformation phase, ensuring structured execution across cross-functional teams.",
          "**Synchronized user experience enhancements** with operational and commercial objectives for **Truck Marketplace & Port** digital products, partnering closely with Product, Business, and Design teams to drive product growth."
        ]
      }
    ]
  },
  {
    company: "Warung Pintar",
    role: "UX Researcher",
    period: "July 2019 – July 2020",
    location: "Jakarta, Indonesia",
    logo: "/logos/warungpintar.png",
    impacts: [
      "**Slashed assumption-based feature development by 35%** by validating product hypotheses via mixed-method research (user interviews, usability testing, and behavioral analysis), directly optimizing product prioritization and experimentation roadmaps.",
      "**Steered data-driven product decisions** across Merchant product squads (**Acquisition, Growth, and Transaction**) by delivering actionable qualitative and quantitative insights that aligned user needs with squad KPIs."
    ],
    notableProject: {
      title: "C-Level Ethnographic Study",
      description: "**Co-created and validated a new product concept alongside C-level executives**, Product, and Sales leaders through a high-impact ethnographic study, delivering strategic opportunity mapping that shaped the product's value proposition and go-to-market direction."
    }
  },
  {
    company: "UX Indonesia",
    role: "Research Assistant",
    period: "September 2018 – March 2019",
    location: "Jakarta, Indonesia",
    logo: "/logos/uxindonesia.png",
    impacts: [
      "**Accelerated project delivery and data integrity** across both external and internal initiatives by providing strategic research support and actionable user insights for multiple client portfolios."
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
    id: "gold-for-good",
    title: "Gold for Good: Developed an add-on feature to support the UN SDGs",
    category: "Product Management",
    description: "Supporting the UN SDGs by integrating donation options into everyday gold transactions, reaching over 12,000 unique users.",
    coverImage: "/images/projects/gold-for-good/image_1.png",
    metrics: [
      { label: "Timeline", value: "1 Month" },
      { label: "Active Users", value: "12,000+" },
      { label: "Donations Raised", value: "IDR 30M+" },
      { label: "SDGs Supported", value: "2 Programs" }
    ],
    tools: ["Jira", "Confluence", "Miro", "Kitabisa API", "Jejakin API"],
    caseStudy: {
      tags: ["Treasury", "Social Impact Product", "Third-Party Integration"],
      description: "The Gold for Good project reflects our company's vision that \"Everyone deserves a bright future\" by supporting the UN SDGs. It integrates donation options into transactions, enabling users to contribute effortlessly. I successfully launched this feature on time (1 month), reaching over 12,000 unique users and securing more than 30 million in donations within 4 months.",
      note: "Q2-Q3 2024",
      sections: [
        {
          title: "Background & Objectives",
          type: "text",
          content: "Gold for Good project is intricately aligned with our company's vision of \"Everyone deserves a bright future.” By facilitating contributions towards the United Nations Sustainable Development Goals (SDGs), Gold for Good embodies our commitment to creating opportunities for all individuals to thrive. By integrating donation opportunities into everyday transactions, Gold for Good firmly believes that every individual has the power to make a meaningful impact on society and the environment, thereby contributing to a brighter future for all."
        },

        {
          title: "Product Concept",
          type: "bullets",
          content: [
            "Conduct social assistance by involving users as volunteers.",
            "Collaborate with social communities, institutions, government, or foundations.",
            "Integrate a donation option into user transactions."
          ]
        },
        {
          title: "Adding new section in Buy feature",
          type: "text",
          content: "Seamlessly integrated within the buying feature of the platform. Users can opt-in to contribute to donation programs by toggling a button within the buying feature of the platform. Provides clear information to users about how their contributions will be used to support specific donation programs aligned with the SDGs, promoting transparency and trust."
        },
        {
          title: "",
          type: "image",
          content: [
            "/images/projects/gold-for-good/scraped_img_4.png",
            "/images/projects/gold-for-good/scraped_img_5.png",
            "/images/projects/gold-for-good/scraped_img_6.png"
          ]
        },
        {
          title: "Gold for Good initiatives currently consists of two programs, Green Gold and Golden Generation.",
          type: "columns",
          content: [
            {
              title: "Green Gold",
              text: "To cut greenhouse gas emissions and achieve net-zero, we’ve launched the Green Gold Project. This initiative offsets carbon from gold mining with a tree planting program funded by collective contributions. Partnering with JejakIn allows companies to showcase their commitment to environmental stewardship and support climate action in Indonesia.",
              image: "/images/projects/gold-for-good/image_2.png"
            },
            {
              title: "Golden Generation",
              text: "A social program by Treasury and Kitabisa aims to improve the well-being of “Anak Jalanan” by offering informal education and skills training, enhancing their opportunities in society. This initiative supports quality education, prepares them for decent jobs, and fosters economic growth by addressing inequality through equal access to education and training for those from disadvantaged backgrounds.",
              image: "/images/projects/gold-for-good/image_3.png"
            }
          ]
        },
        {
          title: "Workflow & Stakeholder Management",
          type: "text",
          content: "As a Product Owner, I managed workflows and collaborated with key stakeholders to ensure successful project delivery:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "Product Marketing: Align business requirements with product concepts.",
            "PRD Creation: Develop a PRD detailing concepts and technical requirements.",
            "UI/UX Design: Define design requirements and provide feedback.",
            "Development Team: Conduct grooming sessions to discuss the PRD, oversee implementation, manage UAT, and ensure a smooth app release.",
            "Vendor Team: Coordinate API integrations for seamless data exchange.",
            "Legal Team: Prepare the Terms & Conditions document.",
            "CRM Team: Address user inquiries and complaints related to new features."
          ]
        },
        {
          title: "Technical Requirement",
          type: "text",
          content: "In the Gold for Good project, I defined several key technical requirements to ensure scalability, data integrity, and seamless integration across the system:"
        },
        {
          title: "",
          type: "numbered",
          content: [
            "**Partner Integration**\nTo support operational efficiency and transparency, I defined requirements for bi-directional integration with external partners.\n\n• On the outbound side:\n  Transaction data is sent to partners in real time, eliminating manual reporting processes\n• On the inbound side:\n  The system consumes impact data from partners, such as:\n  - Tree planting reports and growth updates from Jejakin\n\nThis enables users to track the tangible outcomes of their contributions, improving trust and engagement.",
            "**Calculation Formula per Add-On**\nEach add-on under Gold for Good represents a different SDG objective, requiring distinct calculation logic. I defined custom calculation formulas for each add-on, based on inputs from external partners:\n\n• Green Gold: Donation values are derived from the carbon impact per gram of gold, based on environmental data provided by Jejakin\n• Golden Generation: Donation calculations are based on predefined social impact models in collaboration with Kitabisa.\n\nThis ensured that each transaction accurately reflects its real-world impact.",
            "**Impact on Existing Features**\nThe introduction of the add-ons feature required enhancements to existing systems, particularly in tracking and displaying user impact. I defined requirements to:\n• Store historical Gold for Good transactions at the user level\n• Aggregate and display total user impact from past contributions\n• Enhance the user interface to provide visibility into cumulative impact\n\nThese changes also required updates to the user data model, ensuring that all related features remained consistent and scalable. All enhancements were documented comprehensively in the PRD to ensure alignment across teams.",
            "**Add-Ons Configuration in Master Data**\nSince Gold for Good is designed as a long-term initiative with multiple add-ons aligned to different SDG objectives, the system needed to support scalable add-on management from the outset. Rather than implementing hard-coded features, I defined a configurable add-ons setup within Master Data, allowing new add-ons to be introduced without requiring significant engineering changes.\n\nThis included designing a flexible data table structure capable of accommodating dynamic add-on attributes and future expansion beyond the initial offerings (Green Gold and Golden Generation). Example of database structure:"
          ]
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/gold-for-good/image_4.png"
        },
        {
          title: "",
          type: "numbered",
          start: 5,
          content: [
            "**Website Enhancement**\nWhile the core Gold for Good experience is delivered through the mobile app, it was essential to ensure consistent awareness across all digital touchpoints. I also defined requirements to enhance the Treasury website by introducing a dedicated landing page for Gold for Good. This page communicates:\n\n• Background and objectives of the initiative\n• Feature overview and user journey\n• How users can participate\n• The impact generated to date\n\nBy extending the feature presence beyond the mobile app, this initiative ensures end-to-end product visibility, reduces information gaps, and increases overall awareness. This approach is expected to indirectly drive user acquisition and transaction growth within the mobile app by educating both existing and potential users."
          ]
        },
        {
          title: "Results",
          type: "callout",
          content: "• Launched features on schedule (within 1 month).\n• Reached over 12,000 distinct users contributing to Gold for Good within 4 months.\n• Secured over 30 million in donations for Gold for Good within 4 months of release."
        }
      ]
    }
  },
  {
    id: "treasury-3",
    title: "Treasury 3.0: Managed Product Development for Business Expansion to Singapore",
    category: "Product Management",
    description: "Scaling the platform to Singapore and transforming it into a multi-country, multi-currency, and multi-asset investment ecosystem.",
    coverImage: "/images/projects/treasury-3/image_1.png",
    metrics: [
      { label: "New Market", value: "Singapore" },
      { label: "Assets Supported", value: "Gold & Silver" },
      { label: "Regulatory Readiness", value: "100%" },
      { label: "Third-Party APIs", value: "Onfido/Singpass" }
    ],
    tools: ["Miro", "Google Slides", "Notion", "Onfido API", "Singpass API", "Red Dot Payment"],
    caseStudy: {
      tags: ["Treasury", "International Expansion", "Fintech Infrastructure"],
      description: "As Treasury scaled beyond Indonesia to Singapore, the platform evolved from a single-asset product into a multi-asset ecosystem, introducing silver alongside gold. Treasury 3.0 was developed to enable multi-country, multi-currency, and multi-asset capabilities, transforming the system into a scalable foundation for regional growth and product diversification.",
      note: "Q4 2024-Q1 2025",
      sections: [
        {
          title: "Background & Objectives",
          type: "text",
          content: "As Treasury continued to grow, its existing system (Treasury 2.0) began to show limitations in supporting the company’s next phase of expansion. The platform was originally designed for a single market (Indonesia) and a single asset type (gold), resulting in rigid structures across the application, database, and internal tools. This made it challenging to scale operations, introduce new asset types, and accommodate different market requirements such as currencies, user data structures, and third-party integrations.\n\nTo address these challenges, Treasury 3.0 was initiated with the objective of building a more scalable and flexible system capable of supporting multi-country and multi-asset operations. The initiative aimed to enable expansion into Singapore as the first international market, while also introducing new investment products such as silver. In addition, the system upgrade was designed to improve overall processing capabilities and establish a robust foundation for future growth, allowing the platform to seamlessly integrate with diverse partners, support localized experiences, and accelerate product innovation across regions."
        },

        {
          title: "Product Scopes",
          type: "bullets",
          content: [
            "**Treasury Singapore Mobile App Development**\nBuild a dedicated mobile app for the Singapore market by leveraging existing features from Indonesia (e.g., price chart, buy, sell, transfer, advance cash, staking, etc), while extending each feature to support an additional asset: **silver** alongside gold."
          ]
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/treasury-3/image_2.png"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Treasury 3.0 Internal Dashboard Enhancement**\nUpgrade the internal dashboard from Treasury 2.0 by retaining core modules (e.g., Pricing, Transactions, Disbursement, User, KYC, etc), while redesigning the system to support **multi-asset and multi-country operations**, enabling centralized management across different markets and products."
          ]
        },
        {
          title: "",
          type: "image",
          content: [
            "/images/projects/treasury-3/image_3.png",
            "/images/projects/treasury-3/image_4.png",
            "/images/projects/treasury-3/image_5.png"
          ]
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Third-Party Integration for Compliance & Operations**\nImplement integrations with external partners to meet regulatory and operational requirements in Singapore, including:\n• Payment gateway integration with Red Dot Payment\n• KYC and identity verification via Onfido and Singpass\nThese integrations ensure compliance with local regulations while enabling seamless onboarding and transactions for users."
          ]
        },
        {
          title: "",
          type: "image",
          content: ["/images/projects/treasury-3/image_7.png", "/images/projects/treasury-3/image_6.png"]
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Treasury Singapore Website Development**\nDevelop a dedicated website for Treasury Singapore that clearly communicates the company, its products, and value proposition, fully aligned with business, marketing, and local market requirements. The website will serve as a key channel to educate potential users, build credibility, and drive awareness of the Treasury Singapore app, supporting adoption in the new market and strengthening the brand against local competitors."
          ]
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/treasury-3/image_8.png"
        },
        {
          title: "Workflow & Stakeholder Management",
          type: "text",
          content: "As a **Product Owner**, I managed workflows and collaborated with key stakeholders to ensure successful project delivery:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Business Development:** Coordinating adjustments for business rules and calculation logic that differ in Singapore, ensuring Treasury 3.0 (mobile app, website, and internal dashboard) accurately reflects local requirements while keeping overall business objectives on track.",
            "**Product Marketing:** Coordinating on Singapore market requirements, including value proposition, messaging, and competitive benchmarking against similar apps, to identify best practices and areas for improvement, ensuring Treasury Singapore is easily adopted by users and positioned to compete effectively in the new market.",
            "**PRD Creation:** Develop a comprehensive PRD outlining concepts and technical requirements for each product scope, including detailed specifications for each module of Internal Dashboard 3.0, given its increased complexity.",
            "**UI/UX Design:** Define comprehensive design requirements for each feature and module. Collaborate closely with the design team by providing continuous feedback, ensuring that the final UI/UX aligns with product objectives, business goals, and user experience best practices.",
            "**Development Team:** Coordinating to ensure that the technical requirements they initially defined and implemented are fully aligned with the overall product and business requirements, maintaining consistency between system design, feature functionality, and business objectives.",
            "**3rd Party App Onboarding Team:** Collaborated with third-party teams, studied documentation, and implemented integrations that meet internal requirements and system capabilities, while preserving a seamless user experience.",
            "**Legal Team:** Prepared clear and accessible Terms & Conditions for the mobile app and website, ensuring user awareness while mitigating potential legal risks and future disputes.",
            "**CRM Team:** Coordinate to implement a user-friendly ticketing system via Qontak, allowing users to submit complaints efficiently while aligning with Treasury Singapore’s operational and business requirements."
          ]
        },
        {
          title: "Results",
          type: "callout",
          content: "**Ahead-of-Schedule Delivery**: Successfully executed 100% of Treasury 3.0 product scopes, fully aligned across technical, business, and marketing requirements.\n*Note: Transitioned out of the company prior to the official Singapore launch, so post-launch analytics (user adoption, DAU, transaction volume) were not captured.*"
        }
      ]
    }
  },
  {
    id: "user-research-gmv",
    title: "Pulling Out the Thorn: A Mixed-Method Case Study on Discovering and Solving Pains in Managing Pre-Order Products, Resulting in a 90% GMV Increase",
    category: "Product Research",
    description: "A mixed-method case study solving distributors' pain points in managing pre-order products, resulting in a 90% GMV increase.",
    coverImage: "/images/projects/user-research-gmv/image_1.jpg",
    metrics: [
      { label: "GMV Increase", value: "90%" },
      { label: "New Active Stores", value: "91 Stores" },
      { label: "UX Audits", value: "2 Channels" },
      { label: "Timeline", value: "Q3 2022" }
    ],
    tools: ["Google Forms", "Miro", "Typeform", "Maze", "Google Sheets"],
    caseStudy: {
      tags: ["Bukalapak", "Mixed-method research", "Evaluative Research"],
      description: "As a UXR, I discovered a painful problem related to managing pre-order products for Distributors during another research project for the omnichannel management platform. I presented the issue to the PM and validated it with a survey. We conducted a UX audit and made design improvements based on user needs. After usability testing, we launched the feature and achieved a 90% increase in GMV and 91 additional stores using it after one month.",
      note: "Q3 2022",
      sections: [
        {
          title: "Thorns on sellers’ feet",
          type: "text",
          content: "As a Product Researcher, I was assigned to handle the omnichannel management platform used by sellers to manage their online businesses, such as managing orders, products, sales channels, and more. During one of the research projects, I discovered a more painful problem for Distributors (one of the online seller types) in managing pre-order products, which was not the original focus of the research.\n\nHere are some contexts regarding managing pre-order products for distributors:\nThe product ordering system typically involves two types of products: Pre-Order (PO) Products and Ready Stock Products.\n\nPO is a system where the distributor orders products from the manufacturer based on the number of products ordered by their customers. This ensures that the stock received by the distributor is immediately sold, thus minimizing the risk of loss due to dead stock. The PO system is particularly helpful for distributors who have a relatively small profit margin compared to the manufacturer.\n\nGenerally, there is a specific period for open PO set by the manufacturer, which can range from a few days to several weeks.\n\nThe management of PO product orders typically involves the following steps:"
        },
        {
          title: "The PO Order steps",
          type: "numbered",
          content: [
            "The manufacturer informs the distributors about the upcoming new products and the dates for opening the PO.",
            "The distributor shares the PO information with their partners (resellers/dropshippers).",
            "The partners advertise the product and collect orders during the open PO period.",
            "Partners place orders through the designated sales channels provided by the distributor during the open PO period.",
            "After the open PO period has ended, the distributor compiles the orders received and places an order with the manufacturer.",
            "The manufacturer provides an invoice to the distributor as a confirmation that the requested products will be prepared.",
            "The time it takes for the products to be delivered varies, primarily depending on the production time and location of the manufacturer (delivery time).",
            "Once the products have arrived at the distributor's warehouse, the distributor issues invoices to partners and prepares the products according to the partners’ orders.",
            "After the payment has been cleared, the products are shipped to the partners’ according to their orders."
          ]
        },


        {
          title: "Highlight the thorns, validate the pains",
          type: "text",
          content: "Recognizing the increasing importance and impact of the PO order management problem on sellers, I went to great lengths to gather more insights during the research process. To achieve this, I made a deliberate effort to include questions about the PO order while also achieving the current research objectives, resulting in more time and effort spent conducting the sessions and synthesizing the results.\n\nWhen presenting the report, I highlighted the urgency of the PO order issue to the PM. However, to convince him, we needed more quantitative data to support our findings. Therefore, I created a brief survey to prioritize the collection of issues we assumed were occurring on our platform at the time and validate that specific issue with users.\n\nThe survey results confirmed that many users experienced pain points when managing pre-order products. Based on this feedback, the PM agreed to prioritize solving the problem."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/user-research-gmv/image_2.png"
        },

        {
          title: "We got the thorns, now how do we pull them out?",
          type: "text",
          content: "Leveraging insights from the research on managing pre-order products and identifying gaps between user needs and our existing platform, I performed a UX audit of the platform focused on both the seller side (dashboard) and buyer side (storefront website).\n\nThe results of the UX audit included key recommendations for improvements:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Storefront PO Channel:** Modifying the storefront website to serve as a dedicated channel for selling PO products, allowing for systematic order tracking.",
            "**Additive Inventory Logic:** Implementing a PO ordering system that accumulates total demand rather than reducing ready-stock inventory, allowing total orders to be used for direct purchasing from the manufacturer.",
            "**Automated Open PO Period:** Setting defined open PO windows with automatic product archiving on the buyer side once the period closes.",
            "**Multi-Stage Notifications:** Sending clear notifications to distributors and customers regarding producer processing times, warehouse delivery, and final dispatch.",
            "**Quotas & Batch Ordering:** Establishing PO product quotas and supporting batch order processing.",
            "**Scarcity & Social Proof:** Displaying transparent order information on the storefront website to create a psychological effect of scarcity and encourage buyer conversion."
          ]
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/user-research-gmv/image_4.png"
        },
        {
          title: "",
          type: "text",
          content: "I presented the results of the UX Audit to the PM and UXD, and they received it positively. However, we couldn't execute all of the recommendations at once, so I prioritized the most critical ones. The UXD team then proceeded to execute the designs based on my recommendations."
        },
        {
          title: "Will the seller still be in pain if we remove the thorns this way?",
          type: "text",
          content: "To ensure that the proposed solutions effectively addressed the identified problems and that users could comprehend the improved pre-order design flow, we conducted Usability Testing before handing it over to the developer.\n\nWorking together with the UXD, we prepared for the usability testing. During the testing, we asked users to use the pre-order system through the prototype of our improved pre-order flow."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/user-research-gmv/image_5.png"
        },
        {
          title: "",
          type: "text",
          content: "Based on the feedback gathered from the usability testing, we made several modifications to the new design. With these modifications in place, we were confident in implementing and launching the improved pre-order system."
        },
        {
          title: "Now we got it all covered, let’s pull it out together, 1.. 2.. 3…",
          type: "callout",
          content: "After one month of the Distributor PO feature being used by users, the PM analyzed the results and found that there was a 90% increase in GMV from PO products and an additional 91 stores that utilized this feature."
        },
        {
          title: "PO Performance Impact & GMV Results",
          type: "image",
          content: "/images/projects/user-research-gmv/image_6.png"
        },
        {
          title: "Fyuh, that works! Now what?",
          type: "bullets",
          content: [
            "All of the features we implemented have met the needs of our target audience. However, we can further increase the adoption rate of certain features in order to fully maximize the utilization of the PO feature.",
            "Regarding the other recommendations that were given a lower priority, I plan to follow up on them in the next quarter to assess their feasibility for implementation.",
            "In addition, I will be keeping an eye out for any customer complaints regarding the PO feature that may arise through our customer service department.",
            "Overall, the product development process is never-ending, right? ;)"
          ]
        }
      ]
    }
  },
  {
    id: "bootcamp-research",
    title: "Deep Dive into IT Bootcamp's User Journey & Market",
    category: "Product Research",
    description: "A deep dive into IT Bootcamp market to identify Pijar Camp's unique value proposition and design a targeted product strategy.",
    coverImage: "/images/projects/bootcamp-research/card_cover_matrix.png",
    metrics: [
      { label: "Users Interviewed", value: "10 Participants" },
      { label: "Competitors Audited", value: "3 Brands" },
      { label: "User Profiles", value: "5 Categorized" },
      { label: "Timeline", value: "Q3 2021" }
    ],
    tools: ["Miro", "Google Slides", "Google Sheets", "Google Docs"],
    caseStudy: {
      tags: ["Telkom Indonesia", "Market Research", "Generative Research"],
      description: "Pijar Mahir, a MOOC (Massive Open Online Course) offered by Telkom’s Edu-Tribe, is planning to collaborate with Arkademy's IT Bootcamp product to launch a new sub-product called Pijar Camp. To ensure that Pijar Camp stands out and competes effectively in the IT Bootcamp market, we conducted thorough user & market research on the leading Bootcamps, such as Purwadhika, Hacktiv8, and Binar. By doing so, we identified Pijar Camp's unique value proposition and developed a targeted product strategy.",
      note: "Q3 2021",
      sections: [
        {
          title: "A Call from the Sea",
          type: "text",
          content: "As a part of the Research Hub at Telkom Indonesia, UX Researchers work in a studio model to provide consultation and handle research requests from various squads/tribes. Recently, we received a research request from the Pijar Mahir Squad (MOOC from Edu Tribe Telkom) who are collaborating with Arkademy's IT Bootcamp product to launch a new sub-product called Pijar Camp. Our team has been tasked with conducting user research to help determine the most effective product strategy for the Pijar Camp launch."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/diagram_green_boxes.png"
        },
        {
          title: "The Art of Sailing",
          type: "text",
          content: "To start the research process, we review documentation and hold kick-off meetings with the Requesters (UXD/PO/Tribe Leader) to understand the research and product context. From there, we create a Research Plan that includes important components such as Research Questions, Hypotheses, Participant Criteria, and Discussion Guides. We work closely with the Requester throughout each stage of the research to ensure alignment with their needs and to demonstrate the value of research practices in product development.\n\nTo gather insights on the IT Bootcamp market, we conducted Remote In-Depth Interviews with 10 participants from leading bootcamps such as Purwadhika, Hacktiv8, and Binar. Our participant criteria included \"Extreme Users\" who both passed and dropped out of Bootcamp. Additionally, we performed a Competitive Analysis to compare Arkademy with other bootcamp competitors."
        },

        {
          title: "Dive into the Deep Blue Sea",
          type: "text",
          content: "After synthesizing the research data, we divided the insights into four major topics:"
        },
        {
          title: "Decision-Making Journey",
          type: "image",
          content: "/images/projects/bootcamp-research/decision_making_journey.png"
        },
        {
          title: "",
          type: "text",
          content: "Here are some key highlights:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Social media is an effective touchpoint to introduce the bootcamp.** For example, Purwadhika uses salary talk content on YouTube, Hacktiv8 showcases project portfolio content on YouTube, and Binar offers a free trial class on Instagram.",
            "**All participants took an introductory course before the bootcamp** by watching YouTube videos, attending webinars, or completing online courses.",
            "**Customer service (CS) plays a crucial role in decision-making because all participants rely on CS to ask questions and register.** We recommend emphasizing this touchpoint since Arkademy currently doesn't have a clear call-to-action (CTA) to contact CS."
          ]
        },
        {
          title: "",
          type: "quote",
          content: "Why do participants who take online courses still need to take a bootcamp?"
        },
        {
          title: "",
          type: "text",
          content: "It turns out that a bootcamp provides benefits that other methods such as online courses and lectures don't offer. These benefits include:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/benefits_controller_career.png"
        },
        {
          title: "",
          type: "text",
          content: "As the number of IT Bootcamp providers continues to increase, participants need to carefully consider various factors in choosing the right Bootcamp. The thinking process involved in selecting a Bootcamp includes:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/thinking_process_factors.png"
        },
        {
          title: "",
          type: "text",
          content: "From the decision-making journey, we have analyzed the position of Arkademy in the Bootcamp market based on branding:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/position_branding_matrix.png"
        },
        {
          title: "",
          type: "quote",
          content: "When people already have trust in a brand, they tend to prefer its variations rather than its competitors who may excel in one aspect."
        },
        {
          title: "",
          type: "text",
          content: "This is evident in the case of Purwadhika users, where confirmation bias is observed."
        },
        {
          title: "",
          type: "text",
          content: "The position of Arkademy in the Bootcamp market based on Flexibility Propositions:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/position_flexibility_matrix.png"
        },

        {
          title: "",
          type: "quote",
          content: "Currently, Arkademy is targeting a specific group of users who are not currently employed or studying and have no income, but require an Income Share Agreement (ISA), and are interested in being placed in partner companies after completion of the bootcamp."
        },
        {
          title: "",
          type: "text",
          content: "This approach is more akin to a scholarship or management trainee selection process, as opposed to the target market of other bootcamp competitors.\n\nThe position of Arkademy in the Bootcamp market based on the registration process:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/registration_process_table.png"
        },
        {
          title: "Bootcamp Participant Profiles",
          type: "text",
          content: "We have categorized Bootcamp participants into five groups based on their level of information-seeking effort and the urgency of enrolling in a Bootcamp."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/participant_profiles_matrix.png"
        },
        {
          title: "",
          type: "text",
          content: "Characteristics of each profile:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/characteristics_grid_table.png"
        },
        {
          title: "",
          type: "text",
          content: "At present, Arkademy is only able to cater to the information-seeking and urgency requirements of two profiles, namely, Granted Searcher and Passionate Searcher. However, there are still three other profiles, namely Inspired Shifter, Aspiring Opportunist, and Dedicated Worker, that can be potential opportunities for Arkademy to reach out to in the future."
        },
        {
          title: "Bootcamp User Journey",
          type: "image",
          content: [
            "/images/projects/bootcamp-research/user_journey_part1.png",
            "/images/projects/bootcamp-research/user_journey_part2.png"
          ]
        },
        {
          title: "",
          type: "text",
          content: "Here are some key highlights:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "The training and final project stages are similar in all brands. They are divided into chapters, exams at the end of each chapter, and final projects to create digital products.",
            "**Arkademy** has an edge in career preparation, generous grading, and supportive mentors. However, these advantages can only be experienced after participating in the Bootcamp and are not a significant consideration in the initial decision-making process. Additionally, the **Arkademy** website has not effectively communicated these advantages to potential participants."
          ]
        },
        {
          title: "",
          type: "text",
          content: "Due to the pandemic, Bootcamps had to be conducted online, whereas previously they were held offline. Here are some of the pros and cons of both offline and online Bootcamps:"
        },
        {
          title: "",
          type: "table",
          tableData: {
            headers: ["", "Offline Bootcamp", "Online Bootcamp"],
            rows: [
              [
                "Pros",
                "- Direct interaction with mentors and friends, so learning activities are easier and more interesting\n- Can use Bootcamp facilities to support learning",
                "- Greater flexibility in terms of location and schedule\n- Access to a wider range of mentors and friends from different locations"
              ],
              [
                "Cons",
                "- Limited access to mentors and friends outside of scheduled class times\n- Geographic limitations as participants need to be located near the Bootcamp location",
                "- Limited interaction with mentors and friends, which may lead to less engaging learning experiences\n- Need to have a reliable internet connection and suitable devices to participate effectively."
              ]
            ]
          }
        },
        {
          title: "",
          type: "text",
          content: "The position of Arkademy in the Bootcamp market based on learning activities (Offline/Online):"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/online_offline_matrix.png"
        },
        {
          title: "",
          type: "text",
          content: "If the online learning facilities are adequate, online Bootcamp can be the best choice. However, Arkademy has strengths in its offline learning that surpass other competitors."
        },
        {
          title: "",
          type: "text",
          content: "Bootcamps can be divided into two categories based on learning time: Full-time Bootcamp and Part-time Bootcamp."
        },
        {
          title: "",
          type: "table",
          tableData: {
            headers: ["Full-time Bootcamp", "Part-time/Flexible Bootcamp"],
            rows: [
              [
                "Usually follows a 9 to 5 working schedule (Monday-Friday).",
                "Participants can attend Bootcamp after office hours for 3-4 hours or at mutually agreed times."
              ],
              [
                "Participants are not allowed to work or study while attending the Bootcamp. For example, Hacktiv8 & **Arkademy**.",
                "Working or studying is allowed and even recommended."
              ],
              [
                "The Bootcamp is condensed into 4 months (16 weeks) with a perceived heavy workload, which can be difficult to manage.",
                "Bootcamp duration is generally six months (24-30 weeks), and the perceived workload is more manageable even while working or attending college."
              ]
            ]
          }
        },
        {
          title: "",
          type: "text",
          content: "The position of Arkademy in the Bootcamp market based on Graduation Agreement:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/graduation_agreement_table.png"
        },
        {
          title: "",
          type: "text",
          content: "The position of Arkademy in the Bootcamp market based on the Job Connect program:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/job_connect_comparison.png"
        },
        {
          title: "",
          type: "text",
          content: "From the Bootcamp journey, we have analyzed Arkademy's position in the Bootcamp market based on technical and career support factors:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/position_flexibility_matrix.png"
        },
        {
          title: "Pijar Camp's Unique Value Propositions",
          type: "text",
          content: "Our analysis of Bootcamp factors has helped us compare the value propositions of different Bootcamp brands with Arkademy’s:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/bootcamp-research/uvp_comparison_table.png"
        },
        {
          title: "Conclusion:",
          type: "text",
          content: "Arkademy's Unique Value Propositions are its highly supportive curriculum that includes dedicated mentors, generous grading, and the proposition of retrying, as well as its great career support that includes counseling, dedicated trainers, and consistent career classes. These value propositions are not yet included in other competitors' propositions, presenting an opportunity for Arkademy.\n\nHowever, one challenge that Arkademy faces is that people only realize the advantages of the Bootcamp experience after joining as a participant. While branding and flexibility are the deciding factors for most people, Arkademy's UVP may be more difficult to use to attract new participants."
        },
        {
          title: "",
          type: "quote",
          content: "So, How Might We (HMW) improve the effectiveness of Arkademy's UVP in attracting new participants?"
        },
        {
          title: "Recommendations",
          type: "bullets",
          content: [
            "Begin by highlighting Arkademy’s unique value propositions as a hook to capture users' interest and showcase what Arkademy has to offer.",
            "Provide a comparison between Arkademy and other Bootcamps related to the Bootcamp experience to emphasize Arkademy's advantages. For example:\n  ◦ Highlight how 70% of people from other Bootcamps drop off and don't get their money back, while at Arkademy, the graduation rate is much higher.\n  ◦ Share testimonials from successful graduates who have secured jobs through the career support program.\n  ◦ Address any negative feedback, such as low ratings from recruiters on platforms like Quora, and provide testimonials from Arkademy’s recruiters.",
            "Emphasizing \"values that bootcamp participants\" needed on the Website:\n  ◦ **Controller**:\n    ▪ Highlight solutions to the difficulties of self-study:\n      • \"You are not alone, learn with us and other friends who are also passionate in the field\"\n      • \"Friends and mentors who also encourage you to get to your goals\"\n  ◦ **Career Support**:\n    ▪ \"Build a network for your future with friends and mentors from the industry\"\n    ▪ Highlight the percentage and report of participants who have managed to get a job from Arkademy (Hacktiv8 & Purwadhika made participant salary report)\n  ◦ **Beginner Friendly**:\n    ▪ Our curriculum can be studied by everyone from all backgrounds:\n      • \"40% of our graduates didn’t come from tech\"\n    ▪ Create zero to hero stories from participants (not testimony but stories):\n      • \"Meet Defri, a high school graduate who has no basic tech at all, and now he works as a developer with an attractive salary\"\n  ◦ **Credibility**:\n    ▪ Increase Familiarity:\n      • \"Trusted by more than xx companies\" (highlights big companies, unicorn companies,or companies whose products are used daily).\n      • If there are no graduates in big companies, highlight the background of the mentors (job position or company).\n    ▪ Use professional language and tone of voice instead of playful on the website.\n  ◦ **Contact CS**:\n    ▪ Make 'Contact Us' one of the highlighted components on the web."
          ]
        },
        {
          title: "Other Insights",
          type: "text",
          content: ""
        },
        {
          title: "Future Opportunities",
          type: "bullets",
          content: [
            "Conduct market research to determine the size of the market for each Bootcamp participant profile. This will help us identify which profiles to target in our marketing efforts.",
            "To attract a wider range of participants, we should offer more flexible payment and scheduling options in addition to the ISA payment method and a full-time schedule.",
            "We need to better understand our existing Arkademy users to ensure that our current value proposition and language/tone of voice are appropriate for the segment we are targeting.",
            "Consider creating two types of Bootcamp products to cater to different segments: a Bootcamp for high school/vocational/college graduates with a playful language/tone of voice, and a Bootcamp for professionals with a more formal and reliable language/tone of voice.",
            "Integrating Bootcamp with university curricula will give students practical knowledge in addition to theory, preparing them for the needs of today’s industry."
          ]
        },
        {
          title: "Integrating Pijar Mahir (MOOC) into Pijar Camp (Bootcamp)",
          type: "bullets",
          content: [
            "It's important to understand why the majority of Bootcamp participants drop off the Online Course they took. Analyzing people's behavior on the online course platform can help identify factors such as course difficulty, lack of engagement, or scheduling conflicts that may be contributing to the drop-off rate. Metrics such as the number of days to complete the course or the number of days until inactivity can provide useful insights.",
            "For those who drop the Online Course, we can offer an alternative that emphasizes the value of Controller and Career Support. This alternative is the Bootcamp program, which provides a supportive community of peers and mentors to help participants reach their goals.",
            "To avoid confusion and ensure a clear path for participants, we should not bundle the course and Bootcamp into one product. Instead, we can use the course as a starting point to introduce participants to the Bootcamp program. We can leverage a more accessible medium such as YouTube to make the course content more engaging and user-friendly. This approach can help increase the completion rate of the course and encourage more participants to join the Bootcamp program."
          ]
        },
        {
          title: "Hybrid bootcamp program",
          type: "text",
          content: "One of the main benefits of Bootcamp over Online Courses is the presence of a controller. A VoD (Video on Demand) Bootcamp is one type of Bootcamp that focuses on that role while adopting a more flexible schedule. Here are some of its features:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "Provides teaching via Video-on-Demand (VoD) and also provides sessions/classes for discussion with Mentors and friends",
            "Offers a job connect program",
            "Has cheaper operational costs compared to other bootcamp types since it can hire industry mentors on a part-time basis. This enables it to reach a wider range of participants in terms of price",
            "Purwadhika and Binar have already implemented this hybrid type of Bootcamp, making it a proven and viable option for interested participants."
          ]
        }
      ]
    }
  },
  {
    id: "sandwich-generations",
    title: "Daily Financial Needs for Sandwich Generations",
    category: "Product Research",
    description: "Creating 'SmartSpend', an automated budgeting and expense tracking feature with saving gamification to help the sandwich generation.",
    coverImage: "/images/projects/sandwich-generations/image_1.png",
    metrics: [
      { label: "UX Competition", value: "Top 10 Finalist" },
      { label: "Interviewed Users", value: "6 Active Users" },
      { label: "Budget Method", value: "50/30/20 Rule" },
      { label: "Timeline", value: "Q4 2020" }
    ],
    tools: ["Figma", "Miro", "Google Forms", "Looker"],
    caseStudy: {
      tags: ["Jenius", "Product Design", "UX Competition"],
      description: "Me & my team joined the \"Jenius Co-Creation Week 2020\" competition by Jenius BTPN to increase the Jenius app's daily active users. Our team, consisting of 2 UX researchers, 1 UX designer, and 1 UI illustrator, created a new feature named \"SmartSpend.\" It helped users with automated budgeting, daily expense tracking, and a gamification element. After two months of hard work, we were among the top 10 finalists.",
      note: "Q4 2020",
      sections: [
        {
          title: "Gathering Ammunitions",
          type: "text",
          content: "The Jenius app simplifies cash flow management for users, mainly millennials. However, they don't use it as their primary bank, and as a result, the Jenius Daily Active Usage (DAU) needs to increase. According to IDN Research Institute in 2019, millennials in Indonesia spend 10.7% of their monthly income on savings and 2% on investments. Therefore, budgeting is crucial for millennials to avoid falling into the \"Sandwich Generation\" trap and grow financially. To address these issues, we plan to revamp the Jenius app."
        },
        {
          title: "",
          type: "text",
          content: "To address the DAU (Daily Active Users) issue, we have developed two primary objectives:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "Alleviate the current pain points experienced by active Jenius users.",
            "Boost the frequency of daily active usage among Jenius app users."
          ]
        },
        {
          title: "",
          type: "columns",
          content: [
            {
              text: "To accomplish the first objective, we performed an analysis of the reviews for the Jenius application on both the App Store and Play Store, in order to identify the primary issues faced by Jenius users. These issues are as follows:\n\n• App instability\n• Sessions expiring too quickly\n• Frequent problems with security authentication (PIN/Fingerprint)"
            },
            {
              image: "/images/projects/sandwich-generations/playstore_review_illustration.png"
            }
          ]
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/sandwich-generations/user_review_surya.png"
        },
        {
          title: "",
          type: "text",
          content: "To address the second objective, we conducted In-Depth Interviews with six respondents to gain a better understanding of Jenius users. Here are the key findings from our research:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "Jenius users feel that the application is too heavy, resulting in long loading times.",
            "Security authentication (PIN/Fingerprint) issues often prevent users from logging in.",
            "Jenius is not widely accepted as a preferred payment method at many locations, such as marketplaces.",
            "Users choose Jenius primarily because of the free transfers and withdrawals.",
            "Users expressed the need for more features to help manage their cashflow."
          ]
        },
        {
          title: "Creating the Blueprint",
          type: "columns",
          content: [
            {
              text: "After analyzing the findings, we created an Affinity Map and identified the following four main topics:\n\n• The need for improved cashflow management\n• Security concerns during transactions\n• Jenius unavailability for transactions\n• Technical unreliability"
            },
            {
              image: "/images/projects/sandwich-generations/blueprint_illustration.png"
            }
          ]
        },
        {
          title: "",
          type: "text",
          content: "We generated How Might We (HMW) questions for each of these topics and proceeded to the Ideation phase. During this phase, we brainstormed as many ideas as possible for each HMW question. Here's a brief summary of our Miro board:"
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/sandwich-generations/miro_affinity_map.png"
        },
        {
          title: "",
          type: "text",
          content: "To decide the best idea to answer the goal, we do a Dot Voting, and the selected ideas are:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Auto Budgeting** = feature to allocate budget automatically so that users don't have to separate their income into different bank accounts or posts manually",
            "**Daily Expense Tracking** = transactions (online/offline) happen every day, this feature wil increase DAU and solve financial awareness problems for millennial"
          ]
        },
        {
          title: "",
          type: "columns",
          content: [
            {
              text: "To determine the most effective solution for achieving our goal, we conducted a Dot Voting exercise, which yielded the following selected ideas:\n\n• **Auto Budgeting**: This feature enables users to automatically allocate their budget without the need for manual separation of income into different bank accounts or posts.\n• **Daily Expense Tracking**: With transactions occurring both online and offline on a daily basis, this feature aims to increase daily active users and provide a solution to the financial awareness challenges faced by millennials."
            },
            {
              image: "/images/projects/sandwich-generations/dot_voting_illustration.png"
            }
          ]
        },
        {
          title: "Adding a little bit of magic powder",
          type: "text",
          content: "Prior to product design based on the selected idea, we perform a Competitive Analysis of similar products to assess their strengths and weaknesses, and derive inspiration during the design process."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/sandwich-generations/competitive_analysis_table.png"
        },
        {
          title: "",
          type: "columns",
          content: [
            {
              text: "Additionally, we conduct Desk Research to gain further financial insights and enhance the solutions we intend to create:\n\n• 50-20-30 Method (Elizabeth Warren et al, 2005)\n• Reframing the 'Budget' Word\n• Don't Start With Restrictions\n• Cutting Expenses"
            },
            {
              image: "/images/projects/sandwich-generations/desk_research_illustration.png"
            }
          ]
        },
        {
          title: "",
          type: "quote",
          content: "**50-20-30 Method (Elizabeth Warren et al, 2005)**\nThe idea is to spend 50% of your total income on your needs, 20% on saving, and 30% on wants. The 50-20-30 method is very simple to maintain, which is why it can be the best budgeting methods. We decided to use the 50-20-30 method to help users manage their finances."
        },
        {
          title: "",
          type: "quote",
          content: "**Reframing the 'Budget' Word**\nThe word \"budget\" isn't very helpful. It doesn't tell you anything about what you need to do. And, for many, it triggers negative associations. So let's call it something else. Based on this research and alignment with Jenius branding, we have agreed to name our feature \"SmartSpend\"."
        },
        {
          title: "",
          type: "quote",
          content: "**Don't Start With Restrictions**\nYes, a spending plan involves limits. But those come in later. The first step is to simply figure out where your money is going. Then start making decisions about what to prioritize and what to cut out or cut back on. SmartSpend will not limit the use of user money, financial awareness is built with daily financial tracking."
        },
        {
          title: "",
          type: "quote",
          content: "**Cutting Expenses**\nAs a first pass, don't go too big on cutting expenses, or you will set yourself up for failure. Pick 1-2 categories to tackle at a time. Then the next month, pick 2 new categories. This is all about developing the muscle for sustainable spending habits. SmartSpend will help users to reduce expenses and increase savings with tips and challenges."
        },
        {
          title: "Assemble the Weapons",
          type: "text",
          content: "Based on the research results, we started to create wireframes, high-fidelity designs, and prototypes by considering aesthetics, security, business development, and usability."
        },
        {
          title: "Introducing SmartSpend",
          type: "image",
          content: "/images/projects/sandwich-generations/introducing_smartspend_hero.png"
        },
        {
          title: "",
          type: "text",
          content: "SmartSpend, a feature to help users' financial well-being through auto budgeting and daily expense tracking wrapped in a touch of gamification."
        },
        {
          title: "Main Features",
          type: "image",
          content: [
            "/images/projects/sandwich-generations/main_features_part1.png",
            "/images/projects/sandwich-generations/main_features_part2.png"
          ]
        },
        {
          title: "SmartSpend Advantages",
          type: "bullets",
          content: [
            "One-stop solution for all your daily transactions.",
            "Bid farewell to the hassle of managing multiple bank accounts.",
            "Buy as you want, save as you need, no pressure!",
            "Automatic expense tracking system to support you.",
            "Utilize Optical Character Recognition (OCR) technology to track your receipts.",
            "Meet Clever! A gamification plant that grows in proportion to your savings.",
            "Clever consumers may grow bigger Clover (a saving gamification).",
            "SmartSpend will handle the calculations for your financial well-being."
          ]
        },
        {
          title: "Put it to Test before the War began",
          type: "text",
          content: "To ensure the usability of this design, we conducted Usability Testing with three participants, assigning them the primary tasks associated with the SmartSpend feature. To our surprise, all participants were able to complete each task successfully."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/sandwich-generations/usability_testing_results.png"
        },
        {
          title: "",
          type: "text",
          content: "In addition, the insights that we get from Usability Testing are:"
        },
        {
          title: "",
          type: "image",
          content: [
            "/images/projects/sandwich-generations/ut_insights_part1.png",
            "/images/projects/sandwich-generations/ut_insights_part2.png"
          ]
        },
        {
          title: "Epilogue",
          type: "text",
          content: "It was a great experience to be able to participate in the UI/UX competition while juggling our main job responsibilities. Although we encountered some challenges, such as difficulty coordinating schedules due to being employed by different companies, we were able to exchange knowledge about UX practices between our respective companies. While we only managed to make it to the top 10, we are still satisfied with the outcome, especially considering that the winners and other participants were highly experienced professionals."
        }
      ]
    }
  },
  {
    id: "fishing-with-bait",
    title: "Fishing with Bait: A Tactical Investigation into Boosting Long-Term Subscription Rates and Enhancing Customer Retention",
    category: "Product Research",
    description: "A tactical investigation into subscription renewal behavior to boost long-term yearly subscription rates and customer retention.",
    coverImage: "/images/projects/fishing-with-bait/image_1.png",
    metrics: [
      { label: "Renewal Discount", value: "20% Coupon" },
      { label: "Friction Areas", value: "3 Gaps" },
      { label: "Preferred Channel", value: "WhatsApp" },
      { label: "Timeline", value: "Q2 2023" }
    ],
    tools: ["Miro", "Typeform", "Google Sheets"],
    caseStudy: {
      tags: ["Bukalapak", "Business Research", "Evaluative Research"],
      description: "An omnichannel management platform offered a discount coupon on 12-month subscriptions to improve retention. However, the coupon was underused, and some users even renewed subscriptions without using it, despite previously using a 12-month subscription. We want to understand why some users prefer monthly subscriptions over the cheaper yearly option and why others don't use the discount coupon when renewing.",
      note: "Q2 2023",
      sections: [
        {
          title: "The sun is shining, let’s go fishing",
          type: "text",
          content: "As a Product Researcher, I was assigned to handle the omnichannel management platform used by sellers to manage their online businesses, such as managing orders, products, sales channels, and more. The primary source of revenue for this platform is derived from user subscriptions, offered on both a monthly and yearly basis. Our overarching objective revolves around augmenting the annual subscription rates while enhancing overall customer retention."
        },
        {
          title: "We use bait to reel the fish, but…",
          type: "text",
          content: "In order to achieve this objective, we offered a 20% discount coupon on 12-month subscriptions. However, the coupon was underutilized. Only a few users used the coupon, while the majority of renewals were done without it, primarily by monthly subscribers. Surprisingly, there are some users who chose to renew their yearly subscriptions without using the available coupon."
        },
        {
          title: "Hmm, what’s wrong with our bait?",
          type: "text",
          content: "We want to understand why some users prefer monthly subscriptions over the cheaper yearly option, as well as why some users renew subscriptions without using the discount coupon despite it requiring the same duration they previously selected.\n\nConducting this research will help us enhance coupon utilization in the renewal journey, effectively encouraging customers to opt for the yearly subscription, thereby improving retention rates."
        },
        {
          title: "",
          type: "text",
          content: "According to our survey, most of the seller's decision maker didn't aware of coupons because the information didn't reach them."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/fishing-with-bait/coupon_awareness_chart.png"
        },
        {
          title: "Coupon awareness",
          type: "text",
          content: "Issues:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**The decision maker didn't receive the coupon message** : the decision maker, especially the manager hasn't registered their contact in the platform account. Here are a few cases:"
          ]
        },
        {
          title: "",
          type: "bullets",
          content: [
            "The registered contact belongs to the owner",
            "The inputted number has changed to a new one",
            "New personnel have been assigned but forgot to update their contact number"
          ]
        },
        {
          title: "",
          type: "quote",
          content: "“Proses langganan ulang dilakukan oleh saya sendiri (manager) tanpa pake kupon, baru kemudian dibayarin sama owner. Saya dan admin lain gak tahu juga info (kupon)-nya. Di sini kita pakai satu akun bareng-bareng, kayanya kontak yang didaftarin milik owner”"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**The decision maker prefers Whatsapp, but our Whatsapp channel didn't make them engaged** :"
          ]
        },
        {
          title: "",
          type: "text",
          content: "WhatsApp is the primary communication channel among decision maker, with other channels rarely opened or not mentioned at all. Decision maker are more engaged with messages from one of our team rather than our official Whatsapp channel. Because it:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "Lacks relationship building: It does not prioritize building relationships with the sellers.",
            "Lacks two-way communication: It didn't facilitate interactive and two-way conversations with the sellers.",
            "Spamming with unnecessary information: It tends to be identified with irrelevant information, causing them to skip or ignore the messages."
          ]
        },
        {
          title: "",
          type: "quote",
          content: "“Sejauh ini sebagai owner tahu info promo hanya dari Whatsapp salah satu anggota platform, Whatsapp jadi media utama untuk info karena langsung sampai ke owner yg biasanya jarang buka platform”"
        },
        {
          title: "",
          type: "quote",
          content: "“Saat ini Whatsapp business milik platform hanya komunikasi satu arah, seller gabisa bales/nanya balik, sehingga ketika saya mau nanyain, misal cara pake kuponnya, gabisa dan harus ke chat CS di web, itu repot”"
        },
        {
          title: "",
          type: "callout",
          content: "**How Might We** : Make decision makers aware and engage with our messages?"
        },
        {
          title: "Conclusion",
          type: "image",
          content: "/images/projects/fishing-with-bait/coupon_awareness_conclusion.png"
        },
        {
          title: "",
          type: "text",
          content: "According to our survey, there are some users who are aware of the coupon and have previously subscribed for 1/3 months, intentionally not using the 12-month coupon due to budget constraints."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/fishing-with-bait/coupon_usage_intention_chart.png"
        },
        {
          title: "Coupon usage intention",
          type: "text",
          content: "Issues: They prefer shorter duration to have flexibility and safety , due to:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Budget constraint** : lead small-scale businesses to prioritize other expenses, resulting in their preference for shorter-duration subscriptions due to limited financial capability."
          ]
        },
        {
          title: "",
          type: "quote",
          content: "“Sebenarnya tertarik dan butuh terhadap kupon diskon langganan 12 bulan, biasanya juga kalau ada kupon bakal dipake, tapi saat ini kondisi keuangan internal bisnis bisanya sebulanan aja”"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Lack of trust in the system** : some sellers avoid long-term subscriptions due to concerns about the system's reliability."
          ]
        },
        {
          title: "",
          type: "text",
          content: "Instances of server downtime, system maintenance, and feature errors have led them to perceive SmartSeller as unreliable. Additionally, the lack of assurance regarding system stability further contributes to their hesitation."
        },
        {
          title: "",
          type: "quote",
          content: "“Platform cukup sering maintenance atau servernya down, itu yg jadi pertimbangan kita gabisa komitmen jangka panjang. Karena kita udah jadi pengguna cukup lama, bingung aja mastiin sistemnya udah siap (stabil), bener-bener ga ada jaminan apa-apa soalnya kan, ketika ada (ketemu) masalah kan kita cabut dong”"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Business uncertainty** : new businesses face uncertainty about their sustainability in the next 6 to 12 months, leading them to choose shorter-duration subscriptions."
          ]
        },
        {
          title: "",
          type: "text",
          content: "This pattern is evident among sellers who manage multiple businesses. While their primary business has a 12-month subscription, their sister businesses are newer and less certain. Despite having the financial means and trust, they intentionally avoid longer-duration packages for their sister businesses."
        },
        {
          title: "",
          type: "quote",
          content: "“Karena uang harus diputer ke produk, maka ada itungannya lebih untung mana kalau 3 bulan dulu dibanding uangnya untuk 12 bulan langsung. Lebih aman untuk spend budget 3 bulan dulu daripada lebih lama tapi ujungnya ga kepake, karena stabilitas tokonya pun masih berubah-ubah”"
        },
        {
          title: "",
          type: "callout",
          content: "**How Might We**: Make them retain despite their conditions above?"
        },
        {
          title: "Conclusion",
          type: "image",
          content: "/images/projects/fishing-with-bait/coupon_usage_intention_conclusion.png"
        },
        {
          title: "",
          type: "text",
          content: "According to our survey, some decision makers are aware of the coupon but often forget to use it during the renewal process."
        },
        {
          title: "",
          type: "image",
          content: "/images/projects/fishing-with-bait/coupon_recollection_chart.png"
        },
        {
          title: "Coupon recollection",
          type: "text",
          content: "Issues:"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Time gap between receiving coupon info and doing renewal** : Decision makers tend to renew their subscription close to the expiration date because they believe renewing earlier will forfeit the remaining days of their current subscription. Also, the coupon information is sent a few days in advance, so there is a time gap that often causes the decision maker to forget to use the coupon when renewing."
          ]
        },
        {
          title: "",
          type: "quote",
          content: "“Saya mikirnya kalau expired di 10 juni, dan langganan ulang 1 bulan di 5 juni, maka next expiration date di 5 juni”"
        },
        {
          title: "",
          type: "quote",
          content: "“Saya dapet info kupon jauh dari waktu expired paket sehingga ketika mau langganan ulang sudah lupa kalau ada kupon tersebut”"
        },
        {
          title: "",
          type: "bullets",
          content: [
            "**Distance gap between coupon info location and renewal location** : The separation between the coupon information on Whatsapp and the application process on the billing page, coupled with the lack of prominence of the coupon component, often results in decision-makers forgetting about the available coupons. On top of that, the decision makers usually busy and have limited time to do their task, so they tend to be in a hurry."
          ]
        },
        {
          title: "",
          type: "quote",
          content: "“Ada faktor perbedaan tempat dapet info kupon dengan langganan ulang, membuat saya lupa kalau ada kupon. Kalaupun inget, dikasihnya via Whatsapp, kemungkinan sudah kelewat lama jadi ketumpuk-tumpuk, repot untuk cari-cari lagi”"
        },
        {
          title: "",
          type: "callout",
          content: "**How Might We**: Make decision maker remember coupon when doing renewal?"
        },
        {
          title: "Conclusion",
          type: "image",
          content: "/images/projects/fishing-with-bait/coupon_recollection_conclusion.png"
        },
        {
          title: "Given the circumstances, let’s rethink our bait 💭",
          type: "text",
          content: "Upon gaining valuable insights into the underutilization of our coupons, we strategically formulated “How Might We” questions. These questions serve to reframe the challenges and issues, transforming them into actionable queries with potential solutions."
        },
        {
          title: "",
          type: "text",
          content: "Throughout the course of this project, I collaborated with various pertinent teams including product, business, marketing, sales, and engineering. By engaging in extensive discussions, I ensured that my initial proposals were in perfect alignment with their perspectives. This alignment was crucial to pave the way for the seamless execution of these ideas in the future."
        },
        {
          title: "",
          type: "text",
          content: "Upon presenting the comprehensive research report, complete with well-crafted recommendations, I witnessed a strong sense of satisfaction among my stakeholders. Their contentment was evident not only in their approval of the results but also in their commitment to implement the recommendations. This commitment was reflected in their plans to execute these recommendations, categorized into both short-term and mid-term initiatives."
        }
      ]
    }
  }
];