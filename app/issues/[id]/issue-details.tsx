import { Card, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/components";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

export default function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <div className="flex items-center gap-4 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose mt-4 max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
