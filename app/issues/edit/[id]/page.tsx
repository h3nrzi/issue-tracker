import { notFound } from "next/navigation";
import getIssue from "@/lib/getIssue";
import dynamic from "next/dynamic";
import { IssueFormSkeleton } from "@/components";

const IssueForm = dynamic(() => import("@/components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

export default async function IssueEditPage({ params }: Props) {
  const issue = await getIssue(+params.id);
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
}
