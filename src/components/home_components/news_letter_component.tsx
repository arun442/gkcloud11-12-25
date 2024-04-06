import React, { Fragment, useState } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import { axiosPublic } from '@/common/axiosPublic';
import DialogueModel from '../helpers/popup/subscription_success_popup';

import { useFormik } from 'formik';
import * as Yup from 'yup';



export default function NewsLetterComponent() {


  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const formik = useFormik({
    initialValues: {
    
      email: '',
    },
    validationSchema: Yup.object({
    
   
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async(values, { resetForm }) => {
     

      try {
     
       
        const result = await axiosPublic.post('/lms/add-subscriber', {
          "email": values.email,
         
        });
        console.log("news letter");
        console.log(result.data);
     
        openModal();
        resetForm();
      }catch (error:any) {
       
        alert(error!.message);
      
      }
    },
  });
    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col justify-center items-center gap-14'>
            <MainHeading text='Subscribe to our Newsletter'/>
          <div>
          <div className="w-128 mx-auto flex flex-row  items-center justify-center relative">
         
         <input
        {...formik.getFieldProps('email')}
        type="email"
        placeholder="Email"
       
           className="block pl-6 w-full text-white border-1 pr-40 rounded-full bg-dark_blue h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
         <button type='submit'    className='cursor-pointer absolute right-0 top-0 bottom-0 h-12 w-40 bg-blue rounded-full text-white text-sm font-medium flex flex-row items-center justify-center'>Subscribe</button>
       </div>
       {formik.errors.email ? (
                   <div className="text-sm text-white mt-2 ml-2">{formik.errors.email}</div>
                 ) : null}
          </div>
        <DialogueModel closeModal={closeModal} isOpen={isOpen} />
        </form>
    )
}
