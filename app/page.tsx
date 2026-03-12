"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ContractTable } from "@/components/contract-table"
import { NewEstimateForm } from "@/components/new-estimate-form"

export default function Page() {
  const [view, setView] = useState<"table" | "new">("table")

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        {view === "table" ? (
          <ContractTable onNewEstimate={() => setView("new")} />
        ) : (
          <NewEstimateForm onClose={() => setView("table")} />
        )}
      </div>
    </div>
  )
}
