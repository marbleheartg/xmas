import clsx from "clsx"
// import NextImage from "next/image"
import { useState } from "react"

export default function Claim() {
  const [step, setStep] = useState<0 | 1>(0)

  return (
    <main className={clsx("fixed top-35 bottom-45 inset-x-1/12 z-30", "flex justify-center items-center", "p-5 rounded-4xl", "bg-white/10 glass")}>
      <div className="text-xl font-bold">cooking...</div>
      {/* <h1 className="text-4xl uppercase skew-x-6">54 xmas</h1> */}
      {/* <div className="relative aspect-square w-48 opacity-90">
        <NextImage src={"/images/bag.png"} fill alt="bag" />
        <NextImage src={"/images/open-bag.png"} fill alt="open-bag" />
      </div> */}
    </main>
  )
}
