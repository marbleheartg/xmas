import clientErrorHandling from "@/lib/clientErrorsReporting"
import Providers from "@/lib/providers"
import { updateStore } from "@/lib/store"
import preloadImages from "@/lib/utils/preloadImages"
import sdk from "@farcaster/miniapp-sdk"
import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import Background from "./components/Background"
import Header from "./components/Header"
import Menu from "./components/Menu"
import Claim from "./pages/Claim"
import Home from "./pages/Home"

const imgSrcs = ["tree.png", "light.png", "bg.svg", "logo.png"]

export default function App() {
  useEffect(() => {
    clientErrorHandling()
    ;(async function () {
      try {
        const { user, client } = await sdk.context
        const capabilities = await sdk.getCapabilities()
        updateStore({ user, client, capabilities })
      } catch {}

      try {
        await preloadImages(imgSrcs.map(src => `/images/${src}`))
      } catch {
      } finally {
        await sdk.actions.ready({ disableNativeGestures: true }).catch(() => {})
      }

      try {
        const { token: session } = await sdk.quickAuth.getToken()
        updateStore({ session })
      } catch {}
    })()
  }, [])

  return (
    <div onDragStart={e => e.preventDefault()}>
      <Providers>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/claim" element={<Claim />} />
          </Routes>
          <Menu />
          <Background />
        </BrowserRouter>
      </Providers>
    </div>
  )
}
