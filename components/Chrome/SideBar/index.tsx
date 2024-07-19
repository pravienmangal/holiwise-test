'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <aside
      className={`transition-all duration-300n h-screen min-h-[500px] shadow ${
        collapsed ? 'w-[64px]' : 'w-[208px]'
      } text-grey-darker h-full`}
    >
      <nav>
        <div className="flex items-center justify-center gap-2 pl-3.5 pr-2 lg:justify-start">
          <div className="flex shrink items-center gap-2 pt-4">
            <div className="inline-flex items-center justify-center gap-2 rounded-[11px] text-base font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 disabled:pointer-events-none text-black">
              <Image
                src="/images/holiwise.svg"
                alt="Holiwise Logo"
                width={240}
                height={80}
              />
              <span className="sr-only">Holiwise logo</span>
            </div>
          </div>
          <button className="items-center justify-center gap-2 text-base font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 disabled:pointer-events-none text-black hidden h-6 w-6 shrink-0 rounded-full bg-gray-50 opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 lg:inline-flex">
            <span className="sr-only">Collapse side menu</span>
          </button>
        </div>
        <button onClick={handleCollapse}>
          <div className="flex px-4 pt-4 pb-2">
            {/* <Menu className="stroke-content-secondary peer-disabled:stroke-grey-light" /> */}
            {!collapsed && (
              <p className="text-sm uppercase ml-2">Collapse Menu</p>
            )}
          </div>
        </button>

        <div className="pt-4 px-4">
          <ul>
            <li className="mb-4 text-sm">
              <Link href="/" className="flex items-center text-grey-darker">
                {/* <Layers className="h-[22px] stroke-content-secondary peer-disabled:stroke-grey-light" /> */}
                {!collapsed && <p className="ml-2">My trips</p>}
              </Link>
            </li>
            <li className="mb-4 text-sm">
              <Link href="#" className="flex items-center text-grey-darker">
                {!collapsed && <p className="ml-2">Itineraries</p>}
              </Link>
            </li>
          </ul>
        </div>

        <button onClick={() => {}}>
          <div className="flex px-4 pt-4 pb-2">
            {/* <LogOut className="stroke-content-secondary peer-disabled:stroke-grey-light" /> */}
            {!collapsed && <p className="text-sm ml-2">Log out</p>}
          </div>
        </button>
      </nav>
    </aside>
  )
}
