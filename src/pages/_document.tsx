import { Html, Head, Main, NextScript } from "next/document";
import { usePathname } from "next/navigation";
export default function Document() {
  const pathname = usePathname();
 
  return (
    <Html lang="en">
     <Head>
        {/* <title>GK Cloud Solutions</title> */}
        <meta
          property="og:title"
          content="Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud"
        />
        <meta
          property="og:description"
          content="Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc."
        />
        <meta property="og:image" content="Need to add the image url" />
        <meta property="og:url" content="https://gkcloud.ai/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GK Cloud" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud"
        />
        <meta
          name="twitter:description"
          content="Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc."
        />
        <meta name="twitter:image" content="Need to add the image url" />
        <script type="application/json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GKCloud.ai",
            "url": "https://gkcloud.ai/",
            "logo": "https://gkcloud.ai/images/logo.png",
            "sameAs": [
              "https://www.facebook.com/gkcloud",
              "https://twitter.com/gkcloud"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "telephone": "+91 9364893718",
              "email": "support@gkcloud.ai"
            }
          }`}
        </script>

        {/* Website Schema */}
        <script type="application/json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "GKCloud.ai",
            "url": "https://gkcloud.ai/",
            "description": "Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://gkcloud.ai/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }`}
        </script>

        {/* Educational Organization Schema */}
        <script type="application/json">
          {`{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "GKCloud.ai",
            "url": "https://gkcloud.ai/",
            "description": "GKCloud.ai offers advanced training and educational resources in artificial intelligence and machine learning.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "GK Cloud Solutions Pvt Ltd, IndiQube Penta, New No. 51, Richmond Road",
              "addressRegion": "Bengaluru",
              "postalCode": "560025",
              "addressCountry": "India"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "telephone": "+91 9364893718",
              "email": "support@gkcloud.ai"
            }
          }`}
        </script>
      </Head>
      <body className="relative w-full bg-primary_color">
      
      
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
