import {useEffect} from 'react'
import MOCK_DATA from '@/data/tags.json'
import {useLoading} from '@/store/useLoading'
import {useMultiData} from '@/store/useData'

type Item = {
  label: string
  value: string
}

const FETCH_MOCK_DATA = (): Promise<{data: Item[]}> =>
  new Promise((res) => setTimeout(() => res(MOCK_DATA), 2000))

const useGetTags = () => {
  const {data, setData} = useMultiData()
  const {isLoading, setLoading} = useLoading()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true)
      const {data} = await FETCH_MOCK_DATA()
      setData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {data, isLoading}
}

export default useGetTags
