"use client"

import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

const AudioPlayer: React.FC<{
  videoId: string
}> = ({ videoId }) => {
  const ua = navigator.userAgent.toLowerCase()

  const isMobile = ua.includes("warpcast")
  const isFirefox = ua.includes("firefox")
  const isChrome = ua.includes("chrome")
  const isSafari = ua.includes("safari")

  const [volume, setVolume] = useState(10)
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const sendCommand = (func: string, args: any[] = []) => {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "https://www.youtube.com",
    )
  }

  const togglePlayPause = () => {
    const next = !isPlaying
    sendCommand(next ? "playVideo" : "pauseVideo")
    setIsPlaying(next)
  }

  const setVolumeLevel = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(100, newVolume))
    setVolume(clampedVolume)
    sendCommand("setVolume", [clampedVolume])
  }

  useEffect(() => {
    if (isMobile) return

    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      setVolumeLevel(10)
    }

    iframe.addEventListener("load", handleLoad)
    return () => iframe.removeEventListener("load", handleLoad)
  }, [])

  return (
    <>
      <div
        className={clsx("flex justify-between items-center rounded-full bg-white/10 gap-1.5 glass", "px-2 pr-3 py-1", isMobile ? "text-xs" : "")}
        onClick={() => {
          if (isMobile) togglePlayPause()
        }}
      >
        <div className={clsx(isMobile && "pt-px")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 14.5C8 15.88 6.88 17 5.5 17C4.12 17 3 15.88 3 14.5C3 13.12 4.12 12 5.5 12C6.03 12 6.5 12.15 6.88 12.41V4.8L16 3V12.5C16 13.88 14.88 15 13.5 15C12.12 15 11 13.88 11 12.5C11 11.12 12.12 10 13.5 10C14.03 10 14.5 10.15 14.88 10.41V4.95L8 6.2V14.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {isMobile && !isPlaying && <path d="M4 4L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
          </svg>
        </div>

        {!isMobile ? (
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={e => {
              setVolumeLevel(Number(e.target.value))
            }}
            className={clsx("w-20", "accent-(--bg)")}
          />
        ) : (
          <div>xmas lofi music</div>
        )}
      </div>

      <iframe
        ref={iframeRef}
        className={clsx("fixed top-0 left-0", "w-px h-px opacity-0", "pointer-events-none")}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=${isMobile ? 0 : 1}&controls=0&loop=1&playlist=${videoId}`}
        allow="autoplay"
      />

      {/* {process.env.NODE_ENV === "development" && (
        <pre className={clsx("fixed bottom-0 inset-x-0 p-5 pb-30 rounded-t-4xl z-100", "text-xs text-wrap bg-amber-200/50 pointer-events-none")}>
          <div>{JSON.stringify({ isPlaying, isMobile }, null, 2)}</div>
        </pre>
      )} */}
    </>
  )
}

export default AudioPlayer
