import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '.'

describe('Footer Component', () => {
  it('renders the footer with correct content', () => {
    render(<Footer />)

    expect(screen.getByText('By')).toBeInTheDocument()

    const logo = screen.getByAltText('Holiwise Logo')
    expect(logo).toBeInTheDocument()

    expect(logo).toHaveAttribute('src', '/images/holiwise-full.svg')
    expect(logo).toHaveAttribute('width', '100')
    expect(logo).toHaveAttribute('height', '24')
  })
})
