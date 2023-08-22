import './globals.css'
import type { Metadata } from 'next'
import React from 'react';

export const metadata: Metadata = {
  title: 'REST API: Departments - Employees',
  description: 'Created by Andrés Lozano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
