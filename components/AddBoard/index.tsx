'use client'

import React, { useState } from 'react'
import { Plus } from 'react-feather'
import AddBoardModal from '../AddBoardModal'

interface AddBoardProps {
  addBoard: (name: string, description: string) => void
}

const AddBoard: React.FC<AddBoardProps> = ({ addBoard }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleAddBoard = (board: { name: string; description: string }) => {
    addBoard(board.name, board.description)
    setModalOpen(false)
  }

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="flex flex-col items-center justify-center min-w-[350px] h-[250px] bg-gray-200 border border-dashed border-gray-400 rounded-lg cursor-pointer"
      >
        <Plus size={48} />
        <p className="font-semibold">Create new trip</p>
      </button>
      {modalOpen && (
        <AddBoardModal
          onClose={() => setModalOpen(false)}
          onConfirm={handleAddBoard}
        />
      )}
    </div>
  )
}

export default AddBoard
