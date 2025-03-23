"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, PlusCircle, TrendingUp, Utensils } from "lucide-react"
import CalorieForm from "@/components/calorie-form"
import DailySummary from "@/components/daily-summary"
import RecentMeals from "@/components/recent-meals"
import { useNutrition } from "@/lib/nutrition-context"

export default function Home() {
  const { addMeal, getDailyCalories } = useNutrition()

  const dailyCalories = getDailyCalories()
  const dailyGoal = 2000 // This should come from user settings in a real app
  const remainingCalories = dailyGoal - dailyCalories

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2 font-bold">
              <Utensils className="h-5 w-5" />
              <span>CalorieTracker</span>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  Profile
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  Settings
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Today
                  </Button>
                </div>
              </div>
              <Tabs defaultValue="summary" className="space-y-6">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="meals">Meals</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="space-y-6">
                  <DailySummary />
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Calories Consumed</CardTitle>
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dailyCalories}</div>
                        <p className="text-xs text-muted-foreground">of {dailyGoal} daily goal</p>
                        <Progress value={(dailyCalories / dailyGoal) * 100} className="mt-3" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{remainingCalories}</div>
                        <p className="text-xs text-muted-foreground">calories left today</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,820</div>
                        <p className="text-xs text-muted-foreground">calories per day</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="meals" className="space-y-6">
                  <RecentMeals />
                </TabsContent>
                <TabsContent value="trends" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calorie Trends</CardTitle>
                      <CardDescription>Your calorie intake over the past 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full bg-muted/30 flex items-center justify-center rounded-lg">
                        <p className="text-muted-foreground">Chart visualization would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-8">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Add Food</CardTitle>
                  <CardDescription>Record what you've eaten today</CardDescription>
                </CardHeader>
                <CardContent>
                  <CalorieForm onSubmit={addMeal} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Calories</CardTitle>
                  <CardDescription>Based on your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Goal:</span>
                    <span className="font-medium">{dailyGoal} calories</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Weekly Goal:</span>
                    <span className="font-medium">{dailyGoal * 7} calories</span>
                  </div>
                  <div className="pt-2">
                    <Link href="/profile">
                      <Button variant="outline" size="sm" className="w-full">
                        Update Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} CalorieTracker. All rights reserved.
            </p>
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:underline">Terms</Link>
              <Link href="#" className="hover:underline">Privacy</Link>
              <Link href="#" className="hover:underline">Contact</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

