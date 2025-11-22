import sdk from "@farcaster/miniapp-sdk"
import clsx from "clsx"
import Image from "next/image"
import { store } from "../../lib/store"

const Header = () => {
  const { user } = store()

  return (
    <header className={clsx("fixed top-10 inset-x-9", "flex justify-between items-center")}>
      <div className={clsx("text-xl p-1 px-2.5 pb-1.5 mb-0.5")}></div>

      <div
        className={clsx("relative aspect-square w-8 rounded-full", "border-2 border-(--border)", "cursor-pointer")}
        onClick={() => sdk.actions.viewProfile({ fid: user?.fid || 1021214 })}
      >
        <Image src={user?.pfpUrl || "/images/global/user.svg"} fill alt="pfp" className="rounded-full" />
      </div>
    </header>
  )
}

export default Header
