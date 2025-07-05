'use client'

import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import Dashboard from '../components/Dashboard'
import LandingPage from '../components/LandingPage'

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    // Mientras carga Clerk
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return <LandingPage />
  }

  return <Dashboard user={user} />
}
