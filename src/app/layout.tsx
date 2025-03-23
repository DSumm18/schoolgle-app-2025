import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schoolgle App 2025',
  description: 'A clean version of the Schoolgle application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}