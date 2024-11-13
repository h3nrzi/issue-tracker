import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function IssuesPage() {
  return (
    <>
      <Link href="/issues/new">
        <Button>New Issue</Button>
      </Link>
    </>
  );
}
