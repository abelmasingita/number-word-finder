import React from 'react'
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useGeneratedString,
  useGenerateWords,
} from '../hooks/use-number-word-finder'

export const GenerateWords = () => {
  // State for length and word inputs
  const [length, setLength] = React.useState(3)
  const [word, setWord] = React.useState(1)

  // Custom hooks for generating strings and words
  const { item, generateRandomString, loading, error } = useGeneratedString()
  const {
    error: useWordError,
    generateWords,
    loading: useWordLoading,
    item: useWordItem,
  } = useGenerateWords()
  const MySwal = withReactContent(Swal)

  const handleGenerateLength = () => {
    if (length >= 3) {
      // Ensures the length is 3 or more before generating
      generateRandomString(length)
    } else {
      MySwal.fire({
        title: 'Oops!',
        text: 'Input must be greater than 3',
        icon: 'warning',
      })
    }
  }

  const handleGenerateWord = () => {
    if (word >= 1) {
      generateWords(word) // Use the latest state value
    } else {
      MySwal.fire({
        title: 'Oops!',
        text: 'Input must be greater than 1',
        icon: 'warning',
      })
    }
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

      {/* Loading State */}
      {(loading || useWordLoading) && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={80} />
          <Typography variant='body1'>Processing...</Typography>
        </Box>
      )}

      {/* Error State */}
      {(error || useWordError) && (
        <Alert severity='error'>Error : {error || useWordError}</Alert>
      )}

      {/* Input for Length */}
      <TextField
        label='Minimum Length'
        type='number'
        value={length}
        inputProps={{ min: 3 }}
        onChange={(e) => setLength(Number(e.target.value))} // Update state on change
        sx={{ mb: 2, width: '50%' }}
      />
      <Button
        variant='contained'
        onClick={handleGenerateLength} // Ensure this uses the latest value from state
        disabled={loading}
        sx={{ mb: 2, width: '50%' }}
        id='generatebyLength'
      >
        Generate by Minimum Length
      </Button>
      {/* Display Result */}
      {item && (
        <Typography variant='subtitle1' sx={{ m: 2 }}>
          Result: {item?.wordSequence || ''}
        </Typography>
      )}

      {/* Input for Words */}
      <TextField
        label='Minimum Words'
        type='number'
        value={word}
        inputProps={{ min: 1 }}
        onChange={(e) => setWord(Number(e.target.value))} // Update state on change
        sx={{ mb: 2, width: '50%' }}
      />
      <Button
        variant='contained'
        onClick={handleGenerateWord} // Ensure this uses the latest value from state
        disabled={useWordLoading}
        sx={{ mb: 2, width: '50%' }}
      >
        Generate by Number of Words
      </Button>

      {/* Display Result */}
      {useWordItem && (
        <Typography variant='subtitle1' sx={{ m: 2 }}>
          Result: {useWordItem?.wordSequence || ''}
        </Typography>
      )}
    </Box>
  )
}
