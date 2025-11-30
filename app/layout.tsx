import './globals.css';

/**
 * Root Layout
 * Minimal layout that delegates to locale-specific layouts
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
