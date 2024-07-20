

import React, { useState, useEffect } from "react";

import Image from "next/image";

import imageHelper from "@/common/image_helper";
import { axiosPublic } from "@/common/axiosPublic";
import { useRouter } from "next/router";


const PartnerAboutComponent: React.FC = () => {

  const [partners, setPartners] = useState<any[]>([]);
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/partner');
      
      setPartners(result.data.partners);
    } catch (error) {

    }
  }
  const router=useRouter();
  return (


    <div className=" w-full grid  grid-cols-5 gap-5">

      {
        partners.map((e: any,index) => {
          return <div onClick={(event)=>{
            if (e.isEnabled == false) {
              return;
            }
            router.push(`/course?type=partner&id=${e.partnerId}&name=${e.partnerName}`)
          }} key={index} className="transform transition duration-500 hover:scale-110 w-full h-32 border p-4 flex flex-row justify-center items-center border-blue border-1 bg-dark_blue rounded-lg">
            <img

              className="cursor-pointer object-contain max-w-full h-full w-full"

              src={imageHelper(e.Image.imageUrl)}
              alt={`our partner ${e.partnerName}`}
            />

          </div>
        })
      }




    </div>
  )
}

export default PartnerAboutComponent;





