# 🎓 Sistem Data Akademik — Academic Data Management System

> A multi-role academic data management system with relational database design, role-based access control, and real-time student statistics dashboard — built with PHP 8 and MySQL.

![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?style=flat-square&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=flat-square)

---

## 📌 Overview

Sistem Data Akademik is an academic data management application designed for managing student records across multiple classes. Built with a strong emphasis on **database design**, **access control**, and **data integrity** — core competencies for any backend developer.

Key highlights:
- **3-table relational database** with FK constraints differentiating Admin and Staff access levels
- **PDO prepared statements** across all queries for SQL injection prevention
- **Search, filter, and pagination** implemented at the query level for efficient data retrieval
- **Real-time student statistics dashboard** with class-based breakdown via Chart.js
- **PDF export** for academic records, suitable for institutional reporting

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────┐
│                  CLIENT LAYER               │
│         Browser (HTML/CSS/Bootstrap 5)      │
└────────────────────┬────────────────────────┘
                     │ HTTP Request
┌────────────────────▼────────────────────────┐
│               APPLICATION LAYER             │
│                  PHP 8 (MVC)                │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │   Auth   │ │ Student  │ │  Dashboard  │ │
│  │  (RBAC)  │ │   CRUD   │ │  & Reports  │ │
│  └──────────┘ └──────────┘ └─────────────┘ │
│  ┌──────────────────────────┐               │
│  │  Search / Filter / Paginate │            │
│  └──────────────────────────┘               │
└────────────────────┬────────────────────────┘
                     │ PDO (Prepared Statements)
┌────────────────────▼────────────────────────┐
│                DATABASE LAYER               │
│               MySQL 8 (InnoDB)              │
│        users │ students │ classes           │
└─────────────────────────────────────────────┘
```

---

## ✨ Features

### 🔐 Authentication & Role-Based Access Control
- Two-tier RBAC: **Admin** (full access) and **Staff** (read + limited write)
- Session-based authentication with role validation on every route
- Admins can manage users; Staff can only manage student data within their scope

### 👨‍🎓 Student Data Management
- Full CRUD operations for student records
- Class-based student grouping with relational FK constraints
- Input validation on both client and server side

### 🔍 Search, Filter & Pagination
- Server-side search by student name and ID
- Filter by class using parameterized queries
- Pagination implemented at the SQL level (LIMIT + OFFSET) for performance

### 📊 Statistics Dashboard
- Real-time student count per class using Chart.js bar chart
- Summary cards: total students, total classes, active users
- Data pulled directly from aggregated SQL queries

### 📄 PDF Export
- Export student list as PDF, filterable by class
- Clean tabular format for institutional use

---

## 🗄️ Database Schema

| Table | Description |
|---|---|
| `users` | Admin and Staff accounts with role column |
| `students` | Student records linked to a class |
| `classes` | Class master table |

**Key constraints:**
- `students.class_id` → FK to `classes.id` (CASCADE on update, RESTRICT on delete)
- `users.role` → ENUM('admin', 'staff') with default 'staff'

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | PHP 8.x |
| Database | MySQL 8 (InnoDB, FK Constraints) |
| DB Access | PDO with Prepared Statements |
| Frontend | Bootstrap 5, HTML5, CSS3, JavaScript |
| Charts | Chart.js |
| PDF Export | TCPDF / FPDF |
| Security | RBAC, Session Validation, PDO |
| Version Control | Git & GitHub |

---

## 🚀 Getting Started

### Prerequisites
- PHP 8.x
- MySQL 8.0+
- XAMPP / Laragon / any local server

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/B3rlinSugi/crud-akademik.git
cd crud-akademik

# 2. Import the database
mysql -u root -p < database/akademik.sql

# 3. Configure database connection
cp config/config.example.php config/config.php
# Edit config.php with your DB credentials

# 4. Run the application
# Place folder in htdocs (XAMPP) or www (Laragon)
# Access via: http://localhost/crud-akademik
```

### Default Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@akademik.com | admin123 |
| Staff | staff@akademik.com | staff123 |

---

## 📁 Project Structure

```
crud-akademik/
├── config/
│   └── config.php           # DB connection & app config
├── database/
│   └── akademik.sql         # Full DB schema + seed data
├── src/
│   ├── controllers/         # Business logic handlers
│   ├── models/              # DB query abstraction
│   └── views/               # HTML templates
├── public/
│   ├── assets/              # CSS, JS, images
│   └── index.php            # Entry point
└── README.md
```

---

## 🔑 Key Technical Decisions

**Why server-side pagination over client-side?**
Loading all student records at once and paginating in JavaScript is not scalable. By using SQL `LIMIT` and `OFFSET`, only the required rows are fetched — keeping response times consistent as data grows.

**Why PDO prepared statements?**
All user inputs (search, filter values) are bound as parameters, not concatenated into query strings. This eliminates SQL injection risk at the database access layer.

**Why RBAC over simple admin flag?**
A boolean `is_admin` column limits future scalability. Using a role-based system makes it straightforward to add new roles (e.g., Teacher, Principal) without schema changes.

---

## 🧪 Testing Results

| Scenario | Result |
|---|---|
| Admin vs Staff access boundary | ✅ Correctly restricted |
| Search + filter + pagination combo | ✅ Accurate results |
| PDF export per class | ✅ Correct data output |
| SQL injection via search input | ✅ Blocked by PDO |

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Berlin Sugiyanto**
- 🌐 Portfolio: [berlinsugi.vercel.app](https://berlinsugi.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/berlinsugi](https://linkedin.com/in/berlinsugi)
- 📧 Email: berlinsugiyanto23@gmail.com
