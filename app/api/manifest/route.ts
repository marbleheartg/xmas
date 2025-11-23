import { MINIAPP_DESCRIPTION, MINIAPP_TITLE } from "@/lib/constants"
import { NextRequest, NextResponse } from "next/server"

const { NEXT_PUBLIC_HOST } = process.env
if (!NEXT_PUBLIC_HOST) throw new Error("ManifestCredentialsNotConfigured")

export async function GET(req: NextRequest) {
  return NextResponse.json({
    accountAssociation: {
      header: "eyJmaWQiOjEwMjEyMTQsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwZjI2NWYxNUMzQUEyNmFDZkQ1QTZkNDBlQzBBMjBmNTE2NTZDYWQ1In0",
      payload: "eyJkb21haW4iOiJtb25hZC1mbG93ZXJzLnh5eiJ9",
      signature:
        "MHhhMGUyYmI0YzY4NzI5MWJjYTVmMzJmMTZjZTA3OTRmYTlmZTVhMDU1M2IyOGE3YWYyNTFhODQ4YmY0MDM5NzNlMzAzOTVlYjU0OTYyZDE1Mjg3NjM3Njc0Y2I5MTA1MGY4ZGM5OGIwMmVmZDU1YjkwOWQxNTY3OTUyNWYxNGE3MDFi",
    },
    miniapp: {
      version: "1",
      name: MINIAPP_TITLE,
      iconUrl: `https://${NEXT_PUBLIC_HOST}/images/og/icon.png`,
      homeUrl: `https://${NEXT_PUBLIC_HOST}`,
      splashImageUrl: `https://${NEXT_PUBLIC_HOST}/images/og/splash.png`,
      splashBackgroundColor: "#653a35",
      subtitle: MINIAPP_DESCRIPTION,
      description: MINIAPP_DESCRIPTION,
      primaryCategory: "entertainment",
      tagline: MINIAPP_DESCRIPTION,
      ogTitle: MINIAPP_TITLE,
      ogDescription: MINIAPP_DESCRIPTION,
      ogImageUrl: `https://${NEXT_PUBLIC_HOST}/images/og/cast.jpg`,
      castShareUrl: `https://${NEXT_PUBLIC_HOST}`,
      heroImageUrl: `https://${NEXT_PUBLIC_HOST}/images/og/hero.png`,
      canonicalDomain: NEXT_PUBLIC_HOST,
      screenshotUrls: [`https://${NEXT_PUBLIC_HOST}/images/og/screenshot.png`],
      requiredChains: ["eip155:8453"],
      requiredCapabilities: ["actions.viewProfile", "actions.composeCast", "actions.ready", "actions.close"],
      tags: ["christmas", "gifts", "newyear", "2026", "santa"],

      webhookUrl: "https://api.neynar.com/f/app/66c9f4da-7b8e-4597-97d1-0453368d78b7/event",
    },
    baseBuilder: {
      allowedAddresses: ["0xf1f2D5C38174B0df9C9eABc909d812540a9bb51B"],
    },
  })
}
