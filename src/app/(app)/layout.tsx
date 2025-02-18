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
          <footer className="px-4 py-2 text-sm md:px-24 md:py-8">
            <p>
              Commands Catalogue by Marcus Harvey.{" "}
              <a
                className="underline"
                href="https://github.com/marcusleonas/command-catalogue"
              >
                Source Code
              </a>
              .
            </p>
          </footer>
          <Toaster />
        </body>
      </html>
    </AuthRedirect>
  );
}
