import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("📥 Request masuk:", body);

    const googleResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbyCXwtPelPzKBZNhnWtA0VxImJsbL4TWEK1O9zjNsioo4FWkYRe0NUoxWBHhu8eB4ePuA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const resultText = await googleResponse.text();

    console.log("📤 Response dari Google Script:", resultText);

    try {
      const result = JSON.parse(resultText);
      return NextResponse.json(result);
    } catch (jsonErr) {
      console.error("❌ Gagal parse JSON dari response:", resultText);
      return NextResponse.json(
        { result: "error", message: "Invalid JSON dari Google Script" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("❌ Error di API route:", error);
    return NextResponse.json(
      { result: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
