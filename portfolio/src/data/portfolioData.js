export const data = {
  // ── Personal Info ──
  name: "Berlin Sugiyanto Hutajulu",
  title: "Junior Backend Developer",
  email: "berlinsugiyanto23@gmail.com",
  phone: "+62 812-9450-0613",
  location: "Bekasi, West Java, Indonesia",
  github: "https://github.com/B3rlinSugi",
  linkedin: "https://linkedin.com/in/berlinsugi",
  whatsapp: "https://wa.me/6281294500613",
  portfolio: "https://berlinsugi.vercel.app",

  tagline:
    "I build reliable, scalable backend systems — from REST APIs and relational databases to secure authentication flows.",

  // ── About (string, bukan object) ──
  about:
    "Fresh graduate in Informatics Engineering from Gunadarma University (GPA: 3.63/4.00) with hands-on experience shipping production-ready backend systems. I specialise in designing scalable REST APIs, relational databases, and secure authentication flows using PHP and Java. Detail-oriented, fast learner, and eager to contribute to a collaborative engineering team.",

  // ── Skills ──
  skills: [
    {
      category: "Languages",
      items: [
        { name: "PHP",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain.svg" },
        { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
        { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" },
        { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "Laravel",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
        { name: "CodeIgniter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
        { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-plain.svg" },
        { name: "Vue.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-plain.svg" },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg" },
      ],
    },
    {
      category: "API & Security",
      items: [
        { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-plain.svg" },
        { name: "Postman",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-plain.svg" },
        { name: "bcrypt",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Git",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "VS Code",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-plain.svg" },
        { name: "Linux",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg" },
        { name: "XAMPP",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-plain.svg" },
        { name: "Figma",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      ],
    },
  ],

  // ── Projects ──
  projects: [
    {
      title: "TokoKu — E-Commerce Platform",
      type: "Personal Project",
      period: "Jan 2026 – Feb 2026",
      github: "https://github.com/B3rlinSugi/tokoku-ecommerce",
      demo: null,
      desc: "Full-stack e-commerce backend engineered for transaction reliability — from database design to secure payment flows.",
      points: [
        "Architected a 10-table relational database (InnoDB + FK constraints) covering the full order lifecycle — cart, checkout, payment, stock — with zero transaction failures across all payment methods during testing.",
        "Engineered a voucher discount engine and RBAC authentication system with bcrypt hashing and tokenized password reset, achieving zero unauthorized access incidents in QA.",
        "Built a real-time admin dashboard with sales analytics and 6-month revenue visualization using Chart.js, backed by aggregated SQL queries.",
      ],
      tech: [
        { name: "PHP 8",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "MySQL",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
        { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg" },
      ],
    },
    {
      title: "Cash Flow Manager",
      type: "Academic Project",
      period: "Jun 2023 – Jul 2023",
      github: "https://github.com/B3rlinSugi/cash-flow",
      demo: null,
      desc: "A class cash flow management system upgraded from a legacy codebase — redesigned with modern security practices and real-time analytics.",
      points: [
        "Upgraded legacy MD5 authentication to bcrypt and redesigned database schema with InnoDB, Foreign Key constraints, and proper indexing for performance.",
        "Built a real-time 6-month cash flow analytics dashboard using Chart.js and a deferred payment tracking module with automatic status management.",
        "Added PDF report export filtered by month and transaction type, enabling auditable financial records for organizational use.",
      ],
      tech: [
        { name: "PHP 8",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "MySQL",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
        { name: "Chart.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
      ],
    },
    {
      title: "Sistem Data Akademik",
      type: "Academic Project",
      period: "Mar 2024 – Jul 2024",
      github: "https://github.com/B3rlinSugi/crud-akademik",
      demo: null,
      desc: "An academic data management system with multi-table relational database, role-based access control, and real-time statistical dashboard.",
      points: [
        "Architected a 3-table relational database (students, courses, grades) with Foreign Key constraints and normalization to ensure data integrity.",
        "Implemented RBAC for Admin and Staff roles using PDO prepared statements, eliminating SQL injection vulnerabilities.",
        "Built search, filter, and pagination features with PDF export and a Chart.js dashboard for real-time student statistics per class.",
      ],
      tech: [
        { name: "PHP 8",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "MySQL",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
        { name: "Chart.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
      ],
    },
  ],

  // ── Certifications ──
  certifications: [
    {
      name: "Fundamental Server Operating System",
      issuer: "Universitas Gunadarma",
      year: "2022",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg",
    },
    {
      name: "Fundamental Database Management System",
      issuer: "Universitas Gunadarma",
      year: "2022",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg",
    },
    {
      name: "Oracle Database for Beginners",
      issuer: "Universitas Gunadarma",
      year: "2023",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    },
    {
      name: "Linux System Administration",
      issuer: "Universitas Gunadarma",
      year: "2023",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg",
    },
    {
      name: "Basic Web Application Design",
      issuer: "Universitas Gunadarma",
      year: "2024",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
    },
    {
      name: "Basic Web Application Development",
      issuer: "Universitas Gunadarma",
      year: "2025",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
    },
  ],

  // ── Organizations (3 items) ──
  organizations: [
    {
      role: "Minister of Social & Political Affairs",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2024 – Aug 2025",
      desc: "Led two departments managing 15+ members with 100% program completion rate. Oversaw cross-functional coordination across faculty-level initiatives and represented the faculty in external institutional events.",
      highlights: ["15+ Members Led", "100% Completion", "Faculty Representative", "Strategic Planning"],
      photo: "/org1.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
    {
      role: "Head of Social Community Department",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2023 – Jun 2024",
      desc: "Directed and coordinated staff in planning and executing community social programs. Improved team efficiency and ensured successful delivery of all scheduled activities.",
      highlights: ["Department Lead", "Program Delivery", "Team Coordination", "Community Outreach"],
      photo: "/org2.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
    {
      role: "Staff of Social Community Department",
      org: "BEM FTI — Universitas Gunadarma",
      period: "Jul 2022 – Jun 2023",
      desc: "Contributed to planning and executing social community programs as a core staff member. Actively participated in campus events and cross-departmental initiatives.",
      highlights: ["Event Planning", "Community Programs", "Cross-dept Work", "Active Contributor"],
      photo: "/org3.jpg",
      instagram: "https://www.instagram.com/bemfti.ug/",
    },
  ],
};
