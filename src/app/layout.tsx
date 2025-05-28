import { Nunito } from 'next/font/google';

import './globals.css';
import { Providers } from '@/components/shared/providers';
import Script from 'next/script';
import '../../instrumentation-client';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link data-rh='true' rel='icon' href='/logo.png' />

        <noscript>
          <div>
            <img
              src='https://mc.yandex.ru/watch/102217269'
              style={{ position: 'absolute', left: '-9999px' }}
              alt=''
            />
          </div>
        </noscript>
      </head>
      <body className={nunito.className}>
        <Script
          type='text/javascript'
          id='metrika-counter'
          strategy='afterInteractive'
        >
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(102217269, "init", {
        defer: true,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   })`}
          ;
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
