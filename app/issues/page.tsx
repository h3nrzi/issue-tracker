import prisma from "@/prisma/client";
import IssuesTable from "./issues-table";
import IssuesToolbar from "./issues-toolbar";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <IssuesToolbar />
      <IssuesTable issues={issues} />
    </>
  );
}
