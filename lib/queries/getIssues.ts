import prisma from "@/prisma/client";
import { z } from "zod";
import IssuesQuery from "@/types/IssuesQuery";

const statusSchema = z.enum([ "OPEN", "CLOSED", "IN_PROGRESS" ]);
const orderBySchema = z.enum([ "title", "status", "createdAt" ]);
const orderDirectionSchema = z.enum([ "asc", "desc" ]);

async function getIssues(query: IssuesQuery) {
  if (query.status) {
    const validatedStatus = statusSchema.safeParse(query.status);
    if (!validatedStatus.success) throw new Error("invalid status");
  }

  if (query.orderBy) {
    const validatedOrderBy = orderBySchema.safeParse(query.orderBy);
    if (!validatedOrderBy.success) throw new Error("invalid orderBy");
  }

  if (query.orderDirection) {
    const validatedOrderDirection = orderDirectionSchema.safeParse(query.orderDirection);
    if (!validatedOrderDirection.success) throw new Error("invalid orderDirection");
  }

  const page = (query.page && +query.page >= 1) ? +query.page : 1;
  const pageSize = 10;
  const where = { status: query.status };

  const issues = await prisma.issue.findMany({
    where,
    orderBy: { [query.orderBy!]: query.orderDirection },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where });

  return {
    pagination: { issueCount, pageSize },
    data: issues
  };
}

export default getIssues;
