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
  summary:
    'Electronics & Communication Engineering graduate from VIT Vellore with a passion for systems programming and machine learning. Experienced in building local C++ LLM inference runtimes, embedded RTOS simulators, deep learning active noise cancellation models, and enterprise ITGC security automation.',
  focus: [
    'C++ Systems Programming',
    'Local LLM Inference & GGUF',
    'Embedded RTOS Kernels',
    'Active Noise Cancellation (DSP)',
    'ITGC Audit & Security Automation',
  ],
};

// ONLY 4 COMPLETE, HIGH-IMPACT PROJECTS
export const projects = [
  {
    id: 'jarvis-cpp',
    title: 'Jarvis C++ Inference Engine',
    subtitle: 'Containerized Local LLM Inference Application in C++17',
    category: 'Systems & AI',
    icon: 'ai',
    repo: 'https://github.com/hitesh-bhatnagar/Nano-RAG-CPP',
    live: '',
    year: '2025',
    status: 'Featured',
    tech: ['C++17', 'llama.cpp', 'CMake', 'Docker', 'GGUF', 'Linux'],
    impact:
      'Built a native local LLM inference runtime in C++17 using llama.cpp with deterministic token sampling, sandboxed file I/O, and one-command Docker containerization.',
    highlights: [
      'Engineered tokenization, Top-K and temperature sampling routines, and context window management directly in C++17 using llama.cpp bindings.',
      'Implemented local .txt knowledge injection and restricted file I/O, confining generated output strictly to a Docker-mapped volume.',
      'Containerized the application with CMake and Docker for single-command deployment with mounted quantized GGUF models.',
    ],
    architecture:
      'Native C++17 memory buffer pipeline interfacing directly with llama.cpp GGUF 4-bit quantizations. Zero Python runtime dependency, deterministic token sampling, and sandboxed Docker volume confinement.',
    codeSnippet: `// C++17 Token Sampling & Context Routine
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
    category: 'Embedded & OS',
    icon: 'embedded',
    repo: 'https://github.com/hitesh-bhatnagar/Embedded-RTOS-Simulator-C-Learning-Project',
    live: '',
    year: '2025',
    status: 'Featured',
    tech: ['C', 'Linux', 'Systems Programming', 'UART', 'Semaphores', 'GitHub Actions'],
    impact:
      'Constructed a comprehensive RTOS simulator in portable C featuring priority scheduling, round-robin tie-breaking, sleep handling, and inter-process communication.',
    highlights: [
      'Developed priority-based preemptive scheduling, round-robin tie-breaking, sleep state handling, and task state machine management.',
      'Implemented IPC message queues, binary semaphores, UART circular ring buffers, interrupt simulation, and an interactive CLI shell.',
      'Integrated timer-driven updates, runtime queue diagnostics, CPU-usage statistics, and automated GitHub Actions CI builds.',
    ],
    architecture:
      'Task control block (TCB) state machine with circular FIFO queues, interrupt priority vector table, and interactive CLI diagnostic monitor providing real-time CPU tick utilization telemetry.',
    codeSnippet: `// Preemptive Priority Task Dispatcher
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
    id: 'c-db-engine',
    title: 'Mini Database Engine in C',
    subtitle: 'In-Memory Relational Engine & SQL-Like REPL',
    category: 'Systems Programming',
    icon: 'db',
    repo: 'https://github.com/hitesh-bhatnagar/DataBase_Engine_in_C',
    live: '',
    year: '2024',
    status: 'Featured',
    tech: ['C', 'Data Structures', 'DBMS Internals', 'SQL REPL', 'Binary Search'],
    impact:
      'Developed an in-memory database engine in C with a REPL-based SQL-like interface supporting insert, select, and delete operations.',
    highlights: [
      'Engineered command parsing, fixed-size row storage, execution result handling, and input-length validation.',
      'Organized database internals using structured result codes and a modular command-execution pipeline written in portable standard C.',
      'Implemented binary search lookup for ID-based retrieval and sorted record insertion inspired by SQLite pager architecture.',
    ],
    architecture:
      'Fixed-byte row serialization, table page mapping, lexer/parser tokenizer, and binary search index on primary keys inspired by SQLite and MySQL internal pager architectures.',
    codeSnippet: `// In-Memory Row Serialization & Search
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
  {
    id: 'data-anonymizer',
    title: 'Data Anonymizer & PII Masker',
    subtitle: 'Automated Document Redaction for ITGC Audits',
    category: 'Audit Automation',
    icon: 'audit',
    repo: 'https://github.com/hitesh-bhatnagar/Data-Anonymizer-',
    live: 'https://cloak-wnnv.onrender.com/',
    year: '2026',
    status: 'Featured',
    tech: ['Python', 'OCR', 'NER', 'Regex', 'Flask', 'OpenCV', 'Fernet Encryption'],
    impact:
      'Engineered an internal data anonymization utility for ITGC audit workflows, detecting and redacting sensitive PII across PDF, Excel, Word, and image files before AI ingestion.',
    highlights: [
      'Combines Tesseract OCR, spaCy NER, regex pattern scanning, and computer vision for high-confidence multi-modal PII masking.',
      'Masks sensitive identifiers (PAN, Aadhaar, names, phone numbers) while preserving operational and audit-critical column structures.',
      'Integrated Fernet encryption and immutable audit logging for traceability in confidential client data workflows.',
    ],
    architecture:
      'Multi-stage tokenization and bounding-box coordinate detection over image and tabular data. Strips confidential identifiers while retaining structural integrity required for compliance audits.',
    codeSnippet: `# Multi-Modal PII Redaction Engine
def redact_sensitive_stream(doc_stream, entity_types=['PERSON', 'AADHAAR', 'PAN', 'PHONE']):
    text_data, bounding_boxes = ocr_and_extract_boxes(doc_stream)
    entities = ner_pipeline(text_data)
    regex_matches = pattern_scanner.scan(text_data)
    combined_targets = resolve_spans(entities, regex_matches, entity_types)
    return apply_coordinate_masking(doc_stream, combined_targets, mask_char="█")`,
  },
];

// COMPLETE CAREER PROGRESSION TIMELINE (LINKEDIN & RESUME ALIGNED)
export const timeline = [
  {
    role: 'IT Risk Advisory Associate',
    company: 'Aumyaa Consulting Services LLP',
    period: 'Feb 2026 — Present',
    place: 'Hybrid, India',
    type: 'Full-Time (Promoted from Intern)',
    progression: 'Promoted from Intern to Associate',
    summary:
      'Full-time elevation following successful delivery of ITGC testing frameworks and internal automation tooling. Conducting enterprise Information Systems audits across Fortune 500 and large-scale industrial engagements.',
    highlights: [
      'Conduct IT General Controls (ITGC), Audit Trail, and Information Systems Audits across Access Management, Change Management, and IT Operations for BMW Financial Services, ONGC, and Jamnagar-based engagements.',
      'Perform User Access Review (UAR), Segregation of Duties (SOD), provisioning approval, privileged-access, and SAP transport testing.',
      'Prepare Risk Control Matrices (RCMs), audit testing sheets, Management Letters, and Conclusion Memoranda with evidence mapping and control conclusions.',
      'Architected and deployed an internal Python data anonymization tool using OCR, NER, regex, and computer vision to detect and mask PII across PDF, Word, Excel, and image files.',
    ],
    tags: ['ITGC', 'IS Audit', 'SAP Transports', 'UAR & SOD', 'BMW Financial Services', 'ONGC', 'PII Masking'],
  },
  {
    role: 'Research Intern — Deep Learning & Audio Processing',
    company: 'Indian Institute of Technology Goa',
    period: 'May 2025 — Jul 2025',
    place: 'Goa, India',
    type: 'Academic Research Internship',
    progression: 'First-Author Elsevier Publication Result',
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

// PEER-REVIEWED PUBLICATIONS
export const publications = [
  {
    title: 'Design of Logistic Distance Metric Based Robust Adaptive Filter for Active Noise Control',
    venue: 'Digital Signal Processing, Elsevier Journal',
    year: '2026',
    tag: 'Journal Publication',
    field: 'DSP & Adaptive Filtering',
    status: 'Published',
    citation: 'Hitesh Bhatnagar. Digital Signal Processing, Elsevier, 2026.',
    abstract:
      'Proposes a robust adaptive filtering methodology based on a logistic distance metric for active noise cancellation under non-Gaussian and impulsive acoustic noise environments, proving superior convergence stability and steady-state error attenuation over standard FxLMS.',
  },
  {
    title: 'Graph-Based Zero-Day IoT Botnet Detection',
    venue: 'NEleX 2026 — ANRF-Sponsored, VIT, India',
    year: '2026',
    tag: 'Conference Paper',
    field: 'IoT Security & Graph AI',
    status: 'Accepted / In-Press',
    citation: 'Hitesh Bhatnagar. NEleX 2026 (ANRF-Sponsored), VIT, India, 2026.',
    abstract:
      'Introduces a topological graph neural framework modeling edge IoT device communication graphs to detect zero-day botnet formations prior to payload detonation.',
  },
  {
    title: 'A Novel Three-Layer Hybrid Cryptographic Framework using Enhanced Classical Ciphers',
    venue: 'IEEE — 4th International Conference on Advanced Computing and Communication Systems (ICAAIC)',
    year: '2025',
    tag: 'IEEE Conference',
    field: 'Applied Cryptography',
    status: 'Published',
    citation: 'Hitesh Bhatnagar. IEEE ICAAIC 2025 Conference, India.',
    abstract:
      'Synthesizes an advanced multi-layered encryption protocol uniting enhanced Playfair substitution, dynamic matrix transposition, and pseudorandom key permutations for lightweight embedded systems.',
  },
];

// CLEAN SKILLS MATRIX
export const skillGroups = [
  {
    category: 'Languages',
    skills: ['C', 'C++ (C++17/20)', 'Python', 'Rust', 'Java', 'SQL', 'Bash', 'MATLAB', 'Verilog'],
  },
  {
    category: 'Systems & Developer Tools',
    skills: ['Linux / POSIX APIs', 'Docker', 'CMake', 'Git & GitHub Actions', 'Makefiles', 'GDB', 'llama.cpp', 'AWS Basics'],
  },
  {
    category: 'Deep Learning & DSP',
    skills: ['PyTorch', 'Active Noise Cancellation (ANC)', 'Digital Signal Processing', 'CNNs', 'Adaptive Filtering (FxEHCAF/SFANC)', 'OCR (Tesseract)', 'NER (spaCy)', 'Scikit-learn'],
  },
  {
    category: 'Core CS & IT Audit',
    skills: ['Data Structures & Algorithms', 'Operating Systems Internals', 'DBMS Internals', 'Computer Networks', 'Applied Cryptography', 'ITGC Audits', 'UAR & SOD', 'PII Masking'],
  },
];
