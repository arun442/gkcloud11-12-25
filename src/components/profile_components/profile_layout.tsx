import { useRouter } from "next/router";
import Header from "../helpers/header"
import { usePathname } from "next/navigation";
import classNames from "@/helpers/add_class";


export default function ProfileLayout({
    children
}: { children: any }) {
    const router=useRouter();
    const pathname = usePathname();
    return (
        
        <main
            className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
        >

            <Header />
            <main className="flex-1 max-h-full w-full  flex flex-row mt-10 gap-5">
         {
             pathname.includes("profile/update")?null:    <section className="hidden md:flex flex-col gap-4 text-white text-sm w-48 my-4 mr-4 cursor-pointer">
               <div onClick={()=>{
                router.push("/profile")
               }} className={classNames("px-2 py-2 rounded-sm  cursor-pointer",pathname=="/profile"?"bg-dark_blue":"")}>Dashboard</div>
               <div onClick={()=>{
                router.push("/profile/my-achivement")
               }} className={classNames("px-2 py-2 rounded-sm  cursor-pointer",pathname=="/profile/my-achivement"?"bg-dark_blue":"")}>Achievement</div>
               <div onClick={()=>{
                router.push("/profile/my-notification")
               }} className={classNames("px-2 py-2 rounded-sm  cursor-pointer",pathname=="/profile/my-notification"?"bg-dark_blue":"")}>Notification</div>
               <div onClick={()=>{
                router.push("/profile/upcoming-webinar")
               }} className={classNames("px-2 py-2 rounded-sm  cursor-pointer",pathname=="/profile/upcoming-webinar"?"bg-dark_blue":"")}>Upcoming Webinar</div>
               <div  onClick={()=>{
                router.push("/profile/talk-to-us")
               }} className={classNames("px-2 py-2 rounded-sm  cursor-pointer",pathname=="/profile/talk-to-us"?"bg-dark_blue":"")}>Talk to us</div>
               <div onClick={()=>{
                router.push("/profile/my-history")
               }} className={classNames("px-2 py-2 rounded-sm  cursor-pointer",pathname=="/profile/my-history"?"bg-dark_blue":"")}>Purchase History</div>
           </section>
         }
                <section className="flex-1">{children}</section>
            </main>


        </main>

    )
}