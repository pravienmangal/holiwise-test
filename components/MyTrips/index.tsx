'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableCard from '@/components/DraggableCard'
import dynamic from 'next/dynamic'
import AddBoard from '../AddBoard'
import { Destination, Board as BoardType } from './MyTrips.types'
import { envConfig } from '@/config/envConfig'
import { destinations as initialDestinations } from '@/data/destnations'

const { baseURL, boards } = envConfig

const Board = dynamic(() => import('./Board'), {
  suspense: true,
})

const MyTrips: React.FC = () => {
  const [myBoards, setMyBoards] = useState<BoardType[]>([])

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(`${baseURL}${boards}`)
        if (!response.ok) throw new Error('Failed to fetch boards')
        const data = await response.json()
        setMyBoards(data)
      } catch (error) {
        console.error('Error fetching boards:', error)
      }
    }

    fetchBoards()
  }, [])

  const addBoard = async (name: string, description: string) => {
    try {
      const response = await fetch(`${baseURL}${boards}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })

      if (!response.ok) {
        throw new Error('Failed to create new board')
      }

      const newBoard = await response.json()
      setMyBoards((prev) => [...prev, newBoard])
    } catch (error) {
      console.error('Error creating board:', error)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-4 p-4 mb-20">
        <h2 className="text-2xl font-semibold mb-6">My Boards</h2>
        <div className="flex flex-wrap gap-4">
          <AddBoard addBoard={addBoard} />
          {myBoards.map((board) => (
            <Suspense fallback={<div>Loading...</div>} key={board.id}>
              <Board {...board} />
            </Suspense>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-4">
        <h2 className="text-2xl font-semibold mb-2">My saved destinations</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3">
          {initialDestinations.map((destination) => (
            <DraggableCard key={destination.id} {...destination} />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}

export default MyTrips
