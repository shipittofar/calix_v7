"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { NavItem } from "@/content/site";

/**
 * Mobile navigation as a native <details> disclosure, so it works without
 * JavaScript. When JavaScript runs, Escape and link selection close it.
 */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    const close = () => {
      details.open = false;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        close();
        details.querySelector("summary")?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a")) close();
    };

    document.addEventListener("keydown", onKey);
    details.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      details.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={ref} className="mobile-menu lg:hidden">
      <summary className="type-label flex min-h-11 cursor-pointer list-none items-center px-1">
        Menu
      </summary>
      <nav aria-label="Main" className="mobile-menu__panel">
        <ul className="container-calix rule-list py-6">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block py-4 text-[19px] no-underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
