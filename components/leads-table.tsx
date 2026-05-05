"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Phone, CheckCircle, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type Lead = {
  id: string
  name: string
  phone: string
  serviceType: string
  urgency: "low" | "medium" | "high"
  status: "new" | "contacted" | "converted" | "lost"
  createdAt: string
}

const urgencyConfig = {
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", className: "bg-warning/20 text-warning" },
  high: { label: "High", className: "bg-destructive/20 text-destructive" },
}

const statusConfig = {
  new: { label: "New", icon: Clock, className: "text-chart-2" },
  contacted: { label: "Contacted", icon: Phone, className: "text-chart-3" },
  converted: { label: "Converted", icon: CheckCircle, className: "text-success" },
  lost: { label: "Lost", icon: XCircle, className: "text-muted-foreground" },
}

interface LeadsTableProps {
  leads: Lead[]
  onStatusChange: (id: string, status: Lead["status"]) => void
}

export function LeadsTable({ leads, onStatusChange }: LeadsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground">Name</TableHead>
            <TableHead className="text-muted-foreground">Phone</TableHead>
            <TableHead className="text-muted-foreground">Service Type</TableHead>
            <TableHead className="text-muted-foreground">Urgency</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                No leads yet. Missed calls will appear here.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => {
              const urgency = urgencyConfig[lead.urgency]
              const status = statusConfig[lead.status]
              const StatusIcon = status.icon

              return (
                <TableRow key={lead.id} className="border-border hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground font-mono">{lead.phone}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.serviceType}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("font-medium", urgency.className)}>
                      {urgency.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={cn("h-4 w-4", status.className)} />
                      <span className={cn("text-sm", status.className)}>{status.label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border">
                        <DropdownMenuItem onClick={() => onStatusChange(lead.id, "contacted")}>
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(lead.id, "converted")}>
                          Mark as Converted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(lead.id, "lost")}>
                          Mark as Lost
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
