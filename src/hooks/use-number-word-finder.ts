import { useEffect, useState } from 'react'
import useGet from '../lib/api/use-get'
import { GeneratedWord, SolvePuzzle } from '../util/interfaces/GeneratedWord'
import usePost from '../lib/api/use-post'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal) // used for error handling

const useGeneratedString = () => {
  const [length, setLength] = useState<number | null>(null)
  const [item, setItem] = useState<GeneratedWord>({
    length: 0,
    wordCount: 0,
    wordSequence: '',
  })
  const { fetchData, loading, error } = useGet<GeneratedWord>(
    length !== null ? `/api/PuzzleGenerator/minLength/${length}` : '',
    true
  )

  useEffect(() => {
    const fetchString = async () => {
      try {
        const response = await fetchData()
        if (response) {
          setItem(response)
        } else {
          MySwal.fire({
            title: 'Oops something went wrong!',
            text: '',
            icon: 'error',
          })
          console.error('Error fetching data:', response)
        }
      } catch (err) {
        MySwal.fire({
          title: 'Oops something went wrong!',
          text: '',
          icon: 'error',
        })
        console.error('Fetch error:', err)
      }
    }

    if (length !== null) {
      fetchString()
    }
  }, [length])

  const generateRandomString = (newLength: number) => {
    setLength(newLength) // Trigger state update and re-fetch
  }

  return {
    item,
    loading,
    error,
    generateRandomString,
  }
}

const useGenerateWords = () => {
  const [word, setWord] = useState<number | null>(null)
  const [item, setItem] = useState<GeneratedWord>({
    length: 0,
    wordCount: 0,
    wordSequence: '',
  })
  const { fetchData, loading, error } = useGet<GeneratedWord>(
    word !== null ? `api/PuzzleGenerator/words/${word}` : '',
    true
  )

  // Effect to fetch words when `word` state changes
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetchData()
        if (response) {
          setItem(response)
        } else {
          MySwal.fire({
            title: 'Oops something went wrong!',
            text: '',
            icon: 'error',
          })
          console.error('Error fetching words:', response)
        }
      } catch (err) {
        MySwal.fire({
          title: 'Oops something went wrong!',
          text: '',
          icon: 'error',
        })
        console.error('Fetch error:', err)
      }
    }

    if (word !== null) {
      fetchWords()
    }
  }, [word])

  const generateWords = (newWordCount: number) => {
    setWord(newWordCount) // Update word count and re-fetch
  }

  return {
    item,
    loading,
    error,
    generateWords,
  }
}

const useSolvePuzzle = () => {
  const [sequence, setSequence] = useState<string | null>(null) // Sequence to solve
  const [item, setItem] = useState<SolvePuzzle[] | null>(null) // Solved puzzle data
  const { postData, loading, error, data } = usePost<SolvePuzzle>(
    `api/PuzzleSolver`
  )


  useEffect(() => {
    const solvePuzzle = async () => {
      if (sequence !== null) {
        try {
          const payload = { wordSequence: sequence }
          await postData(payload) 
        } catch (err) {
          MySwal.fire({
            title: 'Oops something went wrong!',
            text: `${err.message}`,
            icon: 'error',
          })
          console.error('Post error:', err)
        }
      }
    }

    if (sequence !== null) {
      solvePuzzle()
    }
  }, [sequence])


  useEffect(() => {
    if (data) {
      setItem(data) 
    } else if (error) {
      MySwal.fire({
        title: 'Oops something went wrong!',
        text: `${error}`,
        icon: 'error',
      })
      console.error('Error ', error)
    }
  }, [data, error])
  
  // Function to trigger puzzle solving
  const handleSolve = (newSequence: string) => {
    setSequence(newSequence)
  }

  return {
    item,
    loading,
    error,
    handleSolve,
  }
}

/**const useSolvePuzzle = () => {
  const [sequence, setSequence] = useState<string | null>(null)
  const { postData, loading, error, data } = usePost<SolvePuzzle>(
    sequence !== null ? `api/PuzzleSolver` : ''
  )

  const [item, setItem] = useState<SolvePuzzle[]>([
    {
      value: 0,
      count: 0,
      word: '',
    },
  ])
  const handleSolve = async (sequence: string) => {
    setSequence(sequence)

    try {
      const d = {
        wordSequence: sequence,
      }
      const response = await postData(d)
      if (data) {
        setItem(data)
      } else {
        MySwal.fire({
          title: 'Oops something went wrong!',
          text: '',
          icon: 'error',
        })
        console.error('Error ', response)
      }
    } catch (err) {
      MySwal.fire({
        title: 'Oops something went wrong!',
        text: '',
        icon: 'error',
      })
      console.error('Post error:', err)
    }
  }

  return {
    item,
    loading,
    error,
    handleSolve,
  }
} */

export { useGeneratedString, useGenerateWords, useSolvePuzzle }
