import { notFound } from "next/navigation";
import IssueDetails from "@/app/issues/[id]/issue-details";
import getIssue from "@/lib/getIssue";
import IssueToolbar from "@/app/issues/[id]/issue-toolbar";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await getIssue(+params.id);
  if (!issue) return notFound();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-10 sm:gap-4">
      <div className="sm:col-span-4">
        <IssueDetails issue={issue} />
      </div>
      <div className="sm:col-span-1">
        <IssueToolbar issueId={issue.id} />
      </div>
    </div>
  );
}
