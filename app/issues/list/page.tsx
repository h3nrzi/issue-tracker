import IssuesTable from "./issues-table";
import IssuesToolbar from "./issues-toolbar";
import getIssues from "@/lib/queries/getIssues";

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <>
      <IssuesToolbar />
      <IssuesTable issues={issues} />
    </>
  );
}
