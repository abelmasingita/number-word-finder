import React from 'react'
import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { GenerateWords } from '../../src/components/GenerateWords'
import '@testing-library/jest-dom/vitest'
import {
  useGeneratedString,
  useGenerateWords,
} from '../../src/hooks/use-number-word-finder'

// Mock the custom hooks
vi.mock('../../src/hooks/use-number-word-finder', () => ({
  useGeneratedString: vi.fn(),
  useGenerateWords: vi.fn(),
}))

describe('GenerateWords', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Set default return values for the mocked hooks
    ;(useGeneratedString as unknown as vi.Mock).mockReturnValue({
      item: null,
      generateRandomString: vi.fn(),
      loading: false,
      error: null,
    })
    ;(useGenerateWords as unknown as vi.Mock).mockReturnValue({
      item: null,
      generateWords: vi.fn(),
      loading: false,
      error: null,
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders the component correctly', () => {
    render(<GenerateWords />)

    expect(screen.getByText('Random String Generator')).toBeInTheDocument()
    expect(screen.getByLabelText('Minimum Length')).toBeInTheDocument()
    expect(screen.getByLabelText('Minimum Words')).toBeInTheDocument()
    expect(screen.getByText('Generate by Minimum Length')).toBeInTheDocument()
    expect(screen.getByText('Generate by Number of Words')).toBeInTheDocument()
  })

  it('handles length input change', () => {
    render(<GenerateWords />)

    const lengthInput = screen.getByLabelText('Minimum Length')
    fireEvent.change(lengthInput, { target: { value: '5' } })

    expect(lengthInput).toHaveValue(5)
  })

  it('handles word input change', () => {
    render(<GenerateWords />)

    const wordInput = screen.getByLabelText('Minimum Words')
    fireEvent.change(wordInput, { target: { value: '3' } })

    expect(wordInput).toHaveValue(3)
  })

  it('calls generateRandomString when generating by length', async () => {
    const mockGenerateRandomString = vi.fn()
    const mockResult = { wordSequence: 'Test string' }

    ;(useGeneratedString as unknown as vi.Mock).mockImplementation(() => ({
      item: mockResult,
      generateRandomString: mockGenerateRandomString,
      loading: false,
      error: null,
    }))

    render(<GenerateWords />)

    const lengthInput = screen.getByLabelText('Minimum Length')
    fireEvent.change(lengthInput, { target: { value: '5' } })

    const generateButton = screen.getByText('Generate by Minimum Length')
    fireEvent.click(generateButton)

    await waitFor(() => {
      expect(mockGenerateRandomString).toHaveBeenCalledWith(5) // Expect the spy to have been called with the correct argument
      expect(screen.getByTestId('generated-string')).toHaveTextContent(
        'Result: Test string'
      ) // Check if result is displayed
    })
  })

  it('shows loading state when generating', async () => {
    ;(useGeneratedString as unknown as vi.Mock).mockImplementation(() => ({
      item: null,
      generateRandomString: vi.fn(),
      loading: true,
      error: null,
    }))

    render(<GenerateWords />)

    const lengthInput = screen.getByLabelText('Minimum Length')
    fireEvent.change(lengthInput, { target: { value: '5' } })

    const generateButton = screen.getByText('Generate by Minimum Length')
    fireEvent.click(generateButton)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('calls generateWords when generating by number of words', async () => {
    const mockGenerateWords = vi.fn()
    const mockResult = { wordSequence: 'Test words' }

    ;(useGenerateWords as unknown as vi.Mock).mockImplementation(() => ({
      item: mockResult,
      generateWords: mockGenerateWords, // Use the mock function
      loading: false,
      error: null,
    }))

    render(<GenerateWords />)

    const wordInput = screen.getByLabelText('Minimum Words')
    fireEvent.change(wordInput, { target: { value: '3' } }) // Update the input value

    const generateButton = screen.getByText('Generate by Number of Words')
    fireEvent.click(generateButton) // Click the button to trigger the function

    await waitFor(() => {
      expect(mockGenerateWords).toHaveBeenCalledWith(3) // Expect the mock function to be called with the correct argument
      expect(screen.getByText('Result: Test words')).toBeInTheDocument() // Verify the result is displayed
    })
  })

  it('displays error message when there is an error', async () => {
    ;(useGeneratedString as unknown as vi.Mock).mockImplementation(() => ({
      item: null,
      generateRandomString: vi.fn(),
      loading: false,
      error: 'An error occurred',
    }))

    render(<GenerateWords />)

    expect(screen.getByText('Error : An error occurred')).toBeInTheDocument()
  })
})
