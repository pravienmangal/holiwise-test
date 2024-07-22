'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FilePlus, AlignLeft, Clipboard, LogOut } from 'react-feather'

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
          <div className="flex shrink items-center gap-2 pt-4 w-[130px]">
            <div className="flex items-center justify-center text-grey-darker">
              <Image
                src="/images/holiwise-logo.png"
                alt="Holiwise Logo Image"
                width={60}
                height={60}
              />
              {!collapsed && (
                <Image
                  className="mt-2 ml-1"
                  src="/images/holiwise-text.png"
                  alt="Holiwise Text Image"
                  width={180}
                  height={48}
                />
              )}
              <span className="sr-only">Holiwise logo</span>
            </div>
          </div>
        </div>
        <div className="pt-4 px-4 border-b-2">
          <button onClick={handleCollapse} aria-label="Collapse menu">
            <div className="flex pt-4 pb-2">
              <AlignLeft className="stroke-content-secondary peer-disabled:stroke-grey-light" />
              {!collapsed && (
                <p className="text-sm uppercase ml-2">Collapse Menu</p>
              )}
            </div>
          </button>
        </div>
        <div className="pt-8 px-4">
          <ul>
            <li className="mb-4 text-sm">
              <Link href="/" className="flex items-center text-grey-darker">
                <FilePlus className="h-[22px] stroke-content-secondary peer-disabled:stroke-grey-light" />
                {!collapsed && <p className="ml-2">My trips</p>}
              </Link>
            </li>
            <li className="mb-4 text-sm">
              <Link href="#" className="flex items-center text-grey-darker">
                <Clipboard className="h-[22px] stroke-content-secondary peer-disabled:stroke-grey-light" />
                {!collapsed && <p className="ml-2">Itineraries</p>}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex px-4 pt-4 pb-2">
          <LogOut className="stroke-content-secondary peer-disabled:stroke-grey-light" />
          {!collapsed && <p className="text-sm ml-2">Log out</p>}
        </div>
      </nav>
    </aside>
  )
}
