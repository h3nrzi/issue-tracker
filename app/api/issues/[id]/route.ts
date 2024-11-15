import { NextRequest, NextResponse } from "next/server";
import { UpdateIssueDto } from "@/dto/issue.dto";
import { updateIssueSchema } from "@/schema/issue.schema";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

  return NextResponse.json(updatedIssue, { status: 200 });
}
