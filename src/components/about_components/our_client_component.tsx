

import React, { useState, useEffect } from "react";

import Image from "next/image";

import imageHelper from "@/common/image_helper";
import { axiosPublic } from "@/common/axiosPublic";


const OurClientAboutComponent: React.FC = () => {

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/feature-customer');
     console.log("feature customers",result.data.featuredCustomer);
      setData(result.data.featuredCustomer);
    } catch (error) {

    }
  }
  return (


    <div className=" w-full grid  grid-cols-2 md:grid-cols-4 gap-6">

      {
        data.map((e: any,index) => {
          return <div key={index} className="w-full md:w-60 h-32 border p-4 flex flex-row justify-center items-center border-blue border-1 bg-dark_blue rounded-xl">
          <img

            className="cursor-pointer object-contain max-w-full h-full w-full"

            src={imageHelper(e.Image.imageUrl)}
            alt={`our client ${e.customerName}`}
          />

        </div>
        })
      }




    </div>
  )
}

export default OurClientAboutComponent;





