import { Geist, Geist_Mono, Inter } from 'next/font/google'

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const fontSize = new Map([
  [-3, 10],
  [-2, 12],
  [-1, 14],
  [0, 16],
  [1, 18],
  [2, 20],
  [3, 24],
  [4, 30],
  [5, 36],
  [6, 48],
  [7, 60],
  [8, 72],
  [9, 18],
])
