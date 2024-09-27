import { Box, Card, Stack, Typography } from '@mui/material'
import { GenerateWords } from './components/GenerateWords'
import SolvePuzzle from './components/SolvePuzzle'

function App() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      textAlign='center'
      sx={{ p: 4 }}
    >
      <Typography variant='h3' sx={{ mb: 2 }}>
        Number Word Finder
      </Typography>
      <Card>
        <Stack>
          <Typography>Puzzle Generator</Typography>
          <GenerateWords />
        </Stack>
        <Stack>
          <Typography>Puzzle Solver</Typography>
          <SolvePuzzle />
        </Stack>
      </Card>
    </Box>
  )
}

export default App
