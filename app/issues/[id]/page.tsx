import IssueDetails from "@/app/issues/[id]/issue-details";
import { authOptions } from "@/auth";
import getIssue from "@/lib/queries/get-issue";
import Issue from "@/types/Issue";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import IssueToolbar from "./issue-toolbar";

export default async function IssueDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const issue = (await getIssue(+params.id)) as Issue;
  if (!issue) return notFound();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-10 sm:gap-4">
      <div className="sm:col-span-4">
        <IssueDetails issue={issue} />
      </div>
      <div className="sm:col-span-1">{session?.user && <IssueToolbar issue={issue} />}</div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await getIssue(+params.id);

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}
