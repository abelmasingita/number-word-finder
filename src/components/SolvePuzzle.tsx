import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material'
import { useSolvePuzzle } from '../hooks/use-number-word-finder'
import { ChartData, ChartVisualization } from './ChartVisualization'

const SolvePuzzle: React.FC = () => {
  const [wordSequence, setWordSequence] = useState('')
  const { handleSolve, error, item, loading } = useSolvePuzzle()

  const solvePuzzle = async () => {
    handleSolve(wordSequence)
  }

  // Prepare chart data
  const chartData: ChartData = {
    series: item?.map((row) => row.count) || [],
    labels: item?.map((row) => row.word) || [],
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField
        label='Word Sequence'
        multiline
        rows={5}
        sx={{ mb: 2, width: '50%' }}
        value={wordSequence}
        onChange={(e) => setWordSequence(e.target.value)}
      />
      <Button
        variant='contained'
        onClick={solvePuzzle}
        sx={{ mb: 2, width: '50%' }}
      >
        {loading ? <CircularProgress size={40} /> : 'Solve Puzzle'}
      </Button>

      {item && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
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
                {item.map((row) => (
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
          <Box sx={{ flex: 1 }}>
            <ChartVisualization data={chartData} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SolvePuzzle
