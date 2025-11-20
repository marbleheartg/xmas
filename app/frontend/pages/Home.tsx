import clsx from "clsx"

export default function Home() {
  return (
    <main className={clsx("fixed top-35 bottom-45 inset-x-1/12 z-30", "p-5 rounded-4xl text-center bg-white/10 menu-glass")}>
      <div className="text-lg">Home page</div>
    </main>
  )
}
