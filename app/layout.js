import "./globals.css";
import DataProvider from "../components/DataProvider"
import { Marhey } from "next/font/google";
import { Inter } from "next/font/google";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

const marhey = Marhey({
  weight: "700",
  subsets: ["arabic"],
  variable: "--font-marhey",
});

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({children}) {
  return (
    <html lang="en" className={`${marhey.variable} ${raleway.variable}`}>
      <body className={inter.className}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
