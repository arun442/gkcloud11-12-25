'use client'
 
import { useRouter } from 'next/navigation'

import React, { Fragment,useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosPublic } from '@/common/axiosPublic';
import { toast } from 'react-toastify'

export default function SignUpContainer() {
    const [passwordType, setPasswordType] = useState("password");
    const [isLoading,setLoading]=useState(false);
    const router = useRouter()
    const togglePassword = () => {
      if (passwordType === "password") {
        setPasswordType("text")
        return;
      }
      setPasswordType("password")
    }
  
    const formik = useFormik({
      initialValues: {
        name: '',
        password: '',
        email: '',
      },
      validationSchema: Yup.object({
        name: Yup.string()
        .required('Please enter a valid user name').matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),
        password:  Yup.string()
        .required('Please provide a password.')
       // .min(8, 'Password is too short - should be 8 chars minimum.')
       // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
       .min(8, 'Password must be at least 8 characters long.')
       .matches(/[a-zA-Z0-9!@#$%^&*]/, 'Password can only contain letters, numbers, and special characters like !@#$%^&*.'),
        email: Yup.string().email('Invalid email address').required('Please enter a valid email'),
      }),
      onSubmit: async(values, { resetForm }) => {
       
  
        try {
          if(isLoading){
            return;
          }
          setLoading(true);
     const result=await axiosPublic.post('/auth/otp-email', {
            "email":values.email,
          
        });
        localStorage.setItem("register",JSON.stringify({
          "email":values.email,
          "password":values.password,
          "name":values.name
      }));
       
        setLoading(false);
     
        resetForm();
        router.push("/auth/otp");
        } catch (error:any) {
          setLoading(false);
          console.log(error);
          toast.error(error!.message);
        
        }
      },
    });
    return (
        <main className="w-full  flex-1 flex flex-col justify-center items-center">
            {/* <!-- Sign Up Form --> */}

            <div className='flex flex-col justify-center items-center gap-2 mb-10' >
                <h3 className="text-3xl text-blue font-semibold">
                    Create <span className='text-white'>Account</span>
                </h3>
                <p className='text-sm font-normal text-white'>Create a New Account</p>
            </div>
            <form autoComplete="off" onSubmit={formik.handleSubmit} className='w-full md:w-[375px]'>

                <div className="mb-6 relative">
                   
                    <input
                      {...formik.getFieldProps('name')}
                        type="text"
                        placeholder="Username *"
                        
                        maxLength={50}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                     <span className="absolute top-4 right-4">
                      <img
                      alt='user icon'
                                   
                                   className="text-blue h-4 w-4"
                                   src="/user.png"/>
                      
                        </span>
                     {formik.errors.name ? (
                    <div className="text-sm text-red mt-2 ml-2">{formik.errors.name}</div>
                  ) : null}
                </div>

                <div className="mb-6 relative">
                  
                    <input
                      {...formik.getFieldProps('email')}
                        type="email"
                        placeholder="Email *"
                        maxLength={50}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                     <span className="absolute top-4 right-4">
                      <img
                               alt='email icon'    
                                   className="text-blue h-4 w-5"
                                   src="/email.png"/>
                      
                        </span>
                       {formik.errors.email ? (
                    <div className="text-sm text-red mt-2 ml-2">{formik.errors.email}</div>
                  ) : null}

                </div>

                <div className="mb-8 relative">
                   
                    <input
                      
                        type={passwordType}
                        placeholder="Password *"
                        maxLength={30}

                        {...formik.getFieldProps('password')}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                     <span className="absolute top-4 right-4 cursor-pointer" onClick={togglePassword}>
                          {passwordType == "password"?<EyeIcon className="text-blue h-4 w-4" />:<EyeSlashIcon className="text-blue h-4 w-4" />}
                        </span>
                        {formik.errors.password ? (
                    <div className="text-sm text-red mt-2 ml-2">{formik.errors.password}</div>
                  ) : null}
                </div>



                <button type='submit' className="mb-8 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
                {
                  isLoading?"Loading..":"Register"
                }
                </button>
              

            </form>
            <div className='flex flex-row items-center justify-center'>
                    <h4 className='text-sm font-normal text-white'>Already have an account? <span className='font-semibold text-blue cursor-pointer' onClick={(e)=>router.push("/auth/signin")}>Login</span></h4>
                </div>
        </main>
    )
}
