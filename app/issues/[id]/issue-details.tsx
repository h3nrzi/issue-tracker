import { Card, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/components";
import ReactMarkdown from "react-markdown";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function IssueDetails({ issueId }: { issueId: number }) {
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
    include: { userAssignedIssue: true, userCreatedIssue: true },
  });

  if (!issue) return notFound();

  return (
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <div className="flex flex-col">
        <div className="flex items-center gap-4 my-2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </div>
      </div>
      <Card className="prose mt-4 max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
