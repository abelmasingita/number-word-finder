import React from 'react'
import { it, describe, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { GenerateWords } from '../../src/components/GenerateWords'
import '@testing-library/jest-dom/vitest'
import axiosMock from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('Generate Random Words ByMinLength', () => {
  const mock = new MockAdapter(axiosMock)

  it('renders the Word Generator component', () => {
    render(<GenerateWords />)

    expect(screen.getByText('Random String Generator')).toBeInTheDocument()
  })

  it('fetches and displays generated word string when button is clicked', async () => {
    const mockData = 'onetwothree'
    mock
      .onGet(
        'https://numberwordgenerator20240927020628.azurewebsites.net/api/PuzzleGenerator/minLength/5'
      )
      .reply(200, mockData)

    render(<GenerateWords />)

    fireEvent.click(screen.getByText('Generate by Minimum Length'))

    await waitFor(() => {
      expect(screen.getByTestId('generated-string')).toHaveTextContent(
        'onetwothree'
      )
      expect(screen.getByTestId('generated-string')).toBeInTheDocument()
    })
  })

  it('handles loading state', async () => {
    mock.onGet('/api/PuzzleGenerator/minLength/5').reply(200, '')

    render(<GenerateWords />)

    fireEvent.click(screen.getByText('Generate by Minimum Length'))

    await waitFor(() => {
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    })
  })

  it('handles error state', async () => {
    mock.onGet('/api/PuzzleGenerator/minLength/5').reply(500, '', {
      message: 'Server error',
    })

    render(<GenerateWords />)

    fireEvent.click(screen.getByText('Generate by Minimum Length'))

    await waitFor(() => {
      expect(screen.getByText('Error :')).toBeInTheDocument()
    })
  })
})

describe('Generate Random Words By MinWords', () => {
  const mock = new MockAdapter(axiosMock)

  it('renders the Word Generator component', () => {
    render(<GenerateWords />)

    expect(screen.getByText('Random String Generator')).toBeInTheDocument()
  })

  it('fetches and displays generated word string when button is clicked', async () => {
    const mockData = 'onetwothree'
    mock
      .onGet(
        'https://numberwordgenerator20240927020628.azurewebsites.net/api/PuzzleGenerator/minLength/5'
      )
      .reply(200, mockData)

    render(<GenerateWords />)

    fireEvent.click(screen.getByText('Generate by Minimum Length'))

    await waitFor(() => {
      expect(screen.getByTestId('generated-string')).toHaveTextContent(
        'onetwothree'
      )
      expect(screen.getByTestId('generated-string')).toBeInTheDocument()
    })
  })

  it('handles loading state', async () => {
    mock.onGet('/api/PuzzleGenerator/minLength/5').reply(200, '')

    render(<GenerateWords />)

    fireEvent.click(screen.getByText('Generate by Minimum Length'))

    await waitFor(() => {
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    })
  })

  it('handles error state', async () => {
    mock.onGet('/api/PuzzleGenerator/minLength/5').reply(500, '', {
      message: 'Server error',
    })

    render(<GenerateWords />)

    fireEvent.click(screen.getByText('Generate by Minimum Length'))

    await waitFor(() => {
      expect(screen.getByText('Error :')).toBeInTheDocument()
    })
  })
})