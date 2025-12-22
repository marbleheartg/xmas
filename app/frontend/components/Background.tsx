import clsx from "clsx"
import NextImage from "next/image"
import { useEffect, useState } from "react"
import Snowfall from "react-snowfall"

const Background = () => {
  const [lights, setLights] = useState({ red: false, blue: false, green: false })

  const lightTiming = () => Math.floor(Math.random() * 5000) + 1500

  useEffect(() => {
    const redInterval = setInterval(() => {
      setLights(prev => ({ ...prev, red: !prev.red }))
    }, lightTiming())

    const blueInterval = setInterval(() => {
      setLights(prev => ({ ...prev, blue: !prev.blue }))
    }, lightTiming())

    const greenInterval = setInterval(() => {
      setLights(prev => ({ ...prev, green: !prev.green }))
    }, lightTiming())

    return () => {
      clearInterval(redInterval)
      clearInterval(blueInterval)
      clearInterval(greenInterval)
    }
  }, [])

  return (
    <div>
      <Snowfall color="#fff" wind={[-0.5, 2]} speed={[0.5, 1.5]} radius={[1, 3]} snowflakeCount={120} />

      <div className="pointer-events-none z-10">
        <div className="fixed -top-19 -left-14 aspect-square w-45 -rotate-23 opacity-95">
          <NextImage src={"/images/light.png"} fill alt="light" priority />
        </div>

        <div className="fixed -right-16.5 -bottom-13 aspect-square w-54.5 rotate-23 opacity-95">
          <NextImage src={"/images/tree.png"} fill alt="tree" priority />
        </div>
      </div>

      <div className="fixed top-0 left-0 w-screen h-screen opacity-10 -z-10 pointer-events-none">
        <NextImage src={"/images/bg.svg"} fill alt="bg" priority />
      </div>

      {lights.red && (
        <div className="fixed top-8 left-[13px] aspect-square w-4 rounded-full bg-[rgba(220,66,47,0.5)] shadow-[0_0_20px_5px_rgba(220,66,47,0.75)]"></div>
      )}

      {lights.blue && (
        <div className="fixed top-4 left-13.5 aspect-square w-4 rounded-full bg-[rgba(67,167,238,0.45)] shadow-[0_0_20px_5px_rgba(67,167,238,0.75)]"></div>
      )}

      {lights.green && (
        <div className="fixed -top-2 left-22 aspect-square w-4 rounded-full bg-[rgba(62,185,116,0.45)] shadow-[0_0_20px_5px_rgba(62,185,116,0.75)]"></div>
      )}

      <div className={clsx("fixed top-0 left-0 w-screen h-screen -z-20 pointer-events-none", "bg-linear-to-br from-(--bg) to-(--bg)/70")}></div>
    </div>
  )
}

export default Background
