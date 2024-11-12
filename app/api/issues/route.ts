import { NextRequest, NextResponse } from "next/server";
import { CreateIssueDto, createIssueSchema } from "./schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const { title, description }: CreateIssueDto = await request.json();

  const validatedFields = await createIssueSchema.safeParseAsync({
    title,
    description,
  });

  if (!validatedFields.success)
    return NextResponse.json(
      { status: "fail", errors: validatedFields.error.flatten().fieldErrors },
      { status: 400 },
    );

  const newIssue = await prisma.issue.create({ data: { title, description } });

  return NextResponse.json(newIssue, { status: 201 });
}
