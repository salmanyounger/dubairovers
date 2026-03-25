"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavigationCleanup() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Clean up any orphaned fixed elements on route change
    return () => {
      // Force garbage collection of fixed positioned overlays
      document.body.style.overflow = "";
      document.body.style.position = "";
    };
  }, [pathname]);

  return null;
}
