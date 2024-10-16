import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1>Something went wrong.</h1>
          <p>We apologize for the inconvenience. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    color: "#333",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default ErrorBoundary;
