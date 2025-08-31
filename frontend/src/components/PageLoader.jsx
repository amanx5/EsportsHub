import React from 'react'

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <p className="mt-4">Page is Loading</p>
    </div>
  )
}
