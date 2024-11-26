"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

export default function StatusFilter() {
  const router = useRouter();
  const oldQueryString = useSearchParams();
  const newQueryString = new URLSearchParams();

  const statuses = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  function handleValueChange(status: string) {
    if (status !== "ALL") newQueryString.append("status", status);

    if (oldQueryString.has("orderBy")) {
      newQueryString.append("orderBy", oldQueryString.get("orderBy")!);
    }

    if (oldQueryString.has("orderDirection")) {
      newQueryString.append("orderDirection", oldQueryString.get("orderDirection")!);
    }

    router.push(`/issues/list/?${newQueryString}`);
  }

  return (
    <Select.Root onValueChange={handleValueChange} defaultValue={oldQueryString.get("status")! || ""}>
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
