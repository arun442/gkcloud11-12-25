


import imageHelper from "@/helpers/image_helper";
import api from "@/helpers/intercepter";
import Image from "next/image";
import React, { useState, useEffect } from "react";




const TechnologyComponent: React.FC = () => {
    const [items,setItems]=useState([]);
 
useEffect(() => {
 
  fetchData();
  
}, [])



const fetchData=async()=>{
  try {
    const result = await api.get('/course-trending');
   console.log("what is the result");
  


   setItems(result.data.trendingCourses);
  } catch (error) {
 
  }
}

    return (

       
  <div className="w-full grid grid-cols-4 gap-2">

  {
items.map((e:any)=>{
return  <div className="box-border border flex flex-col p-6 justify-start items-center border-blue border-1 bg-dark_blue rounded-lg">
<div className="border-blue-100 rounded-full h-14 w-14 p-3  bg-white-A700">
<Image
height={150}
width={150}
className="h-full w-full cursor-pointer"
src={imageHelper(e.trending_image)}
alt="link"
/>
</div>

<p className="ml-6 text-center text-sm text-white font-normal">{e.trending_title}</p>
</div>
})
  }




  </div>
    )
}

export default TechnologyComponent;





