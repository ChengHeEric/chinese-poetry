import type { Metadata } from "next";
import { Ma_Shan_Zheng, Noto_Serif_SC } from "next/font/google"; 
import "./globals.css";

// 引入书法体（用于标题或装饰）
const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-kaishu-title",
  weight: "400",
  subsets: ["latin"],
});

// 保留宋体作为后备
const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "中华诗集 - 楷书墨韵",
  description: "精选中国历代诗词，领略书法与文学之美",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${maShanZheng.variable} ${notoSerifSC.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}