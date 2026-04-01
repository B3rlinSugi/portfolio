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

  about: "Fresh graduate in Informatics Engineering from Gunadarma University (GPA: 3.63/4.00) who ships production-ready backend systems, not just assignments. I specialise in designing scalable REST APIs, relational databases, and secure authentication flows using PHP and Laravel — with zero unauthorized access incidents across all QA cycles. Fast learner, detail-oriented, and ready to contribute from day one.",

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
      type: "RESTful API",
      period: "Mar 2026",
      github: "https://github.com/B3rlinSugi/student-management-api",
      demo: "https://student-api-demo.vercel.app",
      postman: "https://www.postman.com/berlinsugi/workspace/student-management-api",
      desc: "A production-ready RESTful API built with Laravel 11 — featuring JWT Authentication, Role-Based Access Control, full CRUD with Soft Delete, Search, Filter & Pagination. Designed to demonstrate enterprise-grade backend patterns: stateless auth, thin controllers, and a single performant query layer handling search, filter, sort, and pagination simultaneously.",
      points: [
        {
          challenge: "Needed a secure, stateless authentication system that works across any client (mobile, SPA) without coupling to server-side sessions.",
          solution: "Engineered a dual-role JWT authentication system (Admin vs User) using HS256 signing with token blacklisting on logout — login, register, token refresh, and invalidation all handled via dedicated Auth controller with bcrypt password hashing.",
          result: "Zero unauthorized access incidents across all test scenarios, with clean role separation enforced at the middleware layer rather than scattered across controller logic.",
        },
        {
          challenge: "CRUD endpoints needed to handle data deletion safely — permanent deletes in academic systems risk irreversible data loss.",
          solution: "Implemented Soft Delete lifecycle (delete → trash → restore / force delete) using Laravel's SoftDeletes trait, with separate trashed endpoints accessible only to Admin role. Form Request classes handle all validation, keeping controllers single-responsibility.",
          result: "Full CRUD for Students & Majors with recoverable deletion — zero data loss risk during normal operations, with clean JSON responses via API Resources decoupling DB schema from API response shape.",
        },
        {
          challenge: "List endpoints needed to support flexible data retrieval without writing N separate query methods for each filter combination.",
          solution: "Built a unified query layer with chained Eloquent scopes — multi-column search (name, NIM, email), filter by status/major/gender, dynamic sorting by any column, and configurable pagination up to 50 per page — all resolved in a single database query.",
          result: "One performant endpoint handles all retrieval scenarios, with consistent paginated response structure including meta (total, pages) and links (prev, next) for easy client-side navigation.",
        },
      ],
      tech: [
        { name: "Laravel 11", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
        { name: "PHP 8.2",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL 8",    icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "JWT",        icon: "https://cdn.simpleicons.org/jsonwebtokens/06B6D4" },
        { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      ],
    },
    {
      title: "Spring Boot Student API",
      type: "RESTful API",
      period: "Mar 2026",
      github: "https://github.com/B3rlinSugi/springboot-student-api",
      demo: null,
      postman: null,
      desc: "A Java-based RESTful API built with Spring Boot 3 — featuring JWT Authentication, JPA/Hibernate ORM, and MySQL database. Demonstrates enterprise Java backend development with proper layered architecture (Controller → Service → Repository).",
      points: [
        {
          challenge: "Needed to learn Java backend development to broaden tech stack beyond PHP/Laravel.",
          solution: "Built a complete Student Management API using Spring Boot 3 with Spring Security and JWT token authentication. Implemented proper layered architecture with clear separation of concerns.",
          result: "Successfully delivered a production-ready REST API with proper error handling, input validation, and documentation.",
        },
        {
          challenge: "Database operations needed to be efficient and maintainable.",
          solution: "Used Spring Data JPA with Hibernate ORM, implementing custom queries and relationships between entities (Student, Course, Grade).",
          result: "Clean, maintainable data access layer with proper entity relationships and lazy/eager loading strategies.",
        },
      ],
      tech: [
        { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
        { name: "Java 17",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name: "MySQL",      icon: "https://cdn.simpleicons.org/mysql/00758F" },
        { name: "JWT",        icon: "https://cdn.simpleicons.org/jsonwebtokens/06B6D4" },
        { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      ],
      title: "TokoKu — E-Commerce Platform",
      type: "Full-Stack Web App",
      period: "Jan 2026 - Feb 2026",
      github: "https://github.com/B3rlinSugi/tokoku-ecommerce",
      demo: "https://tokoku-ecommerce.vercel.app",
      postman: null,
      desc: "Full-stack e-commerce backend engineered for transaction reliability — from a 10-table relational database to secure payment flows and a real-time admin dashboard. The core challenge was ensuring data consistency across the entire order lifecycle: cart → checkout → payment → stock deduction, with zero room for partial failures.",
      points: [
        {
          challenge: "E-commerce transactions span multiple tables (orders, payments, stock) — a partial failure mid-checkout could leave data in an inconsistent state, such as payment recorded but stock not deducted.",
          solution: "Architected a 10-table InnoDB relational database with FK constraints enforcing referential integrity across the full order lifecycle. Payment processing and stock deduction are handled atomically, preventing partial-write inconsistencies.",
          result: "Zero transaction failures across all payment methods (bank transfer, e-wallet) during end-to-end QA testing — cart, checkout, and stock deduction always resolved as a complete unit.",
        },
        {
          challenge: "The legacy auth approach used MD5 hashing — cryptographically broken and vulnerable to rainbow table attacks. The discount system also had no access boundaries between user roles.",
          solution: "Replaced MD5 with bcrypt hashing for all passwords and implemented RBAC to separate admin and customer permissions. Tokenized password reset flow prevents account takeover via predictable reset links. Voucher engine validates discount eligibility server-side before applying to order total.",
          result: "Zero unauthorized access incidents across all security test cases — no privilege escalation between roles, and no successful brute-force attempts against bcrypt-hashed credentials in QA.",
        },
        {
          challenge: "Admin needed real-time visibility into sales performance without running expensive ad-hoc queries each time the dashboard loaded.",
          solution: "Built an admin dashboard with optimised aggregate SQL queries using GROUP BY and date-range filtering — feeding a Chart.js 6-month revenue visualization. Query results are shaped server-side before being passed to the frontend, minimising client-side processing.",
          result: "Sub-100ms dashboard response time on the aggregate queries, giving admin users real-time sales analytics and revenue trends without noticeable latency.",
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
      title: "Cash Flow Manager",
      type: "Academic Project",
      period: "Jun 2023 - Jul 2023",
      github: "https://github.com/B3rlinSugi/cash-flow",
      demo: null,
      desc: "A class cash flow management system rebuilt from a legacy codebase — modernised with industry-standard security, real-time analytics, and PDF reporting. The project started as a broken MD5-authenticated system and was refactored into something production-worthy: secure auth, proper database constraints, and an analytics dashboard that gives admins full financial visibility.",
      points: [
        {
          challenge: "The original codebase used MD5 for password hashing — a completely broken algorithm susceptible to rainbow table attacks. The database also lacked InnoDB constraints, meaning related records could be deleted without cascading updates, leaving orphaned data.",
          solution: "Migrated authentication to bcrypt hashing and redesigned the database schema with InnoDB engine, Foreign Key constraints, and proper indexing on frequently-queried columns (date, transaction type). Also eliminated all raw SQL string concatenation in favour of prepared statements.",
          result: "All known security vulnerabilities from the original codebase were eliminated — no SQL injection surface, no weak password hashing, and referential integrity enforced at the database level.",
        },
        {
          challenge: "Admins had no visibility into cash flow trends — every financial review required manually scrolling through transaction logs with no summary or pattern recognition.",
          solution: "Built a real-time 6-month cash flow analytics dashboard using Chart.js with server-side aggregate queries grouped by month. Added a deferred payment tracking module with automatic status transitions (pending → paid → overdue) triggered by date comparison logic on page load.",
          result: "Admins now see full financial trends at a glance — income vs expense over 6 months, deferred payment status, and outstanding balances — without any manual data aggregation.",
        },
        {
          challenge: "Financial records needed to be shareable and auditable outside the system — a web view alone is insufficient for formal reporting.",
          solution: "Implemented server-side PDF report generation with month and transaction-type filtering, producing formatted financial statements that can be saved, printed, or shared as standalone documents.",
          result: "Admins can export clean, filtered PDF reports per period — enabling auditable financial records for organisational use without depending on third-party reporting tools.",
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
      github: "https://github.com/B3rlinSugi/crud-akademik",
      demo: null,
      desc: "An academic data management system built to handle students, courses, and grades for an entire faculty — with multi-table relational database, role-based access control, and a real-time statistical dashboard. The design priority was data integrity and strict access boundaries between Admin and Staff roles.",
      points: [
        {
          challenge: "Academic data spans multiple entities (students, courses, grades) with strict relationships — a student record deletion should cascade correctly, and grade entries must always reference valid students and courses.",
          solution: "Architected a normalised 3-table relational database (students, courses, grades) with Foreign Key constraints enforcing referential integrity. Schema follows 3NF to eliminate data redundancy and ensure consistent updates across all related records.",
          result: "Referential integrity maintained across all CRUD operations — no orphaned records, no inconsistent data states, with all relationships enforced at the database level rather than relying solely on application logic.",
        },
        {
          challenge: "Staff should be able to view and input data, but not delete or modify system-critical records — without proper access control, any logged-in user could perform destructive operations.",
          solution: "Implemented RBAC for Admin and Staff roles using PDO prepared statements throughout — eliminating SQL injection vulnerabilities while enforcing strict data access boundaries. Admin-only routes are protected server-side, not just hidden in the UI.",
          result: "Clean role separation with zero privilege escalation — Staff users cannot access Admin functions regardless of URL manipulation, as access control is enforced at the query/controller layer.",
        },
        {
          challenge: "Faculty staff needed to extract class-specific reports and view student distribution statistics without relying on a database admin to run manual queries.",
          solution: "Built search, filter, and pagination across all data views using a unified query layer. Added PDF export per class using server-side generation and a Chart.js dashboard displaying real-time student statistics (total enrolled, gender distribution, grade spread) via optimised aggregate queries.",
          result: "Manual reporting effort significantly reduced — staff can self-serve filtered reports and export PDFs per class without any database access, while the dashboard provides instant statistical overview on page load.",
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
