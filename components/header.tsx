"use client"

import { Bell, Home, X } from "lucide-react"

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-blue-600">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-800">智慧政企</span>
        </div>
        <div className="ml-6 flex items-center gap-1 border-l border-gray-200 pl-6">
          <div className="flex items-center gap-1 rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">
            <Home className="h-4 w-4" />
            <span>首页</span>
          </div>
          <div className="flex items-center gap-1 rounded bg-gray-100 px-3 py-1 text-sm text-gray-800">
            <span>合同收支概算</span>
            <X className="h-3 w-3 cursor-pointer text-gray-400 hover:text-gray-600" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
            <div className="flex h-full w-full items-center justify-center bg-blue-100 text-sm font-medium text-blue-600">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
