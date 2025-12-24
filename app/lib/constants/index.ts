const XMAS_CA = "0xC4a5cB6969cac3A16C0Dda8008aFFEB426464A66"

const MINIAPP_TITLE = "xmas"

const MINIAPP_DESCRIPTION = "make your friends happy"

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

export { MINIAPP, MINIAPP_DESCRIPTION, MINIAPP_TITLE, XMAS_CA }
