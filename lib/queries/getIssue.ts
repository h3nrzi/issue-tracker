import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";

async function getIssues(issueId: number): Promise<Issue | null> {
  return prisma.issue.findUnique({ where: { id: issueId } });
}

export default getIssues;
