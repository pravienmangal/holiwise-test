export interface Destination {
  id: string
  imageUrl: string
  title: string
  favourite: boolean
  category?: string
}

export interface Board {
  id: string
  name: string
  description: string
  avatar: string
  destinations?: Destination[]
}
