import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { axiosPublic } from '@/common/axiosPublic';

export default function OtpContainer() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      otp: '',

    },
    validationSchema: Yup.object({
      otp: Yup.string()

        .required('Required').length(6, 'Please enter valid otp'),

    }),
    onSubmit: async (values, { resetForm }) => {


      try {
        if (isLoading) {
          return;
        }
        setLoading(true);
        const registerData = localStorage.getItem("register");
        const result = await axiosPublic.post('/auth/verify-otp-email', {
          "otp": values.otp,
          "email": JSON.parse(registerData!).email,
        });

        const addUserResult = await axiosPublic.post('/user/add-user', {
          "email": JSON.parse(registerData!).email,
          "password": JSON.parse(registerData!).password,
          "roleId": 1,
          "firstName": JSON.parse(registerData!).name,
        });
        localStorage.removeItem("register");
        console.log("what is the result");
        setLoading(false);
        console.log(result.data);
        console.log(addUserResult.data);
        resetForm();
        router.push("/auth/signin");
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        alert(error!.message);

      }
    },
  });

  return (
    <main className="w-full  flex-1 flex flex-col justify-center items-center gap-10">
      {/* <!-- Sign Up Form --> */}

      <div className='flex flex-col justify-center items-center gap-2' >
        <h3 className="text-3xl text-white font-semibold">
          Enter <span className='text-blue'>OTP</span>
        </h3>

      </div>
      <form onSubmit={formik.handleSubmit} className='w-[375px]'>



        <div className="mb-4">

          <input
            {...formik.getFieldProps('otp')}
            maxLength={6}
            type="password"
            placeholder="Otp"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
          />
          {formik.errors.otp ? (
            <div className="text-sm text-white mt-2 ml-2">{formik.errors.otp}</div>
          ) : null}
        </div>





        <button type='submit' className="mb-3 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
          {
            isLoading ? "Loading.." : "Submit"
          }
        </button>



      </form>

    </main>
  )
}
