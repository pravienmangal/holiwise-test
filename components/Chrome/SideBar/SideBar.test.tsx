import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from '.'

describe('Sidebar Component', () => {
  it('renders the sidebar correctly', () => {
    render(<Sidebar />)

    expect(screen.getByAltText('Holiwise Logo Image')).toBeInTheDocument()

    if (!screen.queryByAltText('Holiwise Text Image')) {
      expect(screen.getByAltText('Holiwise Text Image')).toBeInTheDocument()
    }

    const collapseButton = screen.getByRole('button', {
      name: /Collapse menu/i,
    })
    expect(collapseButton).toBeInTheDocument()

    expect(screen.getByText('My trips')).toBeInTheDocument()
    expect(screen.getByText('Itineraries')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  it('collapses the sidebar when the Collapse button is clicked', () => {
    render(<Sidebar />)

    expect(screen.getByText('Collapse Menu')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Collapse menu/i }))

    expect(screen.queryByText('Collapse Menu')).not.toBeInTheDocument()
    expect(screen.queryByText('My trips')).not.toBeInTheDocument() // Or assert visibility based on your collapsed state implementation
  })

  it('shows the correct elements based on collapse state', () => {
    const { container } = render(<Sidebar />)

    expect(container.querySelector('aside')?.className).toContain('w-[208px]')

    fireEvent.click(screen.getByRole('button', { name: /Collapse menu/i }))

    expect(container.querySelector('aside')?.className).toContain('w-[64px]')
  })
})
