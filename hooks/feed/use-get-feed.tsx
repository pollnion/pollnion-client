import {useState} from 'react'
import {useEffect} from 'react'

type MockData = {
  data: {
    id: string
  }[]
}

const MOCK_DATA = {
  data: [
    {
      id: '123123',
    },
  ],
}

const FETCH_MOCK_DATA = (): Promise<MockData> =>
  new Promise((res) => setTimeout(() => res(MOCK_DATA), 2000))

const useGetFeed = () => {
  const [data, setData] = useState<MockData['data']>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setIsLoading(true)
    try {
      const {data} = await FETCH_MOCK_DATA()
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {data, isLoading}
}

export default useGetFeed
