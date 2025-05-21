import "./globals.css";
import { headers } from 'next/headers'; // for coockies

export const metadata = {
  title: "Note App",
  description: "Note-taking web app solution",
};

export default async function RootLayout({ children }) {
  // Get color theme from the request headers (cookies)
  const requestHeaders = await headers();
  const theme = requestHeaders.get("x-theme") || "system";
  const font = requestHeaders.get("x-font") || "sansSerif";
  return (
    <html lang="en" className={`${theme} ${font}`}>
      <body>
        <div id="modal"></div>
        {children}
      </body>
    </html>
  );
}
