

import React, { useState, useEffect } from "react";

import Image from "next/image";

import imageHelper from "@/common/image_helper";
import { axiosPublic } from "@/common/axiosPublic";
import { useRouter } from "next/router";


const PartnerComponent: React.FC = () => {

  const [partners, setPartners] = useState([]);
  const router = useRouter();
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/partner');
      console.log("what is the result");
      console.log(result.data);
      setPartners(result.data.partners);
    } catch (error) {

    }
  }
  return (


    <div className="w-full grid gap-4 grid-cols-5">

      {
        partners.map((e: any, index) => {
          return <div onClick={() => {
            if (e.isEnabled == false) {
              return;
            }
            router.push(`/course?type=partner&id=${e.partnerId}&name=${e.partnerName}`)
          }} key={index} className="cursor-pointer h-32 border p-4 flex flex-row justify-center items-center border-blue border-1 bg-dark_blue rounded-lg">
            <img

              className=" object-contain max-w-full h-full w-full"

              src={imageHelper(e.Image.imageUrl)}
              alt="link"
            />

          </div>
        })
      }




    </div>
  )
}

export default PartnerComponent;





