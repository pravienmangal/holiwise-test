'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Trash2 } from 'react-feather'
import Link from 'next/link'

import ImageCard from '@/components/ImageCard'
import Modal from '@/components/Modal'
import { Destination } from '@/components/MyTrips/MyTrips.types'
import { envConfig } from '@/config/envConfig'

const { baseURL } = envConfig

const BoardContent = () => {
  const searchParams = useSearchParams()
  const items = searchParams.get('items')
  const boardId = searchParams.get('id')

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
  const [boardDetails, setBoardDetails] = useState<{
    name: string
    description: string
  } | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [destinationToRemove, setDestinationToRemove] =
    useState<Destination | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (boardId) {
      const fetchBoardDetails = async () => {
        try {
          const response = await fetch(`${baseURL}/boards/${boardId}`)
          const data = await response.json()

          if (!response.ok) {
            throw new Error('Failed to fetch board data')
          }

          setBoardDetails({
            name: data.name,
            description: data.description,
          })

          setDestinations(data.destinations || [])
        } catch (error) {
          console.error('Error fetching board data:', error)
        }
      }

      fetchBoardDetails()
    }
  }, [boardId])

  useEffect(() => {}, [boardId])

  const handleRemoveClick = (destination: Destination) => {
    setDestinationToRemove(destination)
    setIsModalOpen(true)
  }

  const handleConfirmRemove = async () => {
    if (destinationToRemove && boardId) {
      try {
        const boardResponse = await fetch(`${baseURL}/boards/${boardId}`)
        const boardData = await boardResponse.json()

        if (!boardResponse.ok) {
          throw new Error('Failed to fetch board data')
        }

        const updatedDestinations = boardData.destinations.filter(
          (dest: Destination) => dest.id !== destinationToRemove.id
        )

        const updateResponse = await fetch(`${baseURL}/boards/${boardId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...boardData,
            destinations: updatedDestinations,
          }),
        })

        if (updateResponse.ok) {
          setDestinations(updatedDestinations)
          const newItemsParam = encodeURIComponent(
            JSON.stringify(updatedDestinations)
          )
          window.history.replaceState(
            null,
            '',
            `?items=${newItemsParam}&id=${boardId}`
          )

          localStorage.setItem(
            'droppedItems',
            JSON.stringify(updatedDestinations)
          )
        } else {
          console.error(
            'Failed to update board with new destinations:',
            await updateResponse.text()
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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (boardId) {
      try {
        const deleteResponse = await fetch(`${baseURL}/boards/${boardId}`, {
          method: 'DELETE',
        })

        if (deleteResponse.ok) {
          router.push('/')
        } else {
          console.error('Failed to delete board:', await deleteResponse.text())
        }
      } catch (error) {
        console.error('Error deleting board:', error)
      } finally {
        setIsDeleteModalOpen(false)
      }
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="flex flex-col py-14">
      <div className="flex justify-between items-center mb-20">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <div className="flex items-center">
          <h1 className="mb-3 text-4xl font-semibold">{boardDetails?.name}</h1>
          <button
            onClick={handleDeleteClick}
            className="ml-4 p-1 border text-gray-500 rounded"
          >
            <Trash2 width={20} height={20} />
          </button>
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
      <Modal
        isOpen={isDeleteModalOpen}
        title={`Delete Board: ${boardDetails?.name}?`}
        description="Are you sure you want to delete this board? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  )
}

const Board = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BoardContent />
  </Suspense>
)

export default Board
