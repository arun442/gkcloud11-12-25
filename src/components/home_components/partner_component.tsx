

import React, { useState, useEffect } from "react";

import Image from "next/image";
import api from "@/helpers/intercepter";
import imageHelper from "@/helpers/image_helper";


const PartnerComponent: React.FC = () => {

  const [partners, setPartners] = useState([]);
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await api.get('/partner');
      console.log("what is the result");
      console.log(result.data);
      setPartners(result.data.partners);
    } catch (error) {

    }
  }
  return (


    <div className=" w-full grid gap-4 grid-flow-col auto-cols-max">

      {
        partners.map((e: any) => {
          return <div className="w-60 h-32 border p-4 flex flex-row justify-center items-center border-blue border-1 bg-dark_blue rounded-lg">
            <img

              className="cursor-pointer object-cover max-w-full h-full w-full"

              src={imageHelper(e.partner_image)}
              alt="link"
            />

          </div>
        })
      }




    </div>
  )
}

export default PartnerComponent;





