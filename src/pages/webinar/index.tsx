import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/Footer";
import WebinarContainer from "@/components/webinar_components/webinar_container";

export default function Webinar() {
  return (
    <main
      className={`max-w-7xl mx-auto bg-primary_color xl:px-0 sm:px-20 flex flex-col gap-24`}
    >
   <Header/>
   <WebinarContainer/>
  <Footer/>
    </main>
  );
}
