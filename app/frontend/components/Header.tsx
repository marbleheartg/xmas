import sdk from "@farcaster/miniapp-sdk"
import clsx from "clsx"
import NextImage from "next/image"
import { store } from "../../lib/store"
import AudioPlayer from "./AudioPlayer"

const Header = () => {
  const { user } = store()

  return (
    <header className={clsx("fixed top-10 inset-x-9", "flex justify-between items-center")}>
      <div className="w-12">
        <NextImage className="rounded-full" src={"/images/logo.png"} alt="logo" width={48} height={48} priority />
      </div>

      <AudioPlayer videoId="h_a3tqywv3I" />

      <div
        className={clsx("flex justify-end w-12")}
        onClick={() => {
          if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("medium")
          sdk.actions.viewProfile({ fid: user?.fid || 1021214 })
        }}
      >
        <div className={clsx("relative aspect-square w-8", "border-2 border-(--border) rounded-full", "cursor-pointer")}>
          <NextImage src={user?.pfpUrl || "/images/global/user.svg"} fill alt="pfp" className="rounded-full" priority />
        </div>
      </div>
    </header>
  )
}

export default Header
