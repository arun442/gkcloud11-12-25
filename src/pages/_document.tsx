import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="relative w-full bg-primary_color">
      <div className="absolute inset-0 -z-10 bg-cover bg-center  h-screen" style={{backgroundImage: 'url("/bg_dot.png")', opacity: '0.1' }}></div>
      
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
