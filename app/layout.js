// app/layout.js
import { GoogleAnalytics } from "@next/third-parties/google";
import { Funnel_Display, Quicksand } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "The Kiota by Nestline Capital - Trusted Pathways to Prosperity",
  description:
    "Property management system for Nestline Capital. Let us build wealth, value, and trust through smart real estate investment.",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: "/images/webclip.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId="G-8E5CBZB7X6" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8E5CBZB7X6');
          `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${funnelDisplay.variable} ${quicksand.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
