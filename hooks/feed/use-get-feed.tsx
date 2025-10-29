import {useState, useEffect, useCallback} from 'react'
import MOCK_DATA from '@/data/feed.json'
import {FeedItem} from '@/models/feed'

const FETCH_MOCK_DATA = (): Promise<{data: FeedItem[]}> =>
  new Promise((res) => setTimeout(() => res(MOCK_DATA), 2000))

const useGetFeed = () => {
  const [data, setData] = useState<FeedItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getData = useCallback(async () => {
    setIsLoading(true)
    try {
      const {data} = await FETCH_MOCK_DATA()
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const loadMore = () => {
    console.log('load more...')
  }

  return {data, isLoading, loadMore}
}

export default useGetFeed
