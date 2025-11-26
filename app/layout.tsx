import { Delius, Luckiest_Guy } from "next/font/google"
import { ReactNode } from "react"
import "./globals.css"
import { MINIAPP, MINIAPP_DESCRIPTION, MINIAPP_TITLE } from "./lib/constants"

const mainFont = Delius({
  variable: "--mainFont",
  weight: ["400"],
  subsets: ["latin"],
})

const titleFont = Luckiest_Guy({
  variable: "--titleFont",
  weight: ["400"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://auth.farcaster.xyz" />
        <link rel="icon" type="image/png" sizes="256x256" href="/images/og/icon.png" />
        <meta name="fc:miniapp" content={JSON.stringify(MINIAPP)} />
        <meta name="description" content={MINIAPP_DESCRIPTION} />
        <title>{MINIAPP_TITLE}</title>
      </head>
      <body className={`${mainFont.variable} ${titleFont.variable} antialiased`}>{children}</body>
    </html>
  )
}
