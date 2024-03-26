import Header from "@/components/helpers/header";
import SignInContainer from "@/components/signin_components/signin_container";


export default function SignIn() {
    return (
      <main
        className={`max-w-7xl mx-auto bg-primary_color sm:px-20 flex flex-col gap-24`}
      >
    <div className="w-full flex flex-col h-screen ">
   <Header/>
  <SignInContainer/>
  
   </div>
  
      </main>
    );
  }
  