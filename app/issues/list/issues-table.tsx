import { useState } from "react";
import { Table } from "@radix-ui/themes";
import { CustomLink, IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import Link from "next/link";
import { FaSort, FaSortUp } from "react-icons/fa";
import IssuesQuery from "@/types/IssuesQuery";

interface Props {
  query: IssuesQuery;
  issues: Issue[];
}

export default function IssuesTable({ issues, query }: Props) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const handleDoubleClick = (columnValue: keyof Issue) => {
    // Toggle sort order
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));

    // Update the query with the new order
    // Assuming you have a method to update the query parameters
    const newOrderBy = columnValue;
    const newDirection = sortOrder === "asc" ? "desc" : "asc";

    // Update the query with new parameters (this will depend on your routing setup)
    // For example, if using Next.js:
    // router.push({ pathname: router.pathname, query: { ...query, orderBy: newOrderBy, orderDirection: newDirection } });
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((c) => (
            <Table.ColumnHeaderCell key={c.value} className={c.className} onDoubleClick={() => handleDoubleClick(c.value)}>
              {c.value === query.orderBy && sortOrder === "asc" ? <FaSortUp className="inline-block mr-2" /> : <FaSort className="inline-block mr-2" />}
              <Link href={{ query: { ...query, orderBy: c.value, orderDirection: sortOrder } }}>{c.label}</Link>
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
