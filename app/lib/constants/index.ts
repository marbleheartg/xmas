const WAITLIST_CA = "0xEce8Ca10b7f19b322b18E08dF1b647d8820C1C34"

const MINIAPP_TITLE = "candy"

const MINIAPP_DESCRIPTION = "candy mini app"

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

export { MINIAPP, MINIAPP_DESCRIPTION, MINIAPP_TITLE, WAITLIST_CA }
