import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();

    const user = await db.user.create({
      data: {
        name: name,
        password: password,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("USER_POST, error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
