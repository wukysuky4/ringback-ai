"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { initialSettings, type Settings } from "@/lib/leads-store"
import { Check } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In a real app, this would persist to a database
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your business settings and notifications
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Business Information</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your business details for lead notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-foreground">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  value={settings.businessName}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, businessName: e.target.value }))
                  }
                  placeholder="Enter your business name"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  This will be displayed in your lead notifications
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Notifications</CardTitle>
              <CardDescription className="text-muted-foreground">
                Where to send new lead alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notificationPhone" className="text-foreground">
                  Notification Phone Number
                </Label>
                <Input
                  id="notificationPhone"
                  value={settings.notificationPhone}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, notificationPhone: e.target.value }))
                  }
                  placeholder="(555) 000-0000"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  You&apos;ll receive SMS notifications for new missed call leads
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="min-w-[100px]">
              {saved ? (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Saved
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
