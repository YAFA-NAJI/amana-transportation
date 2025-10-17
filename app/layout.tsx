import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "leaflet/dist/leaflet.css";

export const metadata = { title: "Amana Transportation" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-800 pt-16 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto max-w-screen-xl px-4 py-6">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}