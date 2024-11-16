import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";

export default function IssuesToolbar() {
  return (
    <div className="mb-5">
      <Link href="/issues/new">
        <Button style={{ cursor: "pointer" }} variant="soft">
          <AiFillBug />
          New Issue
        </Button>
      </Link>
    </div>
  );
}
