import { Toaster } from "react-hot-toast";
import AssigneeSelect from "./assignee-select";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";

export default async function IssueToolbar({ issueId }: { issueId: number }) {
  return (
    <div className="flex flex-col gap-2">
      <AssigneeSelect issueId={issueId} />
      <EditButton issueId={issueId} />
      <DeleteButton issueId={issueId} />
      <Toaster />
    </div>
  );
}
