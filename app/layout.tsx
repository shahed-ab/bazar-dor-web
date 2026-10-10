import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "বাংলাদেশী নিত্যপ্রয়োজনীয় পণ্যের বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
  icons: {
    icon: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={hindSiliguri.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-[#F1F5EE] text-[#1c251d] antialiased selection:bg-[#078A42] selection:text-white">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#ffffff',
              color: '#1c251d',
              border: '1px solid #E2E8DE',
              borderRadius: '12px',
              fontFamily: 'inherit',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            },
            success: {
              iconTheme: {
                primary: '#078A42',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#E11D48',
                secondary: '#ffffff',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
