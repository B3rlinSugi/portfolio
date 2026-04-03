# Changelog

## [Unreleased]

### Added
- `OperationalReadiness` component with live KPI trend chart, SLO model, and runbook workflow.
- Runbook actions: copy to clipboard and download Markdown.
- `GitHubStats` sections for API project metrics, reliability cards, and health checks.
- `OpenApiViewer` component with swagger-preview fallback and direct link.
- Extended project metadata in `portfolioData` with `Docker` and `GitHub Actions` under skills.
- `About` copy updated to highlight backend, monitoring, DB integrity, and CI/CD.

### Fixed
- App section order changed according to user flow: hero -> about -> skills -> projects -> github activity -> github stats -> operational readiness -> certifications -> organizations -> contact.
- Compose error handling in GitHub API and mermaid rendering with catch blocks.
- `OpenApiViewer`: fallback message for X-Frame-Options/CSP and external viewer link.
- `OperationalReadiness` useMemo warning and data lookup improved.
- ESLint issues resolved (no-unused-vars, syntax parsing, hooks warnings).

### Documentation
- Updated `README.md` with backend portfolio overview, deployment guide, and preview instructions.
- Added `CHANGELOG.md` for release tracking.
