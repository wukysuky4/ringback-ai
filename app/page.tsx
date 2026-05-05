"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { LeadsTable, type Lead } from "@/components/leads-table"
import { StatsCards } from "@/components/stats-cards"
import { Input } from "@/components/ui/input"
import { initialLeads } from "@/lib/leads-store"
import { Search } from "lucide-react"

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStatusChange = (id: string, status: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your missed call leads
          </p>
        </div>

        <div className="mb-8">
          <StatsCards leads={leads} />
        </div>

        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <LeadsTable leads={filteredLeads} onStatusChange={handleStatusChange} />
      </div>
    </DashboardLayout>
  )
}
