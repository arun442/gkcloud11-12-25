import React, { Fragment,useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosPublic } from '@/common/axiosPublic';
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
export default function SignInContainer() {

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
    
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
    
      password: Yup.string()
      
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async(values, { resetForm }) => {
     

      try {
        if(isLoading){
          return;
        }
        setLoading(true);
   const result=await axiosPublic.post('/auth/login', {
          "email":values.email,
          "password":values.password
        
      });
      localStorage.setItem("session",JSON.stringify(result.data));
      console.log("what is the result");
      setLoading(false);
     console.log(result.data);
      resetForm();
      router.push("/");
      }catch (error:any) {
        setLoading(false);
        console.log(error);
        alert(error!.message);
      
      }
    },
  });

    return (
        <main className="w-full bg-primary_color flex-1 flex flex-col justify-center items-center gap-10">
            {/* <!-- Sign Up Form --> */}

            <div className='flex flex-col justify-center items-center gap-2' >
                <h3 className="text-3xl text-blue font-semibold">
                Welcome <span className='text-white'>Back</span>
                </h3>
                <p className='text-sm font-normal text-white'>Login to Continue</p>
            </div>
            <form onSubmit={formik.handleSubmit} className='w-[375px]'>

               

                <div className="mb-4">
                  
                    <input
                       {...formik.getFieldProps('email')}
                        type="email"
                        placeholder="Email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                     {formik.errors.email ? (
                    <div className="text-sm text-white mt-2 ml-2">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-5 relative">
                   
                    <input
                          type={passwordType}
                          placeholder="Password"
  
  
                          {...formik.getFieldProps('password')}
                     
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                    />
                      <span className="absolute top-4 right-4" onClick={togglePassword}>
                          {passwordType == "password"?<EyeIcon className="text-primary_color h-4 w-4" />:<EyeSlashIcon className="text-primary_color h-4 w-4" />}
                        </span>
                        {formik.errors.password ? (
                    <div className="text-sm text-white mt-2 ml-2">{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="mb-8 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex items-center justify-center gap-2 cursor-pointer">
                    <div className="relative pt-0.5">
                      <input
                        type="checkbox"
                        id="formCheckbox"
                        className="text-white"
                      />
                     
                    </div>
                    <p className='text-sm text-white'>Keep me signed in</p>
                  </label>

                </div>

                <button className="mb-3 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
                {
                  isLoading?"Loading..":"Login"
                }
                </button>
                
  <div className='flex flex-row items-center justify-center mb-3'>              <Link
                    href="#"
                    className="text-sm text-white"
                  >
                    Forget password?
                  </Link></div>
                <div className='flex flex-row items-center justify-center' >
                    <h4 className='text-lg font-semibold text-white'>Dont have account? <span className='font-semibold text-blue cursor-pointer' onClick={(e)=>router.push("/auth/signup")}>Signup?</span></h4>
                </div>

            </form>

        </main>
    )
}
