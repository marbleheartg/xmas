import clsx from "clsx"

export default function Home() {
  return (
    <main className={clsx("fixed top-35 bottom-45 inset-x-1/12 z-30", "p-5 pt-10 rounded-4xl bg-white/10 menu-glass", "flex justify-center ")}>
      <div className="text-xl font-black">waitlist</div>
    </main>
  )
}
