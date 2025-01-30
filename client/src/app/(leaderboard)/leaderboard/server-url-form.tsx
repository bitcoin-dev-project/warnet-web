'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react'

type serverUrlResponse = {
  success: boolean;
  message: string;
  data: string | null;
}

interface ServerUrlInputProps {
  processServerUrl: (formData: FormData) => Promise<{ success: boolean; message: string, data: string | null }>
}

export default function ServerUrlForm({ processServerUrl }: ServerUrlInputProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState<serverUrlResponse | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const response = await processServerUrl(formData)

    setIsLoading(false)
    setState(response)

    if (response?.success && response.data) {
      router.push(`/leaderboard/${response.data}`)
      return 
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Server URL
        </label>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="https://example.com"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Processing...' : 'Submit'}
      </button>
      {state && (
        <div
          className={`mt-4 p-4 rounded-md ${
            state.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {state.message}
        </div>
      )}
    </form>
  )
}

