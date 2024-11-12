"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function NavBar() {
  const path = usePathname();

  const links = [
    { label: "Dashboard", to: "/" },
    { label: "Issues", to: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            href={link.to}
            key={link.label}
            className={classNames({
              "text-zinc-900": path === link.to,
              "text-zinc-500": !(path === link.to),
              "hover:text-zinc-800 transition-colors font-medium": true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
