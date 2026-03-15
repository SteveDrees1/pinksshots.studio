import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pinkshots.studio — Portfolio",
  description: "Share your portfolio. Futuristic. Edgy. Yours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
