"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, DropdownMenu, Spinner, Text } from "@radix-ui/themes";

export default function NavBar() {
  const path = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", to: "/" },
    { label: "Issues", to: "/issues/list" },
  ];

  return (
    <nav className="flex items-center justify-between border-b mb-5 px-5 h-14 ">
      <div className="flex gap-6 items-center">
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
      </div>

      <div>
        {status === "loading" && <Spinner size="3" className="mr-2" />}
        {status === "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                className="cursor-pointer"
                src={session.user!.image!}
                fallback={session.user!.name!.at(0)!}
                radius="full"
                referrerPolicy="no-referrer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">{session.user!.email}</Text>
              </DropdownMenu.Label>
              <Link href="/api/auth/signout">
                <DropdownMenu.Item style={{ cursor: "pointer" }}>
                  Log out
                </DropdownMenu.Item>
              </Link>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
