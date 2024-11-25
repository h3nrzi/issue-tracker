import { Avatar, Card, Heading, Table } from "@radix-ui/themes";
import GetLatestIssues from "@/lib/queries/get-latest-issues";
import { IssueStatusBadge } from "@/components";
import Link from "next/link";

export default async function LatestIssuesTable() {
  const { data } = await GetLatestIssues();

  return (
    <Card>
      <Heading align="center" mb="5">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {data.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-start gap-2">
                    <Link href={`/issues/${issue.id}`} className="hover:underline">{issue.title}</Link>
                    <IssueStatusBadge status={issue.status}/>
                  </div>
                  {issue.userAssignedIssueId && <Avatar size="2" src={issue.userAssignedIssue!.image!} fallback={issue.userAssignedIssue!.name!.at(0)!} radius="full" referrerPolicy="no-referrer"/>}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};