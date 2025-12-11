import NewsLetterComponent from "@/components/home_components/news_letter_component";
import classNames from "@/helpers/add_class";
import Link from "next/link";
import React from "react";
import { useState,useEffect } from "react";
import { axiosPublic } from "@/common/axiosPublic";
import imageHelper from '@/common/image_helper';
import { commonbasePath } from "@/common/constants";
import { useRouter } from 'next/router';


type FooterProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const Footer: React.FC<FooterProps> = (props) => {
  const [data, setData] = useState<any[]>([]);
  const basePath  = commonbasePath;
  const router = useRouter();


  useEffect(() => {
    fetchData();
   
  }, []);
  const fetchData = async () => {
    try {
      const result = await axiosPublic.get("/lms/about-us");
      setData(result.data.aboutUs)
    } catch (error) {
   
    }
  }

  const handleDownload = async () => {
    try {
      // Check if there is a document to download
      const documentData = data.filter((e) => e.generalId == 9);
    

      // Get the document URL from the data
      const documentURL = imageHelper("/" + documentData[0].documentURL);

      // GET the document URL
      const response = await axiosPublic.get(documentURL, {
        responseType: 'blob'
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      console.log('blob',blob);
      

      // Create a URL for the blob object
      const url = window.URL.createObjectURL(blob);

      console.log('url',url);

      // router.push(`/Pdfpage?url=${url}`)
      // window.open(url, '_blank');
      // let win = window.open()
      window.open(url, '_blank');

      // window.open()?.document.write(`
      //    <!DOCTYPE html>
      //           <html lang="en">
      //               <head>
      //                   <meta charset="UTF-8">
      //                   <title>Document</title>
      //               </head>
      //               <body style="margin: 0; padding: 20px;">
      //                   <h1>Terms of Use</h1>
      //                   <div id="pdf-viewer-container" style="width: 100%; height: 100vh; overflow: auto;">
      //                       ${<img src={`${commonbasePath}/privacypolicy.pdf`} />}
      //                   </div>
      //               </body>
      //           </html>
      // `);
      // window.open()?.document.close();


      // Create a link element and click it to trigger the download
     
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  const handleDownload1 = async () => {
    try {
      // Check if there is a document to download
      const documentData = data.filter((e) => e.generalId == 8);
    

      // Get the document URL from the data
      const documentURL = imageHelper("/" + documentData[0].documentURL);

      // GET the document URL
      const response = await axiosPublic.get(documentURL, {
        responseType: 'blob'
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      console.log('blob',blob);
      

      // Create a URL for the blob object
      const url = window.URL.createObjectURL(blob);

      console.log('url',url);
      
      window.open(url, '_blank');

    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <>
      <footer className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mt-24  justify-around">
        <section className="col-span-1 flex flex-col justify-center md:items-end ">
        <div className="  flex flex-col items-center justify-center space-y-4">
          <h4 className="text-lg font-semibold w-full  text-white" style={{ color: '#129DD6' }}>
            Reach us
          </h4>
          <p className="text-[16px] text-white mt-2 w-full ">
            GK Cloud Solutions Pvt Ltd  <br />No. 81/37, 1st Floor,<br/> The Hulkul, Lavelle Road,<br/> Bangalore - 560001
          </p>
     
          <div className="mt-2 flex gap-3 w-full flex-col md:flex-row ">

            <div className="flex flex-row gap-2 items-center justify-start">
              <img alt="call icon" className="text-white h-4 w-4" src={`${basePath}/footer_call.svg`}/>
              <p className="text-sm text-white">+91 8310165136</p>
            </div>
            <div className="flex flex-row gap-2 items-center ">
              <img alt="email icon" className="text-white h-4 w-4" src={`${basePath}/footer_email.svg`}/>
              <a href="mailto:support@gkcloud.ai" className="text-sm text-white">support@gkcloud.ai</a>
            </div>
          </div>
          </div>
        </section>

        {/* <section className="col-span-1 flex flex-col items-center justify-top">
          <h4 className="text-lg font-semibold text-white" style={{ color: '#5FEF5C' }}>
            Contact us
          </h4>
          <br />
          <div className="mt-2">
            <div className="flex flex-row gap-2 items-center">
              <img alt="call icon" className="text-white h-6 w-6" src="/footer_call.svg" />
              <p className="text-sm text-white">+91 9364893718</p>
            </div>
            <div className="flex flex-row gap-2 items-center mt-2">
              <img alt="email icon" className="text-white h-6 w-6" src="/footer_email.svg" />
              <a href="mailto:support@gkcloud.ai" className="text-sm text-white">support@gkcloud.ai</a>
            </div>
          </div>
        </section> */}

        <section className="flex flex-col col-span-1 md:items-center justify-start">
        <div className="  flex flex-col items-start justify-start ">

          <h4 className="text-lg font-semibold text-white text-start w-full" style={{ color: '#FCDC30' }}>
            Follow us
          </h4>
         
            <div className="flex flex-col items-start  justify-start gap-3 mt-2">
              <div className="flex flex-row gap-1  gap-5 justify-start">

              <Link href="https://twitter.com/gkcs_India" rel="noopener noreferrer" target="_blank">
                <img alt="twitter icon" className="text-white h-6 w-6" src={`${basePath}/Icon fa-brands-x-twitter.svg`} />
              </Link>
              <Link href="https://www.instagram.com/gkcloud_solutions/" rel="noopener noreferrer" target="_blank">
                <img alt="instagram icon" className="text-white h-6 w-6" src={`${basePath}/Icon akar-instagram-fill.svg`} />
              </Link>
              <Link href="https://www.youtube.com/@GKCloudSolutions" rel="noopener noreferrer" target="_blank">
                <img alt="youtube icon" className="text-white h-6 w-8 " src={`${basePath}/Icon feather-youtube.svg`} />
              </Link>
              </div>
             <div className="flex flex-row gap-1 w-full gap-5 justify-start">
             <Link href="https://www.linkedin.com/company/gk-cloud-solutions/" rel="noopener noreferrer" target="_blank">
                <img alt="linkedIn icon" className="text-white h-6 w-6" src={`${basePath}/Icon ion-social-linkedin-outline.svg`} />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61557901947109" rel="noopener noreferrer" target="_blank">
                <img alt="facebook icon" className="text-white h-6 w-6" src={`${basePath}/Icon-facebook.svg`} />
              </Link>
             </div>
             
              {/* <img src="./iso.png" alt="ISO/IEC 27018:2019" style={{height:"100px"}}/> */}

              </div>
              </div>

        
         
        </section>
        <section className="flex flex-col col-span-1 md:items-center justify-start">

        <div className="flex flex-col items-start justify-start space-y-4">
        <h4 className="text-lg font-semibold text-white text-start w-full" style={{ color: '#8fc23e' }}>  Company
        </h4>

            <div className="flex flex-row items-start justify-start lg:justify-start gap-3">
            <Link href="/about"  className="text-sm text-white">About Us</Link> 
            <div className="w-px h-5 bg-white"></div>
                          <Link href="#" onClick={handleDownload} className="text-sm text-white">Privacy Policy</Link>
                          <div className="w-px h-5 bg-white"></div>

              <Link href="#" onClick={handleDownload1} className="text-sm text-white ">Terms of Use</Link>

            </div>
            <div className="flex flex-col gap-3">
            <h4 className="text-md font-semibold text-white text-start w-full " style={{ color: '#129DD6' }}>Algo4hi - Join us to stay ahead in AI </h4>

            <iframe  src="https://embeds.beehiiv.com/39a42beb-2be1-4bb4-bb0d-831d6028c13b?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{margin:0,borderRadius: "0px", backgroundColor: "transparent"}} ></iframe>

            </div>

          </div>

          </section>
        {/* <section className="col-span-2 flex flex-col items-center justify-center">
        
        
        </section> */}

      </footer>

      <div className="flex flex-row items-center md:justify-center cursor-pointer text-white text-base font-semibold "  onClick={(e) => {

router.replace("/");
}}>
        © 2025 GK Cloud Solutions Pvt Ltd
      </div>

    </>
  );
};

export default Footer;

const LinkGroup = ({ children, header }: { children: any, header: any }) => {
  return (
    <div className="w-full px-4">
      <div className="mb-10 w-full">
        <h4 className="mb-9 text-lg font-semibold text-white">
          {header}
        </h4>
        <ul className="space-y-3">{children}</ul>
      </div>
    </div>
  );
};

Footer.defaultProps = {};

const NavLink = ({ link, label }: any) => {
  return (
    <li>
      <Link href={link} className="inline-block text-base leading-loose text-white hover:text-primary dark:text-custom_grey-6">
        {label}
      </Link>
    </li>
  );
};
