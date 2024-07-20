import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosPublic } from '@/common/axiosPublic';
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeSlashIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify';
import errorHelper from '@/common/error_helper';

export default function SignInContainer() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter()
  const [passwordType, setPasswordType] = useState("password");

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
       .required('Please provide a password.'),
      
      email: Yup.string().email('Invalid email address').required('*'),
    }),
    onSubmit: async (values, { resetForm }) => {


      try {
        if (isLoading) {
          return;
        }
        setLoading(true);
        const result = await axiosPublic.post('/auth/login', {
          "email": values.email,
          "password": values.password

        });
        console.log("what is the login data");
        console.log(result.data);
        localStorage.setItem("session", JSON.stringify(result.data));




        router.push("/");
        setTimeout(() => {
          setLoading(false);
          resetForm();
        }, 2000);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        toast.error(errorHelper(error));

      }
    },
  });

  return (
    <main className="w-full  flex-1 flex flex-col justify-center items-center">
      {/* <!-- Sign Up Form --> */}

      <div className='flex flex-col justify-center items-center gap-2 mb-10' >
        <h3 className="text-3xl text-blue font-semibold">
          Welcome <span className='text-white'>Back</span>
        </h3>
        <p className='text-sm font-normal text-white'>Login to Continue</p>
      </div>
      <form autoComplete="off" onSubmit={formik.handleSubmit} className='w-[375px]'>



        <div className="mb-4 relative">

          <input
            {...formik.getFieldProps('email')}
            type="email"
            placeholder="Email *"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
          />
          <span className="absolute top-4 right-4">
            <img
alt='email icon'
              className="text-blue h-4 w-5"
              src="/email.png" />

          </span>
          {formik.errors.email ? (
            <div className="text-sm text-red mt-2 ml-2">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-5 relative">

          <input
            type={passwordType}
            placeholder="Password *"
            maxLength={30}

            {...formik.getFieldProps('password')}

            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
          />
          <span className="absolute top-4 right-4 cursor-pointer" onClick={togglePassword}>
            {passwordType == "password" ? <EyeIcon className="text-blue h-4 w-4" /> : <EyeSlashIcon className="text-blue h-4 w-4" />}
          </span>
          {formik.errors.password ? (
            <div className="text-sm text-red mt-2 ml-2">{formik.errors.password}</div>
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
            isLoading ? "Loading.." : "Login"
          }
        </button>

        <div className='flex flex-row items-center justify-center mb-3'>              <Link
          href="#"
          className="text-sm text-white"
        >
          Forgot password?
        </Link></div>


      </form>
      <div className='flex flex-row items-center justify-center' >
        <h4 className='text-sm font-normal text-white'>{"Don't have account?"} <span className='font-semibold text-blue cursor-pointer' onClick={(e) => router.push("/auth/signup")}>Signup?</span></h4>
      </div>
    </main>
  )
}
