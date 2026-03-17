export const data = {
  // ── Personal Info ──
  name: "Berlin Sugiyanto Hutajulu",
  title: "Junior Backend Developer",
  email: "berlinsugiyanto23@gmail.com",
  phone: "+62 812-9450-0613",
  location: "Bekasi, West Java",
  github: "https://github.com/B3rlinSugi",
  linkedin: "https://linkedin.com/in/berlinsugi",
  whatsapp: "https://wa.me/6281294500613",
  portfolio: "https://berlinsugi.vercel.app",

  tagline:
    "Fresh graduate in Informatics Engineering with hands-on experience building production-ready backend systems using PHP, Java, and MySQL. Passionate about scalable REST APIs, database design, and clean architecture.",

  // ── About ──
  about: {
    bio: "I'm a fresh graduate from Gunadarma University with a GPA of 3.63/4.00, specializing in backend development. I enjoy building robust systems — from designing relational databases to implementing secure authentication flows. I'm detail-oriented, a fast learner, and thrive in collaborative engineering environments.",
    highlights: [
      "Built production-ready e-commerce backend with 10-table relational DB and 0 transaction failures",
      "Implemented RBAC, bcrypt auth, and PDO prepared statements across multiple projects",
      "Led 2 departments of 15+ members as Minister of Social & Political Affairs",
      "GPA 3.63/4.00 — Informatics Engineering, Gunadarma University",
    ],
    education: {
      school: "Gunadarma University",
      location: "Depok, West Java",
      degree: "Bachelor of Informatics Engineering",
      gpa: "3.63 / 4.00",
      year: "2021 – 2025",
      courses: [
        "Data Structures",
        "Object-Oriented Programming",
        "Web Programming",
        "Software Engineering",
        "Database Systems",
        "Operating Systems",
      ],
    },
  },

  // ── Skills ──
  skills: [
    {
      category: "Languages",
      items: [
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
        { name: "CodeIgniter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
        { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-plain.svg" },
        { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-plain.svg" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg" },
        { name: "Oracle DB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
      ],
    },
    {
      category: "API & Security",
      items: [
        { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-plain.svg" },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-plain.svg" },
        { name: "PDO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "bcrypt", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-plain.svg" },
        { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg" },
        { name: "XAMPP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-plain.svg" },
      ],
    },
  ],

  // ── Projects ──
  projects: [
    {
      title: "TokoKu E-Commerce",
      type: "Personal Project",
      period: "Jan 2026 – Feb 2026",
      github: "https://github.com/B3rlinSugi/tokoku-ecommerce",
      demo: null,
      desc: "A production-ready full-stack e-commerce backend supporting complete order lifecycle management, multi-payment methods, and role-based access control — built from scratch with a backend-first approach.",
      points: [
        "Built a 10-table relational database covering the full order lifecycle — products, orders, payments, vouchers, and stock — with 0 transaction failures during end-to-end testing.",
        "Engineered a voucher discount engine and secure RBAC authentication with bcrypt (cost factor 12) and tokenized password reset, achieving 0 unauthorized access incidents in QA.",
        "Developed real-time stock management module and admin dashboard with 6-month sales analytics and revenue charts using Chart.js.",
        "Implemented PDO prepared statements throughout to eliminate SQL injection vulnerabilities, with InnoDB foreign key constraints ensuring full data integrity.",
      ],
      tech: [
        { name: "PHP 8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" },
        { name: "PDO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
        { name: "Chart.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
      ],
    },
    {
      title: "Cash Flow Manager",
      type: "Academic Project",
      period: "Jun 2023 – Jul 2023",
      github: "https://github.com/B3rlinSugi/cash-flow",
      demo: null,
      desc: "A class cash flow management system upgraded from a legacy codebase — redesigned with modern security practices, real-time analytics dashboard, and automated financial reporting.",
      points: [
        "Upgraded legacy MD5 authentication to bcrypt and redesigned database schema with InnoDB, Foreign Key constraints, and proper indexing for performance.",
        "Built a real-time 6-month cash flow analytics dashboard using Chart.js and a deferred payment tracking module with automatic status management.",
        "Added PDF report export filtered by month and transaction type, enabling auditable financial records for organizational use.",
      ],
      tech: [
        { name: "PHP 8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
        { name: "Chart.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
      ],
    },
    {
      title: "Sistem Data Akademik",
      type: "Academic Project",
      period: "Mar 2024 – Jul 2024",
      github: "https://github.com/B3rlinSugi/crud-akademik",
      demo: null,
      desc: "An academic data management system with multi-table relational database, role-based access control, and real-time statistical dashboard for student data management.",
      points: [
        "Architected a 3-table relational database (students, courses, grades) with Foreign Key constraints and proper normalization to ensure data integrity.",
        "Implemented role-based access control (RBAC) for Admin and Staff roles using PDO prepared statements, eliminating SQL injection vulnerabilities.",
        "Built search, filter, and pagination features for student data management, with PDF export and a Chart.js dashboard for real-time student statistics per class.",
      ],
      tech: [
        { name: "PHP 8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg" },
        { name: "PDO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
        { name: "Bootstrap 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
        { name: "Chart.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
      ],
    },
  ],

  // ── Certifications ──
  certifications: [
    {
      name: "Fundamental Server Operating System",
      issuer: "Gunadarma University",
      year: "2022",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg",
    },
    {
      name: "Fundamental Database Management System",
      issuer: "Gunadarma University",
      year: "2022",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg",
    },
    {
      name: "Oracle Database for Beginners",
      issuer: "Gunadarma University",
      year: "2023",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    },
    {
      name: "Linux System Administration",
      issuer: "Gunadarma University",
      year: "2023",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg",
    },
    {
      name: "Basic Web Application Design",
      issuer: "Gunadarma University",
      year: "2024",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
    },
    {
      name: "Basic Web Application Development",
      issuer: "Gunadarma University",
      year: "2025",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
    },
  ],

  // ── Organizations ──
  organizations: [
    {
      role: "Minister of Social & Political Affairs",
      org: "Student Executive Board — Faculty of Industrial Technology, Gunadarma University",
      period: "Jul 2024 – Aug 2025",
      desc: "Led two departments managing 15+ active student members, ensuring 100% program completion rate within the semester timeline. Established structured communication channels and facilitated cross-department collaboration for campus social programs.",
      highlights: [
        "15+ members managed",
        "100% program completion",
        "Cross-dept collaboration",
        "Strategic planning",
      ],
      photo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
      instagram: "https://www.instagram.com/",
    },
  ],
};
