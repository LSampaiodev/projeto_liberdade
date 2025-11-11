import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster";
import "./globals.css"

/**
 * Metadados da aplicação
 * Define título, descrição e outras informações SEO
 */

export const metadata: Metadata = {
  title: "Projeto Liberdade - Transformando Vidas",
  description:
    "Projeto Liberdade dedicada à recuperação e reinserção social. Acolhimento, tratamento e esperança para quem busca recomeçar.",
  keywords: [
    "reabilitação",
    "ONG",
    "proteção ambiental",
    "conservação",
    "restauração ecológica",
    "missão ambiental",
    "projetos sociais",
    "contato ONG",
  ]
  ,
}

/**
 * Layout raiz da aplicação
 * Define a estrutura HTML básica e configurações globais
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
        <Toaster /> {/* Adiciona o componente Toaster para notificações */}
      </body>
    </html>
  )
}
