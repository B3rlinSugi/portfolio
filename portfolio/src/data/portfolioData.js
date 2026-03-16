export const data = {
  name: "Berlin Sugiyanto Hutajulu",
  title: "Junior Backend Developer",
  tagline: "I build reliable, scalable backend systems — from REST APIs and relational databases to secure authentication flows.",
  email: "berlinsugiyanto23@gmail.com",
  whatsapp: "6281294500613",
  github: "https://github.com/B3rlinSugi",
  linkedin: "https://linkedin.com/in/berlinsugi",
  location: "Bekasi, West Java, Indonesia",
  about: "Fresh graduate in Informatics Engineering from Gunadarma University (GPA: 3.63/4.00) with hands-on experience shipping production-ready backend systems. I specialise in designing scalable REST APIs, relational databases, and secure authentication flows using PHP and Java. Detail-oriented, fast learner, and eager to contribute to a collaborative engineering team.",

  skills: [
    { category: "Languages", items: [
      { name:"PHP",        level:85, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
      { name:"Java",       level:65, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name:"Python",     level:65, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name:"JavaScript", level:45, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name:"HTML5",      level:80, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name:"CSS3",       level:75, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ]},
    { category: "Frameworks & Libraries", items: [
      { name:"Laravel",     level:70, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name:"CodeIgniter", level:70, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg" },
      { name:"Bootstrap 5", level:75, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name:"Spring Boot", level:40, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name:"Vue.js",      level:40, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    ]},
    { category: "Database", items: [
      { name:"MySQL",      level:75, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name:"PostgreSQL", level:50, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ]},
    { category: "API & Security", items: [
      { name:"REST API", level:70, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name:"bcrypt",   level:65, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name:"RBAC",     level:65, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
    ]},
    { category: "Tools", items: [
      { name:"Git",     level:75, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name:"GitHub",  level:75, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name:"Postman", level:70, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name:"VS Code", level:80, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name:"XAMPP",   level:70, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
      { name:"Linux",   level:50, icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    ]},
  ],

  projects: [
    {
      title: "TokoKu — E-Commerce Platform",
      type: "Personal Project", period: "Jan 2026 – Feb 2026",
      desc: "Full-stack e-commerce backend engineered for transaction reliability — from database design to secure payment flows.",
      points: [
        "Architected a 10-table relational database (InnoDB + FK constraints) covering the full order lifecycle — cart, checkout, payment, stock — with zero transaction failures across all payment methods during testing",
        "Engineered a voucher discount engine and RBAC authentication system with bcrypt hashing and tokenized password reset, achieving zero unauthorized access incidents in QA",
        "Built a real-time admin dashboard with sales analytics and 6-month revenue visualization using Chart.js, backed by aggregated SQL queries",
      ],
      tech: [
        { name:"PHP 8",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name:"MySQL",    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name:"Bootstrap",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name:"Git",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      ],
      github: "https://github.com/B3rlinSugi/tokoku-ecommerce",
    },
    {
      title: "Cash Flow Class — Financial System",
      type: "Academic Project", period: "Jun 2023 – Jul 2023",
      desc: "Legacy financial system modernized with production-grade security, real-time analytics, and auditable PDF reporting.",
      points: [
        "Migrated legacy MD5 password hashing to bcrypt and redesigned the database schema with InnoDB engine and FK constraints — zero breaking changes to existing user data",
        "Built a 6-month cash flow analytics dashboard with deferred payment tracking module featuring automatic status management (pending → settled) using Chart.js",
        "Implemented server-side PDF report export filterable by month and transaction type, enabling clean auditable financial records for organizational use",
      ],
      tech: [
        { name:"PHP 8",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name:"MySQL",      icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name:"Bootstrap",  icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name:"PostgreSQL", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      ],
      github: "https://github.com/B3rlinSugi/cash-flow",
    },
    {
      title: "Sistem Data Akademik — CRUD App",
      type: "Academic Project", period: "Mar 2024 – Jul 2024",
      desc: "Academic data management system with multi-table relational design, role-based access control, and server-side performance optimization.",
      points: [
        "Designed a 3-table relational database with FK constraints and built two-tier RBAC differentiating Admin (full access) and Staff (scoped write) permissions with session validation on every route",
        "Implemented server-side search, filter, and pagination using PDO prepared statements with SQL LIMIT/OFFSET — keeping response times consistent regardless of data volume",
        "Added PDF export and a real-time student statistics dashboard via Chart.js, with data sourced from aggregated SQL queries per class",
      ],
      tech: [
        { name:"PHP 8",   icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name:"MySQL",   icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name:"Bootstrap",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name:"Linux",   icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      ],
      github: "https://github.com/B3rlinSugi/crud-akademik",
    },
  ],

  certifications: [
    { name:"Fundamental Server Operating System",  issuer:"Universitas Gunadarma", year:"2022", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name:"Fundamental Database Management System",issuer:"Universitas Gunadarma", year:"2022", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name:"Oracle Database for Beginners",         issuer:"Universitas Gunadarma", year:"2023", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { name:"Linux System Administration",           issuer:"Universitas Gunadarma", year:"2023", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg" },
    { name:"Basic Web Application Design",          issuer:"Universitas Gunadarma", year:"2024", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name:"Basic Web Application Development",     issuer:"Universitas Gunadarma", year:"2025", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  ],

  organizations: [
    {
      role: "Minister of Social & Political Affairs",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2024 – Aug 2025",
      photo: "/org1.jpg",
      instagram: "https://www.instagram.com/p/DEP-qA8TEB2/?img_index=1&igsh=OTQ2NXEzYW93M2w3",
      desc: "Led two departments managing 15+ members with 100% program completion rate. Oversaw cross-functional coordination across faculty-level initiatives and represented the faculty in external institutional events.",
      highlights: ["15+ Members Led","100% Completion","Faculty Representative"],
    },
    {
      role: "Head of Social Community Department",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Aug 2023 – Sep 2024",
      photo: "/org2.jpg",
      instagram: "https://www.instagram.com/p/C1gEnw6LmQD/?igsh=MWhnMjlhdjA2aWJ3cg==",
      desc: "Directed and coordinated staff in planning and executing community social programs. Improved team efficiency and ensured successful delivery of all scheduled activities.",
      highlights: ["Department Lead","Program Delivery","Team Coordination"],
    },
    {
      role: "Staff of Social Community Department",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2022 – Aug 2023",
      photo: "/org3.jpg",
      instagram: "https://www.instagram.com/p/CoEGtdoydKl/?img_index=2&igsh=MWdudzNlMDNzYWtqOA==",
      desc: "Managed volunteer teams in community service activities across remote areas. Built foundational leadership and coordination skills in a fast-paced organisational environment.",
      highlights: ["Volunteer Management","Community Service","Field Coordination"],
    },
  ],
};
