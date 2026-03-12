"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "我发起的", active: true },
  { label: "待我审批", count: 1, active: false },
  { label: "我已审批", active: false },
  { label: "抄送我的", active: false },
]

const tableData = [
  {
    id: 1,
    code: "2014122944213011",
    name: "宏立城物业手机对讲",
    profitCenter: "省政企",
    serviceFee: 0,
    selfCapability: 0,
    status: "审批中",
  },
]

interface ContractTableProps {
  onNewEstimate?: () => void
}

export function ContractTable({ onNewEstimate }: ContractTableProps) {
  const [activeTab, setActiveTab] = useState("我发起的")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [goToPage, setGoToPage] = useState("1")

  return (
    <div className="flex flex-1 flex-col bg-gray-50 p-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        {/* Tabs */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={cn(
                  "relative rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.label
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {tab.label}
                {tab.count && (
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={onNewEstimate}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            新增收支概算
          </button>
        </div>

        {/* Filters */}
        <div className="mb-4 flex items-center gap-4">
          <div className="relative">
            <select className="h-10 w-48 appearance-none rounded-md border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-500 focus:border-blue-500 focus:outline-none">
              <option>请选择利润中心</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="搜索合同名称、商机名称等关键"
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 pr-10 text-sm focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Search className="h-4 w-4" />
            查询
          </button>
          <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
          <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  序号
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  商机编码
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  商机名称
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  利润中心
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  中标服务费
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  自主能力金额
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  收
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  流程状态
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-700">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-600">
                    {row.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-600">
                    {row.code}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-600">
                    {row.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-600">
                    {row.profitCenter}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-600">
                    {row.serviceFee}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-600">
                    {row.selfCapability}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-600">
                    {/* Empty column */}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm">
                    <span className="text-blue-600">{row.status}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm">
                    <button className="text-blue-600 hover:text-blue-800">
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-start gap-2 text-sm text-gray-600">
          <span>共 1 条</span>
          <div className="relative ml-2">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="h-8 appearance-none rounded border border-gray-300 bg-white px-2 pr-8 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value={10}>10条/页</option>
              <option value={20}>20条/页</option>
              <option value={50}>50条/页</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-400 hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-400 hover:bg-gray-100">
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="ml-2">前往</span>
          <input
            type="text"
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            className="h-8 w-12 rounded border border-gray-300 text-center text-sm focus:border-blue-500 focus:outline-none"
          />
          <span>页</span>
        </div>
      </div>
    </div>
  )
}
