import { useState } from 'react'
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material'
import { useGeneratedString } from '../hooks/use-number-word-finder'

export const GenerateWords = () => {
  const [length, setLength] = useState(5)
  const [words, setWords] = useState(5)
  const { item, handleGenerate, loading } = useGeneratedString()

  const handleGenerateClick = () => {
    handleGenerate(length)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4' sx={{ m: 2 }}>
        Random String Generator
      </Typography>
      <TextField
        label='Minimum Length'
        type='number'
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        sx={{ mb: 2, width: '50%' }}
      />
      <Button
        variant='contained'
        onClick={handleGenerateClick}
        disabled={loading}
        sx={{ mb: 2, width: '50%' }}
      >
        {loading ? (
          <CircularProgress size={40} />
        ) : (
          'Generate by Minimum Length'
        )}
      </Button>
      <TextField
        label='Minimum Words'
        type='number'
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        sx={{ mb: 2, width: '50%' }}
      />
      <Button
        variant='contained'
        onClick={handleGenerateClick}
        disabled={loading}
        sx={{ mb: 2, width: '50%' }}
      >
        {loading ? (
          <CircularProgress size={40} />
        ) : (
          'Generate by Number of Words'
        )}
      </Button>
      {item && (
        <Typography variant='subtitle1' sx={{ m: 2 }}>
          Result: {item.wordSequence}
        </Typography>
      )}
    </Box>
  )
}
