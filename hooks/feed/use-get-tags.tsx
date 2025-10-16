import {useEffect} from 'react'
import {useState} from 'react'
import MOCK_DATA from '@/data/tags.json'

type Item = {
  label: string
  value: string
}

const FETCH_MOCK_DATA = (): Promise<{data: Item[]}> =>
  new Promise((res) => setTimeout(() => res(MOCK_DATA), 2000))

const useGetTags = () => {
  const [data, setData] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setIsLoading(true)
      const {data} = await FETCH_MOCK_DATA()
      setData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {data, isLoading}
}

export default useGetTags
