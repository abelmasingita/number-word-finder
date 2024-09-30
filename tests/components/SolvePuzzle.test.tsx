import React from 'react'
import { it, describe, expect, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SolvePuzzle from '../../src/components/SolvePuzzle'
import '@testing-library/jest-dom/vitest'
import axiosMock from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('Solve Puzzle', () => {
  const mock = new MockAdapter(axiosMock)

  beforeEach(() => {
    // Reset mocks before each test
    mock.reset()
  })

  it('renders the Word Generator component', () => {
    render(<SolvePuzzle />)

    expect(screen.getByText('Solve Puzzle')).toBeInTheDocument()
  })

  /*it('fetches and displays generated word string when button is clicked', async () => {
    const mockData = 'onetwothree'
    mock.onGet('/api/PuzzleGenerator/minLength/5').reply(200, mockData)

    render(<SolvePuzzle />)

    fireEvent.click(screen.getByText('Generate by Minimum Length'))

    await waitFor(() => {
      expect(screen.getByTestId('generated-string')).toHaveTextContent(
        'onetwothree'
      )
      expect(screen.getByTestId('generated-string')).toBeInTheDocument()
    })
  })*/
})
