import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { SolvePuzzle } from '../util/interfaces/SolvePuzzle'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SolveRandomizedWordSequence } from '../lib/random-word-solver/SolveRandomizedWordSequence'


const RandomWordSolver: React.FC = () => {
  const [wordSequence, setWordSequence] = useState('')
  const [items, setItems] = useState<SolvePuzzle[]>([])
  const [loading, setLoading] = useState(false)
  const MySwal = withReactContent(Swal)

  const handleSolve = async () => {
    setLoading(true)

    if (wordSequence.trim().length > 0) {
      const results = await new Promise<SolvePuzzle[]>((resolve) => {
        setTimeout(() => {
          resolve(SolveRandomizedWordSequence(wordSequence))
        }, 1000)
      })

      setItems(results)
    } else {
      MySwal.fire({
        title: 'Oops!',
        text: 'Input must not be empty',
        icon: 'warning',
      })
    }

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

      <TextField
        label='Word Sequence'
        multiline
        rows={5}
        sx={{ mb: 2, width: '50%' }}
        value={wordSequence}
        onChange={(e) => setWordSequence(e.target.value)}
      />
      <Button
        onClick={handleSolve}
        variant='contained'
        sx={{ mb: 2, width: '50%' }}
      >
        Solve
      </Button>

      {items.length > 0 && (
        <Box>
          <TableContainer component={Paper} sx={{ flex: 1 }}>
            <Table sx={{ minWidth: 700 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='right'>Value</TableCell>
                  <TableCell align='right'>Word</TableCell>
                  <TableCell align='right'>Word Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.value}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='right'>{row.value}</TableCell>
                    <TableCell align='right'>{row.word}</TableCell>
                    <TableCell align='right'>{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  )
}

export default RandomWordSolver
