import Header from "@/components/helpers/header";
import SignInContainer from "@/components/signin_components/signin_container";


export default function SignIn() {
    return (
      <main
        className={`relative max-w-7xl mx-auto bg-primary_color xl:px-0 sm:px-20 flex flex-col gap-24`}
      >
         <div className="absolute inset-0 bg-cover bg-center  h-screen" style={{backgroundImage: 'url("/bg_dot.png")', opacity: '0.1' }}></div>
    <div className="relative z-1 w-full flex flex-col h-screen ">
   <Header/>
  <SignInContainer/>
  
   </div>
  
      </main>
    );
  }
  