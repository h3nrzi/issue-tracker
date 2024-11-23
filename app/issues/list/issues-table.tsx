"use client";

import { useState } from "react";
import { Table } from "@radix-ui/themes";
import { CustomLink, IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import IssuesQuery from "@/types/IssuesQuery";
import { useRouter } from "next/navigation";

interface Props {
  query: IssuesQuery;
  issues: Issue[];
}

export default function IssuesTable({ issues, query }: Props) {
  const router = useRouter();
  const [ sortOrderDirection, setSortOrderDirection ] = useState("asc");

  if (issues.length <= 0) return <p>No issue found! Please create an issue...</p>;

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" }
  ];

  async function handleOrderDirection(columnValue: keyof Issue) {
    const newSortOrderDirection = columnValue === query.orderBy && sortOrderDirection === "asc" ? "desc" : "asc";

    const searchParams = new URLSearchParams({
      ...query,
      orderBy: columnValue,
      orderDirection: newSortOrderDirection
    });

    router.push(`/issues/list?${searchParams.toString()}`);

    setSortOrderDirection(newSortOrderDirection);
  }

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((c) => (
            <Table.ColumnHeaderCell key={c.value} className={c.className}>
              {c.value !== query.orderBy && <FaSort className="inline-block mr-2"/>}
              {c.value === query.orderBy && sortOrderDirection === "asc" && <FaSortUp className="inline-block mr-2"/>}
              {c.value === query.orderBy && sortOrderDirection === "desc" && <FaSortDown className="inline-block mr-2"/>}
              <span className="cursor-pointer text-gray-600 hover:text-black" onClick={() => handleOrderDirection(c.value)}>
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
              <span className="md:hidden absolute bottom-1 right-1">{<IssueStatusBadge status={issue.status}/>}</span>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status}/>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell whitespace-nowrap">{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
