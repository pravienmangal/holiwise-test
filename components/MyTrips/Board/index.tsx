'use client'

import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useRouter } from 'next/navigation'
import ImageCard from '@/components/ImageCard'
import { Destination } from '../MyTrips.types'

const ItemType = 'ITEM'
const LOCAL_STORAGE_KEY = 'droppedItems'

const Board: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<Destination[]>(() => {
    const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedItems ? JSON.parse(savedItems) : []
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(droppedItems))
  }, [droppedItems])

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item: Destination) => {
      setDroppedItems((prev) => {
        if (!prev.some((existingItem) => existingItem.id === item.id)) {
          return [...prev, item]
        }
        return prev
      })
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const router = useRouter()

  const handleClick = () => {
    const encodedItems = encodeURIComponent(JSON.stringify(droppedItems))
    const queryParams = new URLSearchParams({ items: encodedItems })
    router.push(`/board?${queryParams.toString()}`)
  }

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`p-4 border-2 border-dashed min-h-[200px] ${
        isOver ? 'bg-green-100' : 'bg-white'
      }`}
    >
      {droppedItems.length === 0 ? (
        <p>Drop items here</p>
      ) : (
        droppedItems.map((item) => (
          <ImageCard
            key={item.id}
            backgroundImage={item.imageUrl}
            title={item.title}
          />
        ))
      )}
      <button
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Board Page
      </button>
    </div>
  )
}

export default Board
