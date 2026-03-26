"use client";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Silently catch the removeChild navigation error and reload the page
    // This happens when React tries to clean up DOM nodes that browser
    // extensions (Google Translate etc.) or the router already moved
    if (
      error?.message?.includes("removeChild") ||
      error?.message?.includes("NotFoundError") ||
      error?.message?.includes("is not a child")
    ) {
      // Small delay so the new route finishes loading, then clear the error
      setTimeout(() => {
        this.setState({ hasError: false });
      }, 100);
      return;
    }
    // For any other real errors, reload the page
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      // Render nothing briefly while recovering — user sees no error
      return null;
    }
    return this.props.children;
  }
}
