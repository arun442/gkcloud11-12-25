

import React, { useState, useEffect } from "react";

import Image from "next/image";

import imageHelper from "@/common/image_helper";
import { axiosPublic } from "@/common/axiosPublic";

interface Client {
  featureCustomerId: number;
  customerName: string;
  customerDescription: string;
  imageId: number;
  customerUrl: string;
  featureCustomerSequencePriority: number;
  isActive: boolean;
  Image: {
    imageId: number;
    imageTitle: string;
    imageName: string;
    imageDescription: string;
    imageUrl: string;
    thumbnailUrl: string | null;
    entityType: string;
    imageSequencePriority: number | null;
  };
}
const OurClientAboutComponent: React.FC = () => {

  const [data, setData] = useState<Client[]>([]);
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/feature-customer');
    
      setData(result.data.featuredCustomer);
    } catch (error) {

    }
  }

  
  return (


    <div className=" w-full grid  grid-cols-2 md:grid-cols-4 gap-6">

      {
        data.filter((client) => client.isActive).map((e: any,index) => {
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





