import React from 'react'
import { Heart, ArrowUp, Trash2 } from 'react-feather'

type ImageCardProps = {
  backgroundImage: string
  title: string
  votes?: number
  onRemove?: () => void
  variation?: 'secondary'
}

const ImageCard: React.FC<ImageCardProps> = ({
  backgroundImage,
  title,
  votes,
  onRemove,
  variation,
}) => {
  const isSecondary = variation === 'secondary'
  return (
    <div
      className={`relative flex flex-col w-full h-[full] rounded-[11px] overflow-hidden ${
        isSecondary && 'rounded-br-none rounded-bl-none'
      }`}
    >
      <div
        className={`relative w-full h-60 bg-cover bg-center rounded-[11px] ${
          isSecondary &&
          'rounded-br-none rounded-bl-none shadow-md shadow-black'
        }`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {isSecondary && (
          <div className="flex justify-center items-center h-full">
            <h3 className="px-4 py-1 font-semibold text-white bg-black opacity-65 text-left rounded-md">
              {title}
            </h3>
          </div>
        )}

        {onRemove && (
          <div className="absolute top-2 left-2 rounded-[11px] bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer w-10 h-10 flex items-center justify-center">
            <Trash2 onClick={onRemove} />
          </div>
        )}
        {!isSecondary && (
          <div className="absolute top-2 right-2 rounded-[11px] w-10 h-10 bg-white shadow-md flex justify-center items-center">
            <Heart className="text-black fill-current" />
          </div>
        )}
      </div>
      {!isSecondary && <div className="font-semibold mt-3">{title}</div>}
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
