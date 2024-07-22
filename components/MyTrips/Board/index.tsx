'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useDrop } from 'react-dnd'
import { useRouter } from 'next/navigation'
import ImageCard from '@/components/ImageCard'
import { Destination } from '../MyTrips.types'
import { envConfig } from '@/config/envConfig'

const { baseURL, boards } = envConfig
const ItemType = 'ITEM'

interface BoardProps {
  id: string
  name: string
  description: string
  avatar: string
}

const BoardContent: React.FC<BoardProps> = ({ id, name, description }) => {
  const [droppedItems, setDroppedItems] = useState<Destination[]>([])

  useEffect(() => {
    const fetchDroppedItems = async () => {
      try {
        const response = await fetch(`${baseURL}${boards}/${id}`)
        const data = await response.json()
        setDroppedItems(data.destinations || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchDroppedItems()
  }, [id])

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: async (item: Destination) => {
      const itemKey = `${item.imageUrl}-${item.title}`
      const existingItemInState = droppedItems.find(
        (existingItem) =>
          `${existingItem.imageUrl}-${existingItem.title}` === itemKey
      )

      if (!existingItemInState) {
        try {
          const newDestinations = [...droppedItems, item]
          const response = await fetch(`${baseURL}${boards}/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ destinations: newDestinations }),
          })

          if (!response.ok) {
            throw new Error('Failed to update board')
          }

          setDroppedItems(newDestinations)
        } catch (error) {
          console.error('Error updating board:', error)
        }
      } else {
        console.log('Duplicate item detected, not adding:', item)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const router = useRouter()

  const handleClick = () => {
    const encodedItems = encodeURIComponent(JSON.stringify(droppedItems))
    const queryParams = new URLSearchParams({
      items: encodedItems,
      id: id,
    })
    router.push(`/board?${queryParams.toString()}`)
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <button onClick={handleClick} className="relative">
        <div
          ref={drop as unknown as React.RefObject<HTMLDivElement>}
          className="min-w-[350px] h-[250px] flex flex-col justify-between relative cursor-pointer"
        >
          <div className="w-[120px] h-4 bg-primary-darker rounded-t-lg shadow-black"></div>
          <div className="flex flex-col justify-center items-center h-full bg-primary border border-[#d0d0d5] rounded-lg rounded-tl-none shadow-md overflow-hidden">
            {droppedItems.length === 0 ? (
              <p className="text-center text-gray-500 font-semibold">
                Drop items here
              </p>
            ) : (
              droppedItems.map((item) => (
                <ImageCard
                  key={item.id}
                  backgroundImage={item.imageUrl}
                  title={item.title}
                  variation="secondary"
                />
              ))
            )}
          </div>
        </div>
      </button>
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

const Board: React.FC<BoardProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <BoardContent {...props} />
  </Suspense>
)

export default Board
