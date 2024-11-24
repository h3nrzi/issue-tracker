"use client";

import Link from "next/link";
import { Button, Select } from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";


export default function IssuesToolbar() {
  return (
    <div className="flex justify-between items-center mb-5">
      <NewButton/>
      <StatusFilter/>
    </div>
  );
}

function NewButton() {
  return (
    <Link href="/issues/new">
      <Button style={{ cursor: "pointer" }} variant="outline">
        <AiFillBug/>
        New Issue
      </Button>
    </Link>
  );
}

function StatusFilter() {
  const router = useRouter();
  const oldQueryString = useSearchParams();
  const newQueryString = new URLSearchParams();

  const statuses = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" }
  ];


  function handleValueChange(status: string) {
    if (status !== "ALL") newQueryString.append("status", status);

    if (oldQueryString.has("orderBy"))
      newQueryString.append("orderBy", oldQueryString.get("orderBy")!);

    if (oldQueryString.has("orderDirection"))
      newQueryString.append("orderDirection", oldQueryString.get("orderDirection")!);

    router.push(`/issues/list/?${newQueryString}`);
  }

  return (
    <Select.Root onValueChange={handleValueChange} defaultValue={oldQueryString.get("status")! || ""}>
      <Select.Trigger placeholder="Filter by status..."/>
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
