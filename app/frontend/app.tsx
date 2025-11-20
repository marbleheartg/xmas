import clientErrorHandling from "@/lib/clientErrorsReporting"
import Providers from "@/lib/providers"
import { updateStore } from "@/lib/store"
import sdk from "@farcaster/miniapp-sdk"
import clsx from "clsx"
import NextImage from "next/image"
import { useEffect } from "react"
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

        const preloadImage = new Image()
        preloadImage.src = "/images/tree.png"
        preloadImage.onload = async () => await sdk.actions.ready({ disableNativeGestures: true }).catch(() => {})
        preloadImage.onerror = async () => await sdk.actions.ready({ disableNativeGestures: true }).catch(() => {})
      } catch (error) {
      } finally {
        await sdk.actions.ready({ disableNativeGestures: true }).catch(() => {})
      }

      const { token: session } = await sdk.quickAuth.getToken()
      updateStore({ session })
    })()
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
          <div className="fixed -top-16.5 -left-13 aspect-square w-45 -rotate-30">
            <NextImage src={"images/light.png"} fill alt="light" />
          </div>

          <div className="fixed -right-16.5 -bottom-13 aspect-square w-54.5 rotate-23">
            <NextImage src={"images/tree.png"} fill alt="tree" />
          </div>
        </div>

        <div className="fixed top-0 left-0 w-screen h-screen opacity-10 -z-10 pointer-events-none">
          <NextImage src={"images/bg.svg"} fill alt="bg" />
        </div>

        <div
          className={clsx("fixed top-0 left-0 w-screen h-screen -z-20 pointer-events-none", "bg-linear-to-br from-(--bgColor) to-(--bgColor)/70")}
        ></div>
      </Providers>
    </div>
  )
}
