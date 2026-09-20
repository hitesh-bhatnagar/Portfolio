export const profile = {
  name: 'Hitesh Bhatnagar',
  title: 'Systems & AI Engineer | ML Researcher',
  roleHeader: 'Systems & AI Engineer',
  location: 'Delhi NCR, India',
  university: 'Vellore Institute of Technology',
  degree: 'Bachelor of Technology in Electronics and Communication Engineering',
  degreeShort: 'B.Tech ECE',
  gradDate: 'Sep 2022 – April 2026',
  cgpa: '8.42 / 10',
  email: 'hbhatnagar917@gmail.com',
  phone: '+91-9267995320',
  github: 'https://github.com/hitesh-bhatnagar',
  githubReposUrl: 'https://github.com/hitesh-bhatnagar?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/hitesh-bhatnagar-5a3b391ba',
  resume: '/Hitesh_Bhatnagar_Resume.pdf',
  currentRole: 'IT Risk Advisory Associate @ Aumyaa Consulting Services LLP',
  availability: 'Open for Systems Engineering & AI Infrastructure Roles',
  summary:
    'Electronics & Communication Engineering graduate from VIT Vellore (CGPA 8.42) specializing in low-level systems programming, machine learning inference infrastructure, and signal processing. Experienced in building zero-dependency C++17 LLM inference runtimes, embedded RTOS kernels, active noise cancellation deep learning models (Elsevier published), and enterprise ITGC security automation.',
  stats: [
    { label: 'VIT Vellore CGPA', value: '8.42 / 10' },
    { label: 'Current Elevation', value: 'Associate @ Aumyaa' },
    { label: 'Research Papers', value: '3 Published / In-Press' },
    { label: 'GitHub Work', value: '41+ Repositories' },
  ],
  focus: [
    'C++17/20 Systems & Runtimes',
    'Local LLM Inference & GGUF Quantization',
    'Embedded RTOS Kernels & Preemption',
    'Active Noise Cancellation & DSP',
    'Enterprise ITGC Security & PII Redaction',
  ],
};

// ONLY 4 COMPLETE, BATTLE-TESTED, HIGH-IMPACT PROJECTS
export const projects = [
  {
    id: 'jarvis-cpp',
    title: 'Jarvis C++ Inference Engine',
    subtitle: 'Containerized Local LLM Inference Application in C++17',
    category: 'systems',
    categoryLabel: 'Systems & LLMs',
    icon: 'ai',
    repo: 'https://github.com/hitesh-bhatnagar/Nano-RAG-CPP',
    live: '',
    year: '2025',
    status: 'Featured Production',
    featured: true,
    tech: ['C++17', 'llama.cpp', 'CMake', 'Docker', 'GGUF', 'Linux'],
    impact:
      'Engineered a native local LLM inference runtime in C++17 using llama.cpp with deterministic token sampling, sandboxed file I/O, and one-command Docker containerization.',
    metrics: ['Zero Python dependency', 'Quantized GGUF 4-bit support', 'Sandboxed Docker volume I/O'],
    highlights: [
      'Engineered tokenization, Top-K and temperature sampling routines, and context window management directly in C++17 using llama.cpp bindings.',
      'Implemented local .txt knowledge injection and restricted file I/O, confining generated output strictly to a Docker-mapped volume.',
      'Containerized the application with CMake and Docker for single-command deployment with mounted quantized GGUF models.',
    ],
    architecture:
      'Native C++17 memory buffer pipeline interfacing directly with llama.cpp GGUF 4-bit quantizations. Zero Python runtime dependency, deterministic token sampling, and sandboxed Docker volume confinement.',
    codeSnippet: `// C++17 Deterministic Token Sampling & Logit Temperature Routine
llama_token sample_token(llama_context* ctx, float temp, int top_k) {
    const auto* logits = llama_get_logits(ctx);
    const int n_vocab = llama_n_vocab(llama_get_model(ctx));
    std::vector<llama_token_data> candidates;
    candidates.reserve(n_vocab);
    
    for (llama_token id = 0; id < n_vocab; id++) {
        candidates.emplace_back(llama_token_data{id, logits[id], 0.0f});
    }
    
    llama_token_data_array cur_p = {candidates.data(), candidates.size(), false};
    llama_sample_top_k(ctx, &cur_p, top_k, 1);
    llama_sample_temp(ctx, &cur_p, temp);
    return llama_sample_token(ctx, &cur_p);
}`,
  },
  {
    id: 'rtos-simulator',
    title: 'Embedded RTOS Simulator',
    subtitle: 'Real-Time Preemptive Priority Scheduler & IPC in C',
    category: 'embedded',
    categoryLabel: 'Embedded & Kernels',
    icon: 'embedded',
    repo: 'https://github.com/hitesh-bhatnagar/Embedded-RTOS-Simulator-C-Learning-Project',
    live: '',
    year: '2025',
    status: 'Kernel Architecture',
    featured: true,
    tech: ['C', 'Linux', 'Systems Programming', 'UART', 'Semaphores', 'GitHub Actions'],
    impact:
      'Constructed a comprehensive RTOS simulator in portable standard C featuring priority scheduling, round-robin tie-breaking, sleep handling, and inter-process communication.',
    metrics: ['Sub-millisecond task dispatch', 'Circular FIFO message queues', 'CPU tick telemetry CLI'],
    highlights: [
      'Developed priority-based preemptive scheduling, round-robin tie-breaking, sleep state handling, and task state machine management.',
      'Implemented IPC message queues, binary semaphores, UART circular ring buffers, interrupt simulation, and an interactive CLI shell.',
      'Integrated timer-driven updates, runtime queue diagnostics, CPU-usage statistics, and automated GitHub Actions CI builds.',
    ],
    architecture:
      'Task Control Block (TCB) state machine with circular FIFO queues, interrupt priority vector table, and interactive CLI diagnostic monitor providing real-time CPU tick utilization telemetry.',
    codeSnippet: `// Preemptive Priority Task Dispatcher & Context Switcher
void rtos_schedule(void) {
    task_t* highest = NULL;
    for (uint32_t i = 0; i < MAX_TASKS; i++) {
        if (task_table[i].state == TASK_READY) {
            if (!highest || task_table[i].priority < highest->priority) {
                highest = &task_table[i];
            }
        }
    }
    if (highest && highest != current_running_task) {
        context_switch(&current_running_task->sp, &highest->sp);
        current_running_task = highest;
    }
}`,
  },
  {
    id: 'data-anonymizer',
    title: 'Data Anonymizer & PII Masker',
    subtitle: 'Automated Multi-Modal Document Redaction for ITGC Audits',
    category: 'security',
    categoryLabel: 'Enterprise Security',
    icon: 'audit',
    repo: 'https://github.com/hitesh-bhatnagar/Data-Anonymizer-',
    live: 'https://cloak-wnnv.onrender.com/',
    year: '2026',
    status: 'Production Deployed',
    featured: true,
    tech: ['Python', 'OCR', 'NER (spaCy)', 'Regex', 'Flask', 'OpenCV', 'Fernet Encryption'],
    impact:
      'Engineered an internal data anonymization utility for enterprise ITGC audit workflows, detecting and redacting sensitive PII across PDF, Excel, Word, and image files before AI ingestion.',
    metrics: ['Live on Render', 'Multi-format PII masking', 'Fernet-encrypted audit logs'],
    highlights: [
      'Combines Tesseract OCR, spaCy NER, regex pattern scanning, and computer vision for high-confidence multi-modal PII masking.',
      'Masks sensitive identifiers (PAN, Aadhaar, names, phone numbers) while preserving operational and audit-critical column structures.',
      'Integrated Fernet encryption and immutable audit logging for traceability in confidential client data workflows.',
    ],
    architecture:
      'Multi-stage tokenization and bounding-box coordinate detection over image and tabular data. Strips confidential identifiers while retaining structural integrity required for compliance audits.',
    codeSnippet: `# Multi-Modal PII Redaction Pipeline
def redact_sensitive_stream(doc_stream, entity_types=['PERSON', 'AADHAAR', 'PAN', 'PHONE']):
    text_data, bounding_boxes = ocr_and_extract_boxes(doc_stream)
    entities = ner_pipeline(text_data)
    regex_matches = pattern_scanner.scan(text_data)
    combined_targets = resolve_spans(entities, regex_matches, entity_types)
    return apply_coordinate_masking(doc_stream, combined_targets, mask_char="█")`,
  },
  {
    id: 'c-db-engine',
    title: 'Mini Database Engine in C',
    subtitle: 'In-Memory Relational Engine & SQL-Like REPL',
    category: 'systems',
    categoryLabel: 'DBMS Internals',
    icon: 'db',
    repo: 'https://github.com/hitesh-bhatnagar/DataBase_Engine_in_C',
    live: '',
    year: '2024',
    status: 'Systems Architecture',
    featured: true,
    tech: ['C', 'Data Structures', 'DBMS Internals', 'SQL REPL', 'Binary Search'],
    impact:
      'Developed an in-memory database engine in standard C with a REPL-based SQL-like interface supporting insert, select, and delete operations.',
    metrics: ['Fixed-size row serialization', 'Page-mapped storage', 'O(log N) binary search lookup'],
    highlights: [
      'Engineered command parsing, fixed-size row storage, execution result handling, and input-length validation.',
      'Organized database internals using structured result codes and a modular command-execution pipeline written in portable standard C.',
      'Implemented binary search lookup for ID-based retrieval and sorted record insertion inspired by SQLite pager architecture.',
    ],
    architecture:
      'Fixed-byte row serialization, table page mapping, lexer/parser tokenizer, and binary search index on primary keys inspired by SQLite and MySQL internal pager architectures.',
    codeSnippet: `// In-Memory Row Serialization & Fast Index Search
ExecuteResult execute_select(Statement* statement, Table* table) {
    Row row;
    int index = binary_search_key(table, statement->row_to_insert.id);
    if (index >= 0) {
        deserialize_row(row_slot(table, index), &row);
        print_row(&row);
        return EXECUTE_SUCCESS;
    }
    return EXECUTE_RECORD_NOT_FOUND;
}`,
  },
];

export const timeline = [
  {
    role: 'IT Risk Advisory Associate',
    company: 'Aumyaa Consulting Services LLP',
    period: 'Feb 2026 — Present',
    place: 'Hybrid, India',
    type: 'Full-Time Elevation',
    progression: 'Promoted from Intern to Associate',
    badgeColor: 'emerald',
    summary:
      'Full-time elevation following successful delivery of ITGC testing frameworks and internal automation tooling. Conducting enterprise Information Systems audits across Fortune 500 and large-scale industrial engagements.',
    highlights: [
      'Conduct IT General Controls (ITGC), Audit Trail, and Information Systems Audits across Access Management, Change Management, and IT Operations for BMW Financial Services, ONGC, and Jamnagar-based industrial engagements.',
      'Perform User Access Review (UAR), Segregation of Duties (SOD), provisioning approval, privileged-access, and SAP transport testing.',
      'Prepare Risk Control Matrices (RCMs), audit testing sheets, Management Letters, and Conclusion Memoranda with evidence mapping and control conclusions.',
      'Architected and deployed an internal Python data anonymization tool using OCR, NER, regex, and computer vision to detect and mask PII across PDF, Word, Excel, and image files.',
    ],
    tags: ['ITGC', 'IS Audit', 'SAP Transports', 'UAR & SOD', 'BMW Financial Services', 'ONGC', 'PII Masking'],
  },
  {
    role: 'Research Intern — Deep Learning & Audio DSP',
    company: 'Indian Institute of Technology Goa',
    period: 'May 2025 — Jul 2025',
    place: 'Goa, India',
    type: 'Academic Research Internship',
    progression: 'First-Author Elsevier Publication Result',
    badgeColor: 'cyan',
    summary:
      'Selected for intensive deep learning and acoustic signal processing research, focusing on non-linear Active Noise Cancellation models.',
    highlights: [
      'Achieved MSE 2.9e-5, RMSE 0.00537, and SNR 27.10 dB on a hybrid Active Noise Cancellation model combining FxEHCAF and SFANC.',
      'Implemented adaptive learning-rate scheduling, momentum updates, and spectral weight decay in Python and PyTorch to improve convergence stability.',
      'Designed a lightweight CNN for real-time acoustic noise classification and dynamic filter switching; optimized training pipeline for CPU execution.',
      'Resulted in first-author research paper published in Elsevier Digital Signal Processing Journal.',
    ],
    tags: ['Active Noise Cancellation', 'PyTorch', 'DSP', 'FxEHCAF', 'SFANC', 'Lightweight CNN', 'Audio ML'],
  },
  {
    role: 'Bachelor of Technology — Electronics & Communication',
    company: 'Vellore Institute of Technology',
    period: 'Sep 2022 — April 2026',
    place: 'Vellore, Tamil Nadu',
    type: 'Undergraduate Degree',
    progression: 'Graduating April 2026 · CGPA: 8.42 / 10',
    badgeColor: 'violet',
    summary:
      'Rigorous engineering foundation bridging low-level hardware architecture, embedded systems, signal processing, and computer science.',
    highlights: [
      'Consistent academic excellence with CGPA 8.42 / 10.',
      'Core coursework: Data Structures and Algorithms, DBMS, Operating Systems, Computer Networks, Digital Signal Processing, Embedded Systems, Applied Cryptography.',
      'Published research papers in IEEE conferences and ANRF-sponsored symposiums during undergraduate tenure.',
    ],
    tags: ['CGPA: 8.42 / 10', 'Data Structures & Algorithms', 'Operating Systems', 'Embedded C', 'DSP', 'Cryptography'],
  },
];

export const publications = [
  {
    title: 'Design of Logistic Distance Metric Based Robust Adaptive Filter for Active Noise Control',
    venue: 'Digital Signal Processing, Elsevier Journal',
    year: '2026',
    tag: 'Elsevier Journal',
    field: 'DSP & Adaptive Filtering',
    status: 'Published',
    citation: 'Hitesh Bhatnagar. Design of Logistic Distance Metric Based Robust Adaptive Filter for Active Noise Control. Digital Signal Processing, Elsevier, 2026.',
    abstract:
      'Proposes a robust adaptive filtering methodology based on a logistic distance metric for active noise cancellation under non-Gaussian and impulsive acoustic noise environments, proving superior convergence stability and steady-state error attenuation over standard FxLMS.',
    metrics: 'MSE 2.9e-5 · RMSE 0.00537 · SNR 27.10 dB',
  },
  {
    title: 'Graph-Based Zero-Day IoT Botnet Detection',
    venue: 'NEleX 2026 — ANRF-Sponsored, VIT, India',
    year: '2026',
    tag: 'ANRF Conference',
    field: 'IoT Security & Graph AI',
    status: 'Accepted / In-Press',
    citation: 'Hitesh Bhatnagar. Graph-Based Zero-Day IoT Botnet Detection. NEleX 2026 (ANRF-Sponsored), VIT, India, 2026.',
    abstract:
      'Introduces a topological graph neural framework modeling edge IoT device communication graphs to detect zero-day botnet formations prior to payload detonation.',
    metrics: 'Edge Graph Topology · Zero-Day Threat Profiling',
  },
  {
    title: 'A Novel Three-Layer Hybrid Cryptographic Framework using Enhanced Classical Ciphers',
    venue: 'IEEE — 4th International Conference on Advanced Computing and Communication Systems (ICAAIC)',
    year: '2025',
    tag: 'IEEE Conference',
    field: 'Applied Cryptography',
    status: 'Published',
    citation: 'Hitesh Bhatnagar. A Novel Three-Layer Hybrid Cryptographic Framework using Enhanced Classical Ciphers. IEEE ICAAIC 2025 Conference, India.',
    abstract:
      'Synthesizes an advanced multi-layered encryption protocol uniting enhanced Playfair substitution, dynamic matrix transposition, and pseudorandom key permutations for lightweight embedded systems.',
    metrics: 'Three-Layer Hybrid Cipher · Lightweight Embedded Optimization',
  },
];

export const skillGroups = [
  {
    category: 'Languages & Low-Level Systems',
    description: 'High-performance, memory-safe, and bare-metal languages',
    skills: [
      { name: 'C (ANSI / C99 / C11)', level: 'Advanced' },
      { name: 'C++ (C++17 / C++20)', level: 'Advanced' },
      { name: 'Python (NumPy / PyTorch)', level: 'Advanced' },
      { name: 'Rust (Memory Safety)', level: 'Intermediate' },
      { name: 'SQL', level: 'Proficient' },
      { name: 'Bash / Linux Shell', level: 'Proficient' },
      { name: 'Java', level: 'Proficient' },
      { name: 'Verilog HDL', level: 'Academic' },
    ],
  },
  {
    category: 'Systems, Tooling & Infrastructure',
    description: 'Kernel concepts, build pipelines, and containerization',
    skills: [
      { name: 'Linux / POSIX Systems APIs', level: 'Advanced' },
      { name: 'Docker Containerization', level: 'Proficient' },
      { name: 'CMake & Makefiles', level: 'Proficient' },
      { name: 'Git & GitHub Actions CI/CD', level: 'Advanced' },
      { name: 'llama.cpp & GGUF Quantization', level: 'Proficient' },
      { name: 'GDB & Memory Debugging', level: 'Proficient' },
      { name: 'CUDA Parallel Architecture', level: 'Familiar' },
      { name: 'AWS Cloud Fundamentals', level: 'Familiar' },
    ],
  },
  {
    category: 'Deep Learning & DSP Research',
    description: 'Acoustic signal processing, LLMs, and neural architectures',
    skills: [
      { name: 'PyTorch ML Pipeline', level: 'Advanced' },
      { name: 'Active Noise Cancellation (ANC)', level: 'Specialist' },
      { name: 'Digital Signal Processing (DSP)', level: 'Advanced' },
      { name: 'Adaptive Filtering (FxEHCAF/SFANC)', level: 'Specialist' },
      { name: 'Convolutional Neural Networks', level: 'Proficient' },
      { name: 'Computer Vision & OCR (Tesseract)', level: 'Proficient' },
      { name: 'Named Entity Recognition (spaCy)', level: 'Proficient' },
      { name: 'Scikit-learn', level: 'Proficient' },
    ],
  },
  {
    category: 'CS Fundamentals & IT Risk Audit',
    description: 'Computer science internals and enterprise security audits',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'Advanced' },
      { name: 'Operating Systems Internals', level: 'Advanced' },
      { name: 'DBMS Internals & Indexing', level: 'Proficient' },
      { name: 'Applied Cryptography', level: 'Proficient' },
      { name: 'ITGC Audits (Access, Change, Ops)', level: 'Specialist' },
      { name: 'User Access Review (UAR) & SOD', level: 'Specialist' },
      { name: 'SAP Security & Transports', level: 'Proficient' },
      { name: 'Risk Control Matrices (RCMs)', level: 'Advanced' },
    ],
  },
];
