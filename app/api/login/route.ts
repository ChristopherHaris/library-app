import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();

    const user = await db.user.findFirst({
      where: {
        name: name,
        password: password,
      },
    });

    if (!user) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("USER_FIND, error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
