import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Section failed to load:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: "1px solid rgba(59,130,246,0.08)",
            background: "rgba(2,6,23,0.5)",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#334155",
              letterSpacing: "1.4px",
              textTransform: "uppercase",
            }}
          >
            section unavailable — please refresh
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
