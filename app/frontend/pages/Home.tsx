import { CA } from "@/lib/constants"
import { useWriteContractLfg } from "@/lib/contract"
import { store } from "@/lib/store"
import sdk from "@farcaster/miniapp-sdk"
import clsx from "clsx"
import { useEffect } from "react"
import { base } from "viem/chains"
import { useConnect, useSwitchChain, useWaitForTransactionReceipt } from "wagmi"

export default function Home() {
  const { connect, connectors } = useConnect()
  const { switchChain } = useSwitchChain()

  const { data: hash, writeContract } = useWriteContractLfg()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (!isSuccess) return
    if (store.getState()?.client?.added) return

    sdk.actions.addMiniApp().catch(() => {})
  }, [isSuccess])

  return (
    <main
      className={clsx("fixed top-35 bottom-45 inset-x-1/12 z-30", "flex justify-center items-center", "p-5 rounded-4xl", "bg-white/10 menu-glass")}
    >
      <div>{isSuccess ? "success!" : isLoading ? "loading..." : ""}</div>

      <button
        className="text-(--bg)"
        onClick={() => {
          try {
            connect({ connector: connectors[0] })
          } catch (err) {}

          try {
            switchChain({ chainId: base.id })
          } catch (err) {}

          try {
            writeContract({ address: CA })
          } catch (err) {}
        }}
      >
        waitlist me
      </button>
    </main>
  )
}
