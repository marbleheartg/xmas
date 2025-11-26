import { WAITLIST_CA } from "@/lib/constants"
import { useReadContractWhitelisted, useWriteContractLfg } from "@/lib/contract"
import { store } from "@/lib/store"
import sdk from "@farcaster/miniapp-sdk"
import { Fireworks, FireworksHandlers } from "@fireworks-js/react"
import clsx from "clsx"
import { useEffect, useRef } from "react"
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

  const { data: hash, writeContract } = useWriteContractLfg()
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash })

  const { connect, connectors } = useConnect()
  const { switchChain } = useSwitchChain()

  const ref = useRef<FireworksHandlers>(null)

  useEffect(() => {
    if (!connectors?.[0]) return
    try {
      connect({ connector: connectors[0] })
    } catch {}
    try {
      switchChain({ chainId: base.id })
    } catch {}
  }, [connectors?.[0]])

  useEffect(() => {
    ;(async function () {
      if (!isSuccess) return

      ref.current?.launch(10)

      if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("medium")

      if (store.getState().capabilities?.includes("haptics.notificationOccurred")) {
        await new Promise(res => setTimeout(res, 1500))

        for (let i = 0; i < 3; i++) {
          sdk.haptics.notificationOccurred("success")
          await new Promise(res => setTimeout(res, 500))
        }
      }

      if (store.getState()?.client?.added) return
      sdk.actions.addMiniApp().catch(() => {})
    })()
  }, [isSuccess])

  return (
    <div>
      <Fireworks
        ref={ref}
        options={{
          opacity: 0.5,
          hue: { min: 0, max: 360 },
          acceleration: 1,
          particles: 100,
          explosion: 8,
          intensity: 0,
          delay: { min: 15, max: 30 },
          traceSpeed: 5,
          brightness: { min: 70, max: 100 },
          decay: { min: 0.01, max: 0.02 },
          lineWidth: {
            explosion: { min: 2, max: 5 },
            trace: { min: 1, max: 2 },
          },
          rocketsPoint: { min: 40, max: 60 },
        }}
        className={clsx("fixed inset-0 pointer-events-none z-50")}
      />
      <main
        className={clsx(
          "fixed top-35 bottom-45 inset-x-1/12 z-30",
          "flex flex-col justify-center items-center gap-5",
          "p-5 rounded-4xl",
          "bg-white/10 glass",
        )}
      >
        <div className="text-xl">
          {isLoading && "checking..."}
          {!isLoading && (whitelisted ? "you're whitelisted!" : "")}
        </div>

        <button
          className={clsx("bg-white text-(--bg) px-[7px] pb-[3px]", "disabled:opacity-50 disabled:cursor-not-allowed")}
          disabled={!!whitelisted}
          onClick={() => {
            if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("medium")

            try {
              connect({ connector: connectors[0] })
            } catch {}
            try {
              switchChain({ chainId: base.id })
            } catch {}
            try {
              writeContract({ address: WAITLIST_CA })
            } catch {}
          }}
        >
          waitlist me
        </button>

        {/* {process.env.NODE_ENV === "development" && (
          <pre className={clsx("fixed bottom-0 inset-x-0 p-5 pb-15 rounded-t-4xl", "text-xs text-wrap bg-amber-200/50 pointer-events-none")}>
            <div>{JSON.stringify({ userAddress, isConnected, whitelisted, hash, isSuccess, ua: navigator.userAgent }, null, 2)}</div>
          </pre>
        )} */}
      </main>
    </div>
  )
}
