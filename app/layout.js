import { Geist, Geist_Mono } from "next/font/google";
import "./normalize.css";
import "./webflow.css";
import "./globals.css";
import "./nestline.css";
import Footer from "./components/footer";
import Menu from "./components/menu";

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
        <script
          src="/jquery.js"
          type="text/javascript"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
          async
        />
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
