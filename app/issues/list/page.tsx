import IssuesTable from "./issues-table";
import IssuesToolbar from "./issues-toolbar";
import getIssues from "@/lib/queries/getIssues";
import IssuesQuery from "@/types/IssuesQuery";
import { Pagination } from "@/components";

interface Props {
  searchParams: IssuesQuery;
}

export default async function IssuesPage({ searchParams }: Props) {
  const { data, pagination } = await getIssues(searchParams);

  const currentPage = (searchParams.page && +searchParams.page >= 1) ? +searchParams.page : 1;

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex-grow">
        <IssuesToolbar/>
        <IssuesTable issues={data}/>
      </div>
      <Pagination itemCount={pagination.issueCount} pageSize={pagination.pageSize} currentPage={currentPage}/>
    </div>

  );
}
