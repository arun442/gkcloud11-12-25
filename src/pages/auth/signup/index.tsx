import Header from "@/components/helpers/header";
import SignUpContainer from "@/components/signup_components/signup_container";


export default function SignUp() {
    return (
      <main
        className={`max-w-7xl mx-auto bg-primary_color xl:px-0 sm:px-20 flex flex-col gap-24`}
      >
    <div className="w-full flex flex-col h-screen ">
   <Header/>
  <SignUpContainer/>
  
   </div>
  
      </main>
    );
  }
  