import React, { Fragment, useState,useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import { axiosPublic } from '@/common/axiosPublic';
import useTrainingMode from '@/hooks/training_mode_hook';
import { motion } from "framer-motion"
import { commonbasePath } from "@/common/constants";


export default function ClassesComponent() {
    const basePath  = commonbasePath;

  
const {trainingData:data, isLoading}=useTrainingMode();

    
    return (
        < div className='mt-24'>
                 <MainHeading  text='Our Proven Learning Approach' color="#f7ba16"/>

         <main className="w-full relative rounded-lg  justify-center items-center hidden md:flex mt-2 "  style={{height:"100%"}} >

             {/* {
   data.map((e)=>{
    console.log('e',e);
      
        return <motion.div 
        initial={{ x:e.trainingModeId==1?100:e.trainingModeId==2?100:e.trainingModeId==3?100:e.trainingModeId==4?-100:-100,y:100 ,opacity:0}}
        whileInView={{x:0,y:0,opacity:1}}
        transition={{duration:1}}
        
        
        className="absolute text-white flex  justify-center items-center "  style={{top:e.trainingModeId==1?"10px":e.trainingModeId==2?"90px":e.trainingModeId==3?"320px":e.trainingModeId==4?"250px":"100px",right:e.trainingModeId==1?"490px":e.trainingModeId==2?"195px":e.trainingModeId==3?"350px":e.trainingModeId==4?"600px":"630px"}}>
                <img src={`${basePath}/circle1.png`} style={{height:"110px"}}/>
               <span className='absolute text-sm text-center'>{e.trainingModeTitle}</span> 
            </motion.div >
   })} */}
            <img src={`${basePath}/methodologyimg.png`} className='w-8/12 ' />
            {/* <span className='absolute text-sm text-center text-white ' style={{top:"220px",fontWeight:"bold",fontSize:"20px",left:"520px"}}>Methodology</span>  */}

            
{/* {
   data.map((e)=>{
    console.log('e',e);
    
        return <div className='flex flex-row modebox' style={{height:"200px",marginTop:"30px"}}> 
<div className='flex-auto'style={{textAlign:'center'}}>
<h5 style={{color:'#419CFD',fontFamily:'Poppins SemiBold'}}>{e.trainingModeTitle}</h5>
<p style={{color:'#ECF4FF',padding:'10px'}}>{e.trainingModeDescription}</p>

</div>
{e.trainingModeId==5?null:<div  style={{borderRight:"2px solid #002C6D",padding:0,margin:0,width:0}}></div>}


        </div>

        //  <div key={e.trainingModeId} className='p-4 bg-dark_blue border-2  border-blue rounded-md h-[350px] flex flex-col justify-center gap-10'>
        //     <h3 className='text-xl font-bold text-center text-blue'>{e.trainingModeTitle}</h3>
        //     {
        //        e.trainingModeTitle=="Classroom Training"? <p className='text-lg text-white  text-center mb-10'>
        //        Traditional, <span className="text-nowrap">instructor-led</span> learning in popular global destinations.
        //      </p>: <p className='text-lg text-white text-wrap text-center mb-10'>{e.trainingModeDescription}</p>
        //     }
           
        // </div>
    })
} */}
        </main>
        <main className="w-full relative mt-2 rounded-lg p-2  justify-center flex sm:hidden "  style={{height:"100%"}} >
        <img src={`${basePath}/methodologysm.png`} className='h-80' />

        </main>

        </div>
       
    )
}
