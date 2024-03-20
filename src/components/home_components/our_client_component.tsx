import React, { Fragment, useState,useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import api from '@/helpers/intercepter';
import imageHelper from '@/helpers/image_helper';





export default function OurClientComponent() {

    const [partners, setPartners] = useState<any[]>([]);
    useEffect(() => {
  
      fetchData();
  
    }, [])
  
    const fetchData = async () => {
      try {
        const result = await api.get('/partner');
        console.log("what is the result");
        console.log(result.data);
        let compinedList=[...result.data.partners,...result.data.partners];
        setPartners(compinedList);
      } catch (error) {
  
      }
    }

    return (
        <main className='bg-dark_blue flex flex-row justify-center items-center rounded-lg p-16 gap-10'>
            <h2 className='text-blue text-4xl font-bold'>Our<br/>Clientele</h2>
           
          <section className='flex-1 w-full flex flex-col items-center justify-center gap-10'>
          <div className="w-full grid grid-cols-3 gap-6">
            {
        partners.map((e: any) => {
          return <div className="w-ful h-32 border p-4 flex flex-row justify-center items-center border-blue border-1 bg-dark_blue rounded-xl">
            <img

              className="cursor-pointer object-cover max-w-full h-full w-full"

              src={imageHelper(e.partner_image)}
              alt="link"
            />

          </div>
        })
      }
        </div>
        <div className='text-blue text-lg font-medium'>Show all</div>
          </section>
        </main>
       
    )
}
