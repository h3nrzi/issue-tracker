import { Pagination } from "@/components";
import getIssues from "@/lib/queries/get-issues";
import IssuesTable from "./issues-table";
import IssuesToolbar from "./issues-toolbar";

interface Props {
  searchParams: { page?: string };
}

export default async function IssuesPage({ searchParams }: Props) {
  const { data, pagination } = await getIssues(searchParams);
  const currentPage = searchParams.page && +searchParams.page >= 1 ? +searchParams.page : 1;

  return (
    <div className="flex flex-col h-[520px]">
      <IssuesToolbar />
      <IssuesTable issues={data} />
      <div className="mt-auto">
        <Pagination itemCount={pagination.issueCount} pageSize={pagination.pageSize} currentPage={currentPage} />
      </div>
    </div>
  );
}
