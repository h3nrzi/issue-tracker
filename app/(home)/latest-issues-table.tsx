import { CustomLink, IssueStatusBadge } from "@/components";
import GetLatestIssues from "@/lib/queries/get-latest-issues";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Avatar, Heading, Table, Text } from "@radix-ui/themes";

export default async function LatestIssuesTable() {
  const { data } = await GetLatestIssues();

  return (
    <>
      <Heading align="center" mb="4">
        Latest Issues
      </Heading>
      <Table.Root variant="surface">
        <Table.Body>
          {data.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="relative">
                <div className="flex flex-col items-start gap-2">
                  <CustomLink href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
                  <div className="flex items-center gap-2">
                    <IssueStatusBadge status={issue.status} />
                    <div className="flex items-center gap-2">
                      <Avatar size="1" src={issue.userCreatedIssue.image!} fallback={issue.userCreatedIssue.name!.at(0)!} radius="full" referrerPolicy="no-referrer" />
                      {issue.userAssignedIssueId && <ArrowRightIcon />}
                      {issue.userAssignedIssueId && <Avatar size="1" src={issue.userAssignedIssue!.image!} fallback={issue.userAssignedIssue!.name!.at(0)!} radius="full" referrerPolicy="no-referrer" />}
                    </div>
                  </div>
                </div>
                <Text className="absolute bottom-1 right-2">{issue.createdAt.toDateString()}</Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
