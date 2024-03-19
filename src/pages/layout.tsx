import { Poppins } from 'next/font/google'
 

 
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
    <html lang="en" className={`bg-primary_color ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}