import { useWriteXmasMint } from "@/lib/abi"
import { User } from "@/lib/api/types"
import { XMAS_CA } from "@/lib/constants"
import { store } from "@/lib/store"
import sdk from "@farcaster/miniapp-sdk"
import { Fireworks, FireworksHandlers } from "@fireworks-js/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import clsx from "clsx"
import NextImage from "next/image"
import { useEffect, useRef, useState } from "react"
import { formatUnits, parseAbi, stringToHex } from "viem"
import { base } from "viem/chains"
import { useConnect, useConnection, useConnectors, useReadContract, useSwitchChain, useWaitForTransactionReceipt } from "wagmi"

const imgSrcs = ["snowflake", "hat", "cup", "gifts", "cookie", "candy-cane", "stocking", "star", "farcaster"]

function useDebounce<T>(value: T, delay = 1000) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}

export default function Gifts() {
  const { address: userAddress, isConnected } = useConnection()

  // const { data: whitelisted } = useReadContractWhitelisted({
  //   address: WAITLIST_CA,
  //   args: !!userAddress ? [userAddress] : undefined,
  //   query: {
  //     enabled: !!userAddress && isConnected,
  //     refetchInterval: 2000,
  //   },
  // })

  const { data: hash, writeContract } = useWriteXmasMint()
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash })

  const { mutate: connect } = useConnect()
  const { mutate: switchChain } = useSwitchChain()

  const connectors = useConnectors()

  useEffect(() => {
    if (!connectors?.[0]) return
    try {
      connect({ connector: connectors[0] })
    } catch {}
    try {
      switchChain({ chainId: base.id })
    } catch {}
  }, [connectors?.[0]])

  const ref = useRef<FireworksHandlers>(null)

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

  const [selectedGift, setSelectedGift] = useState<string>()
  const giftIdx = selectedGift ? imgSrcs.indexOf(selectedGift) : 0

  const [pinnedXmas, setPinnedXmas] = useState<number>(0)

  const { data: xmasBalance } = useReadContract({
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"]),
    functionName: "balanceOf",
    args: !!userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && isConnected,
      refetchInterval: 2000,
    },
  })

  const [recipientUsername, setRecipientUsername] = useState("")

  const debouncedUsername = useDebounce(recipientUsername)

  const {
    data: recipientData,
    isLoading: recipientIsLoading,
    isError: recipientIsError,
  } = useQuery<User>({
    queryKey: ["user", debouncedUsername],
    queryFn: ({ signal }) => axios.get(`/api/users/${debouncedUsername}`, { signal }).then(res => res.data),
    enabled: !!debouncedUsername,
    retry: false,
  })

  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isSuccess) return

    sdk.actions.composeCast({
      text: `hey, @${recipientData?.username}! ${message || "merry christmas!"}`,
      embeds: ["https://xmas.marbleheart.xyz"],
    })
  }, [isSuccess])

  return (
    <main>
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

      <div className={clsx("fixed top-35 inset-x-1/12 pt-3.5 z-30", "flex flex-col", "rounded-4xl", "bg-white/10 glass", selectedGift ? "" : "pb-2")}>
        <h1 className="text-[26px] uppercase skew-x-6 text-center"> {selectedGift ? "Gift" : "Choose gift"}</h1>

        <div className="h-px w-full my-2 bg-white opacity-20" />

        {!selectedGift ? (
          <div className={clsx("flex flex-wrap justify-around items-center", "aspect-square w-full opacity-95")}>
            {imgSrcs.map(val => (
              <div key={val} className="relative aspect-square w-[28%] cursor-pointer" onClick={() => setSelectedGift(val)}>
                <NextImage src={`/images/${val}.png`} fill alt={val} priority />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="pb-[3px] pt-1 flex flex-col">
              <div className="flex justify-between items-center pb-2.5 px-3">
                <div className="font-bold pb-[3px]">receiver:</div>

                <div className="relative">
                  <input
                    type="search"
                    placeholder="dwr"
                    role="searchbox"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    value={recipientUsername}
                    className="pl-1.5 pb-px"
                    onChange={e => {
                      const val = e.target.value.toLowerCase()
                      if (val.length <= 20) setRecipientUsername(val)
                    }}
                  />

                  <NextImage
                    src={
                      recipientData
                        ? recipientData?.pfp_url
                        : recipientIsLoading || recipientIsError
                          ? "https://wrpcd.net/cdn-cgi/image/anim=false,fit=contain,f=auto,w=288/https%3A%2F%2Ffarcaster.xyz%2Favatar.png"
                          : `https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/bc698287-5adc-4cc5-a503-de16963ed900/original`
                    }
                    alt="userPfp"
                    className="absolute top-1/2 -translate-y-1/2 right-1 rounded-full cursor-pointer pointer-events-auto z-50"
                    width={22}
                    height={22}
                    onClick={() => {
                      if (recipientData?.fid) sdk.actions.viewProfile({ fid: recipientData?.fid })
                    }}
                  />
                </div>
              </div>

              <div className="h-px w-full bg-white opacity-20 mb-3" />

              <div className="flex justify-between items-center px-3 pb-3.5 font-bold">
                <div>
                  pin{" "}
                  <span
                    className="text-lime-600 cursor-pointer"
                    onClick={() => {
                      sdk.actions.swapToken({
                        sellToken: "eip155:8453/native",
                        buyToken: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                        sellAmount: "1000000",
                      })
                    }}
                  >
                    $usdc
                  </span>
                  :
                </div>

                <div className="flex items-center gap-3">
                  <div>{pinnedXmas}</div>
                  <input
                    type="range"
                    min="0"
                    max={xmasBalance ? parseInt(formatUnits(xmasBalance, 6)) : "0"}
                    value={pinnedXmas}
                    onChange={e => {
                      setPinnedXmas(Number(e.target.value))
                    }}
                    className={clsx("w-30", "accent-(--bg)", "pt-0.5")}
                  />

                  <div>{xmasBalance ? parseInt(formatUnits(xmasBalance, 6)) : "..."}</div>
                </div>
              </div>

              <div className="h-px w-full bg-white opacity-20" />

              <div className="flex flex-col px-3 pb-5">
                <div className="font-bold pt-3.5 pb-2.5">message:</div>

                <textarea
                  className=""
                  placeholder="I wish you..."
                  rows={2}
                  value={message}
                  onChange={e => {
                    setMessage(e.target.value)
                  }}
                />
              </div>
            </div>
            <button
              className="w-full border-0 border-t border-t-white/20 rounded-none text-lg py-3 pb-3.5"
              onClick={() => {
                if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("medium")

                try {
                  connect({ connector: connectors[0] })
                } catch {}
                try {
                  switchChain({ chainId: base.id })
                } catch {}
                try {
                  writeContract({
                    address: XMAS_CA,
                    args: [
                      (recipientData?.verified_addresses.eth_addresses[0] || userAddress) as `0x${string}`,
                      giftIdx || 0,
                      stringToHex(message.length > 0 ? message : "merry christmas!"),
                    ],
                    chainId: base.id,
                  })
                } catch {}
              }}
            >
              send
            </button>
          </div>
        )}
      </div>

      {process.env.NODE_ENV === "development" && (
        <pre className={clsx("fixed bottom-0 inset-x-0 p-5 pb-15 rounded-t-4xl z-50", "text-xs text-wrap bg-amber-200/50 pointer-events-none")}>
          <div>
            {JSON.stringify(
              {
                userAddress,
                isConnected,
                debouncedUsername,
                recipientData: recipientData?.fid,

                eth_addresses: recipientData?.verified_addresses.eth_addresses[0] || userAddress,
                giftIdx,
                message,

                pinnedXmas,
                hash,
                isSuccess,
                ua: navigator.userAgent,
              },
              null,
              2,
            )}
          </div>
        </pre>
      )}
    </main>
  )
}
