import './styles/globals.css'
import "./styles/fonts.css";

export const metadata = {
  title: "Majkel Kokocinski",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans font-bold bg-white">
        {children}
      </body>
    </html>
  );
}
