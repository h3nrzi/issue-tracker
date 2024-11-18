"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Avatar, DropdownMenu, Spinner, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const path = usePathname();

  return (
    <nav className="flex items-center justify-between border-b mb-5 px-5 h-14 ">
      <div className="flex gap-6 items-center">
        <NavLogo />
        <NavLinks path={path} />
      </div>
      <div>
        <AuthStatus />
      </div>
    </nav>
  );
}

function NavLogo() {
  return (
    <Link href="/">
      <AiFillBug />
    </Link>
  );
}

function NavLinks({ path }: { path: string }) {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={classNames({
              "my-nav-link": true,
              "!text-zinc-900": path === link.href,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === "loading") return <Spinner size="3" className="mr-2" />;

  if (status === "authenticated")
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            src={session!.user!.image!}
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
    );

  return (
    <Link className="my-nav-link" href="/api/auth/signin">
      Sign in
    </Link>
  );
}
