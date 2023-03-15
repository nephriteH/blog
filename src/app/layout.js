import "./globals.css";

export const metadata = {
  title: "Nephrite's blog",
  description: "记录博客",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
