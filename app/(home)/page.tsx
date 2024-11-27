import statusCount from "@/lib/queries/status-count";
import IssuesChart from "./issues-chart";
import IssuesSummary from "./issues-summary";
import LatestIssuesTable from "./latest-issues-table";
import { Metadata } from "next";

export default async function HomePage() {
  const { open, closed, inProgress } = await statusCount();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[7rem] md:gap-0">
      <div className="flex flex-col items-center justify-between gap-10">
        <IssuesSummary open={open} closed={closed} inProgress={inProgress} />
        <IssuesChart open={open} closed={closed} inProgress={inProgress} />
      </div>
      <div>
        <LatestIssuesTable />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of product issues",
  openGraph: {
    title: "Issue Tracker",
    description: "Tracking your project issues and resolve them by your teamworks",
    url: "https://issue-tracker5432.netlify.app",
    siteName: "Issue Tracker",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dk1j8lhuv/image/upload/v1732715915/issue-tracker/euuiv7dhvzqqnu20127n.jpg",
        width: 1200,
        height: 630,
        alt: "Issue Tracker Overview",
      },
    ],
  },
};
