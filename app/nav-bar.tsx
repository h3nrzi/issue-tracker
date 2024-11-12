import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

export default function NavBar() {
  const links = [
    { label: "Dashboard", to: "/dashboard" },
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
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
