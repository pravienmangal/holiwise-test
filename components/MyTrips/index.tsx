'use client'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableCard from '@/components/DraggableCard'
import Board from './Board'
import { destinations as initialDestinations } from '@/data/destnations'

const MyTrips: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
          {initialDestinations.map((destination) => (
            <DraggableCard key={destination.id} {...destination} />
          ))}
        </div>
        <div className="mt-4 p-4">
          <h2 className="text-xl font-semibold mb-2">My Board</h2>
          <Board />
        </div>
      </div>
    </DndProvider>
  )
}

export default MyTrips
