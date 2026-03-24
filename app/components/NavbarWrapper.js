"use client";
import { usePathname } from "next/navigation";
import { NavBar } from "../NavBar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (pathname.startsWith("/archai")) return null;
  if (pathname.startsWith("/properties")) return null;
  if (pathname.startsWith("/salmanfx")) return null;
  if (pathname.startsWith("/webbuilder")) return null;
  if (pathname.startsWith("/admin")) return null;
  if (pathname.startsWith("/hire")) return null;
  if (pathname.startsWith("/al-noor")) return null;
  return <NavBar />;
}
