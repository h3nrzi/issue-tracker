import { Toaster } from "react-hot-toast";
import AssigneeSelect from "./assignee-select";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import Issue from "@/types/Issue";

export default async function IssueToolbar({ issue }: { issue: Issue }) {
  return (
    <div className="flex flex-col gap-2">
      <AssigneeSelect issue={issue} />
      <EditButton issueId={issue.id} />
      <DeleteButton issueId={issue.id} />
      <Toaster />
    </div>
  );
}
