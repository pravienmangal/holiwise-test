'use client'

import React, { useState } from 'react'

const AddBoardModal: React.FC<{
  onClose: () => void
  onConfirm: (board: { name: string; description: string }) => void
}> = ({ onClose, onConfirm }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleConfirm = () => {
    if (name && description) {
      onConfirm({ name, description })
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Add New Board</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            aria-label="Cancel"
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            aria-label="Confirm"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBoardModal
