import "./normalize.css";
import "./webflow.css";
import "./nestline.css";  
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <>
      <meta content="Not Found" property="og:title" />
      <meta content="Not Found" property="twitter:title" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <Link href="/normalize.css" rel="stylesheet" type="text/css" />
      <Link href="/webflow.css" rel="stylesheet" type="text/css" />
      <Link href="/nestline.css" rel="stylesheet" type="text/css" />
      <Link href="images/favicon.svg" rel="shortcut icon" type="image/x-icon" />
      <Link href="images/webclip.svg" rel="apple-touch-icon" />

      <div className="utility-block">
        <div className="utility-wrapper">
          <Image
            src="https://d3e54v103j8qbb.cloudfront.net/static/page-not-found.211a85e40c.svg"
            alt=""
            fill
            className="utility-image"
          />
          <h3>Page Not Found</h3>
          <div>
            The page you are looking for doesn&apos;t exist or has been moved
          </div>
          <a href="index.html" className="button w-button">
            Go Home
          </a>
        </div>
      </div>
    </>
  );
}
