"use client";
import { useEffect } from "react";

// Permanently patches removeChild to silently ignore the 'not a child' error.
// This error is triggered in Next.js 14 App Router when:
//   1. <style> tags inside JSX get hoisted to <head> by the browser/Next.js
//   2. position:fixed elements get composited to a different layer
//   3. Browser extensions (Google Translate) mutate the DOM
// React then tries removeChild on a node that is no longer where it expects.
// This patch makes removeChild a no-op in those cases instead of crashing.
export default function DOMPatch() {
  useEffect(() => {
    const original = Node.prototype.removeChild;
    Node.prototype.removeChild = function(child) {
      if (child && child.parentNode && child.parentNode !== this) {
        // Node has already been moved - silently ignore
        return child;
      }
      return original.call(this, child);
    };
    // No cleanup - patch should persist for the entire session
  }, []);
  return null;
}
