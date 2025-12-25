import { GIFT_IMG_SRCS } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import clsx from "clsx"
import NextImage from "next/image"
import { hexToString } from "viem"
import { useConnection } from "wagmi"

export default function Home() {
  const { address: userAddress } = useConnection()

  const { data: gifts, isLoading } = useQuery({
    queryKey: ["gifts", userAddress],
    queryFn: () =>
      axios
        .post(process.env.NEXT_PUBLIC_SUBGRAPH_API_LINK!, {
          query: `
          query ($recipient: String!) {
            gifts(
              where: { recipient: $recipient }
              orderBy: block_number
              orderDirection: desc
            ) {
              idParam
              sender
              recipient
              message
              timestamp_
            }
          }
        `,
          variables: {
            recipient: userAddress!.toLowerCase(),
          },
        })
        .then(res => res.data.data.gifts),
    enabled: !!userAddress,
  })

  return (
    <main>
      <div
        className={clsx(
          "fixed top-35 bottom-35 inset-x-1/12 px-1 pt-3.5 pb-3 z-30",
          "flex flex-col items-center",
          "rounded-4xl",
          "bg-white/10 glass",
        )}
      >
        <h1 className="text-2xl uppercase skew-x-6">Your gifts</h1>

        <div className="h-px w-[96%] my-2 bg-white opacity-20" />

        {gifts?.length ? (
          <div className="flex flex-wrap justify-between w-full gap-5 px-4 pt-1.5 text-sm overflow-y-auto">
            {gifts.map((gift: any, idx: number) => (
              <div key={idx} className="border rounded-xl overflow-hidden w-[46%]">
                <div className="relative aspect-square w-full bg-white">
                  <NextImage src={`https://${process.env.NEXT_PUBLIC_HOST}/images/${GIFT_IMG_SRCS[gift.idParam]}.png`} alt="giftImg" fill />
                </div>
                <div className="flex flex-col p-2">
                  <div>
                    From: {gift.sender.slice(0, 4)}...{gift.sender.slice(-3)}{" "}
                  </div>
                  <div>Date: {new Date(gift.timestamp_ * 1000).toLocaleDateString()}</div>
                  <div>Message: {hexToString(gift.message)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center size-full font-bold"> {isLoading ? "loading..." : "no gifts"}</div>
        )}
      </div>

      {/* {process.env.NODE_ENV === "development" && (
        <pre className={clsx("fixed bottom-0 inset-x-0 p-5 pb-15 rounded-t-4xl", "text-xs text-wrap bg-amber-200/50 pointer-events-none z-50")}>
          <div>{JSON.stringify({ userAddress, isLoading, ua: navigator.userAgent }, null, 2)}</div>
        </pre>
      )} */}
    </main>
  )
}
