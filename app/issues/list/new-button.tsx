import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

export default function NewButton() {
  return (
    <Link href="/issues/new">
      <Button style={{ cursor: "pointer" }} variant="outline">
        <AiFillBug />
        New Issue
      </Button>
    </Link>
  );
}
