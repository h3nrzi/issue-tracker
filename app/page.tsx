import statusCount from "@/lib/queries/status-count";
import IssueSummary from "./issue-summary";

export default async function HomePage() {
  const { open, closed, inProgress } = await statusCount();

  return (
    <>
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
