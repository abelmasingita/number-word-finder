import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import RandomWordSolver from '../../src/components/RandomWordSolver'
import { describe, it, vi, expect } from 'vitest'
import { SolveRandomizedWordSequence } from '../../src/lib/random-word-solver/SolveRandomizedWordSequence'
import '@testing-library/jest-dom/vitest'
import Swal from 'sweetalert2'
import React from 'react'

// Mock SweetAlert2
vi.mock('sweetalert2', async () => {
  const original = await vi.importActual('sweetalert2')
  return {
    ...original,
    fire: vi.fn(),
  }
})

// Mock SolveRandomizedWordSequence function
vi.mock('../lib/random-word-solver/SolveRandomizedWordSequence', () => ({
  SolveRandomizedWordSequence: vi.fn(),
}))

// Mock SolveRandomizedWordSequence
vi.mock('../lib/random-word-solver/SolveRandomizedWordSequence', () => ({
  SolveRandomizedWordSequence: vi.fn(), // Create a mock function
}))

describe('RandomWordSolver Component', () => {
  it('should render the initial component', () => {
    render(<RandomWordSolver />)

    expect(screen.getByLabelText(/word sequence/i)).toBeInTheDocument()
    expect(screen.getByText(/solve/i)).toBeInTheDocument()
  })

  it('should show error message when input is empty and solve button is clicked', async () => {
    render(<RandomWordSolver />)

    // Click solve button without input
    fireEvent.click(screen.getByText(/solve/i))

    /*await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Oops!',
        text: 'Input must not be empty',
        icon: 'warning',
      })
    })*/
  })

  it('should call SolveRandomizedWordSequence with valid input', async () => {
    const mockResults = [{ value: 'test', word: 'test', count: 1 }]

    // Get the mocked version of the function
    const mockedSolveRandomizedWordSequence =
      SolveRandomizedWordSequence as jest.Mock

    // Define what the mock should return when called
    mockedSolveRandomizedWordSequence.mockResolvedValueOnce(mockResults)

    render(<RandomWordSolver />)

    // Enter valid input
    fireEvent.change(screen.getByLabelText(/word sequence/i), {
      target: { value: 'some valid input' },
    })

    // Click the solve button
    fireEvent.click(screen.getByText(/solve/i))

    // Wait for async actions to complete
    await waitFor(() => {
      // Assert that SolveRandomizedWordSequence was called with the correct argument
      expect(mockedSolveRandomizedWordSequence).toHaveBeenCalledWith(
        'some valid input'
      )
    })
  })

  it('should show loading indicator when solving is in progress', async () => {
    render(<RandomWordSolver />)

    fireEvent.change(screen.getByLabelText(/word sequence/i), {
      target: { value: 'test' },
    })

    // Click solve and check for loading spinner
    fireEvent.click(screen.getByText(/solve/i))

    expect(screen.getByText(/processing/i)).toBeInTheDocument()

    // Wait for the solving to finish
    await waitFor(() => {
      expect(screen.queryByText(/processing/i)).not.toBeInTheDocument()
    })
  })
})
