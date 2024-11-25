import prisma from "@/prisma/client";

async function getIssues(issueId: number) {
  return prisma.issue.findUnique({
    where: {
      id: issueId
    },
    include: {
      userAssignedIssue: true,
      userCreatedIssue: true
    }
  });
}

export default getIssues;
