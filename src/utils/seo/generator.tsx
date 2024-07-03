import { Metadata } from "next"
import { Organization, WebSite, WithContext } from "schema-dts"
import seo from "./seo_data.json"

export const TITLE = "RSS3 Developer"
export const DESCRIPTION = "Build with the Open Web"

export const website_jsonld: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: `${TITLE} - ${DESCRIPTION}`,
	image: seo.image,
	description: seo.description,
	url: seo.url,
	sameAs: ["https://twitter.com/rss3_"],
}

export const organization_jsonld: WithContext<Organization> = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "RSS3",
	image: "https://rss3.io/images/og.png",
	description:
		"RSS3 structures Open Information for the next Twitter, Google, and OpenAI.",
	url: "https://rss3.io",
	sameAs: ["https://twitter.com/rss3_"],
	logo: "https://rss3.io/images/logo.svg",
}

export const metadata: Metadata = {
	title: `${TITLE} - ${DESCRIPTION}`,
	description: seo.description,
	keywords: [
		"blockchain",
		"dapp",
		"decentralization",
		"ethereum",
		"open information",
		"open web",
		"RSS",
		"RSS3",
		"RSS3 Developer",
		"web3",
		"web activities",
	],
	openGraph: {
		title: `${TITLE} - ${DESCRIPTION}`,
		description: seo.description,
		images: seo.image,
	},
	twitter: {
		card: "summary_large_image",
		creator: seo.twitter,
	},
	manifest: "https://developer.rss3.io/site.webmanifest",
	icons: [
		{
			rel: "icon",
			sizes: "32x32",
			type: "image/png",
			url: "https://rss3.io/favicon-32x32.png",
		},
		{
			rel: "mask-icon",
			color: "#0072ff",
			url: "https://rss3.io/safari-pinned-tab.svg",
		},
		{ rel: "apple-touch-icon", url: "https://rss3.io/apple-touch-icon.png" },
	],
	other: {
		"msapplication-TileColor": "#0072ff",
		google: "notranslate",
	},
	robots: "index, follow",
	metadataBase: new URL("https://rss3.io"),
}
