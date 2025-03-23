"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface Meal {
  id: number
  foodName: string
  calories: number
  protein: number
  carbs: number
  fat: number
  mealType: string
  description: string
  timestamp: string
}

interface NutritionContextType {
  meals: Meal[]
  addMeal: (meal: Omit<Meal, "id" | "timestamp">) => void
  deleteMeal: (id: number) => void
  getDailyCalories: () => number
  getDailyProtein: () => number
  getDailyCarbs: () => number
  getDailyFat: () => number
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined)

const STORAGE_KEY = "calorie-tracker-meals"

export function NutritionProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([])

  // Load meals from localStorage on mount
  useEffect(() => {
    const savedMeals = localStorage.getItem(STORAGE_KEY)
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals))
    }
  }, [])

  // Save meals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals))
  }, [meals])

  const addMeal = (meal: Omit<Meal, "id" | "timestamp">) => {
    const newMeal: Meal = {
      ...meal,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    }
    setMeals((prev) => [...prev, newMeal])
  }

  const deleteMeal = (id: number) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id))
  }

  const getDailyCalories = () => {
    const today = new Date().toISOString().split("T")[0]
    return meals
      .filter((meal) => meal.timestamp.startsWith(today))
      .reduce((sum, meal) => sum + meal.calories, 0)
  }

  const getDailyProtein = () => {
    const today = new Date().toISOString().split("T")[0]
    return meals
      .filter((meal) => meal.timestamp.startsWith(today))
      .reduce((sum, meal) => sum + meal.protein, 0)
  }

  const getDailyCarbs = () => {
    const today = new Date().toISOString().split("T")[0]
    return meals
      .filter((meal) => meal.timestamp.startsWith(today))
      .reduce((sum, meal) => sum + meal.carbs, 0)
  }

  const getDailyFat = () => {
    const today = new Date().toISOString().split("T")[0]
    return meals
      .filter((meal) => meal.timestamp.startsWith(today))
      .reduce((sum, meal) => sum + meal.fat, 0)
  }

  return (
    <NutritionContext.Provider
      value={{
        meals,
        addMeal,
        deleteMeal,
        getDailyCalories,
        getDailyProtein,
        getDailyCarbs,
        getDailyFat,
      }}
    >
      {children}
    </NutritionContext.Provider>
  )
}

export function useNutrition() {
  const context = useContext(NutritionContext)
  if (context === undefined) {
    throw new Error("useNutrition must be used within a NutritionProvider")
  }
  return context
} 