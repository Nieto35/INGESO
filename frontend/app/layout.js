import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata = {
  title: 'Sistema de prueba',
  description: 'Sistema de prueba con Next.js y Clerk',
}

export default function RootLayout ({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
