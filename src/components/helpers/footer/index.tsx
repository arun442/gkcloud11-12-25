import NewsLetterComponent from "@/components/home_components/news_letter_component";
import classNames from "@/helpers/add_class";
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

      <footer className="w-full flex flex-col gap-10 md:gap-0 md:flex-row justify-between md:items-center mt-24">
        <section className="flex-1">
          <h4 className=" text-lg font-semibold text-white underline">
            Reach us:
          </h4>
          <div>

            <div className="flex-1">
              <p className="text-[16px] text-white">
                IndiQube Penta, <br />
                # 51, Richmond Road, <br />
                Bengaluru - 560025.
              </p>
              <br />


            </div>

          </div>
        </section>
        <section className="flex-1 flex-col items-center justify-center">

          <div className="flex items-center justify-center">
            <Link
              href="https://www.linkedin.com/company/gk-cloud-solutions/"
              className=" mr-3"
              rel="noopener noreferrer" target="_blank"
            >
              <img

                className="text-white h-8 w-8"
                src="/Icon_linkedIn.svg" />
            </Link>
            <Link
              href="https://www.instagram.com/gkcloud_solutions/"
              className=" mr-3"
              rel="noopener noreferrer" target="_blank"
            >
              <img

                className="text-white h-8 w-8"
                src="/Icon_insta.svg" />
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
              href="https://www.youtube.com/@GKCloudSolutions"
              className=" mr-3"
              rel="noopener noreferrer" target="_blank"
            >
              <img

                className="text-white h-10 w-10"
                src="/Icon_youtube.svg" />
            </Link>


            <Link
              href="https://www.facebook.com/profile.php?id=61557901947109"
              className=" mr-3 h-8 w-8"
              rel="noopener noreferrer" target="_blank"
            >
              <img

                className="text-white h-8 w-8"
                src="/Icon_facebool.svg" />

            </Link>
            <Link
              href=" https://twitter.com/gkcs_India"
              className=" mr-3 h-8 w-8"
              rel="noopener noreferrer" target="_blank"
            >
              <img className="text-white" src="/Icon fa-brands-x-twitter.png" />

            </Link>
          </div>
          <div className="flex flex-row gap-4 mt-2 items-center">
            <div className="flex flex-row gap-2 items-center">
              <img

                className="text-white h-8 w-8"
                src="/footer_call.svg" />
              <p className="text-sm text-white flex">+91 9364893718</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img

                className="text-white h-8 w-8"
                src="/footer_email.svg" />
              <a href="mailto: support@gkcloud.ai" className="text-sm text-white flex">support@gkcloud.ai</a>
            </div>
          </div>
        </section>
        <section className="flex-1">

          <NewsLetterComponent />
          <div className={classNames("w-full cursor-pointer text-sm  flex flex-row  justify-center items-center gap-3 mt-6")}>
            <div className={"text-white"} >
              Privacy Policy
            </div>
            <div className='h-6 w-[2px] rounded-lg bg-blue'></div>
            <div className={"text-white"} >
            Refund Policy
            </div>
            <div className='h-6 w-[2px] rounded-lg bg-blue'></div>
            <div className={"text-white"} >
              Terms of Use

            </div>
          </div>
        </section>

      </footer>
      <div className="flex flex-row items-center justify-center text-white text-base mt-5">
        © Copyright GK Cloud Solutions Pvt Ltd 2024. All rights reserved.
      </div>
    </>
  );
};

export default Footer;

const LinkGroup = ({ children, header }: { children: any, header: any }) => {
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



const NavLink = ({ link, label }: any) => {
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