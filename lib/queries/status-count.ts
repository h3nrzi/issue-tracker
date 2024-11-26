import prisma from "@/prisma/client";

export default async function statusCount(): Promise<{ open: number, closed: number, inProgress: number }> {
    const open = await prisma.issue.count({ where: { status: "OPEN" } })
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } })
    const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })

    return { open, closed, inProgress }
}