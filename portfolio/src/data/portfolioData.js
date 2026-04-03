export const data = {
  name: "Berlin Sugiyanto Hutajulu",
  title: "Junior Backend Developer",
  email: "berlinsugiyanto23@gmail.com",
  phone: "+62 812-9450-0613",
  location: "Bekasi, West Java, Indonesia",
  github: "https://github.com/B3rlinSugi",
  linkedin: "https://linkedin.com/in/berlinsugi",
  whatsapp: "https://wa.me/6281294500613",
  portfolio: "https://berlinsugi.vercel.app",

  tagline: "Passionate backend developer who loves crafting clean, efficient code. Excited to build APIs that solve real problems and scale beautifully. Always learning, always coding!",

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
        { name: "VS Code",  icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
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
      github: "https://github.com/B3rlinSugi/student-management-api",
      demo: "https://student-api-demo.vercel.app",
      postman: "https://www.postman.com/berlinsugi/workspace/student-management-api",
      desc: "My passion project: a comprehensive Student Management API built with Laravel 11. I absolutely love implementing JWT authentication and role-based access control—it's like building digital fortresses for data! CRUD operations with soft delete, advanced filtering/search—all coded with care for scalability and security. This project ignited my love for backend development.",
      points: [
        { label: "JWT Auth & RBAC", detail: "Implemented stateless authentication with Admin/User roles, bcrypt password hashing, token refresh, and logout blacklisting." },
        { label: "Soft Delete Safety", detail: "Used Laravel SoftDeletes to prevent accidental data loss—users can restore deleted records. Learned importance of careful deletion workflows." },
        { label: "Advanced Filtering", detail: "Single query endpoint handles search (name, email, ID), filtering by major/status/gender, sorting, and pagination. Discovered query optimization early on." },
      ],
      tech: [
        { name: "Laravel 11", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
        { name: "PHP 8.2",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL 8",    icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "JWT",        icon: "https://cdn.simpleicons.org/jsonwebtokens/06B6D4" },
        { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      ],
      apiDocs: "https://www.postman.com/berlinsugi/workspace/student-management-api",
      openApi: "https://petstore3.swagger.io/api/v3/openapi.json",
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
      github: "https://github.com/B3rlinSugi/springboot-student-api",
      demo: null,
      postman: null,
      desc: "Diving into Java backend with Spring Boot 3—such a thrilling experience! JWT auth, JPA/Hibernate for ORM, and clean layered architecture. I geek out over the Service → Repository pattern and testable code design. This project expanded my coding horizons and deepened my appreciation for Java's elegance.",
      points: [
        { label: "Java & Spring Boot", detail: "First Java project using Spring Boot 3 with Spring Security and JWT. Implemented MVC architecture (Controller → Service → Repository)." },
        { label: "ORM & Database", detail: "Used Spring Data JPA and Hibernate for database operations. Learned about entity relationships, lazy/eager loading, and clean data access patterns." },
      ],
      tech: [
        { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
        { name: "Java 17",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name: "MySQL",      icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "JWT",        icon: "https://cdn.simpleicons.org/jsonwebtokens/06B6D4" },
        { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      ],
      apiDocs: null,
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
      github: "https://github.com/B3rlinSugi/tokoku-ecommerce",
      demo: "https://tokoku-ecommerce.vercel.app",
      postman: null,
      desc: "Full-stack e-commerce platform (TokoKu) built with PHP. Learned critical lessons on data consistency (transactions), secure password hashing (bcrypt), payment integration, and real-time reporting. Main takeaway: small design decisions have huge reliability impact.",
      points: [
        { label: "Database Transactions", detail: "Used InnoDB transactions to ensure atomic cart-to-payment-to-inventory updates. No partial failures—either entire order succeeds or rolls back." },
        { label: "Security Basics", detail: "Replaced MD5 with bcrypt for password hashing. Implemented admin/customer roles, validated discounts server-side, and added tokenized password reset." },
        { label: "Real-time Reporting", detail: "Optimized SQL aggregate queries for 6-month sales dashboard. Chart.js visualization helps admin see revenue trends instantly without manual calculations." },
      ],
      tech: [
        { name: "PHP 8",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL",       icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
        { name: "Chart.js",    icon: "https://cdn.simpleicons.org/chartdotjs/FF6384" },
      ],
      apiDocs: null,
      openApi: "https://tokoku-ecommerce.vercel.app/openapi.json",
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
      github: "https://github.com/B3rlinSugi/cash-flow",
      demo: null,
      desc: "A class cash flow management system rebuilt from a legacy codebase — modernised with industry-standard security, real-time analytics, and PDF reporting. The project started as a broken MD5-authenticated system and was refactored into something production-worthy: secure auth, proper database constraints, and an analytics dashboard that gives admins full financial visibility.",
      points: [
        { label: "Secure Password Storage", detail: "Replaced MD5 (broken) with bcrypt hashing. Added Foreign Key constraints and proper indexing. Prevented SQL injection by using prepared statements everywhere." },
        { label: "Financial Analytics", detail: "Built 6-month Chart.js dashboard showing income/expense trends, payment status tracking, and automatic overdue detection. Aggregated queries optimized for performance." },
        { label: "PDF Reporting", detail: "Server-side PDF export with filtering by month and transaction type. Admins can generate auditable financial reports without manual data entry." },
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
      github: "https://github.com/B3rlinSugi/crud-akademik",
      demo: null,
      desc: "An academic data management system built to handle students, courses, and grades for an entire faculty — with multi-table relational database, role-based access control, and a real-time statistical dashboard. The design priority was data integrity and strict access boundaries between Admin and Staff roles.",
      points: [
        { label: "Database Integrity", detail: "Designed 3-table normalised database (students, courses, grades) with Foreign Key constraints. Prevents orphaned records and ensures consistency across related entities." },
        { label: "RBAC Security", detail: "Implemented Admin/Staff roles with server-side access control using PDO prepared statements. Eliminates SQL injection and prevents privilege escalation via URL manipulation." },
        { label: "Data Analytics", detail: "Built self-serve reporting dashboard with class-specific PDF export, student statistics (enrollment, gender distribution, grade spread), and optimized aggregate queries." },
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
      photo: "/org1.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
    {
      role: "Head of Social Community Department",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2023 - Jun 2024",
      desc: "Directed and coordinated staff in planning and executing community social programs. Improved team efficiency through structured delegation, ensuring on-time delivery of all scheduled activities with measurable impact on the campus community.",
      highlights: ["Department Lead", "Program Delivery", "Team Coordination", "Community Outreach"],
      photo: "/org2.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
    {
      role: "Staff of Social Community Department",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2022 - Jun 2023",
      desc: "Contributed as a core staff member in planning and executing social community programs. Actively participated in campus events and cross-departmental initiatives — building the collaboration and communication skills that underpin my approach to engineering teamwork today.",
      highlights: ["Event Planning", "Community Programs", "Cross-dept Work", "Active Contributor"],
      photo: "/org3.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
  ],
};
