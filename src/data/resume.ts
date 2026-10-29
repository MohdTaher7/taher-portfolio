// Single source of truth. Everything here comes from Mohammed Taher's resume
// (TaherDataEngineer.pdf) and his two project write-ups. Nothing is invented.

export const RESUME_FILE = "Mohammed_Taher_Data_Engineer_Resume.pdf";

export const profile = {
  name: "Mohammed Taher",
  title: "Data Engineer",
  email: "mohdtaher7219@gmail.com",
  phone: "+91 83903 00680",
  phoneHref: "+918390300680",
  intro:
    "I build ELT pipelines and analytics-ready data models with dbt, Snowflake and Azure, turning raw data from 8+ source platforms into datasets for Power BI, HubSpot and Hightouch.",
  summary:
    "Data Engineer who turns data into measurable business improvements. Spearheaded the creation of a data warehouse that improved processing time by 35%. Implemented ELT processes in Python and SQL that reduced data redundancy by 40%. Has led cross-functional teams of up to 15, delivering on time and within budget.",
};

export const highlights = [
  { value: "35%", label: "faster processing from a data warehouse I spearheaded" },
  { value: "40%", label: "less data redundancy from ELT processes I built in Python and SQL" },
  { value: "15", label: "people in the largest cross-functional team I have led" },
  { value: "8+", label: "fundraising platforms feeding the pipelines I maintain" },
];

export const about = [
  {
    key: "background",
    heading: "Background",
    body: "B.Tech in Computer Science (2020–2024). Data Science Intern at Infosys Springboard, then Data Engineer at Softpredict Technologies since June 2024.",
  },
  {
    key: "focus",
    heading: "Professional focus",
    body: "ELT pipelines with dbt and Snowflake, layered models on the medallion architecture, and shared dbt Mesh packages that standardize logic across client projects.",
  },
  {
    key: "strengths",
    heading: "Key strengths",
    body: "Predictive modeling · Data pipeline development & automation · Data quality & consistency · Cross-functional collaboration.",
  },
  {
    key: "practice",
    heading: "How I ship",
    body: "Git and GitHub with pull-request workflows and CI/CD pipelines, schema.yml tests, and production-safe deployments.",
  },
];

export type Job = {
  role: string;
  company: string;
  start: string;
  end: string;
  current?: boolean;
  points: string[];
  tools: string[];
};

export const experience: Job[] = [
  {
    role: "Data Engineer",
    company: "Softpredict Technologies Pvt. Ltd.",
    start: "Jun 2024",
    end: "Present",
    current: true,
    points: [
      "Built and maintained ELT pipelines with dbt and Snowflake, transforming raw data from 8+ nonprofit fundraising platforms into analytics-ready datasets.",
      "Implemented layered models on the medallion architecture (Raw → Staging → Intermediate → Mart → Exposure) for clean data flow and clear separation of transformation logic.",
      "Contributed reusable macros to a shared dbt Mesh platform package, standardizing transformation logic across multiple client projects.",
      "Delivered mart and exposure models to Power BI, HubSpot and Hightouch to power fundraising analytics and marketing automation.",
      "Used Git and GitHub with pull-request workflows and CI/CD pipelines to ensure tested, safe production deployments.",
    ],
    tools: ["dbt", "Snowflake", "dbt Mesh", "Power BI", "HubSpot", "Hightouch", "Git", "GitHub", "CI/CD"],
  },
  {
    role: "Data Science Intern",
    company: "Infosys Springboard",
    start: "Sep 2023",
    end: "Dec 2023",
    points: [
      "Conducted exploratory and statistical analysis on healthcare datasets, identifying key risk factors and trends relevant to pharmaceutical commercialization.",
      "Built and deployed real-time stroke-risk prediction models achieving 90% accuracy, supporting client decision-making in healthcare delivery.",
      "Supported workflow improvements through process documentation, contributing to successful project execution.",
    ],
    tools: ["Exploratory analysis", "Statistical analysis", "Predictive modeling"],
  },
];

export type Project = {
  id: string;
  name: string;
  kicker: string;
  summary: string;
  tech: string[];
  flow: { stage: string; detail: string }[];
  contribution: string[];
  outcome?: string;
};

export const projects: Project[] = [
  {
    id: "athena",
    name: "Athena dbt Mesh Platform",
    kicker: "Nonprofit fundraising analytics",
    summary:
      "A two-repo dbt Mesh architecture: a shared platform package of reusable macros, plus a client project that applies business logic across five transformation layers.",
    tech: ["dbt", "Snowflake", "SQL", "Jinja", "GitHub", "CI/CD"],
    flow: [
      { stage: "Raw", detail: "Fundraising platforms" },
      { stage: "Staging", detail: "dbt models" },
      { stage: "Intermediate", detail: "Business logic" },
      { stage: "Mart", detail: "Curated datasets" },
      { stage: "Exposure", detail: "Power BI · HubSpot" },
    ],
    contribution: [
      "Contributed to the two-repo dbt Mesh architecture: shared platform package of reusable macros and a client project applying business logic across 5 transformation layers.",
      "Wrote SQL models with CTEs and Jinja templating, maintained schema.yml tests, and followed CI/CD pull-request standards for production-safe deployments.",
      "Delivered curated datasets to Power BI dashboards and HubSpot audiences for nonprofit fundraising teams.",
    ],
  },
  {
    id: "mining",
    name: "Enterprise Data & AI Platform",
    kicker: "Mining industry · Azure",
    summary:
      "An end-to-end Azure data platform for a mining enterprise, unifying SQL, NoSQL, API and real-time OSI-PI data to power analytics, machine learning and agentic AI reporting across departments.",
    tech: [
      "Azure Data Factory",
      "Event Hub",
      "Stream Analytics",
      "Azure Databricks",
      "KNIME",
      "Azure Machine Learning",
      "Azure AI Foundry",
      "RAG",
    ],
    flow: [
      { stage: "Sources", detail: "SQL · NoSQL · APIs · OSI-PI" },
      { stage: "Ingest", detail: "ADF · Event Hub · Stream Analytics" },
      { stage: "Lakehouse", detail: "Databricks Bronze → Silver → Gold" },
      { stage: "ML", detail: "KNIME · Azure ML" },
      { stage: "AI", detail: "AI Foundry agents · RAG" },
    ],
    contribution: [
      "Did the data mapping and data modeling, producing the conceptual, logical and physical models.",
      "Built batch ingestion pipelines with Azure Data Factory and configured Event Hub with Stream Analytics to capture real-time OSI-PI data.",
      "Set up a medallion architecture (Bronze, Silver, Gold) in Databricks for transformations, data quality and the curated analytics layer.",
      "Developed KNIME workflows behind dashboards for material and supply tracking, procurement and departmental reporting; used Azure Machine Learning for model building, training, testing and validation.",
      "Integrated Azure AI Foundry with Databricks, implementing RAG and building AI agents that generate and serve automated reports.",
    ],
    outcome:
      "Deployed to production, handling real-time processing and automated reporting for procurement, finance and materials discharge.",
  },
  {
    id: "udemy",
    name: "Udemy Learning Analytics Dashboard",
    kicker: "Power BI · Learning analytics",
    summary:
      "Interactive Power BI dashboards that let stakeholders monitor course performance, learner engagement, revenue and completion metrics, built on Udemy REST API data.",
    tech: ["Azure Data Factory", "Azure Databricks", "dbt", "Power BI", "DAX", "SQL", "Star Schema", "RLS"],
    flow: [
      { stage: "Source", detail: "Udemy REST APIs" },
      { stage: "Orchestrate", detail: "Azure Data Factory" },
      { stage: "Process", detail: "Databricks Bronze → Silver → Gold" },
      { stage: "Model", detail: "dbt · Star schema" },
      { stage: "Report", detail: "Power BI live connection" },
    ],
    contribution: [
      "Orchestrated API ingestion into Azure Databricks with ADF, processed through Bronze, Silver and Gold layers.",
      "Built modular dbt SQL models with business logic and validation to produce Gold-layer reporting tables.",
      "Designed a star-schema semantic model with Course, Instructor, Learner, Category and Date dimensions.",
      "Built KPIs, trend analysis, drill-through, slicers, bookmarks and custom DAX measures; implemented Row-Level Security and tuned report performance.",
      "Published to the Power BI Service through workspaces and apps, with scheduled refreshes and role-based access.",
    ],
  },
  {
    id: "azure",
    name: "Azure Data Engineering & Analytics Platform",
    kicker: "Multi-source ingestion",
    summary:
      "Data pipelines from CGDC, SharePoint, CSV and Excel sources, transformed and validated across Bronze, Silver and Gold layers and served to Power BI.",
    tech: ["Azure Data Factory", "ADLS Gen2", "Azure Databricks", "PySpark", "SQL", "Power BI"],
    flow: [
      { stage: "Sources", detail: "CGDC · SharePoint · CSV · Excel" },
      { stage: "Land", detail: "ADF · ADLS Gen2" },
      { stage: "Transform", detail: "Databricks · PySpark" },
      { stage: "Serve", detail: "Power BI dashboards" },
    ],
    contribution: [
      "Built data pipelines from CGDC, SharePoint, CSV and Excel sources using ADF and ADLS Gen2.",
      "Transformed and validated data with Databricks/PySpark across Bronze, Silver and Gold layers.",
      "Monitored pipelines, resolved data issues, and delivered curated datasets for Power BI dashboards.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["SQL", "Python", "Jinja"] },
  { group: "Data Tools", items: ["dbt (Data Build Tool)", "dbt Cloud", "dbt Mesh"] },
  {
    group: "Platforms",
    items: ["Snowflake", "Azure Databricks", "Microsoft Fabric", "AWS", "Azure Data Factory", "Power BI"],
  },
  { group: "Version Control", items: ["Git", "GitHub"] },
  {
    group: "Concepts",
    items: [
      "ELT",
      "Medallion Architecture",
      "Incremental Modeling",
      "Dimensional Modeling",
      "Star Schema",
      "Data Quality & Testing",
      "CTEs",
      "Window Functions",
      "Data Lineage",
      "CI/CD",
    ],
  },
  {
    group: "Expertise",
    items: [
      "Predictive Modeling",
      "Data Pipeline Development & Automation",
      "Data Quality & Consistency",
      "Cross-functional Collaboration",
    ],
  },
];

// Search terms that find a skill inside a project's text. Skills not listed
// here are searched by their own label.
export const skillAliases: Record<string, string[]> = {
  "dbt (Data Build Tool)": ["dbt"],
  "Medallion Architecture": ["medallion", "Bronze"],
  "Dimensional Modeling": ["star schema", "star-schema"],
  "Star Schema": ["star schema", "star-schema"],
  "Data Quality & Testing": ["data quality", "tests", "validation"],
  Python: ["PySpark"],
  "Predictive Modeling": ["machine learning", "prediction"],
};

export const education = [
  {
    degree: "B.Tech, Computer Science",
    school: "Dr. Babasaheb Ambedkar Technological University",
    start: "2020",
    end: "2024",
  },
  { degree: "HSC, Mathematics", school: "Heritage Junior College", start: "2018", end: "2020" },
];

export const certifications = [
  { name: "AWS Certified Data Engineer", issuer: "" },
  { name: "Fabric Data Engineer", issuer: "" },
  { name: "Data Loading", issuer: "Snowflake" },
  { name: "Databricks SQL", issuer: "Udemy" },
  { name: "Python Programming", issuer: "Infosys" },
  { name: "Data Analysis with Python", issuer: "IBM" },
  { name: "Generative AI for Data Analysis", issuer: "Meta" },
  { name: "Master Power BI", issuer: "iNeuron" },
  { name: "Master n8n", issuer: "Udemy" },
];
