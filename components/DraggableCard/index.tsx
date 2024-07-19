import React from 'react'
import { useDrag } from 'react-dnd'
import ImageCard from '@/components/ImageCard'
import { Heart } from 'react-feather'
import { Destination } from '../MyTrips/MyTrips.types'

const ItemType = 'ITEM'

const DraggableCard: React.FC<Destination> = ({ id, imageUrl, title }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, imageUrl, title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={`p-2 ${isDragging ? 'opacity-50' : ''} cursor-grab`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <ImageCard
        backgroundImage={imageUrl}
        title={title}
        icons={<Heart className="text-blck fill-current" />}
      />
    </div>
  )
}

export default DraggableCard
