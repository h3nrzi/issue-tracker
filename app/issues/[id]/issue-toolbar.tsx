import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

export default function IssueToolbar({ issueId }: { issueId: number }) {
  return (
    <div className="flex flex-col gap-2">
      <Link href={`/issues/${issueId}/edit`}>
        <Button color="green" style={{ width: "100%", cursor: "pointer" }}>
          <Pencil2Icon />
          Edit Issue
        </Button>
      </Link>
      <Button color="red" style={{ cursor: "pointer" }}>
        <TrashIcon />
        Delete Issue
      </Button>
    </div>
  );
}
