'use client'

import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useRouter } from 'next/navigation'

import ImageCard from '@/components/ImageCard'
import { Destination } from '../MyTrips.types'
import { envConfig } from '@/config/envConfig'

const { baseURL, droppedItems } = envConfig
const ItemType = 'ITEM'
const API_URL = `${baseURL}${droppedItems}`

// Utility function to generate a unique key for items
const generateItemKey = (item: Destination) => `${item.imageUrl}-${item.title}`

const Board: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<Destination[]>([])

  useEffect(() => {
    const fetchDroppedItems = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        // Filter unique items based on their content
        const uniqueItems = data.filter(
          (item: Destination, index: number, self: Destination[]) =>
            index ===
            self.findIndex((t) => generateItemKey(t) === generateItemKey(item))
        )
        setDroppedItems(uniqueItems)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDroppedItems()
  }, [])

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: async (item: Destination) => {
      console.log('Item dropped:', item)

      // Check if the item is already in the state based on unique key
      const itemKey = generateItemKey(item)
      const existingItemInState = droppedItems.find(
        (existingItem) => generateItemKey(existingItem) === itemKey
      )

      if (!existingItemInState) {
        console.log('Item not found in droppedItems, proceeding to add.')
        try {
          // Post the new item to the API
          const postResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          })

          if (!postResponse.ok) {
            throw new Error('Failed to post new item')
          }

          const newItem = await postResponse.json()
          console.log('New item added:', newItem)

          // Update the state with the new item
          setDroppedItems((prev) => [...prev, newItem])
        } catch (error) {
          console.error('Error posting data:', error)
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
    const queryParams = new URLSearchParams({ items: encodedItems })
    router.push(`/board?${queryParams.toString()}`)
  }

  return (
    <button onClick={handleClick}>
      <div
        ref={drop as unknown as React.RefObject<HTMLDivElement>}
        className={`w-[400px] h-[250px] flex flex-col justify-between relative cursor-pointer`}
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
  )
}

export default Board
