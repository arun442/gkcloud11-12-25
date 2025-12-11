import { commonbasePath } from "@/common/constants";
import dynamic from "next/dynamic";

import { Html, Head, Main, NextScript } from "next/document";
const Ai_button = dynamic(() => import("@/components/helpers/ai_bot_button"), {
  ssr: false,
});
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script
          dangerouslySetInnerHTML={{
            __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PR4WLDSQ');
`,}}/>
        <title>Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud</title>
        
        {/* Meta Keywords */}
        <meta name="keywords" content="ai course, ai training, ai classes, ai training courses, ai courses online, ai learning courses, ai certification course, best ai courses, online courses in ai, best courses on ai, artificial intelligence and machine learning course, ai technology courses" />
        <meta name="description" content="Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc." />
        <link rel="canonical" href="https://gkcloud.ai/"/>
        <meta name="robots" content="index, follow"/>
        {/* Open Graph Tags */}
        <meta property="og:title" content="Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud" />
        <meta property="og:description" content="Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc." />
        <meta property="og:image" content={`${commonbasePath}/logo.png`} />
        <meta property="og:url" content="https://gkcloud.ai/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GK Cloud" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud" />
        <meta name="twitter:description" content="Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc." />
        <meta name="twitter:image" content={`${commonbasePath}/logo.png`} />

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GKCloud.ai",
              "url": "https://gkcloud.ai/",
              "logo": "https://gkcloud.ai/logo.png",
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
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            })
          }}
        />
      </Head>
      
      <body className="relative w-full bg-primary_color custom-scrollbar1" >
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PR4WLDSQ"
height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        <Main />
      <Ai_button/>
<NextScript />
      </body>

    </Html>
  );
}
