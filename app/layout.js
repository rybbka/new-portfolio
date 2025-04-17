import './globals.css'
import "./styles/fonts.css";
import { ThemeProvider } from './components/ThemeProvider';

export const metadata = {
  title: "Majkel Kokocinski",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans font-bold bg-background text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
