

import React, { useState, useEffect } from "react";

import Image from "next/image";

import imageHelper from "@/common/image_helper";
import { axiosPublic } from "@/common/axiosPublic";
import { useRouter } from "next/router";
import { motion } from "framer-motion"

const PartnerComponent: React.FC = () => {

  const [partners, setPartners] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/partner');
   
      setPartners(result.data.partners);
   
    } catch (error) {

    }
    setTimeout(() => {
      console.log(partners.slice(3).length);

    }, 1000);
    
  }
  return (
<>
    <div className="w-3/4 hidden md:grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-evenly  "  >

      {
        partners.slice(0, 3).map((e: any, index) => {
          return <div onClick={() => {
            if (e.isEnabled == false) {
              return;
            }
console.log(window.screenY);
// sessionStorage.setItem('scrollPosition', window.scrollY);

            router.push(`/course?type=partner&id=${e.partnerId}&name=${e.partnerName}`);
            sessionStorage.removeItem("navtab");

          }} key={index} className="transform transition duration-500 hover:scale-110 cursor-pointer h-32 border p-4 flex flex-row justify-center items-center border-[#FCDC3066] border-1  rounded-lg" style={{background:'linear-gradient(#00051F 50%, #FCDC3096)'}}>
            <img

              className=" object-contain max-w-full h-full w-full"

              src={imageHelper(e.Image.imageUrl)}
              alt="link"
            />

          </div>
        })
      }




    </div>
     <div className={`${partners.slice(3).length==2 ? 'w-3/4 md:w-2/4 ':'w-3/4'} hidden md:flex gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-3`}   >

     {
       partners.slice(3).map((e: any, index) => {
         return <div onClick={() => {
           if (e.isEnabled == false) {
             return;
           }
           router.push(`/course?type=partner&id=${e.partnerId}&name=${e.partnerName}`)
         }} key={index} className={` ${partners.slice(3).length==2 ? 'w-2/3':'w-1/3'} transform transition duration-500 hover:scale-110 cursor-pointer h-32 border p-4 flex flex-row justify-center items-center border-[#FCDC3066] border-1  rounded-lg`} style={{background:'linear-gradient(#00051F 50%, #FCDC3096)'}}>
           <img

             className={` object-contain max-w-full  w-full ${e.Image.imageTitle=='iScience'?'h-36':'h-full'}`}

             src={imageHelper(e.Image.imageUrl)}
             alt="link"
           />

         </div>
       })
     }




   </div>

   <div className='grid gap-10 w-10/12  lg:grid-cols-3 mt-3 md:hidden'   >

{
  partners.map((e: any, index) => {
    return <div onClick={() => {
      if (e.isEnabled == false) {
        return;
      }
      router.push(`/course?type=partner&id=${e.partnerId}&name=${e.partnerName}`)
    }} key={index} className='transform transition duration-500 hover:scale-110 cursor-pointer h-32 border p-4 flex flex-row justify-center items-center border-[#FCDC3066] border-1  rounded-lg' style={{background:'linear-gradient(#00051F 50%, #FCDC3096)'}}>
      <img

        className=" object-contain max-w-full h-full w-full"

        src={imageHelper(e.Image.imageUrl)}
        alt="link"
      />

    </div>
  })
}




</div>
</>

  )
}

export default PartnerComponent;





