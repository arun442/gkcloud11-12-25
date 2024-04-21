import { Poppins } from 'next/font/google'

import React, { Suspense } from "react";
import { Metadata } from 'next';
const roboto_mono = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: "swap",
  subsets: ["latin"],
  variable: '--font-poppins',
  style: ["normal"],
})
export const metadata: Metadata = {
  title: 'GK Cloud Solutions',
  description: 'GK Cloud Solutions',

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-primary_color  ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}