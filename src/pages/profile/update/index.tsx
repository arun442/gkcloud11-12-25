
import ProfileLayout from "@/components/profile_components/profile_layout";
import { useRouter } from "next/router";
import { axiosPrivate } from "@/common/axiosPrivate";
import { useEffect, useState } from "react";

import classNames from '@/helpers/add_class';

import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useUserData from "@/hooks/userData";
import { EyeIcon, EyeSlashIcon, UserCircleIcon } from '@heroicons/react/20/solid'
export default function Index() {
    const { userData } = useUserData();



    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [isPasswordLoading, setPasswordLoading] = useState(false);
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: ''

        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('*'),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('*'),

            name: Yup.string().required('*'),


        }),
        onSubmit: async (values, { resetForm }) => {


            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);

                const result = await axiosPrivate.post('/user/update-user-profile', {
                    userId: userData?.userId,
                    mobile: values.phone,
                    firstName: values.name
                });
                localStorage.removeItem('userData');

                setLoading(false);
                toast.success("Profile updated successfully")
                console.log(result.data);
               

            } catch (error: any) {
                setLoading(false);
                console.log(error);
                toast.error(error!.message);

            }
        },
    });
    const passwordFormik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: ""
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string()
               // .required('No password provided.')
                //.min(8, 'Password is too short')
               // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
               .required('Please provide a password.')
               .min(8, 'Password must be at least 8 characters long.')
               .matches(/[a-zA-Z0-9!@#$%^&*]/, 'Password can only contain letters, numbers, and special characters like !@#$%^&*.'),
            newPassword: Yup.string()
               // .required('No password provided.')
                //.min(8, 'Password is too short')
               // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
               .required('Please provide a password.')
               .min(8, 'Password must be at least 8 characters long.')
               .matches(/[a-zA-Z0-9!@#$%^&*]/, 'Password can only contain letters, numbers, and special characters like !@#$%^&*.')

        }),
        onSubmit: async (values, { resetForm }) => {


            try {
                if (isPasswordLoading) {
                    return;
                }
                setPasswordLoading(true);

                const result = await axiosPrivate.post('/user/change-password', {

                    oldPassword: values.currentPassword,
                    newPassword: values.newPassword

                });


                setPasswordLoading(false);
                toast.success("Password updated successfully")
                console.log(result.data);
                resetForm();

            } catch (error: any) {
                setPasswordLoading(false);
                console.log(error);
                toast.error(error!.message);

            }
        },
    });

    useEffect(() => {
        formik.setValues({
            name: userData?.firstName ?? "",
            email: userData == null ? "" : userData["UserCredential.email"],
            phone: userData?.mobile ?? "",
        })


    }, [userData])
    const [passwordOneType, setPasswordOneType] = useState("password");

  const toggleOnePassword = () => {
    if (passwordOneType === "password") {
      setPasswordOneType("text")
      return;
    }
    setPasswordOneType("password")
  }
  const [passwordTwoType, setPasswordTwoType] = useState("password");

  const toggleTwoPassword = () => {
    if (passwordTwoType === "password") {
      setPasswordTwoType("text")
      return;
    }
    setPasswordTwoType("password")
  }
    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col">
                <h2 className="text-xl font-medium text-normal_white">My Profile</h2>

                <form onSubmit={formik.handleSubmit} className=" w-full flex-col mt-6">
                    <h2 className="mb-2 text-white">Details</h2>
                    <section className="ml-14 mb-6">
                        <p className="text-white text-sm w-20 mb-2">Name *</p>
                        <div className=''>
                            <input
                                {...formik.getFieldProps('name')}
                                type="text"





                                className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                            />
                            {formik.errors.name ? (
                                <div className="text-sm text-red mt-2 ml-2">{formik.errors.name}</div>
                            ) : null}
                        </div>
                    </section>
                    <section className="flex ml-14 mb-6 gap-10 ">
                        <section className="">
                            <p className="text-white text-sm w-20 mb-2">Phone *</p>
                            <div className=''>
                                <input
                                    {...formik.getFieldProps('phone')}
                                    type="text"





                                    className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                                />
                                {formik.errors.phone ? (
                                    <div className="text-sm text-white mt-2 ml-2">{formik.errors.phone}</div>
                                ) : null}
                            </div>
                        </section>
                        <section className="">
                            <p className="text-white text-sm w-20 mb-2">Email *</p>
                            <div className=''>
                                <input
                                    {...formik.getFieldProps('email')}
                                    type="email"
                                    readOnly={true}




                                    className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                                />
                                {formik.errors.email ? (
                                    <div className="text-sm text-red mt-2 ml-2">{formik.errors.email}</div>
                                ) : null}
                            </div>
                        </section>
                        <button type='submit' className="mt-7 ml-14 flex  justify-center items-center  bg-blue h-12 w-40 font-medium text-white rounded-full">
                            {
                                isLoading ? "Loading.." : "Save"
                            }
                        </button>

                    </section>

                </form>
                <form onSubmit={passwordFormik.handleSubmit} className=" w-full flex-col mt-6">
                    <h2 className="mb-2  text-white">Change Password</h2>

                    <section className="flex ml-14 gap-10 ">
                        <section className="">
                            <p className="text-white text-sm mb-2">Current Password</p>
                            <div className='relative'>
                                <input
                                    {...passwordFormik.getFieldProps('currentPassword')}
                                   
                                    type={passwordOneType}
                                    maxLength={30}



                                    className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                                />
                                   <span className="absolute top-4 right-4 cursor-pointer" onClick={toggleOnePassword}>
            {passwordOneType == "password" ? <EyeIcon className="text-blue h-4 w-4" /> : <EyeSlashIcon className="text-blue h-4 w-4" />}
          </span>
                                {passwordFormik.errors.currentPassword ? (
                                    <div className="text-sm text-red mt-2 ml-2">{passwordFormik.errors.currentPassword}</div>
                                ) : null}
                            </div>
                        </section>
                        <section className="">
                            <p className="text-white text-sm mb-2">New Password</p>
                            <div className='relative'>
                                <input
                                    {...passwordFormik.getFieldProps('newPassword')}
                                    type={passwordTwoType}
                                    maxLength={30}




                                    className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                                />
                                   <span className="absolute top-4 right-4 cursor-pointer" onClick={toggleTwoPassword}>
            {passwordTwoType == "password" ? <EyeIcon className="text-blue h-4 w-4" /> : <EyeSlashIcon className="text-blue h-4 w-4" />}
          </span>
                                {passwordFormik.errors.newPassword ? (
                                    <div className="text-sm text-red mt-2 ml-2">{passwordFormik.errors.newPassword}</div>
                                ) : null}
                            </div>
                        </section>
                        <button type='submit' className="mt-7 ml-14 flex  justify-center items-center  bg-blue h-12 w-40 font-medium text-white rounded-full">
                            {
                                isPasswordLoading ? "Loading.." : "Save"
                            }
                        </button>
                    </section>

                </form>
            </main>
        </ProfileLayout>
    );
}
