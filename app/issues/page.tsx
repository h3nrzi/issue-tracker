import { Table, Link } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/components/issue-status-badge";
import delay from "delay";
import IssueToolbar from "@/app/issues/issue.toolbar";
import CustomLink from "@/components/custom-link";
import { Issue } from "@prisma/client";

export default async function IssuesPage() {
  const issues: Issue[] = await prisma.issue.findMany();
  await delay(2000);

  return (
    <>
      <IssueToolbar />

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
          {issues.map((issue: Issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <CustomLink href={`/issues/${issue.id}`}>
                  {issue.title}
                </CustomLink>
                <div className="block md:hidden">
                  {<IssueStatusBadge status={issue.status} />}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
