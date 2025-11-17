import './globals.css';
import React from 'react';

export const metadata = { title: 'Product Manager' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <main className="max-w-5xl mx-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}