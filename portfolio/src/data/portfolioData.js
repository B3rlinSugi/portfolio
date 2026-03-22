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

  tagline: "I engineer backend systems that hold up under pressure — clean APIs, solid databases, and auth flows that don't break at 3 AM.",

  about: "Fresh graduate in Informatics Engineering from Gunadarma University (GPA: 3.63/4.00) who ships production-ready backend systems, not just assignments. I specialise in designing scalable REST APIs, relational databases, and secure authentication flows using PHP and Java — with zero unauthorized access incidents across all QA cycles. Fast learner, detail-oriented, and ready to contribute from day one.",

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
        { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
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
        { name: "Git",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "GitHub",  icon: "https://cdn.simpleicons.org/github/C8D8F0" },
        { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
        { name: "Linux",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "XAMPP",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg" },
        { name: "Figma",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      ],
    },
  ],

  projects: [
    {
      title: "Student Management API",
      type: "Personal Project",
      period: "Mar 2026",
      github: "https://github.com/B3rlinSugi/student-management-api",
      demo: null,
      desc: "A production-ready RESTful API built with Laravel 11 — featuring JWT Authentication, Role-Based Access Control, full CRUD with Soft Delete, Search, Filter & Pagination. Built to demonstrate enterprise-grade backend patterns in a clean, documented codebase.",
      points: [
        "Engineered a dual-role JWT authentication system (Admin vs User) with login, register, token refresh, and logout — achieving zero unauthorized access incidents across all test scenarios.",
        "Built full CRUD for Students & Majors with Soft Delete (trash/restore/force delete), Laravel Form Request validation, and clean JSON responses via API Resources — following RESTful best practices throughout.",
        "Implemented advanced query features: multi-column search (name, NIM, email), filter by status/major/gender, configurable pagination up to 50 per page, and dynamic sorting by any column — all in a single performant query layer.",
      ],
      tech: [
        { name: "Laravel 11", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
        { name: "PHP 8.2",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL 8",    icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "JWT",        icon: "https://cdn.simpleicons.org/jsonwebtokens/06B6D4" },
      ],
    },
    {
      title: "TokoKu — E-Commerce Platform",
      type: "Personal Project",
      period: "Jan 2026 - Feb 2026",
      github: "https://github.com/B3rlinSugi/tokoku-ecommerce",
      demo: null,
      desc: "Full-stack e-commerce backend engineered for transaction reliability — from a 10-table relational database to secure payment flows and a real-time admin dashboard. Every edge case from cart to checkout was handled and tested.",
      points: [
        "Architected a 10-table relational database (InnoDB + FK constraints) covering the full order lifecycle — cart, checkout, payment, stock deduction — with zero transaction failures across all payment methods during QA.",
        "Engineered a voucher discount engine and RBAC authentication system with bcrypt hashing and tokenized password reset, achieving zero unauthorized access incidents across all security test cases.",
        "Built a real-time admin dashboard with sales analytics and 6-month revenue visualization using Chart.js, backed by optimised aggregate SQL queries with sub-100ms response time.",
      ],
      tech: [
        { name: "PHP 8",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL",       icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
        { name: "Chart.js",    icon: "https://cdn.simpleicons.org/chartdotjs/FF6384" },
      ],
    },
    {
      title: "Cash Flow Manager",
      type: "Academic Project",
      period: "Jun 2023 - Jul 2023",
      github: "https://github.com/B3rlinSugi/cash-flow",
      demo: null,
      desc: "A class cash flow management system rebuilt from a legacy codebase — modernised with industry-standard security, real-time analytics, and PDF reporting. Turned a broken MD5-authenticated system into something production-worthy.",
      points: [
        "Migrated legacy MD5 authentication to bcrypt and redesigned the database schema with InnoDB, Foreign Key constraints, and proper indexing — eliminating all known security vulnerabilities from the original codebase.",
        "Built a real-time 6-month cash flow analytics dashboard using Chart.js and a deferred payment tracking module with automatic status transitions — giving admins full financial visibility at a glance.",
        "Implemented month-filtered PDF report export using server-side generation, enabling auditable and shareable financial records for organisational use.",
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
      desc: "An academic data management system with multi-table relational database, role-based access control, and real-time statistical dashboard — built to manage students, courses, and grades for an entire faculty.",
      points: [
        "Architected a normalised 3-table relational database (students, courses, grades) with Foreign Key constraints, ensuring referential integrity across all CRUD operations.",
        "Implemented RBAC for Admin and Staff roles using PDO prepared statements throughout — eliminating SQL injection vulnerabilities and enforcing strict data access boundaries by role.",
        "Built search, filter, and pagination across all data views with PDF export per class and a Chart.js dashboard displaying real-time student statistics — reducing manual reporting effort significantly.",
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
