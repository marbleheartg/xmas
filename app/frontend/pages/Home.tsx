import { ABI, CA } from "@/lib/constants"
import clsx from "clsx"
import { useWriteContract } from "wagmi"

export default function Home() {
  const { writeContract } = useWriteContract()

  return (
    <main className={clsx("fixed top-35 bottom-45 inset-x-1/12 z-30", "p-5 rounded-4xl bg-white/10 menu-glass", "flex justify-center items-center")}>
      <button
        className="text font-black"
        onClick={() =>
          writeContract({
            abi: ABI,
            address: CA,
            functionName: "lfg",
            args: [],
          })
        }
      >
        waitlist
      </button>
    </main>
  )
}
