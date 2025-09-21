import { Geist, Geist_Mono } from "next/font/google";
import "./normalize.css";
import "./webflow.css";
import "./globals.css";
import "./nestline.css";
import Footer from "./components/footer";
import Menu from "./components/menu";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nestline Capital - Trusted Pathways to Prosperity",
  description:
    "We build wealth, value, and trust through smart real estate investment.",
  viewport: "width=device-width, initial-scale=1",
  generator: "Next.js", // Remove "Webflow"
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
        <script src="/jquery.js" async></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Menu />
        {children}
        <Footer />
        <script src="/webflow.js" async></script>
      </body>
    </html>
  );
}
