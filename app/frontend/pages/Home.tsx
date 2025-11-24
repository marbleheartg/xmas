import { WAITLIST_CA } from "@/lib/constants"
import { useReadContractWhitelisted, useWriteContractLfg } from "@/lib/contract"
import { store } from "@/lib/store"
import sdk from "@farcaster/miniapp-sdk"
import clsx from "clsx"
import { useEffect } from "react"
import { base } from "viem/chains"
import { useAccount, useConnect, useSwitchChain, useWaitForTransactionReceipt } from "wagmi"

export default function Home() {
  const { address: userAddress, isConnected } = useAccount()

  const { data: whitelisted } = useReadContractWhitelisted({
    address: WAITLIST_CA,
    args: !!userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && isConnected,
      refetchInterval: 2000,
    },
  })

  const { connect, connectors } = useConnect()
  const { switchChain } = useSwitchChain()

  const { data: hash, writeContract } = useWriteContractLfg()
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (!isSuccess) return
    if (store.getState()?.client?.added) return

    sdk.actions.addMiniApp().catch(() => {})
  }, [isSuccess])

  useEffect(() => {
    if (!connectors[0]) return

    try {
      connect({ connector: connectors[0] })
    } catch (err) {}

    try {
      switchChain({ chainId: base.id })
    } catch (err) {}
  }, [connectors])

  return (
    <main
      className={clsx(
        "fixed top-35 bottom-45 inset-x-1/12 z-30",
        "flex flex-col justify-center items-center gap-3",
        "p-5 rounded-4xl",
        "bg-white/10 glass",
      )}
    >
      <div>
        {isLoading && "checking..."}
        {!isLoading && (whitelisted ? "you're whitelisted!" : "")}
      </div>

      <button
        className={clsx("text-(--bg)", "disabled:opacity-50 disabled:cursor-not-allowed")}
        disabled={!!whitelisted}
        onClick={() => {
          if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("medium")

          try {
            connect({ connector: connectors[0] })
          } catch (err) {}

          try {
            switchChain({ chainId: base.id })
          } catch (err) {}

          try {
            writeContract({ address: WAITLIST_CA })
          } catch (err) {}
        }}
      >
        waitlist me
      </button>

      {process.env.NODE_ENV === "development" && (
        <pre className={clsx("fixed bottom-0 inset-x-0 p-5 pb-15 rounded-t-4xl", "text-xs text-wrap bg-amber-200/50 pointer-events-none")}>
          <div>{JSON.stringify({ userAddress, isConnected, whitelisted, hash, isSuccess, ua: navigator.userAgent }, null, 2)}</div>
        </pre>
      )}
    </main>
  )
}
