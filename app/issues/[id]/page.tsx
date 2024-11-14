import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Button, Card, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { IssueStatusBadge } from "@/components";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) return notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      <div>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </div>
    </div>
  );
}
