import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function EditButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button color="blue" style={{ width: "100%", cursor: "pointer" }}>
        <Pencil2Icon />
        Edit
      </Button>
    </Link>
  );
}
