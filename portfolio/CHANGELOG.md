# Changelog

## [Unreleased]

### Added
- `OperationalReadiness` component with live KPI trend chart, SLO model, and runbook workflow.
- Runbook actions: copy to clipboard and download Markdown.
- `GitHubStats` sections for API project metrics, reliability cards, and health checks.
- Extended project metadata in `portfolioData` including `metrics`, `apiDocs`, `healthCheck`, `openApi`, and `deployment` details.
- `About` copy updated to highlight backend, monitoring, DB integrity, and CI/CD.

### Fixed
- App section order changed according to user flow: hero -> about -> skills -> projects -> github activity -> github stats -> operational readiness -> certifications -> organizations -> contact.
- Compose error handling in GitHub API and mermaid rendering with catch blocks.
- ESLint issues resolved (no-unused-vars, syntax parsing, and set-state-in-effect warnings handled).

### Documentation
- Updated `README.md` with backend portfolio overview, deployment guide, and preview instructions.
- Added `CHANGELOG.md` for release tracking.
