import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { z } from "zod";

const statusSchema = z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]);

interface Query {
  status?: string;
}

async function getIssues(query: Query): Promise<Issue[]> {
  if (query.status) {
    const validatedStatus = statusSchema.safeParse(query.status);
    // if (!validatedStatus.success) throw new Error(`Invalid status: ${query.status}`);
    if (!validatedStatus.success) query.status = undefined;
  }

  return prisma.issue.findMany({
    where: {
      status: query.status,
    },
  });
}

export default getIssues;
