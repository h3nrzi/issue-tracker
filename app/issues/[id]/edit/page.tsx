import IssueForm from "@/components/issue-form";
import { notFound } from "next/navigation";
import getIssue from "@/lib/getIssue";

interface Props {
  params: { id: string };
}

export default async function IssueEditPage({ params }: Props) {
  const issue = await getIssue(+params.id);
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
}
