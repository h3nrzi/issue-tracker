import IssuesTable from "./issues-table";
import IssuesToolbar from "./issues-toolbar";
import getIssues from "@/lib/getIssues";

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <>
      <IssuesToolbar />
      {issues.length > 0 ? (
        <IssuesTable issues={issues} />
      ) : (
        <p>No issue found! Please create an issue...</p>
      )}
    </>
  );
}
