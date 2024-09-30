import { Box, Card, Typography } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import { GenerateWords } from '../components/GenerateWords'
import SolvePuzzle from '../components/SolvePuzzle'
import RandomWordSolver from '../components/RandomWordSolver'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function Home() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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
        <Tabs
          orientation='vertical'
          textColor='secondary'
          indicatorColor='secondary'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label='Generator' {...a11yProps(0)} />
          <Tab label='Puzzle Solver' {...a11yProps(1)} />
          <Tab label='Random Word Solver' {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <GenerateWords />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SolvePuzzle />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RandomWordSolver />
        </TabPanel>
      </Card>
    </Box>
  )
}

export default Home
