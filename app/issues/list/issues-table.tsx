"use client";

import { useState } from "react";
import { Table } from "@radix-ui/themes";
import { CustomLink, IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

export default function IssuesTable({ issues }: { issues: Issue[] }) {
  const router = useRouter();
  const [sortOrderDirection, setSortOrderDirection] = useState("asc");
  const oldQueryString = useSearchParams();

  if (issues.length <= 0) return <p>No issue found! Please create an issue...</p>;

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  async function handleClick(newOrderBy: keyof Issue) {
    const oldOrderBy = oldQueryString.get("orderBy");
    const newSortOrderDirection = newOrderBy === oldOrderBy && sortOrderDirection === "asc" ? "desc" : "asc";

    const newQueryString = new URLSearchParams();

    if (oldQueryString.has("status")) newQueryString.append("status", oldQueryString.get("status")!);
    newQueryString.append("orderBy", newOrderBy);
    newQueryString.append("orderDirection", newSortOrderDirection);

    router.push(`/issues/list?${newQueryString}`);

    setSortOrderDirection(newSortOrderDirection);
  }

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((c) => (
            <Table.ColumnHeaderCell key={c.value} className={c.className}>
              {c.value !== oldQueryString.get("orderBy") && <FaSort className="inline-block mr-2" />}
              {c.value === oldQueryString.get("orderBy") && sortOrderDirection === "asc" && <FaSortUp className="inline-block mr-2" />}
              {c.value === oldQueryString.get("orderBy") && sortOrderDirection === "desc" && <FaSortDown className="inline-block mr-2" />}
              <span className="cursor-pointer text-gray-600 hover:text-black" onClick={() => handleClick(c.value)}>
                {c.label}
              </span>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell className="relative">
              <CustomLink href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
              <span className="md:hidden absolute bottom-1 right-1">{<IssueStatusBadge status={issue.status} />}</span>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell whitespace-nowrap">{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
