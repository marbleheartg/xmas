import clientErrorHandling from "@/lib/clientErrorsReporting"
import Providers from "@/lib/providers"
import { updateStore } from "@/lib/store"
import sdk from "@farcaster/miniapp-sdk"
import clsx from "clsx"
import NextImage from "next/image"
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import Snowfall from "react-snowfall"
import Header from "./components/Header"
import Menu from "./components/Menu"
import Claim from "./pages/Claim"
import Home from "./pages/Home"
import Promote from "./pages/Promote"

export default function App() {
  useEffect(() => {
    clientErrorHandling()
    ;(async function () {
      try {
        const { user, client } = await sdk.context
        const capabilities = await sdk.getCapabilities()
        updateStore({ user, client, capabilities })
      } catch (err) {}

      try {
        const preloadImage = new Image()
        preloadImage.src = "/images/tree.png"
        preloadImage.onload = async () => await sdk.actions.ready({ disableNativeGestures: true }).catch(() => {})
        preloadImage.onerror = async () => await sdk.actions.ready({ disableNativeGestures: true }).catch(() => {})
      } catch (err) {
      } finally {
        await sdk.actions.ready({ disableNativeGestures: true }).catch(() => {})
      }

      try {
        const { token: session } = await sdk.quickAuth.getToken()
        updateStore({ session })
      } catch (err) {}
    })()
  }, [])

  const [lights, setLights] = useState({ red: false, blue: false, green: false })

  const lightTiming = () => Math.floor(Math.random() * 5000) + 1500

  useEffect(() => {
    const redInterval = setInterval(() => {
      setLights(prev => ({ ...prev, red: !prev.red }))
    }, lightTiming())

    const blueInterval = setInterval(() => {
      setLights(prev => ({ ...prev, blue: !prev.blue }))
    }, lightTiming())

    const greenInterval = setInterval(() => {
      setLights(prev => ({ ...prev, green: !prev.green }))
    }, lightTiming())

    return () => {
      clearInterval(redInterval)
      clearInterval(blueInterval)
      clearInterval(greenInterval)
    }
  }, [])

  return (
    <div onDragStart={e => e.preventDefault()}>
      <Snowfall color="#fff" wind={[-0.5, 2]} speed={[0.5, 1.5]} radius={[1, 3]} snowflakeCount={120} />

      <Providers>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/promote" element={<Promote />} />
            <Route path="/claim" element={<Claim />} />
          </Routes>
          <Menu />
        </BrowserRouter>

        <div className="pointer-events-none z-10">
          <div className="fixed -top-16.5 -left-13 aspect-square w-45 -rotate-30 opacity-95">
            <NextImage src={"/images/light.png"} fill alt="light" />
          </div>

          <div className="fixed -right-16.5 -bottom-13 aspect-square w-54.5 rotate-23 opacity-95">
            <NextImage src={"/images/tree.png"} fill alt="tree" />
          </div>
        </div>

        <div className="fixed top-0 left-0 w-screen h-screen opacity-10 -z-10 pointer-events-none">
          <NextImage src={"/images/bg.svg"} fill alt="bg" />
        </div>

        {lights.red && (
          <div className="fixed top-10 left-[19px] aspect-square w-4 rounded-full bg-[rgba(220,66,47,0.5)] shadow-[0_0_20px_5px_rgba(220,66,47,0.75)]"></div>
        )}

        {lights.blue && (
          <div className="fixed top-5.5 left-14.5 aspect-square w-4 rounded-full bg-[rgba(67,167,238,0.45)] shadow-[0_0_20px_5px_rgba(67,167,238,0.75)]"></div>
        )}

        {lights.green && (
          <div className="fixed -top-2 left-22 aspect-square w-4 rounded-full bg-[rgba(62,185,116,0.45)] shadow-[0_0_20px_5px_rgba(62,185,116,0.75)]"></div>
        )}

        <div
          className={clsx("fixed top-0 left-0 w-screen h-screen -z-20 pointer-events-none", "bg-linear-to-br from-(--bgColor) to-(--bgColor)/70")}
        ></div>
      </Providers>
    </div>
  )
}
