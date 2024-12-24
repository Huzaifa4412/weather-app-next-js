import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export const metadata: Metadata = {
  title: "Premium Weather App",
  description: "A premium and modern weather application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.className} min-h-screen flex items-center justify-center p-4 relative`}
      >
        {children}
      </body>
    </html>
  );
}
