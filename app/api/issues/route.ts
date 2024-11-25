import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/api/issues/schema";
import prisma from "@/prisma/client";
import { CreateIssueDto } from "@/app/api/issues/dto";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function POST(request: NextRequest) {
  const { title, description }: CreateIssueDto = await request.json();

  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ errors: { server: "Unauthorized" } }, { status: 401 });

  const validatedFields = await createIssueSchema.safeParseAsync({ title, description });
  if (!validatedFields.success) return NextResponse.json({ errors: validatedFields.error.flatten().fieldErrors }, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
      // @ts-expect-error : property id does not exist on type
      userCreatedIssueId: session?.user.id
    }
  });
  revalidatePath("/issues");

  return NextResponse.json(newIssue, { status: 201 });
}
