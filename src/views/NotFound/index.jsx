import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">404 - Page Not Found</h2>
      <p className="lead">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary mt-3">
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;
