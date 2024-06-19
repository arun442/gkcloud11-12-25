import { Html, Head, Main, NextScript } from "next/document";
import { usePathname } from "next/navigation";
export default function Document() {
  const pathname = usePathname();
  // console.log("what is the pathname",window.location.href);
  return (
    <Html lang="en">
      <Head />
      <body className="relative w-full bg-primary_color">
      
      
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
