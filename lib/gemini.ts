"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API with your API key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY

if (!apiKey) {
  console.error("Gemini API key is not configured. Please add it to your environment variables.")
}

const genAI = new GoogleGenerativeAI(apiKey || "")
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export interface NutritionData {
  foodName: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export async function analyzeFood(foodDescription: string): Promise<NutritionData> {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured")
  }

  try {
    const prompt = `
      Analyze the following food description and provide nutritional information in JSON format.
      Make your best estimate based on standard nutritional data.
      
      Food: "${foodDescription}"
      
      Return ONLY a valid JSON object with the following structure:
      {
        "foodName": "Descriptive name of the food",
        "calories": number (total calories),
        "protein": number (grams of protein),
        "carbs": number (grams of carbohydrates),
        "fat": number (grams of fat)
      }
      
      Make sure to:
      1. Return ONLY the JSON object, no other text
      2. Use realistic values based on standard portion sizes
      3. Round numbers to whole numbers
      4. Include all required fields
    `

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from the response")
    }

    const nutritionData = JSON.parse(jsonMatch[0]) as NutritionData

    // Validate the response
    if (!nutritionData.foodName || !nutritionData.calories) {
      throw new Error("Invalid nutrition data received")
    }

    return nutritionData
  } catch (error) {
    console.error("Error analyzing food:", error)
    throw error
  }
}

