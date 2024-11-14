import { Table } from "@radix-ui/themes";
import { CustomLink, IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";

export default function IssuesTable({ issues }: { issues: Issue[] }) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell className="relative">
              <CustomLink href={`/issues/${issue.id}`}>
                {issue.title}
              </CustomLink>
              <span className="md:hidden absolute bottom-1 right-1">
                {<IssueStatusBadge status={issue.status} />}
              </span>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell whitespace-nowrap">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
