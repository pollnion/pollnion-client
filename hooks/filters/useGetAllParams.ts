import {useSearchParams} from 'next/navigation'

const useGetAllParams = () => {
  const searchParams = useSearchParams()
  const paramsObj: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    paramsObj[key] = value
  })

  return paramsObj
}

export default useGetAllParams
