import "./globals.css";

export const metadata = {
  title: "Note App",
  description: "Note-taking web app solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`sansserif`}>
        <div id="modal"></div>
        {children}
      </body>
    </html>
  );
}
