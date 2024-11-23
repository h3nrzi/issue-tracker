import IssuesTable from "./issues-table";
import IssuesToolbar from "./issues-toolbar";
import getIssues from "@/lib/queries/getIssues";
import IssuesQuery from "@/types/IssuesQuery";

interface Props {
  searchParams: IssuesQuery;
}

export default async function IssuesPage({ searchParams }: Props) {
  const issues = await getIssues(searchParams);

  return (
    <>
      <IssuesToolbar />
      <IssuesTable issues={issues} query={searchParams} />
    </>
  );
}
