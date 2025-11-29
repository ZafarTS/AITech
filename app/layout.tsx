import type { Metadata } from 'next';
import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agrotahlilchi — SI asosidagi tuproq tahlili',
  description: 'AI asosidagi mobil agro-tahlil ilovasi. Tuproqning holati, sho\'rlanishi, ekin turiga mosligi va hosildorlik potensialini offlayn aniqlaydi.',
  keywords: 'agrotahlilchi, tuproq tahlili, AI, sun\'iy intellekt, qishloq xo\'jaligi, O\'zbekiston, soil analysis, agriculture',
  authors: [{ name: 'AITECH - TKTI' }],
  openGraph: {
    title: 'Agrotahlilchi — SI asosidagi tuproq tahlili',
    description: 'Tuproqni rasmga oling, hosilni oshiring',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
