import IssuesTable from "./issues-table";
import IssuesToolbar from "./issues-toolbar";
import getIssues from "@/lib/queries/getIssues";

interface Props {
  searchParams: { status: "OPEN" | "CLOSED" | "IN_PROGRESS" };
}

export default async function IssuesPage({ searchParams }: Props) {
  const issues = await getIssues(searchParams);

  return (
    <>
      <IssuesToolbar />
      <IssuesTable issues={issues} />
    </>
  );
}
