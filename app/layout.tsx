import { Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const SpaceGrotesk = Space_Grotesk({
  subsets:['latin'],
  weight:['300','400','500','600','700']
})
export const metadata: Metadata = {
  title: 'PriceGrabber',
  description: 'Explore the evolution of prices over time with our comprehensive price history database. Uncover trends, track fluctuations, and make informed decisions. Whether you are a savvy shopper, a data enthusiast, or a business owner, our website provides valuable insights into the pricing dynamics of your favorite products. Discover historical pricing data, analyze patterns, and stay ahead in the market. Your key to informed decision-making starts here!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='max-w-10xl mx-auto'>
          <Navbar/>
        {children}
        </main>
        </body>
    </html>
  )
}
