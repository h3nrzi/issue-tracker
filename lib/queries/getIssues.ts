import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";

async function getIssues(): Promise<Issue[]> {
  return prisma.issue.findMany();
}

export default getIssues;
