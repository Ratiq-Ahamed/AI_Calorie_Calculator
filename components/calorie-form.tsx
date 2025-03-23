"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, PlusCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { NutritionData } from "@/lib/gemini-server"

interface CalorieFormProps {
  onSubmit: (data: {
    foodName: string
    calories: number
    protein: number
    carbs: number
    fat: number
    mealType: string
    description: string
  }) => void
}

export default function CalorieForm({ onSubmit }: CalorieFormProps) {
  const [foodName, setFoodName] = useState("")
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [carbs, setCarbs] = useState("")
  const [fat, setFat] = useState("")
  const [mealType, setMealType] = useState("breakfast")
  const [foodDescription, setFoodDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const analyzeFood = async () => {
    if (!foodDescription.trim()) {
      toast({
        title: "Description required",
        description: "Please enter what you ate first.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodDescription }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = typeof data === 'object' && data !== null && 'error' in data 
          ? data.error 
          : "Failed to analyze food"
        console.error("API Error:", errorMessage)
        throw new Error(errorMessage)
      }

      // Type guard to ensure data has the required properties
      if (!data || typeof data !== 'object' || !('foodName' in data) || !('calories' in data)) {
        throw new Error("Invalid nutrition data received from API")
      }

      // Update form fields with the analyzed data
      setFoodName(String(data.foodName))
      setCalories(String(data.calories))
      setProtein(data.protein ? String(data.protein) : "")
      setCarbs(data.carbs ? String(data.carbs) : "")
      setFat(data.fat ? String(data.fat) : "")
      setShowAdvanced(true) // Show the advanced fields after analysis

      toast({
        title: "Analysis complete",
        description: `Analyzed "${data.foodName}" with ${data.calories} calories`,
      })
    } catch (error) {
      console.error("Error analyzing food:", error)
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Could not analyze your food. Please try again or enter details manually.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!foodName || !calories) {
      toast({
        title: "Required fields",
        description: "Please fill in at least the food name and calories.",
        variant: "destructive",
      })
      return
    }

    const caloriesNum = Number(calories)
    if (isNaN(caloriesNum) || caloriesNum <= 0) {
      toast({
        title: "Invalid calories",
        description: "Please enter a valid number of calories.",
        variant: "destructive",
      })
      return
    }

    onSubmit({
      foodName,
      calories: caloriesNum,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      mealType,
      description: foodDescription,
    })

    // Reset form
    setFoodName("")
    setCalories("")
    setProtein("")
    setCarbs("")
    setFat("")
    setFoodDescription("")
    setShowAdvanced(false)

    toast({
      title: "Success",
      description: "Food item added successfully!",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="food-description">What did you eat?</Label>
        <div className="flex gap-2">
          <Textarea
            id="food-description"
            placeholder="e.g., A bowl of oatmeal with banana and honey"
            value={foodDescription}
            onChange={(e) => setFoodDescription(e.target.value)}
            className="flex-1"
          />
        </div>
        <Button type="button" onClick={analyzeFood} variant="secondary" className="w-full" disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze with AI"
          )}
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {showAdvanced ? "Hide advanced fields" : "Show advanced fields"}
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
          {showAdvanced ? "Hide" : "Show"}
        </Button>
      </div>

      {showAdvanced && (
        <>
          <div className="space-y-2">
            <Label htmlFor="food-name">Food Name</Label>
            <Input
              id="food-name"
              placeholder="e.g., Chicken Salad"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="e.g., 350"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="e.g., 20"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="e.g., 30"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fat">Fat (g)</Label>
              <Input
                id="fat"
                type="number"
                placeholder="e.g., 15"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="meal-type">Meal Type</Label>
        <Select value={mealType} onValueChange={setMealType}>
          <SelectTrigger id="meal-type">
            <SelectValue placeholder="Select meal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="snack">Snack</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Food Item
      </Button>
    </form>
  )
}

