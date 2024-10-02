import React from 'react'
import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import RandomWordSolver, {
  SolveRandomizedWordSequence,
} from '../../src/components/RandomWordSolver'
import '@testing-library/jest-dom/vitest'

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

  it('calls handleSolve when solving puzzle', async () => {
    const mockHandleSolve = vi.fn().mockImplementation((wordSequence) => {
      expect(wordSequence).toBe('Test sequence')
      return [{ value: '1', word: 'One', count: 1 }]
    })

    vi.mocked(SolveRandomizedWordSequence).mockImplementation(async (seq) => {
      await new Promise((resolve) => setTimeout(resolve, 0))
      return Promise.resolve([mockHandleSolve(seq)])
    })

    render(<RandomWordSolver />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'Test sequence' } })

    const solveButton = screen.getByText('Solve')
    fireEvent.click(solveButton)

    await waitFor(() => {
      expect(mockHandleSolve).toHaveBeenCalled()
    })
  })

  /*
  it('displays generated data after solving', async () => {
    const mockItem = [
      { value: '1', word: 'One', count: 1 },
      { value: '2', word: 'Two', count: 2 },
    ]

    vi.mocked(SolveRandomizedWordSequence).mockReturnValueOnce(mockItem)

    render(<RandomWordSolver />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'Test sequence' } })

    const solveButton = screen.getByText('Solve')
    fireEvent.click(solveButton)

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('One')).toBeInTheDocument()
      expect(screen.getByText('Two')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    vi.mocked(SolveRandomizedWordSequence).mockImplementation(() => {
      return new Promise((resolve) => setTimeout(resolve, 1000))
    })

    render(<RandomWordSolver />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'Test sequence' } })

    const solveButton = screen.getByText('Solve')
    fireEvent.click(solveButton)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('handles empty input validation', async () => {
    vi.mocked(SolveRandomizedWordSequence).mockImplementation(() => Promise.resolve([]))

    render(<RandomWordSolver />)

    const solveButton = screen.getByText('Solve')
    fireEvent.click(solveButton)

    await waitFor(() => {
      expect(vi.mocked(Swal.fire)).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Oops!',
        icon: 'warning',
      }))
    })
  })

  it('displays error message', async () => {
    vi.mocked(SolveRandomizedWordSequence).mockImplementation(() => {
      throw new Error('An error occurred')
    })

    render(<RandomWordSolver />)

    const input = screen.getByLabelText('Word Sequence')
    fireEvent.change(input, { target: { value: 'Test sequence' } })

    const solveButton = screen.getByText('Solve')
    fireEvent.click(solveButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('An error occurred')
    })
  })*/
})
