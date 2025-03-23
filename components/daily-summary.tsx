import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useNutrition } from "@/lib/nutrition-context"

export default function DailySummary() {
  const { getDailyCalories, getDailyProtein, getDailyCarbs, getDailyFat } = useNutrition()

  // In a real app, these would come from user settings or profile
  const goals = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 65,
  }

  const calculatePercentage = (consumed: number, goal: number) => {
    return Math.min(Math.round((consumed / goal) * 100), 100)
  }

  const consumed = {
    calories: getDailyCalories(),
    protein: getDailyProtein(),
    carbs: getDailyCarbs(),
    fat: getDailyFat(),
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Nutrition Summary</CardTitle>
        <CardDescription>Your nutrition breakdown for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-medium">Calories</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {consumed.calories} / {goals.calories}
            </div>
          </div>
          <Progress value={calculatePercentage(consumed.calories, goals.calories)} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-medium">Protein</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {consumed.protein}g / {goals.protein}g
            </div>
          </div>
          <Progress value={calculatePercentage(consumed.protein, goals.protein)} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-medium">Carbs</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {consumed.carbs}g / {goals.carbs}g
            </div>
          </div>
          <Progress value={calculatePercentage(consumed.carbs, goals.carbs)} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-medium">Fat</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {consumed.fat}g / {goals.fat}g
            </div>
          </div>
          <Progress value={calculatePercentage(consumed.fat, goals.fat)} />
        </div>
      </CardContent>
    </Card>
  )
}

