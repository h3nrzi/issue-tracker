import { notFound } from "next/navigation";
import IssueDetails from "@/app/issues/[id]/issue-details";
import getIssue from "@/lib/queries/getIssue";
import IssueToolbar from "@/app/issues/[id]/issue-toolbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const issue = await getIssue(+params.id);
  if (!issue) return notFound();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-10 sm:gap-4">
      <div className="sm:col-span-4">
        <IssueDetails issue={issue} />
      </div>
      <div className="sm:col-span-1">
        {session?.user && <IssueToolbar issue={issue} />}
      </div>
    </div>
  );
}
