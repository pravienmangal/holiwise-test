'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Heart, Trash2 } from 'react-feather'
import ImageCard from '@/components/ImageCard'
import { Destination } from '@/components/MyTrips/MyTrips.types'

export default function Board() {
  const searchParams = useSearchParams()
  const items = searchParams.get('items')

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    let initialDestinations: Destination[] = []
    if (items) {
      try {
        initialDestinations = JSON.parse(decodeURIComponent(items))
      } catch (error) {
        console.error('Failed to parse items from query:', error)
      }
    }
    return initialDestinations
  })

  const handleRemove = (id: string) => {
    const updatedDestinations = destinations.filter((dest) => dest.id !== id)
    setDestinations(updatedDestinations)

    localStorage.setItem('droppedItems', JSON.stringify(updatedDestinations))

    const newItemsParam = encodeURIComponent(
      JSON.stringify(updatedDestinations)
    )
    window.history.replaceState(null, '', `?items=${newItemsParam}`)
  }

  return (
    <div className="flex flex-col py-14">
      <div className="flex flex-col items-center">
        <h1 className="mb-3 text-4xl font-semibold">My Board</h1>
        <p className="mt-3.5 text-gray-500 mb-20">Invite Collaborators</p>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
          {destinations.map((destination) => {
            return (
              <div
                key={destination.id}
                className="relative group bg-white rounded-[11px] overflow-hidden"
              >
                <ImageCard
                  backgroundImage={destination.imageUrl}
                  title={destination.title}
                  onRemove={() => handleRemove(destination.id)}
                  votes={1}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
