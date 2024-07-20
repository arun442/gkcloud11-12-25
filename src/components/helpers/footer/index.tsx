import NewsLetterComponent from "@/components/home_components/news_letter_component";
import classNames from "@/helpers/add_class";
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
      <footer className="w-full grid grid-cols-1 md:grid-cols-5 gap-10 mt-24">
        <section className="col-span-1 flex flex-col ">
          <h4 className="text-lg font-semibold text-white" style={{ color: '#129DD6' }}>
            Reach us
          </h4>
          <br />
          <p className="text-[16px] text-white">
            GK Cloud Solutions Pvt Ltd  <br />IndiQube Penta,  <br />New No. 51, Richmond Road,  <br />Bengaluru - 560025
          </p>
        </section>

        <section className="col-span-1 flex flex-col items-center justify-top">
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
        </section>

        <section className="col-span-1 flex flex-col items-center justify-top">
          <h4 className="text-lg font-semibold text-white" style={{ color: '#FCDC30' }}>
            Follow us
          </h4>
          <br />
          <div className="mt-2">
            <div className="flex flex-row gap-3">
              <Link href="https://twitter.com/gkcs_India" rel="noopener noreferrer" target="_blank">
                <img alt="twitter icon" className="text-white h-6 w-6" src="/Icon fa-brands-x-twitter.svg" />
              </Link>
              <Link href="https://www.instagram.com/gkcloud_solutions/" rel="noopener noreferrer" target="_blank">
                <img alt="instagram icon" className="text-white h-6 w-6" src="/Icon akar-instagram-fill.svg" />
              </Link>
              <Link href="https://www.youtube.com/@GKCloudSolutions" rel="noopener noreferrer" target="_blank">
                <img alt="youtube icon" className="text-white h-6 w-8 " src="/Icon feather-youtube.svg" />
              </Link>
            </div>
            <div className="flex flex-row gap-3 mt-2">
              <Link href="https://www.linkedin.com/company/gk-cloud-solutions/" rel="noopener noreferrer" target="_blank">
                <img alt="linkedIn icon" className="text-white h-6 w-6" src="/Icon ion-social-linkedin-outline.svg" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61557901947109" rel="noopener noreferrer" target="_blank">
                <img alt="facebook icon" className="text-white h-6 w-6" src="/Icon-facebook.svg" />
              </Link>
            </div>
          </div>
        </section>

        <section className="col-span-2 flex flex-col items-center justify-top">
          <div className="w-full flex flex-col items-start">
            <NewsLetterComponent />
          </div>
          <br />
          <div className="w-full mt-6 flex flex-col space-y-4">
            <div className="flex flex-row items-center space-x-3">
              <Link href="#" className="text-sm text-white">Privacy Policy</Link>
              <div className='h-6 w-[2px] rounded-lg bg-blue'></div>
              <Link href="#" className="text-sm text-white ">Refund Policy</Link>
              <div className='h-6 w-[2px] rounded-lg bg-blue'></div>
              <Link href="#" className="text-sm text-white ">Terms of Use</Link>
            </div>
          </div>
        </section>
      </footer>

      <div className="flex flex-row items-center justify-center text-white text-base mt-5">
        © 2024 GK Cloud Solutions Pvt Ltd
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
