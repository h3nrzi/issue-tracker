import { NextRequest, NextResponse } from "next/server";
import { UpdateIssueDto } from "@/dto/issue.dto";
import { updateIssueSchema } from "@/schema/issue.schema";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { errors: { server: "Unauthorized" } },
      { status: 401 },
    );
  }

  const { title, description } = (await request.json()) as UpdateIssueDto;

  const validatedFields = await updateIssueSchema.safeParseAsync({
    title,
    description,
  });

  if (!validatedFields.success)
    return NextResponse.json(
      { errors: validatedFields.error.flatten().fieldErrors },
      { status: 400 },
    );

  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue)
    return NextResponse.json(
      { errors: { other: "Invalid issue" } },
      { status: 404 },
    );

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: { title, description },
  });

  revalidatePath("/issues");

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { errors: { server: "Unauthorized" } },
      { status: 401 },
    );
  }

  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue)
    return NextResponse.json(
      { errors: { other: "Invalid issue" } },
      { status: 404 },
    );

  await prisma.issue.delete({
    where: { id: +params.id },
  });

  revalidatePath("/issues");

  return NextResponse.json({});
}
