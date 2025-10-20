import {useEffect} from 'react'
import MOCK_DATA from '@/data/feed.json'
import {FeedItem} from '@/models/feed'
import {useMultiData} from '@/store/useData'
import {useLoading} from '@/store/useLoading'

const FETCH_MOCK_DATA = (): Promise<{data: FeedItem[]}> =>
  new Promise((res) => setTimeout(() => res(MOCK_DATA), 2000))

const useGetFeed = () => {
  const {data, setData} = useMultiData()
  const {isLoading, setLoading} = useLoading()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    try {
      const {data} = await FETCH_MOCK_DATA()
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    console.log('load more...')
  }

  return {data, isLoading, loadMore}
}

export default useGetFeed
