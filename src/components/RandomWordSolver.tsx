import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

function solveRandomizedWordSequence(sequence: string) {
  const numberWords = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
  ]

  const result = []

  for (let i = 0; i < numberWords.length; i++) {
    const word = numberWords[i]
    const count = (sequence.match(new RegExp(word, 'g')) || []).length

    if (count > 0) {
      result.push({ value: i, word, count })
    }
  }

  console.log('in :: ', result)

  const formattedResult = result
    .map((item) => `${item.value}: ${item.word} (${item.count})`)
    .join('\n')

  return formattedResult
}

const RandomWordSolver: React.FC = () => {
  const [wordSequence, setWordSequence] = useState('')
  const [item, setItem] = useState('')
  const [loading, setLoading] = useState(false)
  const [error] = useState('')

  const handlSolve = () => {
    setLoading(true)
    setItem(solveRandomizedWordSequence(wordSequence))
    setLoading(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {loading && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={80} />
          <Typography variant='body1'>Processing...</Typography>
        </Box>
      )}
      {error && <Alert severity='error'>{error}</Alert>}

      <TextField
        label='Word Sequence'
        multiline
        rows={5}
        sx={{ mb: 2, width: '50%' }}
        value={wordSequence}
        onChange={(e) => setWordSequence(e.target.value)}
      />
      <Button
        onClick={handlSolve}
        variant='contained'
        sx={{ mb: 2, width: '50%' }}
      >
        Solve
      </Button>

      {item && (
        <Typography variant='subtitle1' sx={{ m: 2 }}>
          Result: {item || ''}
        </Typography>
      )}
    </Box>
  )
}

export default RandomWordSolver
