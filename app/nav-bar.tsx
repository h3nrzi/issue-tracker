"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const path = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", to: "/" },
    { label: "Issues", to: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.to}
              className={classNames({
                "text-zinc-900": path === link.to,
                "text-zinc-500": !(path === link.to),
                "hover:text-zinc-800 transition-colors font-medium": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        {status === "authenticated" ? (
          <Link href="/api/auth/signout">Log out</Link>
        ) : (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
