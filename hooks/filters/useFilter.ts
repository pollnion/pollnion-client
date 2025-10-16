'use client'

import {useRouter, usePathname, useSearchParams} from 'next/navigation'

const useFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pushQuery = (obj: Record<string, any>) => {
    // Merge existing search params with new ones (obj)
    const params = new URLSearchParams(searchParams?.toString() || '')

    Object.entries(obj).forEach(([key, val]) => {
      if (val === '' || val == null) {
        params.delete(key)
      } else {
        params.set(key, String(val))
      }
    })

    const queryString = params.toString()

    // Decide base path dynamically — here just re-use current pathname
    const basePath = pathname || '/'

    const url = queryString ? `${basePath}?${queryString}` : basePath

    router.push(url)
  }

  return {pushQuery}
}

export default useFilter
