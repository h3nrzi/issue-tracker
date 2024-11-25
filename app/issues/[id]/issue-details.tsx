import { IssueStatusBadge } from "@/components";
import Issue from "@/types/Issue";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Avatar, Card, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

export default async function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 my-2">
          <IssueStatusBadge status={issue.status} />
          <div className="flex items-center gap-2">
            <Avatar size="1" src={issue.userCreatedIssue.image!} fallback={issue.userCreatedIssue.name!.at(0)!} radius="full" referrerPolicy="no-referrer" />
            {issue.userAssignedIssueId && <ArrowRightIcon />}
            {issue.userAssignedIssueId && <Avatar size="1" src={issue.userAssignedIssue!.image!} fallback={issue.userAssignedIssue!.name!.at(0)!} radius="full" referrerPolicy="no-referrer" />}
          </div>
        </div>
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose mt-4 max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
