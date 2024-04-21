
import { Poppins } from 'next/font/google'
import Head from 'next/head';

import React, { Suspense } from "react";

const roboto_mono = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: "swap",
  subsets: ["latin"],
  variable: '--font-poppins',
  style: ["normal"],
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-primary_color  ${roboto_mono.variable}`}>
      <Head>
        <title>GK Cloud Solutions</title>

      </Head>
      <body>{children}</body>
    </html>
  )
}