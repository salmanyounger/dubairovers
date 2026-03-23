"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

// Hides navbar on the root landing page only
export default function NavbarWrapper() {
  const path = usePathname();
  if (path === "/") return null;
  return <Navbar />;
}
