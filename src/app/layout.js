import '../../style/globals.css'
import { Inter } from 'next/font/google'
import  NavBar from './component/Navbar'
import Footer from './component/Footer'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>L´Antonia Sin Tacc</title>
        <link rel="icon" href="./logo.ico" />
      </head>
      
      <body className={inter.className}>
        <NavBar/>
      {children}
      <Footer/>
      </body>
    </html>
  )
}
