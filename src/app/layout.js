import './globals.css';
import Header from '@/components/header';
import SmoothScroll from '@/components/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeProvider';
import CacheManager from '@/components/CacheManager';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';

// Configuration des polices Google Fonts
const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-cormorant',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    title: 'Échec Royal',
    description: "Jeu d'échecs royal avec modèles 3D",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${playfair.variable} ${cormorant.variable} ${inter.variable} `}>
            <head></head>
            <body className="antialiased">
                <ThemeProvider>
                    <CacheManager />
                    <SmoothScroll>
                        <Header />
                        {children}
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
