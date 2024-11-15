import IssueForm from "@/components/issue-form";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Issue } from "@prisma/client";

interface Props {
  params: { id: string };
}

async function getIssue(id: string): Promise<Issue | null> {
  return prisma.issue.findUnique({
    where: { id: +id },
  });
}

export default async function IssueEditPage({ params }: Props) {
  const issue = await getIssue(params.id);
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
}
