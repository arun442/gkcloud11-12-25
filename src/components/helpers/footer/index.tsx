import Image from "next/image";
import Link from "next/link";
import React from "react";



type FooterProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const Footer: React.FC<FooterProps> = (props) => {
 
  return (
    <>

    <footer className="w-full flex flex-row justify-between">
      
      <div className="flex-1">
                <h4 className="mb-4 text-lg font-semibold text-white">
                  Follow Us On
                </h4>
                <div className="flex items-center">
                <Link
                    href="https://www.linkedin.com/company/gk-cloud-solutions"
                    className=" mr-3"
                    rel="noopener noreferrer" target="_blank"
                    >
                  <img   className="text-white h-8 w-8"   src="/Icon_linkedIn.svg" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/gkcloud_solutions"
                    className=" mr-3"
                    rel="noopener noreferrer" target="_blank"
                    >
                  <img   className="text-white h-8 w-8"   src="/Icon_insta.svg" />
                  </Link>
                  {/* <Link
                    href="javascript:void(0)"
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-custom_grey hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary"
                  >
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      className="fill-current"
                      fill="#ffffff"
                    >
                      <path d="M15.6645 1.88018C15.4839 1.13364 14.9419 0.552995 14.2452 0.359447C13.0065 6.59222e-08 8 0 8 0C8 0 2.99355 6.59222e-08 1.75484 0.359447C1.05806 0.552995 0.516129 1.13364 0.335484 1.88018C0 3.23502 0 6 0 6C0 6 0 8.79263 0.335484 10.1198C0.516129 10.8664 1.05806 11.447 1.75484 11.6406C2.99355 12 8 12 8 12C8 12 13.0065 12 14.2452 11.6406C14.9419 11.447 15.4839 10.8664 15.6645 10.1198C16 8.79263 16 6 16 6C16 6 16 3.23502 15.6645 1.88018ZM6.4 8.57143V3.42857L10.5548 6L6.4 8.57143Z" />
                    </svg>
                  </Link> */}
                  <Link
                    href="https://www.youtube.com/channel/UCVPhohbPQ2OzZcXBKCrLgUA"
                    className=" mr-3"
                    rel="noopener noreferrer" target="_blank"
                    >
                  <img   className="text-white h-8 w-8"   src="/Icon_youtube.svg" />
                  </Link>


                  <Link
                    href="https://www.facebook.com/profile.php?id=61557901947109"
                    className=" mr-3"
                    rel="noopener noreferrer" target="_blank"
                  >
                <img className="text-white h-8 w-8" src="/Icon_facebool.svg" />

                  </Link>
                  <Link
                    href="https://twitter.com/gkcs_India"
                    className=" mr-3"
                    rel="noopener noreferrer" target="_blank"
                  >
                <img className="text-white h-8 w-8" src="/Icon fa-brands-x-twitter.png" />

                  </Link>
                 
                </div>
                </div>
                <section >
      <Link href="/"  >
                <img
                                        className="h-14 w-auto mb-3"
                                        src="/logo.png"
                                        alt="Your Company"
                                       
                                    />
                </Link>
                <div>
                
        <div className="flex-1">
  <p className="text-xs text-white mt-1">
    GK Cloud Solutions Pvt Ltd, <br />
    IndiQube Penta, <br />
    New No. 51 Richmond Road, <br />
    Bengaluru - 560025.
  </p>
  <br />
  <div className="flex flex-row gap-2 mb-2">
  <img
  
  className="text-white h-5 w-5"
  src="/footer_call.svg" />
   <p className="text-xs text-white mt-1 flex">+91-6362234100</p>
  </div>
  <div className="flex flex-row gap-2">
  <img
  
  className="text-white h-5 w-5"
  src="/footer_email.svg" />
   <p className="text-xs text-white mt-1 flex">support@gkcloud.ai</p>
  </div>
 
</div>

                </div>
      </section>
      <section>
      </section>
    </footer>
      <div className="flex flex-row items-center justify-center text-white text-base">
      © Copyright GK Cloud Solutions Pvt Ltd 2024. All rights reserved.
      </div>
    </>
  );
};

export default Footer;

const LinkGroup = ({ children, header }:{children:any,header:any}) => {
  return (
    <>
      <div className="w-full px-4">
        <div className="mb-10 w-full">
          <h4 className="mb-9 text-lg font-semibold text-white">
            {header}
          </h4>
          <ul className="space-y-3">{children}</ul>
        </div>
      </div>
    </>
  );
};

Footer.defaultProps = {};



const NavLink = ({ link, label }:any) => {
  return (
    <li>
      <Link
        href={link}
        className="inline-block text-base leading-loose text-white hover:text-primary dark:text-custom_grey-6"
      >
        {label}
      </Link>
    </li>
  );
};