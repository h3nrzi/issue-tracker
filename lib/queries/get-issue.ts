import prisma from "@/prisma/client";

async function getIssue(issueId: number) {
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

export default getIssue;
