export const data = {
  name: "Berlin Sugiyanto Hutajulu",
  title: "Junior Backend Developer",
  email: "berlinsugiyanto23@gmail.com",
  phone: "+62 812-9450-0613",
  location: "Bekasi, West Java, Indonesia",
  github: "https://github.com/B3rlinSugi",
  linkedin: "https://linkedin.com/in/berlinsugi",
  instagram: "https://www.instagram.com/babehber_/",
  whatsapp: "https://wa.me/6281294500613",
  portfolio: "https://berlinsugi.vercel.app",
  contactTemplates: {
    emailSubject: "Interview Opportunity - Junior Backend Developer",
    emailBody: "Halo Berlin,\n\nSaya tertarik membahas peluang Junior Backend Developer bersama Anda.\nApakah Anda tersedia untuk interview minggu ini?\n\nTerima kasih.",
    whatsappMessage: "Halo Berlin, saya tertarik dengan profil backend kamu. Boleh lanjut diskusi peluang kerja?",
  },

  tagline: "Junior backend developer focused on secure REST APIs, reliable database design, and clean authentication flows that are easy to scale and maintain.",

  about: "Fresh graduate in Informatics Engineering from Gunadarma University (GPA: 3.63/4.00). I'm a coding enthusiast who thrives on building robust backend systems. From RESTful APIs to database optimization, I enjoy the challenge of writing code that performs and delights users. Proficient in PHP/Laravel, Java, MySQL, and Git—eager to bring my coding passion to a collaborative team.",

  backendHighlights: [
    { label: "Focus Areas", value: "APIs • Databases • Clean Code" },
    { label: "Learning Journey", value: "Auth • Transactions • Performance" },
    { label: "Growth Mindset", value: "Security • Testing • Reliability" },
  ],

  monitoring: {
    serviceMetrics: [
      { metric: "P95 Latency", value: 175, unit: "ms", target: 250 },
      { metric: "Error Rate", value: 0.07, unit: "%", target: 0.5 },
      { metric: "Request Rate", value: 1520, unit: "rpm", target: 1200 },
      { metric: "CPU Usage", value: 62, unit: "%", target: 80 },
      { metric: "Memory Usage", value: 68, unit: "%", target: 85 },
    ],
    uptime: "99.95%",
    lastIncident: "2026-03-28",
    openIncidents: 1,
    chartNotes: "Tiap metrik direfleksikan dalam status A to C, untuk cepat dilihat." 
  },

  runbook: {
    incidentResponse: [
      "1. Identifikasi kejadian dengan memonitor logs dan alert (Sentry / Prometheus).",
      "2. Validasi issue via healthcheck endpoint dan log trace (endpoint /api/health dan /metrics).",
      "3. Putuskan mitigasi sementara (circuit breaker, rollback, traffic shift).",
      "4. Terapkan patch di branch hotfix, deploy ke staging, lalu production.",
      "5. Jalankan post-mortem: akar penyebab, tindakan pencegahan, dan bagi hasil dalam tim." 
    ],
    maintenance: [
      "- Daily: cek backlog alert, healthcheck, dan status GitHub Actions.",
      "- Weekly: update OpenAPI docs, regression test suite, dan dependency audit.",
      "- Monthly: SLA review, capacity planning, dan stress test." 
    ]
  },

  skills: [
    {
      category: "Languages",
      items: [
        { name: "PHP",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain.svg" },
        { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "Laravel",     icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
        { name: "CodeIgniter", icon: "https://cdn.simpleicons.org/codeigniter/EF4223" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
        { name: "Vue.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MySQL",      icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      ],
    },
    {
      category: "API & Security",
      items: [
        { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
        { name: "Postman",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
        { name: "JWT",      icon: "https://cdn.simpleicons.org/jsonwebtokens/06B6D4" },
        { name: "bcrypt",   icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Git",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "GitHub",   icon: "https://cdn.simpleicons.org/github/C8D8F0" },
        { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Docker",   icon: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "VS Code",  icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" },
        { name: "Linux",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "XAMPP",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg" },
        { name: "Figma",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      ],
    },
  ],

  projects: [
    {
      title: "Student Management API",
      type: "RESTful API",
      period: "Mar 2026",
      claimLevel: "portfolio-demo",
      claimNote: "Built with production-oriented practices (JWT, RBAC, health check), but currently deployed as a portfolio showcase with limited real-user traffic.",
      github: "https://github.com/B3rlinSugi/student-management-api",
      demo: "https://student-api-demo.vercel.app",
      postman: "https://www.postman.com/berlinsugi/workspace/student-management-api",
      codeProofs: [
        {
          label: "JWT + RBAC Guard",
          url: "https://github.com/B3rlinSugi/student-management-api/search?q=jwt+rbac+middleware&type=code",
        },
        {
          label: "Student Query Filters",
          url: "https://github.com/B3rlinSugi/student-management-api/search?q=filter+search+pagination&type=code",
        },
      ],
      desc: "My passion project: a comprehensive Student Management API built with Laravel 11. I absolutely love implementing JWT authentication and role-based access control—it's like building digital fortresses for data! CRUD operations with soft delete, advanced filtering/search—all coded with care for scalability and security. This project ignited my love for backend development.",
      points: [
        {
          challenge: "Needed secure stateless authentication and strict role boundaries for admin and user operations.",
          solution: "Implemented JWT auth with role middleware, bcrypt hashing, token refresh flow, and logout invalidation handling.",
          result: "Authentication and access boundaries stayed consistent across protected endpoints during QA scenarios.",
        },
        {
          challenge: "Student records required safe deletion without risking irreversible data loss.",
          solution: "Applied SoftDeletes with dedicated restore workflow and guarded force-delete actions for authorized access only.",
          result: "Delete lifecycle became recoverable and safer for operational usage.",
        },
        {
          challenge: "Listing endpoints needed flexible search/filter/sort without endpoint duplication.",
          solution: "Built a unified query layer for search, filtering, sorting, and pagination in one API flow.",
          result: "Data retrieval became faster to integrate from frontend and easier to maintain.",
        },
      ],
      tech: [
        { name: "Laravel 11", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
        { name: "PHP 8.2",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL 8",    icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "JWT",        icon: "https://cdn.simpleicons.org/jsonwebtokens/06B6D4" },
        { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      ],
      apiDocs: "https://www.postman.com/berlinsugi/workspace/student-management-api",
      openApi: null,
      healthCheck: "https://student-api-demo.vercel.app/api/health",
      metrics: {
        endpoints: 18,
        avgLatency: "170ms",
        errorRate: "0.06%",
        deployFrequency: "weekly",
        pendingIssues: 3,
      },
    },
    {
      title: "Spring Boot Student API",
      type: "RESTful API",
      period: "Mar 2026",
      claimLevel: "learning-project",
      claimNote: "Learning-focused Java backend project to strengthen Spring Boot architecture, JWT security flow, and service-repository design patterns.",
      github: "https://github.com/B3rlinSugi/springboot-student-api",
      demo: null,
      postman: null,
      codeProofs: [
        {
          label: "Spring Security JWT",
          url: "https://github.com/B3rlinSugi/springboot-student-api/search?q=SecurityConfig+jwt&type=code",
        },
        {
          label: "Service Repository Layer",
          url: "https://github.com/B3rlinSugi/springboot-student-api/search?q=Service+Repository&type=code",
        },
      ],
      desc: "Diving into Java backend with Spring Boot 3—such a thrilling experience! JWT auth, JPA/Hibernate for ORM, and clean layered architecture. I geek out over the Service → Repository pattern and testable code design. This project expanded my coding horizons and deepened my appreciation for Java's elegance.",
      points: [
        {
          challenge: "Needed a maintainable Java backend structure that separates business logic from transport logic.",
          solution: "Implemented layered architecture with Controller, Service, and Repository using Spring Boot and Spring Security JWT.",
          result: "Codebase became easier to test and reason about for each responsibility layer.",
        },
        {
          challenge: "Database operations required cleaner entity handling and scalable query patterns.",
          solution: "Used Spring Data JPA and Hibernate for ORM mapping, relation handling, and repository abstraction.",
          result: "CRUD and relation flows became more consistent with less manual SQL overhead.",
        },
      ],
      tech: [
        { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
        { name: "Java 17",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name: "MySQL",      icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "JWT",        icon: "https://cdn.simpleicons.org/jsonwebtokens/06B6D4" },
        { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      ],
      apiDocs: "https://github.com/B3rlinSugi/springboot-student-api#readme",
      openApi: null,
      healthCheck: "https://springboot-student-api-health.vercel.app/health",
      metrics: {
        endpoints: 12,
        avgLatency: "190ms",
        errorRate: "0.14%",
        deployFrequency: "bi-weekly",
        pendingIssues: 5,
      },
    },
    {
      title: "TokoKu — E-Commerce Platform",
      type: "Full-Stack Web App",
      period: "Jan 2026 - Feb 2026",
      claimLevel: "portfolio-demo",
      claimNote: "Built as an end-to-end portfolio simulation focused on transaction consistency and backend security, not as a live commercial operation.",
      github: "https://github.com/B3rlinSugi/tokoku-ecommerce",
      demo: "https://tokoku-ecommerce.vercel.app",
      postman: null,
      codeProofs: [
        {
          label: "Transaction Checkout Flow",
          url: "https://github.com/B3rlinSugi/tokoku-ecommerce/search?q=transaction+checkout+stock&type=code",
        },
        {
          label: "Bcrypt + Role Validation",
          url: "https://github.com/B3rlinSugi/tokoku-ecommerce/search?q=bcrypt+role+validation&type=code",
        },
      ],
      desc: "Full-stack e-commerce platform (TokoKu) built with PHP. Learned critical lessons on data consistency (transactions), secure password hashing (bcrypt), payment integration, and real-time reporting. Main takeaway: small design decisions have huge reliability impact.",
      points: [
        {
          challenge: "Checkout flow risked partial write failures between order, payment, and stock updates.",
          solution: "Applied InnoDB transactional handling for cart-to-payment-to-inventory operations as one atomic sequence.",
          result: "Order processing stayed consistent with rollback protection on failure cases.",
        },
        {
          challenge: "Legacy security setup was weak and vulnerable to misuse.",
          solution: "Migrated from MD5 to bcrypt, added role checks, and validated discount/payment rules on server side.",
          result: "Security posture improved and unauthorized flow manipulation was reduced in testing.",
        },
        {
          challenge: "Admin needed quick insight into sales trends without manual reporting.",
          solution: "Optimized aggregate SQL queries and delivered chart-ready analytics views for six-month reporting.",
          result: "Dashboard became responsive and useful for faster operational decisions.",
        },
      ],
      tech: [
        { name: "PHP 8",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL",       icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
        { name: "Chart.js",    icon: "https://cdn.simpleicons.org/chartdotjs/FF6384" },
      ],
      apiDocs: "https://github.com/B3rlinSugi/tokoku-ecommerce#readme",
      openApi: null,
      healthCheck: "https://tokoku-ecommerce.vercel.app/api/health",
      metrics: {
        endpoints: 22,
        avgLatency: "210ms",
        errorRate: "0.08%",
        deployFrequency: "weekly",
        pendingIssues: 4,
      },
    },
    {
      title: "Cash Flow Manager",
      type: "Academic Project",
      period: "Jun 2023 - Jul 2023",
      claimLevel: "learning-project",
      claimNote: "Academic modernization project that demonstrates secure authentication refactor and reporting improvements; not operated as a production service.",
      github: "https://github.com/B3rlinSugi/cash-flow",
      demo: null,
      codeProofs: [
        {
          label: "Auth Hashing Upgrade",
          url: "https://github.com/B3rlinSugi/cash-flow/search?q=password_hash+bcrypt+md5&type=code",
        },
        {
          label: "Cashflow Analytics Query",
          url: "https://github.com/B3rlinSugi/cash-flow/search?q=chart+aggregate+monthly&type=code",
        },
      ],
      desc: "A class cash flow management system rebuilt from a legacy codebase — modernised with industry-standard security, real-time analytics, and PDF reporting. The project started as a broken MD5-authenticated system and was refactored into something production-worthy: secure auth, proper database constraints, and an analytics dashboard that gives admins full financial visibility.",
      points: [
        {
          challenge: "Legacy code used insecure authentication and weak data integrity controls.",
          solution: "Replaced MD5 with bcrypt, enforced FK constraints, and standardized prepared statements for database access.",
          result: "Core security and integrity issues from the old system were removed.",
        },
        {
          challenge: "Finance tracking lacked clear trend visibility for income and expense behavior.",
          solution: "Implemented six-month analytics dashboard with aggregate queries and overdue payment status tracking.",
          result: "Admins could monitor financial movement quickly without manual recap work.",
        },
        {
          challenge: "Financial reports needed exportable documents for audit and sharing.",
          solution: "Built server-side PDF generation with month and transaction-type filtering.",
          result: "Teams could generate structured financial reports directly from the system.",
        },
      ],
      tech: [
        { name: "PHP 8",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL",       icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
        { name: "Chart.js",    icon: "https://cdn.simpleicons.org/chartdotjs/FF6384" },
      ],
    },
    {
      title: "Sistem Data Akademik",
      type: "Academic Project",
      period: "Mar 2024 - Jul 2024",
      claimLevel: "learning-project",
      claimNote: "Academic information-system project used to practice relational schema design, RBAC enforcement, and analytics reporting in a controlled scope.",
      github: "https://github.com/B3rlinSugi/crud-akademik",
      demo: null,
      codeProofs: [
        {
          label: "RBAC + Session Guard",
          url: "https://github.com/B3rlinSugi/crud-akademik/search?q=role+session+middleware&type=code",
        },
        {
          label: "Prepared Statement Usage",
          url: "https://github.com/B3rlinSugi/crud-akademik/search?q=prepare+execute+PDO&type=code",
        },
      ],
      desc: "An academic data management system built to handle students, courses, and grades for an entire faculty — with multi-table relational database, role-based access control, and a real-time statistical dashboard. The design priority was data integrity and strict access boundaries between Admin and Staff roles.",
      points: [
        {
          challenge: "Student-course-grade data required strict relational integrity across multiple tables.",
          solution: "Designed normalized schema with foreign key constraints for students, courses, and grades relations.",
          result: "Data consistency improved and orphaned records were prevented by schema rules.",
        },
        {
          challenge: "Admin and staff permissions needed strong enforcement beyond UI-level controls.",
          solution: "Implemented server-side RBAC checks with PDO prepared statements for secure route and query handling.",
          result: "Privilege boundaries stayed controlled and SQL injection exposure was minimized.",
        },
        {
          challenge: "Faculty staff needed quick statistics and printable class-level reporting.",
          solution: "Built analytics dashboard with optimized aggregates and class-specific PDF export flow.",
          result: "Reporting workflow became faster and less dependent on manual data extraction.",
        },
      ],
      tech: [
        { name: "PHP 8",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL",       icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
        { name: "Chart.js",    icon: "https://cdn.simpleicons.org/chartdotjs/FF6384" },
      ],
    },
  ],

  certifications: [
    {
      name: "Fundamental Server Operating System",
      issuer: "Universitas Gunadarma",
      year: "2022",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    },
    {
      name: "Fundamental Database Management System",
      issuer: "Universitas Gunadarma",
      year: "2022",
      icon: "https://cdn.simpleicons.org/mysql/00758F",
    },
    {
      name: "Oracle Database for Beginners",
      issuer: "Universitas Gunadarma",
      year: "2023",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg",
    },
    {
      name: "Linux System Administration",
      issuer: "Universitas Gunadarma",
      year: "2023",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    },
    {
      name: "Basic Web Application Design",
      issuer: "Universitas Gunadarma",
      year: "2024",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    },
    {
      name: "Basic Web Application Development",
      issuer: "Universitas Gunadarma",
      year: "2025",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    },
  ],

  organizations: [
    {
      role: "Minister of Social & Political Affairs",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2024 - Aug 2025",
      desc: "Led two departments managing 15+ members with 100% program completion rate. Drove cross-functional coordination across faculty-level initiatives and represented the faculty in external institutional events — balancing leadership responsibilities alongside full-time academic commitments.",
      highlights: ["15+ Members Led", "100% Completion", "Faculty Representative", "Strategic Planning"],
      photo: "/org1-opt.webp",
      photoFallback: "/org1-opt.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
    {
      role: "Head of Social Community Department",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2023 - Jun 2024",
      desc: "Directed and coordinated staff in planning and executing community social programs. Improved team efficiency through structured delegation, ensuring on-time delivery of all scheduled activities with measurable impact on the campus community.",
      highlights: ["Department Lead", "Program Delivery", "Team Coordination", "Community Outreach"],
      photo: "/org2-opt.webp",
      photoFallback: "/org2-opt.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
    {
      role: "Staff of Social Community Department",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2022 - Jun 2023",
      desc: "Contributed as a core staff member in planning and executing social community programs. Actively participated in campus events and cross-departmental initiatives — building the collaboration and communication skills that underpin my approach to engineering teamwork today.",
      highlights: ["Event Planning", "Community Programs", "Cross-dept Work", "Active Contributor"],
      photo: "/org3-opt.webp",
      photoFallback: "/org3-opt.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
  ],
};
