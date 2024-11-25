import prisma from "@/prisma/client";

export default async function GetLatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true }
  });

  return { data: issues };
};