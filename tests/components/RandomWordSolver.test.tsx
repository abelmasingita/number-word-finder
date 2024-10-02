import React from 'react'
import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import RandomWordSolver from '../../src/components/RandomWordSolver'
import '@testing-library/jest-dom/vitest'
import { SolveRandomizedWordSequence } from '../../src/lib/random-word-solver/SolveRandomizedWordSequence'

// Mock the SolveRandomizedWordSequence function
vi.mock('../../src/lib/random-word-solver/SolveRandomizedWordSequence', () => ({
  SolveRandomizedWordSequence: vi.fn(),
}))

describe('RandomWordSolver', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders the Word Sequence input and Solve button', () => {
    render(<RandomWordSolver />)

    expect(screen.getByLabelText('Word Sequence')).toBeInTheDocument()
    expect(screen.getByText('Solve')).toBeInTheDocument()
  })

  it('handles input change', () => {
    render(<RandomWordSolver />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'Test sequence' } })

    expect(input).toHaveValue('Test sequence')
  })

  it('calls SolveRandomizedWordSequence when solving puzzle', async () => {
    const mockResult = [{ value: '1', word: 'One', count: 1 }]

    // Set up the implementation of SolveRandomizedWordSequence
    ;(SolveRandomizedWordSequence as unknown as vi.Mock).mockImplementation(
      async (seq) => {
        expect(seq).toBe('Test sequence')
        return Promise.resolve(mockResult)
      }
    )

    render(<RandomWordSolver />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'Test sequence' } })

    const solveButton = screen.getByText('Solve')
    fireEvent.click(solveButton)

    await waitFor(() => {
      // Expect the mock function to have been called
      expect(SolveRandomizedWordSequence).toHaveBeenCalledWith('Test sequence')

      // Check if the results are rendered in the component
      expect(screen.getByText('One')).toBeInTheDocument()
    })
  })

  it('shows loading state', async () => {
    ;(SolveRandomizedWordSequence as unknown as vi.Mock).mockImplementation(
      () => {
        return new Promise((resolve) => setTimeout(resolve, 1000))
      }
    )

    render(<RandomWordSolver />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'Test sequence' } })

    const solveButton = screen.getByText('Solve')
    fireEvent.click(solveButton)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })
})
