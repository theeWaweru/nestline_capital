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
      <div className="utility-block">
        <div className="utility-wrapper">
          <h3>Page Not Found</h3>
          <div>
            The page you are looking for doesn&apos;t exist or has been moved
          </div>
          <Link href="/" className="button w-button">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
