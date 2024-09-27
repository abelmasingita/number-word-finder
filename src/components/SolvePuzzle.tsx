import React, { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useSolvePuzzle } from '../hooks/use-number-word-finder'

const SolvePuzzle: React.FC = () => {
  const [wordSequence, setWordSequence] = useState('')
  const { handleSolve, error, item, loading } = useSolvePuzzle()

  const solvePuzzle = async () => {
    handleSolve(wordSequence)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label='Word Sequence'
        multiline
        rows={5}
        value={wordSequence}
        onChange={(e) => setWordSequence(e.target.value)}
      />
      <Button variant='contained' onClick={solvePuzzle}>
        Solve Puzzle
      </Button>

      {item && (
        <div>
          <h3>Solution:</h3>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      )}
    </Box>
  )
}

export default SolvePuzzle
