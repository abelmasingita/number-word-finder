import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SolvePuzzle from '../../src/components/SolvePuzzle'
import { useSolvePuzzle } from '../../src/hooks/use-number-word-finder'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

// Mock the useSolvePuzzle hook
vi.mock('../../src/hooks/use-number-word-finder', () => ({
  useSolvePuzzle: vi.fn(),
}))

vi.mock('../../src/components/ChartVisualization', () => {
  return {
    ChartVisualization: () => <div data-testid='mock-chart'>Mock Chart</div>,
  }
})

describe('SolvePuzzle Component', () => {
  let mockHandleSolve

  beforeEach(() => {
    // Reset the mock implementation before each test
    mockHandleSolve = vi.fn()

    // Mock the useSolvePuzzle hook implementation
    ;(useSolvePuzzle as unknown as vi.Mock).mockImplementation(() => ({
      handleSolve: mockHandleSolve,
      error: null,
      item: null,
      loading: false,
    }))
  })

  it('calls handleSolve when a valid word sequence is entered', async () => {
    ;(useSolvePuzzle as unknown as vi.Mock).mockImplementation(() => ({
      handleSolve: mockHandleSolve,
      error: null,
      item: null,
      loading: false,
    }))

    render(<SolvePuzzle />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'one' } }) // Input a valid sequence

    const solveButton = screen.getByText('Solve Puzzle')
    fireEvent.click(solveButton)

    await waitFor(() => {
      expect(mockHandleSolve).toHaveBeenCalledWith('one')
    })
  })

  it('shows loading indicator when solving puzzle', async () => {
    ;(useSolvePuzzle as unknown as vi.Mock).mockImplementation(() => ({
      handleSolve: mockHandleSolve,
      error: null,
      item: null,
      loading: true,
    }))

    render(<SolvePuzzle />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'one' } })

    const solveButton = screen.getByText('Solve Puzzle')
    fireEvent.click(solveButton)

    expect(screen.getByText('Processing...')).toBeInTheDocument() // Check for loading message
    //expect(screen.getByRole('progressbar')).toBeInTheDocument() // Check for CircularProgress
  })

  it('renders results in a table and a chart', async () => {
    const mockItem = [
      { value: '1', word: 'One', count: 1 },
      { value: '2', word: 'Two', count: 2 },
    ]
    ;(useSolvePuzzle as unknown as vi.Mock).mockImplementation(() => ({
      handleSolve: mockHandleSolve,
      error: null,
      item: mockItem,
      loading: false,
    }))

    render(<SolvePuzzle />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'one two' } })
    fireEvent.click(screen.getByText('Solve Puzzle'))

    await waitFor(() => {
      expect(screen.getByText('One')).toBeInTheDocument()
      expect(screen.getByText('Two')).toBeInTheDocument()
      expect(screen.getByText('Word Count')).toBeInTheDocument()
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByTestId('mock-chart')).toBeInTheDocument() // Check if mock chart renders
    })
  })
})
