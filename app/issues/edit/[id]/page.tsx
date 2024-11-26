import { notFound } from "next/navigation";
import getIssue from "@/lib/queries/get-issue";
import { IssueFormCsr } from "@/components";

interface Props {
  params: { id: string };
}

export default async function IssueEditPage({ params }: Props) {
  const issue = await getIssue(+params.id);
  if (!issue) return notFound();

  return <IssueFormCsr issue={issue} />;
}
