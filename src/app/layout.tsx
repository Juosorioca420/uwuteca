import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

const jost = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UwUteca",
  description: "Hola :3",
};

export default function RootLayout( { children, }: Readonly<{ children: React.ReactNode; }> ){
  return (
    <html lang="en" className="h-full">

      <body className= { cn("reltative h-full font-sans antialiased", jost.className) }>
          <main className="relative flex flex-col min-h-screen"> {/* classname para paginas responsivas */}
            <Providers>   {/* trpc */}

              <Navbar/>
              <hr className="border-t-1.8 border-gray-300" />

              <div className="flex-grow flex-1">{children}</div>

            </Providers>
          </main>

          <Toaster position="top-center" richColors />
      </body>

    </html>
  );
}
