import prisma from "@/prisma/client";
import { cache } from "react";


const getIssue = cache((issueId: number) => {
  return prisma.issue.findUnique({
    where: { id: issueId },
    include: { userAssignedIssue: true, userCreatedIssue: true }
  })
})

export default getIssue;
