import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '.'

describe('Modal Component', () => {
  it('renders correctly when open', () => {
    render(
      <Modal
        isOpen={true}
        title="Test Modal"
        description="This is a test modal."
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('This is a test modal.')).toBeInTheDocument()

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <Modal
        isOpen={false}
        title="Test Modal"
        description="This is a test modal."
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )

    expect(screen.queryByText('Test Modal')).toBeNull()
    expect(screen.queryByText('This is a test modal.')).toBeNull()
    expect(screen.queryByText('Cancel')).toBeNull()
    expect(screen.queryByText('Confirm')).toBeNull()
  })

  it('triggers onCancel callback when cancel button is clicked', () => {
    const onCancelMock = jest.fn()

    render(
      <Modal
        isOpen={true}
        title="Test Modal"
        description="This is a test modal."
        onConfirm={jest.fn()}
        onCancel={onCancelMock}
      />
    )

    fireEvent.click(screen.getByText('Cancel'))
    expect(onCancelMock).toHaveBeenCalledTimes(1)
  })

  it('triggers onConfirm callback when confirm button is clicked', () => {
    const onConfirmMock = jest.fn()

    render(
      <Modal
        isOpen={true}
        title="Test Modal"
        description="This is a test modal."
        onConfirm={onConfirmMock}
        onCancel={jest.fn()}
      />
    )

    fireEvent.click(screen.getByText('Confirm'))
    expect(onConfirmMock).toHaveBeenCalledTimes(1)
  })
})
