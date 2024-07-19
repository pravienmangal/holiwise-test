import React from 'react'
import { ArrowUp } from 'react-feather'

type ImageCardProps = {
  backgroundImage: string
  title: string
  icons?: React.ReactNode
  votes?: number
}

const ImageCard: React.FC<ImageCardProps> = ({
  backgroundImage,
  title,
  icons,
  votes,
}) => {
  return (
    <div className="relative flex flex-col w-64 rounded-[11px] overflow-hidden">
      <div
        className="relative w-full h-40 bg-cover bg-center rounded-[11px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-2 right-2 flex items-start justify-start p-2 bg-white w-10 h-10 rounded-[11px]">
          {icons}
        </div>
      </div>
      <div className="mt-2 p-2 font-semibold">{title}</div>
      {votes && (
        <div className="flex mt-2 p-2 font-semibold bg-gray-300 border rounded-[6px]">
          <ArrowUp />
          {votes} You
        </div>
      )}
    </div>
  )
}

export default ImageCard
