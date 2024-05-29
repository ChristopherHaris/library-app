import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Fetch all books from the "Books" table
    const { data: Books, error } = await supabase.from("Books").select("*");

    // Check if there was an error in the query
    if (error) {
      console.error("Error fetching books:", error.message);
      return new NextResponse("Failed to fetch books", { status: 500 });
    }

    // Check if no books were found
    if (!Books || Books.length === 0) {
      return new NextResponse("Books not found", { status: 404 });
    }

    // Return the fetched books as JSON
    return NextResponse.json(Books);
  } catch (error) {
    // Log any unexpected errors
    console.error("USER_FIND, error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}