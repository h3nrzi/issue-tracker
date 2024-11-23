import { NextRequest, NextResponse } from "next/server";
import { UpdateIssueDto } from "@/app/api/issues/dto";
import { updateIssueSchema } from "@/app/api/issues/schema";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

interface Params {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { title, description, userId } = (await request.json()) as UpdateIssueDto;

  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ errors: { server: "Unauthorized" } }, { status: 401 });

  const validatedFields = await updateIssueSchema.safeParseAsync({
    title,
    description,
    userId,
  });
  if (!validatedFields.success) return NextResponse.json({ errors: validatedFields.error.flatten().fieldErrors }, { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });
  if (!issue) return NextResponse.json({ errors: { other: "Invalid issue" } }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: { title, description, userId },
  });
  revalidatePath("/issues");

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ errors: { server: "Unauthorized" } }, { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });
  if (!issue) return NextResponse.json({ errors: { other: "Invalid issue" } }, { status: 404 });

  await prisma.issue.delete({ where: { id: +params.id } });
  revalidatePath("/issues");

  return NextResponse.json({});
}
