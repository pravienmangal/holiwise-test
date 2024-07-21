import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="rounded-t-[40px] bg-gray-50 px-6 py-12 border-t border-gray-300">
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
        By{' '}
        <Image
          src="/images/holiwise-full.svg"
          alt="Holiwise Logo"
          width={100}
          height={24}
          className="w-[100px] h-[24px] object-contain"
          priority
        />
      </div>
    </footer>
  )
}
