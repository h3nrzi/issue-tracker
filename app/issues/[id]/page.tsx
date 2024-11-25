import IssueDetails from "@/app/issues/[id]/issue-details";
import IssueToolbar from "@/app/issues/[id]/issue-toolbar";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export default async function IssueDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-10 sm:gap-4">
      <div className="sm:col-span-4">
        <IssueDetails issueId={+params.id} />
      </div>
      <div className="sm:col-span-1">{session?.user && <IssueToolbar issueId={+params.id} />}</div>
    </div>
  );
}
