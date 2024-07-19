import React from 'react'
import { Heart, ArrowUp, Trash2 } from 'react-feather'

type ImageCardProps = {
  backgroundImage: string
  title: string
  votes?: number
  onRemove?: () => void
}

const ImageCard: React.FC<ImageCardProps> = ({
  backgroundImage,
  title,
  votes,
  onRemove,
}) => {
  return (
    <div className="relative flex flex-col w-64 rounded-[11px] overflow-hidden">
      <div
        className="relative w-full h-40 bg-cover bg-center rounded-[11px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {onRemove && (
          <div className="absolute top-2 left-2 rounded-[11px] bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer w-10 h-10 flex items-center justify-center">
            <Trash2 onClick={onRemove} />
          </div>
        )}
        <div className="absolute top-2 right-2 rounded-[11px] w-10 h-10 bg-white shadow-md flex justify-center items-center">
          <Heart className="text-black fill-current" />
        </div>
      </div>
      <div className="mt-2 p-2 font-semibold">{title}</div>
      {votes && (
        <div className="flex font-semibold items-center">
          <div className="flex mr-2 p-1 font-semibold bg-gray-100 border rounded-[11px] cursor-pointer">
            <ArrowUp />
            {votes}
          </div>
          You
        </div>
      )}
    </div>
  )
}

export default ImageCard
