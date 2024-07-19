import MyTrips from '@/components/MyTrips'

export default function Home() {
  return (
    <div className="flex flex-col py-14">
      <div className="flex flex-col items-center">
        <h1 className="mb-3 text-4xl font-semibold">My trips</h1>
        <p className="mt-3.5 text-gray-500 mb-40">
          Organise all your travel planning in one place
        </p>
      </div>
      <MyTrips />
    </div>
  )
}
