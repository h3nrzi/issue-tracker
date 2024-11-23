import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { z } from "zod";
import IssuesQuery from "@/types/IssuesQuery";

const statusSchema = z.enum([ "OPEN", "CLOSED", "IN_PROGRESS" ]);
const orderBySchema = z.enum([ "title", "status", "createdAt" ]);
const orderDirectionSchema = z.enum([ "asc", "desc" ]);

async function getIssues(query: IssuesQuery): Promise<Issue[]> {
  if (query.status) {
    const validatedStatus = statusSchema.safeParse(query.status);
    if (!validatedStatus.success) query.status = undefined;
  }

  if (query.orderBy) {
    const validatedOrderBy = orderBySchema.safeParse(query.orderBy);
    if (!validatedOrderBy.success) query.orderBy = undefined;
  }

  if (query.orderDirection) {
    const validatedOrderDirection = orderDirectionSchema.safeParse(query.orderDirection);
    if (!validatedOrderDirection.success) query.orderDirection = undefined;
  }

  return prisma.issue.findMany({
    where: {
      status: query.status
    },
    orderBy: {
      [query.orderBy!]: query.orderDirection
    }
  });
}

export default getIssues;
