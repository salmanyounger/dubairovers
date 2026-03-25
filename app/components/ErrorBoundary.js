"use client";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Only catch the removeChild navigation error
    if (error?.message?.includes("removeChild") || error?.message?.includes("not a child")) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error) {
    if (error?.message?.includes("removeChild") || error?.message?.includes("not a child")) {
      // Silently reload - user won't notice
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return null; // Will reload anyway
    }
    return this.props.children;
  }
}
