import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function SettingsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your app preferences and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                </div>
                <Switch id="dark-mode" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders to log your meals</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-report">Weekly Report</Label>
                  <p className="text-sm text-muted-foreground">Get a weekly summary of your nutrition</p>
                </div>
                <Switch id="weekly-report" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Units</CardTitle>
              <CardDescription>Configure your preferred measurement units</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <div className="flex rounded-md overflow-hidden">
                    <Button variant="outline" className="rounded-r-none flex-1">
                      kg
                    </Button>
                    <Button variant="outline" className="rounded-l-none flex-1 bg-muted">
                      lbs
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Height</Label>
                  <div className="flex rounded-md overflow-hidden">
                    <Button variant="outline" className="rounded-r-none flex-1">
                      cm
                    </Button>
                    <Button variant="outline" className="rounded-l-none flex-1 bg-muted">
                      ft/in
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-sm">user@example.com</p>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <p className="text-sm">••••••••</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <Button variant="outline">Change Password</Button>
              <Button variant="destructive">Delete Account</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

