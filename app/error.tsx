'use client'

import {useEffect} from 'react'

export default function Error({error, reset}: {error: Error; reset: () => void}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">💥 Something went wrong</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}
