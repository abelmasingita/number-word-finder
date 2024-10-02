import React from 'react'
import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SolvePuzzle from '../../src/components/SolvePuzzle'
import '@testing-library/jest-dom/vitest'
import { useSolvePuzzle } from '../../src/hooks/use-number-word-finder'

vi.mock('../../src/hooks/use-number-word-finder', () => ({
  useSolvePuzzle: vi.fn().mockImplementation(() => ({
    handleSolve: vi.fn(),
    error: '',
    item: null,
    loading: false,
  })),
}))

describe('Solve Puzzle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders the Word Sequence input and Solve Puzzle button', () => {
    render(<SolvePuzzle />)

    expect(screen.getByLabelText('Word Sequence')).toBeInTheDocument()
    expect(screen.getByText('Solve Puzzle')).toBeInTheDocument()
  })

  it('calls handleSolve when solving puzzle', async () => {
    const mockHandleSolve = vi.fn().mockImplementation((wordSequence) => {
      expect(wordSequence).toBe('Test sequence')
      return Promise.resolve({ item: [{ value: '1', word: 'One', count: 1 }] })
    })

    vi.mocked(useSolvePuzzle).mockImplementation(() => ({
      handleSolve: mockHandleSolve,
      error: '',
      item: null,
      loading: false,
    }))

    render(<SolvePuzzle />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'Test sequence' } })

    const solveButton = screen.getByText('Solve Puzzle')
    fireEvent.click(solveButton)

    await waitFor(() => {
      expect(mockHandleSolve).toHaveBeenCalled()
    })
  })
})
