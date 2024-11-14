import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueEditButton from "@/app/issues/[id]/issue-edit-button";
import IssueDetails from "@/app/issues/[id]/issue-details";

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
      <IssueDetails issue={issue} />
      <div>
        <IssueEditButton issueId={issue.id} />
      </div>
    </div>
  );
}
