"use client"

import { useState } from "react"
import {
  Home,
  Grid3X3,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  label: string
  children?: string[]
  expanded?: boolean
}

const menuItems: MenuItem[] = [
  {
    label: "投标管理",
    children: ["我要投标", "资质申请", "投标保证金借支申请", "中标服务费申请"],
    expanded: true,
  },
  {
    label: "合同管理",
    children: ["合同收支概算", "合同信息"],
    expanded: true,
  },
  {
    label: "保证金管理",
    children: ["质量保证金申请", "履约保证金申请"],
    expanded: true,
  },
  {
    label: "项目管理",
    expanded: false,
  },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("合同收支概算")
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    投标管理: true,
    合同管理: true,
    保证金管理: true,
    项目管理: false,
  })

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <div className="flex h-screen">
      {/* Icon sidebar */}
      <div className="flex w-16 flex-col items-center border-r border-gray-200 bg-white py-4">
        <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5z" />
          </svg>
        </div>
        <nav className="flex flex-1 flex-col items-center gap-2">
          <button className="flex flex-col items-center gap-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <Home className="h-5 w-5" />
            <span className="text-xs">主页</span>
          </button>
          <button className="flex flex-col items-center gap-1 rounded-lg bg-blue-50 p-2 text-blue-600">
            <Grid3X3 className="h-5 w-5" />
            <span className="text-xs">数智</span>
          </button>
          <button className="flex flex-col items-center gap-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">消息</span>
          </button>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-2">
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
            <ChevronDown className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 text-blue-600 hover:bg-gray-100">
            <Grid3X3 className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main sidebar menu */}
      <div className="w-56 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">数智</h2>
        </div>
        <nav className="px-2">
          {menuItems.map((menu) => (
            <div key={menu.label} className="mb-1">
              <button
                onClick={() => toggleMenu(menu.label)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4 text-gray-400" />
                  <span>{menu.label}</span>
                </div>
                {expandedMenus[menu.label] ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>
              {expandedMenus[menu.label] && menu.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {menu.children.map((child) => (
                    <button
                      key={child}
                      onClick={() => setActiveItem(child)}
                      className={cn(
                        "w-full rounded-lg px-3 py-2 text-left text-sm",
                        activeItem === child
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {child}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
