'use client'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-500 mb-6">
        Oops. That page went missing — like it never existed 😵‍💫
      </p>
      <a
        href="/"
        className="px-5 py-2.5 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
      >
        Take me home 🏠
      </a>
    </div>
  )
}
