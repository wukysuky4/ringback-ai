import type { Lead } from "@/components/leads-table"

// Demo data
export const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    serviceType: "HVAC Repair",
    urgency: "high",
    status: "new",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Mike Chen",
    phone: "(555) 234-5678",
    serviceType: "Plumbing",
    urgency: "medium",
    status: "contacted",
    createdAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    phone: "(555) 345-6789",
    serviceType: "Electrical",
    urgency: "low",
    status: "converted",
    createdAt: "2024-01-14T16:45:00Z",
  },
  {
    id: "4",
    name: "David Kim",
    phone: "(555) 456-7890",
    serviceType: "Roofing",
    urgency: "high",
    status: "new",
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    phone: "(555) 567-8901",
    serviceType: "Landscaping",
    urgency: "low",
    status: "lost",
    createdAt: "2024-01-13T11:00:00Z",
  },
  {
    id: "6",
    name: "James Wilson",
    phone: "(555) 678-9012",
    serviceType: "HVAC Maintenance",
    urgency: "medium",
    status: "new",
    createdAt: "2024-01-15T08:00:00Z",
  },
]

export type Settings = {
  businessName: string
  notificationPhone: string
}

export const initialSettings: Settings = {
  businessName: "Acme Services",
  notificationPhone: "(555) 000-0000",
}
