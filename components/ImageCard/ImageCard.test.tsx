import { render, screen, fireEvent } from '@testing-library/react'
import ImageCard from '.'

describe('ImageCard Component', () => {
  const renderImageCard = (props: any) => render(<ImageCard {...props} />)

  it('renders the image card with default props', () => {
    renderImageCard({
      backgroundImage: '/path/to/image.jpg',
      title: 'Sample Image',
    })

    const backgroundDiv = screen.getByTestId('background-div')
    const style = window.getComputedStyle(backgroundDiv)
    expect(style.backgroundImage).toContain('url(/path/to/image.jpg)')

    expect(screen.getByTestId('title')).toHaveTextContent('Sample Image')
  })

  it('renders the image card with secondary variation', () => {
    renderImageCard({
      backgroundImage: '/path/to/image.jpg',
      title: 'Secondary Image',
      variation: 'secondary',
    })

    expect(screen.getByTestId('title')).toHaveTextContent('Secondary Image')

    expect(screen.queryByTestId('remove-button')).not.toBeInTheDocument()
  })

  it('renders votes correctly when provided', () => {
    renderImageCard({
      backgroundImage: '/path/to/image.jpg',
      title: 'Image with Votes',
      votes: 10,
    })

    expect(screen.getByTestId('votes')).toHaveTextContent('10')
    expect(screen.getByTestId('votes')).toHaveTextContent('You')
  })

  it('does not render votes if not provided', () => {
    renderImageCard({
      backgroundImage: '/path/to/image.jpg',
      title: 'Image without Votes',
    })

    expect(screen.queryByTestId('votes')).not.toBeInTheDocument()
  })
})
