const CA = "0x"

const MINIAPP_TITLE = "christmas"

const MINIAPP_DESCRIPTION = "christmas mini app"

const MINIAPP = {
  version: "next",
  imageUrl: `https://${process.env.NEXT_PUBLIC_HOST}/images/og/cast.jpg`,
  aspectRatio: "3:2",
  button: {
    title: "open",
    action: {
      type: "launch_miniapp",
      url: `https://${process.env.NEXT_PUBLIC_HOST}`,
      name: MINIAPP_TITLE,
      splashImageUrl: `https://${process.env.NEXT_PUBLIC_HOST}/images/og/splash.png`,
      splashBackgroundColor: "#653a35",
    },
  },
}

const ABI = {}

export { ABI, CA, MINIAPP, MINIAPP_DESCRIPTION, MINIAPP_TITLE }
