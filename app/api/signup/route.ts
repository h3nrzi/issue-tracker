import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "./schema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { signupDto } from "@/app/api/signup/dto";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as signupDto;

  const validatedFields = signupSchema.safeParse(body);

  if (!validatedFields.success)
    return NextResponse.json(
      { status: "fail", errors: validatedFields.error.flatten().fieldErrors },
      { status: 400 },
    );

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json(
      { status: "fail", errors: { error: "User already exists" } },
      { status: 400 },
    );

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  newUser.password = null;

  return NextResponse.json({ data: newUser }, { status: 201 });
}
