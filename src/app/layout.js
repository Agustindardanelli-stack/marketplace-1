import '../../style/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>L´Antonia Sin Tacc</title>
        <link rel="icon" href="./logo.ico" />
      </head>
      
      <body className={inter.className}>

      {children}
      </body>
    </html>
  )
}
