"use client";

import Link from "next/link";
import { Button, Select } from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";
import { useRouter } from "next/navigation";

const statuses = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

export default function IssuesToolbar() {
  return (
    <div className="flex justify-between items-center mb-5">
      <NewButton />
      <StatusFilter />
    </div>
  );
}

function NewButton() {
  return (
    <Link href="/issues/new">
      <Button style={{ cursor: "pointer" }} variant="outline">
        <AiFillBug />
        New Issue
      </Button>
    </Link>
  );
}

function StatusFilter() {
  const router = useRouter();

  return (
    <Select.Root onValueChange={(status) => router.push(`/issues/list/?status=${status}`)}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((s) => (
          <Select.Item key={s.value} value={s.value}>
            {s.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
