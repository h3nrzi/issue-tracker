import { Pagination } from "@/components";
import getIssues from "@/lib/queries/get-issues";
import ClientIssuesSection from "./client-issues-section";
import Issue from "@/types/Issue";

interface Props {
  searchParams: { page?: string };
}

export default async function IssuesPage({ searchParams }: Props) {
  const { data, pagination } = await getIssues(searchParams);
  const currentPage = searchParams.page && +searchParams.page >= 1 ? +searchParams.page : 1;

  return (
    <div className="flex flex-col h-[520px]">
      <ClientIssuesSection issues={data as Issue[]} />
      <div className="mt-auto">
        <Pagination itemCount={pagination.issueCount} pageSize={pagination.pageSize} currentPage={currentPage} />
      </div>
    </div>
  );
}
