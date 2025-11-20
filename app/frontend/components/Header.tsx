import { useAppKit, useAppKitAccount } from "@reown/appkit/react"
import clsx from "clsx"
import Image from "next/image"
import { store } from "../../lib/store"

const Header = () => {
  const { user } = store()

  const { address, isConnected } = useAppKitAccount()
  const { open } = useAppKit()

  return (
    <header className={clsx("fixed top-10 inset-x-9", "flex justify-between items-center")}>
      <div className={clsx("text-xl p-1 px-2.5 pb-1.5 mb-0.5")}></div>

      <div className="outline rounded-full cursor-pointer overflow-hidden" onClick={() => open({ view: "Connect" })}>
        {isConnected ? (
          <div className="relative aspect-square w-8">
            <Image src={user?.pfpUrl!} fill alt="pfp" />
          </div>
        ) : (
          <button className={clsx("text-sm p-1 px-2.5")}>connect</button>
        )}
      </div>
    </header>
  )
}

export default Header
