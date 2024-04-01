

import React, { useState, useEffect } from "react";

import Image from "next/image";

import imageHelper from "@/common/image_helper";
import { axiosPublic } from "@/common/axiosPublic";


const PartnerAboutComponent: React.FC = () => {

  const [partners, setPartners] = useState<any[]>([]);
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


    <div className=" w-full grid  grid-cols-4 gap-5">

      {
        partners.map((e: any,index) => {
          return <div key={index} className="w-60 h-32 border p-4 flex flex-row justify-center items-center border-blue border-1 bg-dark_blue rounded-lg">
            <img

              className="cursor-pointer object-contain max-w-full h-full w-full"

              src={imageHelper(e.Image.imageUrl)}
              alt="link"
            />

          </div>
        })
      }




    </div>
  )
}

export default PartnerAboutComponent;





