import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import AuthRedirect from "~/components/auth-redirect";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Command Catalogue",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthRedirect>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthRedirect>
  );
}
