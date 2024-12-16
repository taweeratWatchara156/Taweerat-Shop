import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AuthProvider } from "./Provider";
config.autoAddCss = false
import "./globals.css";
import { CartProvider } from "./components/contexts/CartContext";
import { FavoriteProvider } from "./components/contexts/FavoriteContext";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: '500'
});

export const metadata: Metadata = {
  title: "Taweerat Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} flex-1 antialiased`}
      >
        <AuthProvider>
          <FavoriteProvider>
            <CartProvider>
              {children}
              </CartProvider>
          </FavoriteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
