import { useEffect, useState } from 'react'
import useGet from '../lib/api/use-get'
import { GeneratedWord } from '../util/interfaces/GeneratedWord'
import usePost from '../lib/api/use-post'

const useGeneratedString = () => {
  const [length, setLength] = useState<number | null>(null)
  const { fetchData, loading, error } = useGet<GeneratedWord>(
    length !== null ? `/api/PuzzleGenerator/minLength/${length}` : '',
    true
  )

  const [item, setItem] = useState<GeneratedWord>({
    length: 0,
    wordCount: 0,
    wordSequence: '',
  })

  const handleGenerate = async (newLength: number) => {
    setLength(newLength)
    try {
      const response = await fetchData()
      if (response) {
        setItem(response)
      } else {
        console.error('Error ', response)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  return {
    item,
    loading,
    error,
    handleGenerate,
  }
}

const useGenerateWords = (words: number) => {
  const { fetchData, loading, error } = useGet<GeneratedWord>(
    `/api/PuzzleGenerator/words/${words}`,
    true
  )
  const [item, setItem] = useState<GeneratedWord>({
    length: 0,
    wordCount: 0,
    wordSequence: '',
  })

  useEffect(() => {
    console.log('here ::')
    fetchData()
      .then((response) => {
        if (!response.error && response.result) {
          setItem(response.result)
        }
      })
      .catch((err) => {
        console.log('\n\response', err)
      })
  }, [words])

  return {
    item,
    loading,
    error,
  }
}

const useSolvePuzzle = () => {
  const [sequence, setSequence] = useState<string | null>(null)
  const { postData, loading, error, data } = usePost<GeneratedWord>(
    sequence !== null ? `api/PuzzleSolver` : ''
  )

  const [item, setItem] = useState<GeneratedWord[]>([
    {
      length: 0,
      wordCount: 0,
      wordSequence: '',
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
        console.error('Error ', response)
      }
    } catch (err) {
      console.error('Post error:', err)
    }
  }

  return {
    item,
    loading,
    error,
    handleSolve,
  }
}

export { useGeneratedString, useGenerateWords, useSolvePuzzle }
