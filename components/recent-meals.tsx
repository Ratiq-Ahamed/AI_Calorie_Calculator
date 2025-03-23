import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { useNutrition } from "@/lib/nutrition-context"

export default function RecentMeals() {
  const { meals, deleteMeal } = useNutrition()

  const today = new Date().toISOString().split("T")[0]
  const todaysMeals = meals.filter((meal) => meal.timestamp.startsWith(today))

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Meals</CardTitle>
        <CardDescription>Food items you've logged today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todaysMeals.map((meal) => (
            <div key={meal.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <div className="font-medium">{meal.foodName}</div>
                <div className="flex text-sm text-muted-foreground">
                  <span>{meal.calories} calories</span>
                  <span className="mx-2">•</span>
                  <span>{meal.mealType}</span>
                  <span className="mx-2">•</span>
                  <span>{formatTime(meal.timestamp)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMeal(meal.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}

          {todaysMeals.length === 0 && (
            <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">No meals logged today</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

