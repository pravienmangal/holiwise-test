'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'

import ImageCard from '@/components/ImageCard'
import Modal from '@/components/Modal'
import { Destination } from '@/components/MyTrips/MyTrips.types'
import { envConfig } from '@/config/envConfig'

const { baseURL, droppedItems } = envConfig
const API_URL = `${baseURL}${droppedItems}`

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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [destinationToRemove, setDestinationToRemove] =
    useState<Destination | null>(null)

  const handleRemoveClick = (destination: Destination) => {
    setDestinationToRemove(destination)
    setIsModalOpen(true)
  }

  const handleConfirmRemove = async () => {
    if (destinationToRemove) {
      try {
        const deleteResponse = await fetch(
          `${API_URL}/${destinationToRemove.id}`,
          {
            method: 'DELETE',
          }
        )

        if (deleteResponse.ok) {
          const updatedDestinations = destinations.filter(
            (dest) => dest.id !== destinationToRemove.id
          )
          setDestinations(updatedDestinations)

          localStorage.setItem(
            'droppedItems',
            JSON.stringify(updatedDestinations)
          )

          const newItemsParam = encodeURIComponent(
            JSON.stringify(updatedDestinations)
          )
          window.history.replaceState(null, '', `?items=${newItemsParam}`)
        } else {
          console.error(
            'Failed to delete item from API:',
            await deleteResponse.text()
          )
        }
      } catch (error) {
        console.error('Error removing item:', error)
      } finally {
        setIsModalOpen(false)
        setDestinationToRemove(null)
      }
    }
  }

  const handleCancelRemove = () => {
    setIsModalOpen(false)
    setDestinationToRemove(null)
  }

  return (
    <div className="flex flex-col py-14">
      <div className="flex justify-between items-center mb-20">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <div className="flex flex-col items-center">
          <h1 className="mb-3 text-4xl font-semibold">My Board</h1>
        </div>
        <h2 className="mt-3.5 text-gray-500">Invite Collaborators</h2>
      </div>
      <div className="flex flex-col space-y-4">
        {destinations.length === 0 ? (
          <h3 className="mt-4 mb-3 text-2xl font-semibold text-center">
            There are no destinations on this trip yet
          </h3>
        ) : (
          <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="relative group bg-white rounded-[11px] overflow-hidden"
              >
                <ImageCard
                  backgroundImage={destination.imageUrl}
                  title={destination.title}
                  onRemove={() => handleRemoveClick(destination)}
                  votes={1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        title={`Remove ${destinationToRemove?.title} from this trip?`}
        description="If you remove this destination from your trip, it will be deleted for all trip collaborators and you will lose all the votes. You can add it again later."
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </div>
  )
}
