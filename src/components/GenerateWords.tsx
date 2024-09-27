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
  const { item, handleGenerate, loading } = useGeneratedString()

  const handleGenerateClick = () => {
    handleGenerate(length)
  }
  return (
    <Box
      sx={{
        alignItems: 'center',
        borderRadius: 1,
        boxShadow: 'var(--mui-shadows-16)',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
      }}
    >
      <Typography variant='h6'>Random String Generator</Typography>
      <TextField
        label='Minimum Length'
        type='number'
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        sx={{ mb: 2 }}
      />

      <TextField
        label='Minimum Words'
        type='number'
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <Button
        variant='contained'
        onClick={handleGenerateClick}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          'Generate by Minimum Length'
        )}
      </Button>
      {item && (
        <Typography variant='body1' sx={{ mt: 2 }}>
          Result: {item.wordSequence}
        </Typography>
      )}
    </Box>
  )
}
