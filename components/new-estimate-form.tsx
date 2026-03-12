"use client"

import { useState } from "react"
import { X, Plus, Info, ChevronDown } from "lucide-react"

interface EstimateRow {
  id: number
  incomeCode: string
  incomeCategory: string
  incomeTaxRate: string
  incomeAmount: number
  incomeExTax: number
  expenseCategory: string
  expenseTaxRate: string
  expenseAmount: number
  expenseExTax: number
  selfCapability: string
}

interface NewEstimateFormProps {
  onClose: () => void
}

export function NewEstimateForm({ onClose }: NewEstimateFormProps) {
  const [businessCode, setBusinessCode] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [profitCenter, setProfitCenter] = useState("")
  const [serviceFee, setServiceFee] = useState("0")
  const [rows, setRows] = useState<EstimateRow[]>([])

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        incomeCode: "",
        incomeCategory: "",
        incomeTaxRate: "",
        incomeAmount: 0,
        incomeExTax: 0,
        expenseCategory: "",
        expenseTaxRate: "",
        expenseAmount: 0,
        expenseExTax: 0,
        selfCapability: "",
      },
    ])
  }

  const totalIncomeAmount = rows.reduce((sum, r) => sum + r.incomeAmount, 0)
  const totalIncomeExTax = rows.reduce((sum, r) => sum + r.incomeExTax, 0)
  const totalExpenseAmount = rows.reduce((sum, r) => sum + r.expenseAmount, 0)
  const totalExpenseExTax = rows.reduce((sum, r) => sum + r.expenseExTax, 0)
  const selfCapabilityAmount = rows
    .filter((r) => r.selfCapability === "是")
    .reduce((sum, r) => sum + r.expenseAmount, 0)

  const directMarginRate =
    totalIncomeExTax > 0
      ? (((totalIncomeExTax - totalExpenseExTax) / totalIncomeExTax) * 100).toFixed(2)
      : "0.00"
  const mainBusinessMarginRate = directMarginRate
  const totalProfit = totalIncomeExTax - totalExpenseExTax
  const totalProfitRate =
    totalIncomeExTax > 0
      ? ((totalProfit / totalIncomeExTax) * 100).toFixed(2)
      : "0.00"
  const govProfit = totalProfit
  const govProfitRate = totalProfitRate

  const fmt = (n: number) =>
    "¥" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const pct = (s: string) => s + " %"

  const updateRow = (id: number, field: keyof EstimateRow, value: string | number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">新增概算</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Form fields */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 grid grid-cols-3 gap-6">
            {/* 商机编码 */}
            <div className="flex items-center gap-3">
              <label className="shrink-0 text-sm text-gray-700">
                <span className="text-red-500">*</span> 商机编码
              </label>
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  value={businessCode}
                  onChange={(e) => setBusinessCode(e.target.value)}
                  placeholder="请选择商机编码"
                  className="h-9 flex-1 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                  readOnly
                />
                <button className="h-9 shrink-0 rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-600 hover:bg-gray-50">
                  选择
                </button>
              </div>
            </div>

            {/* 商机名称 */}
            <div className="flex items-center gap-3">
              <label className="shrink-0 text-sm text-gray-700">
                <span className="text-red-500">*</span> 商机名称
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="请选择商机编码查询"
                className="h-9 flex-1 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                readOnly
              />
            </div>

            {/* 利润中心 */}
            <div className="flex items-center gap-3">
              <label className="shrink-0 text-sm text-gray-700">
                <span className="text-red-500">*</span> 利润中心
              </label>
              <div className="relative flex-1">
                <select
                  value={profitCenter}
                  onChange={(e) => setProfitCenter(e.target.value)}
                  className="h-9 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">请选择利润中心</option>
                  <option value="省政企">省政企</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* 中标服务费 */}
          <div className="flex items-center gap-3">
            <label className="shrink-0 text-sm text-gray-700">中标服务费</label>
            <input
              type="text"
              value={serviceFee}
              onChange={(e) => setServiceFee(e.target.value)}
              className="h-9 w-48 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#3b5998] text-white">
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    栏目
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    收入项编码
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    收入类别
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    税率
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    收入合同金额
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    不含税收入
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    支出类别
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    税率
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    支出合同金额
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    不含税支出
                  </th>
                  <th className="border border-[#4a69a8] px-3 py-3 text-center text-sm font-medium">
                    是否自主能力
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Data rows */}
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2 text-center text-sm text-gray-600">
                      {row.id}
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <input
                        type="text"
                        value={row.incomeCode}
                        onChange={(e) => updateRow(row.id, "incomeCode", e.target.value)}
                        className="h-8 w-full rounded border border-gray-300 px-2 text-center text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <select
                        value={row.incomeCategory}
                        onChange={(e) => updateRow(row.id, "incomeCategory", e.target.value)}
                        className="h-8 w-full rounded border border-gray-300 px-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">请选择</option>
                        <option value="产品收入">产品收入</option>
                        <option value="服务收入">服务收入</option>
                        <option value="工程收入">工程收入</option>
                      </select>
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <select
                        value={row.incomeTaxRate}
                        onChange={(e) => updateRow(row.id, "incomeTaxRate", e.target.value)}
                        className="h-8 w-full rounded border border-gray-300 px-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">请选择</option>
                        <option value="6%">6%</option>
                        <option value="9%">9%</option>
                        <option value="13%">13%</option>
                      </select>
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <input
                        type="number"
                        value={row.incomeAmount || ""}
                        onChange={(e) =>
                          updateRow(row.id, "incomeAmount", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 w-full rounded border border-gray-300 px-2 text-right text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <input
                        type="number"
                        value={row.incomeExTax || ""}
                        onChange={(e) =>
                          updateRow(row.id, "incomeExTax", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 w-full rounded border border-gray-300 px-2 text-right text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <select
                        value={row.expenseCategory}
                        onChange={(e) => updateRow(row.id, "expenseCategory", e.target.value)}
                        className="h-8 w-full rounded border border-gray-300 px-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">请选择</option>
                        <option value="产品支出">产品支出</option>
                        <option value="服务支出">服务支出</option>
                        <option value="工程支出">工程支出</option>
                      </select>
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <select
                        value={row.expenseTaxRate}
                        onChange={(e) => updateRow(row.id, "expenseTaxRate", e.target.value)}
                        className="h-8 w-full rounded border border-gray-300 px-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">请选择</option>
                        <option value="6%">6%</option>
                        <option value="9%">9%</option>
                        <option value="13%">13%</option>
                      </select>
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <input
                        type="number"
                        value={row.expenseAmount || ""}
                        onChange={(e) =>
                          updateRow(row.id, "expenseAmount", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 w-full rounded border border-gray-300 px-2 text-right text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <input
                        type="number"
                        value={row.expenseExTax || ""}
                        onChange={(e) =>
                          updateRow(row.id, "expenseExTax", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 w-full rounded border border-gray-300 px-2 text-right text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-200 px-1 py-1">
                      <select
                        value={row.selfCapability}
                        onChange={(e) => updateRow(row.id, "selfCapability", e.target.value)}
                        className="h-8 w-full rounded border border-gray-300 px-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">请选择</option>
                        <option value="是">是</option>
                        <option value="否">否</option>
                      </select>
                    </td>
                  </tr>
                ))}

                {/* Add row button */}
                <tr>
                  <td
                    colSpan={11}
                    className="border border-gray-200 py-4 text-center"
                  >
                    <button
                      onClick={addRow}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 transition-colors hover:border-blue-500 hover:text-blue-500"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </td>
                </tr>

                {/* Summary: 合计 */}
                <tr className="bg-[#e8f5e9]">
                  <td
                    colSpan={4}
                    className="border border-gray-200 px-3 py-3 text-right text-sm font-medium text-gray-700"
                  >
                    合计
                  </td>
                  <td className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700">
                    {fmt(totalIncomeAmount)}
                  </td>
                  <td className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700">
                    {fmt(totalIncomeExTax)}
                  </td>
                  <td className="border border-gray-200 px-3 py-3 text-right text-sm font-medium text-gray-700">
                    合计
                  </td>
                  <td className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700">
                  </td>
                  <td className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700">
                    {fmt(totalExpenseAmount)}
                  </td>
                  <td className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700">
                    {fmt(totalExpenseExTax)}
                  </td>
                  <td className="border border-gray-200 px-3 py-3 text-center text-sm text-gray-700">
                  </td>
                </tr>

                {/* Summary: 毛利率 & 自主能力金额 */}
                <tr className="bg-[#e8f5e9]">
                  <td
                    colSpan={3}
                    className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700"
                  >
                    <span className="inline-flex items-center gap-1">
                      项目直接毛利率
                      <Info className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </td>
                  <td
                    colSpan={2}
                    className="border border-gray-200 px-3 py-3 text-center text-sm text-gray-700"
                  >
                    {pct(directMarginRate)}
                  </td>
                  <td
                    colSpan={2}
                    className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700"
                  >
                    <span className="inline-flex items-center gap-1">
                      主营业务签约毛利率
                      <Info className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </td>
                  <td
                    colSpan={1}
                    className="border border-gray-200 px-3 py-3 text-center text-sm text-gray-700"
                  >
                    {pct(mainBusinessMarginRate)}
                  </td>
                  <td
                    colSpan={2}
                    className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700"
                  >
                    自主能力金额
                  </td>
                  <td className="border border-gray-200 px-3 py-3 text-center text-sm text-gray-700">
                    {fmt(selfCapabilityAmount)}
                  </td>
                </tr>

                {/* Summary: 项目总利润 */}
                <tr className="bg-[#e8f5e9]">
                  <td
                    colSpan={3}
                    className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700"
                  >
                    <span className="inline-flex items-center gap-1">
                      项目总利润
                      <Info className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </td>
                  <td
                    colSpan={3}
                    className="border border-gray-200 px-3 py-3 text-center text-sm text-gray-700"
                  >
                    {fmt(totalProfit)}
                  </td>
                  <td
                    colSpan={3}
                    className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700"
                  >
                    <span className="inline-flex items-center gap-1">
                      项目总利润率
                      <Info className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </td>
                  <td
                    colSpan={2}
                    className="border border-gray-200 px-3 py-3 text-center text-sm text-gray-700"
                  >
                    {pct(totalProfitRate)}
                  </td>
                </tr>

                {/* Summary: 政企/市州项目利润 */}
                <tr className="bg-[#e8f5e9]">
                  <td
                    colSpan={3}
                    className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700"
                  >
                    <span className="inline-flex items-center gap-1">
                      政企/市州项目利润
                      <Info className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </td>
                  <td
                    colSpan={3}
                    className="border border-gray-200 px-3 py-3 text-center text-sm text-gray-700"
                  >
                    {fmt(govProfit)}
                  </td>
                  <td
                    colSpan={3}
                    className="border border-gray-200 px-3 py-3 text-center text-sm font-medium text-gray-700"
                  >
                    <span className="inline-flex items-center gap-1">
                      政企/市州项目利润率
                      <Info className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </td>
                  <td
                    colSpan={2}
                    className="border border-gray-200 px-3 py-3 text-center text-sm text-gray-700"
                  >
                    {pct(govProfitRate)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center justify-center gap-4 border-t border-gray-200 bg-white px-6 py-4">
        <button
          onClick={onClose}
          className="h-9 rounded-md border border-gray-300 bg-white px-6 text-sm text-gray-600 hover:bg-gray-50"
        >
          取 消
        </button>
        <button className="h-9 rounded-md bg-blue-600 px-6 text-sm font-medium text-white hover:bg-blue-700">
          提交
        </button>
      </div>
    </div>
  )
}
