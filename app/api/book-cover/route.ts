import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // URL parametrelerinden kitap adını al
  const { searchParams } = new URL(req.url);
  const bookTitle = searchParams.get("title");

  if (!bookTitle) {
    return NextResponse.json({ error: "Book title is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const coverUrl = data.items[0].volumeInfo.imageLinks?.thumbnail || "https://placehold.co/20x80";
      return NextResponse.json({ coverUrl });
    }

    return NextResponse.json({ coverUrl: "https://placehold.co/20x80" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book cover" }, { status: 500 });
  }
}
