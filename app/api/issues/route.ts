import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/schema/issue.schema";
import prisma from "@/prisma/client";
import { CreateIssueDto } from "@/dto/issue.dto";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { title, description }: CreateIssueDto = await request.json();

  const validatedFields = await createIssueSchema.safeParseAsync({
    title,
    description,
  });

  if (!validatedFields.success)
    return NextResponse.json(
      { errors: validatedFields.error.flatten().fieldErrors },
      { status: 400 },
    );

  const newIssue = await prisma.issue.create({ data: { title, description } });

  revalidatePath("/issues", "page");

  return NextResponse.json(newIssue, { status: 201 });
}
