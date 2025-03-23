"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    age: "30",
    gender: "male",
    weight: "70",
    height: "175",
    activityLevel: "moderate",
  })

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const calculateMaintenanceCalories = () => {
    // This is a simplified calculation - in a real app you'd use a more accurate formula
    const weight = Number.parseFloat(profile.weight)
    const height = Number.parseFloat(profile.height)
    const age = Number.parseFloat(profile.age)

    let bmr = 0

    if (profile.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    }

    const multiplier = activityMultipliers[profile.activityLevel as keyof typeof activityMultipliers]
    return Math.round(bmr * multiplier)
  }

  const maintenanceCalories = calculateMaintenanceCalories()

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details to calculate your maintenance calories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={profile.gender} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity-level">Activity Level</Label>
                <Select value={profile.activityLevel} onValueChange={(value) => handleChange("activityLevel", value)}>
                  <SelectTrigger id="activity-level">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p className="text-sm font-medium">Maintenance Calories:</p>
                <p className="text-2xl font-bold">{maintenanceCalories} calories/day</p>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nutrition Goals</CardTitle>
              <CardDescription>Set your daily nutrition targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calorie-goal">Daily Calorie Goal</Label>
                <Input id="calorie-goal" type="number" defaultValue={maintenanceCalories} />
                <p className="text-xs text-muted-foreground">
                  Recommended: {maintenanceCalories} calories for maintenance
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="protein-goal">Protein (g)</Label>
                  <Input id="protein-goal" type="number" defaultValue={Math.round((maintenanceCalories * 0.3) / 4)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs-goal">Carbs (g)</Label>
                  <Input id="carbs-goal" type="number" defaultValue={Math.round((maintenanceCalories * 0.5) / 4)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat-goal">Fat (g)</Label>
                  <Input id="fat-goal" type="number" defaultValue={Math.round((maintenanceCalories * 0.2) / 9)} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Nutrition Goals</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

