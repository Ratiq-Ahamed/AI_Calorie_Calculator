import { type NextRequest, NextResponse } from "next/server"
import { analyzeFood } from "@/lib/gemini-server"

export async function POST(request: NextRequest) {
  try {
    const { foodDescription } = await request.json()

    if (!foodDescription) {
      return NextResponse.json(
        { error: "Food description is required" },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured. Please add it to your environment variables." },
        { status: 500 }
      )
    }

    const nutritionData = await analyzeFood(foodDescription)

    return NextResponse.json(nutritionData)
  } catch (error) {
    console.error("Error in analyze-food API route:", error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: "Failed to analyze food. Please try again or enter details manually." },
      { status: 500 }
    )
  }
}

