import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/components";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) return notFound();

  return (
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <div className="flex items-center gap-4 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
