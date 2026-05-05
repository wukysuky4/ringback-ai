"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Phone, Clock, CheckCircle, TrendingUp } from "lucide-react"
import type { Lead } from "./leads-table"

interface StatsCardsProps {
  leads: Lead[]
}

export function StatsCards({ leads }: StatsCardsProps) {
  const totalLeads = leads.length
  const newLeads = leads.filter((l) => l.status === "new").length
  const convertedLeads = leads.filter((l) => l.status === "converted").length
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: Phone,
      description: "All time",
    },
    {
      label: "New Leads",
      value: newLeads,
      icon: Clock,
      description: "Awaiting contact",
    },
    {
      label: "Converted",
      value: convertedLeads,
      icon: CheckCircle,
      description: "Won deals",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      description: "Overall",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-semibold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
