import Header from "@/components/helpers/header";
import OtpContainer from "@/components/otp_components/otp_container";


export default function OtpPage() {
    return (
      <main
        className={`max-w-7xl mx-auto bg-primary_color xl:px-0 sm:px-20 flex flex-col gap-24`}
      >
    <div className="w-full flex flex-col h-screen ">
   <Header/>
  <OtpContainer/>
  
   </div>
  
      </main>
    );
  }
  