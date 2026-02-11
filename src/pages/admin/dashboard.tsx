import { z } from "zod"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable, schema } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

const tableData: Array<z.infer<typeof schema>> = [
  {
    id: 1,
    header: "Executive Summary",
    type: "Narrative",
    status: "Done",
    target: "12",
    limit: "20",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Technical Approach",
    type: "Design",
    status: "In Progress",
    target: "8",
    limit: "16",
    reviewer: "Assign reviewer",
  },
  {
    id: 3,
    header: "Risk Register",
    type: "Focus Documents",
    status: "Not Started",
    target: "10",
    limit: "14",
    reviewer: "Assign reviewer",
  },
  {
    id: 4,
    header: "Milestones",
    type: "Table of Contents",
    status: "Done",
    target: "6",
    limit: "10",
    reviewer: "Emily Whalen",
  },
  {
    id: 5,
    header: "Resourcing Plan",
    type: "Capabilities",
    status: "In Progress",
    target: "9",
    limit: "12",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 6,
    header: "Security Review",
    type: "Executive Summary",
    status: "Not Started",
    target: "7",
    limit: "10",
    reviewer: "Assign reviewer",
  },
  {
    id: 7,
    header: "Operational Plan",
    type: "Narrative",
    status: "Done",
    target: "11",
    limit: "18",
    reviewer: "Eddie Lake",
  },
  {
    id: 8,
    header: "Implementation Details",
    type: "Technical Approach",
    status: "In Progress",
    target: "14",
    limit: "22",
    reviewer: "Assign reviewer",
  },
]

export function AdminDashboardPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 py-4">
      <SectionCards />
      <div className="grid grid-cols-1 gap-3 px-3 lg:px-4">
        <ChartAreaInteractive />
        <div className="rounded-lg border border-dashed" />
      </div>
      <div className="px-3 lg:px-4">
        <DataTable data={tableData} />
      </div>
    </div>
  )
}

export default AdminDashboardPage
