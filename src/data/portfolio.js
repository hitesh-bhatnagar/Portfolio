export const profile = {
  name: 'Hitesh Bhatnagar',
  title: 'AI Systems Builder & ECE Engineer',
  location: 'Delhi / VIT Vellore, India',
  email: 'hbhatnagar917@gmail.com',
  phone: '+91-9267995320',
  github: 'https://github.com/hitesh-bhatnagar',
  linkedin: 'https://in.linkedin.com/in/hitesh-bhatnagar-5a3b391ba',
  resume: '/Hitesh_Bhatnagar_Resume.pdf',
  summary:
    'I build local AI engines, low-level systems software, embedded/RTOS simulations, DSP-driven deep learning models, and audit automation tools for confidential enterprise workflows.',
  focus: ['Local AI Systems', 'C/C++ Systems', 'DSP + Deep Learning', 'Embedded RTOS', 'ITGC Automation'],
};

export const metrics = [
  { value: '33', label: 'GitHub repositories', detail: 'Across AI, C/C++, embedded, Java, ML' },
  { value: '8.37', label: 'ECE GPA', detail: 'B.Tech, VIT Vellore' },
  { value: '3', label: 'Publications', detail: 'DSP, cryptography, IoT security' },
  // { value: '27.10 dB', label: 'ANC SNR', detail: 'Hybrid audio noise cancellation pipeline' },
];

export const projects = [
  {
    title: 'Nano-RAG-CPP',
    subtitle: 'High-performance local LLM RAG engine in C++',
    category: 'AI Systems',
    icon: 'ai',
    repo: 'https://github.com/hitesh-bhatnagar/Nano-RAG-CPP',
    live: '',
    year: '2026',
    status: 'Featured',
    tech: ['C++', 'Llama.cpp', 'Docker', 'Linux', 'RAG'],
    impact: 'Local inference + document retrieval without Python runtime overhead.',
    highlights: [
      'Built a custom C++ inference engine around llama.cpp for local LLM execution.',
      'Integrated GGUF quantized models, Top-K sampling, temperature control, and context management.',
      'Added local document retrieval and prompt augmentation through a data-folder ingestion pipeline.',
    ],
  },
  {
    title: 'ITGC PII Shield',
    subtitle: 'Confidential audit data masking and encrypted file handling',
    category: 'Audit Automation',
    icon: 'audit',
    repo: 'https://github.com/hitesh-bhatnagar/PII-masker-tool',
    live: 'https://cloak-wnnv.onrender.com/',
    year: '2026',
    status: 'Featured',
    tech: ['Python', 'Flask', 'Fernet', 'Excel', 'HTML/CSS'],
    impact: 'Privacy-first tooling for ITGC audit workflows before data reaches AI systems.',
    highlights: [
      'Masks high-confidence PII while preserving operational and audit-relevant columns.',
      'Supports encrypted workbook handling with browser-based upload and decrypt flow.',
      'Includes audit logs to support traceability in confidential client-data workflows.',
    ],
  },
  {
    title: 'ARIA',
    subtitle: 'Adaptive Retrieval Intelligence Architecture',
    category: 'AI Systems',
    icon: 'ai',
    repo: 'https://github.com/hitesh-bhatnagar/ARIA',
    live: '',
    year: '2026',
    status: 'Research Build',
    tech: ['Python', 'RAG', 'Multi-Agent Systems', 'ChromaDB', 'Docker'],
    impact: 'A fully local, self-improving AI architecture focused on hallucination checking.',
    highlights: [
      'Designed as a local-first multi-agent AI system that keeps data on consumer hardware.',
      'Roadmapped around retrieval, agent verification, hallucination detection, and fine-tuning.',
      'Connects with the broader theme of private AI for enterprise and audit use cases.',
    ],
  },
  {
    title: 'Embedded RTOS Simulator',
    subtitle: 'Task scheduling, interrupts, IPC, and shell control in C',
    category: 'Embedded / RTOS',
    icon: 'embedded',
    repo: 'https://github.com/hitesh-bhatnagar/Embedded-RTOS-Simulator-C-Learning-Project',
    live: '',
    year: '2025',
    status: 'Featured',
    tech: ['C', 'Makefile', 'Scheduler', 'IPC', 'Semaphores'],
    impact: 'A systems project that demonstrates OS-level thinking for embedded roles.',
    highlights: [
      'Implemented task states, scheduling logic, simulated interrupts, message queues, and semaphores.',
      'Added CLI-style runtime controls and debugging outputs for explainable RTOS behavior.',
      'Designed for resume/GitHub showcase and embedded systems interview storytelling.',
    ],
  },
  {
    title: 'Mini Database Engine in C',
    subtitle: 'SQLite-inspired in-memory database internals',
    category: 'Systems Programming',
    icon: 'db',
    repo: 'https://github.com/hitesh-bhatnagar/DataBase_Engine_in_C',
    live: '',
    year: '2026',
    status: 'Featured',
    tech: ['C', 'DBMS Internals', 'REPL', 'Parsing', 'Data Structures'],
    impact: 'Demonstrates command parsing, memory layout, execution pipelines, and low-level DB design.',
    highlights: [
      'Built an SQL-like REPL supporting insert, select, update, delete, and ID-based lookup.',
      'Implemented fixed-size row storage, safe parsing, structured execution results, and binary-search logic.',
      'Shows fundamentals of how databases work internally instead of only using databases.',
    ],
  },
  {
    title: 'Hybrid ANC Research Pipeline',
    subtitle: 'Deep learning + adaptive filtering for active noise control',
    category: 'DSP / ML',
    icon: 'ml',
    repo: 'https://github.com/hitesh-bhatnagar',
    live: '',
    year: '2025',
    status: 'Research',
    tech: ['Python', 'PyTorch', 'DSP', 'Adaptive Filtering', 'CNN'],
    impact: 'MSE 2.9e-5, RMSE 0.00537, SNR 27.10 dB in reported ANC experiments.',
    highlights: [
      'Enhanced FxEHCAF with SFANC-inspired adaptive nonlinear filtering for changing noise environments.',
      'Used spectral weight decay, momentum updates, and adaptive learning-rate scheduling for stability.',
      'Designed a lightweight CNN for noise-type classification and dynamic filter switching.',
    ],
  },
  {
    title: 'Telco Churn ML App',
    subtitle: 'Explainable churn prediction with full-stack ML workflow',
    category: 'Applied ML',
    icon: 'ml',
    repo: 'https://github.com/hitesh-bhatnagar/Telco-Customer-Churn-Predictor-Full-Stack-ML-App-',
    live: '',
    year: '2025',
    status: 'ML Product',
    tech: ['Python', 'Scikit-learn', 'LightGBM', 'FastAPI', 'Streamlit', 'SHAP'],
    impact: 'End-to-end ML workflow with explainability and deployment-style interfaces.',
    highlights: [
      'Built baseline and tuned churn models using classical ML and gradient boosting.',
      'Integrated SHAP-style explainability for business interpretation.',
      'Designed an app layer to present predictions in a product-like interface.',
    ],
  },
  {
    title: 'Learn Rust Programming',
    subtitle: 'Beginner-to-systems Rust learning repository',
    category: 'Backend / Rust',
    icon: 'systems',
    repo: 'https://github.com/hitesh-bhatnagar/Learn-Rust-Programming',
    live: '',
    year: '2026',
    status: 'Learning Lab',
    tech: ['Rust', 'Systems Programming', 'CLI', 'Ownership', 'Traits'],
    impact: 'Documents Rust learning toward backend, CLI, WebSocket, and systems roles.',
    highlights: [
      'Covers Rust basics and systems concepts using code-first examples.',
      'Supports future roadmap toward Rust APIs, async services, and local-AI integrations.',
      'Useful as a public learning-in-progress signal for recruiters.',
    ],
  },
];

export const experiences = [
  {
    role: 'IT Risk Advisory Intern',
    company: 'Aumyaa Consulting Services LLP',
    period: 'Feb 2026 — Present',
    place: 'Hybrid / India',
    tags: ['ITGC', 'Audit Automation', 'PII Masking', 'RCM', 'Access Review'],
    lines: [
      'Executed ITGC audits across access, change management, and IT operations for enterprise clients including ONGC and BMW Financial Services.',
      'Performed UAR, SoD, approval, job-log, and change-request testing with evidence mapping and control documentation.',
      'Built Python utilities for PII masking, audit-trail review, and anomaly flagging to reduce repetitive validation work.',
    ],
  },
  {
    role: 'Research Intern — Deep Learning & Audio Processing',
    company: 'Indian Institute of Technology Goa',
    period: 'May 2025 — Jul 2025',
    place: 'Goa, India',
    tags: ['DSP', 'PyTorch', 'ANC', 'Adaptive Filters', 'Audio ML'],
    lines: [
      'Pioneered a hybrid active-noise-cancellation model by enhancing FxEHCAF with adaptive nonlinear filtering and SFANC concepts.',
      'Improved convergence stability using adaptive learning-rate scheduling, momentum updates, and spectral weight decay.',
      'Built a lightweight CNN for noise-type classification and real-time filter switching.',
    ],
  },
];

export const publications = [
  {
    title: 'Design of Logistic Distance Metric Based Robust Adaptive Filter for Active Noise Control',
    venue: 'Digital Signal Processing, Elsevier Journal',
    year: '2026',
    tag: 'DSP / ANC',
  },
  {
    title: 'A Novel Three-Layer Hybrid Cryptographic Framework using Enhanced Classical Ciphers',
    venue: 'ICAAIC 2025, IEEE Conference, India',
    year: '2025',
    tag: 'Cryptography',
  },
  {
    title: 'Graph-Based Zero-Day IoT Botnet Detection',
    venue: 'Provisionally accepted, NEleX 2026, VIT India',
    year: '2026',
    tag: 'IoT Security',
  },
];

export const skillGroups = [
  {
    title: 'Systems & Low-Level',
    icon: 'systems',
    skills: ['C', 'C++', 'Embedded C', 'RTOS Concepts', 'Linux APIs', 'Makefiles', 'Docker'],
  },
  {
    title: 'AI / ML / DSP',
    icon: 'ml',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'DSP', 'Adaptive Filtering'],
  },
  {
    title: 'Backend & Tools',
    icon: 'code',
    skills: ['Python', 'Java', 'Rust', 'SQL', 'Bash', 'Git', 'VS Code', 'FastAPI'],
  },
  {
    title: 'ECE & Security',
    icon: 'security',
    skills: ['Verilog', 'MATLAB', 'Vivado', 'ModelSim', 'Cryptography', 'Network Security', '8051'],
  },
];

export const roleTargets = [
  'AI / ML Engineer Intern',
  'Systems / C++ Engineer',
  'Embedded Software Intern',
  'Rust Backend Trainee',
  'ITGC Automation / AI Audit Solutions',
];
