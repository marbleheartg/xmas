import clsx from "clsx"
import { useState } from "react"

export default function Home() {
  const [step, setStep] = useState<0 | 1>(0)

  return (
    <main>
      <div className={clsx("fixed top-35 inset-x-1/12 px-1 pt-3.5 pb-3 z-30", "flex flex-col items-center", "rounded-4xl", "bg-white/10 glass")}>
        <h1 className="text-2xl uppercase skew-x-6">Your gifts</h1>

        <div className="h-px w-[96%] my-2 bg-white opacity-20" />

        <div className="aspect-square w-full flex justify-center items-center text-xl font-bold">cooking...</div>
      </div>
    </main>
  )
}

{
  /* <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-xs tracking-widest opacity-60">COUNTDOWN</span>
          <span className="text-3xl font-bold tabular-nums">{Math.ceil((new Date("2026-01-01").getTime() - Date.now()) / 86400000)}</span>
          <span className="text-xs opacity-60">days until 2026</span>
        </div> */
}

{
  /* <div className="text-xl">
          {isLoading && "checking..."}
          {!isLoading && (whitelisted ? "you're whitelisted!" : "")}
        </div> */
}

{
  /* <button
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
              writeLfg({ address: WAITLIST_CA })
            } catch {}
          }}
        >
          waitlist me
        </button> */
}

{
  /* {process.env.NODE_ENV === "development" && (
          <pre className={clsx("fixed bottom-0 inset-x-0 p-5 pb-15 rounded-t-4xl", "text-xs text-wrap bg-amber-200/50 pointer-events-none")}>
            <div>{JSON.stringify({ userAddress, isConnected, whitelisted, hash, isSuccess, ua: navigator.userAgent }, null, 2)}</div>
          </pre>
        )} */
}
