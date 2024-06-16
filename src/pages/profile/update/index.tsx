
import ProfileLayout from "@/components/profile_components/profile_layout";
import { useRouter } from "next/router";
import { axiosPrivate } from "@/common/axiosPrivate";
import { useEffect, useState } from "react";

import classNames from '@/helpers/add_class';

import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useUserData from "@/hooks/userData";

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
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),

            name: Yup.string().required('Required'),


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


                setLoading(false);
                toast.success("Profile updated successfully")
                console.log(result.data);
                resetForm();

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
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
            newPassword: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),

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
    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col">
                <h2 className="text-xl font-medium text-normal_white">My Profile</h2>

                <form onSubmit={formik.handleSubmit} className="flex-1 w-full flex-col mt-6">
                    <h2 className="mb-2 text-white">Details</h2>
                    <section className="ml-14 mb-6">
                        <p className="text-white text-sm w-20 mb-2">Name</p>
                        <div className=''>
                            <input
                                {...formik.getFieldProps('name')}
                                type="text"





                                className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                            />
                            {formik.errors.name ? (
                                <div className="text-sm text-white mt-2 ml-2">{formik.errors.name}</div>
                            ) : null}
                        </div>
                    </section>
                    <section className="flex ml-14 mb-6 gap-10 ">
                        <section className="">
                            <p className="text-white text-sm w-20 mb-2">Phone</p>
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
                            <p className="text-white text-sm w-20 mb-2">Email</p>
                            <div className=''>
                                <input
                                    {...formik.getFieldProps('email')}
                                    type="email"
readOnly={true}




                                    className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                                />
                                {formik.errors.email ? (
                                    <div className="text-sm text-white mt-2 ml-2">{formik.errors.email}</div>
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
                <form onSubmit={passwordFormik.handleSubmit} className="flex-1 w-full flex-col mt-6">
                    <h2 className="mb-2  text-white">Change Password</h2>

                    <section className="flex ml-14 gap-10 ">
                        <section className="">
                            <p className="text-white text-sm mb-2">Current Password</p>
                            <div className=''>
                                <input
                                    {...passwordFormik.getFieldProps('currentPassword')}
                                    type="text"





                                    className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                                />
                                {passwordFormik.errors.currentPassword ? (
                                    <div className="text-sm text-white mt-2 ml-2">{passwordFormik.errors.currentPassword}</div>
                                ) : null}
                            </div>
                        </section>
                        <section className="">
                            <p className="text-white text-sm mb-2">New Password</p>
                            <div className=''>
                                <input
                                    {...passwordFormik.getFieldProps('newPassword')}
                                    type="text"





                                    className="block px-4  rounded-md w-80 bg-white h-12 text-black  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                                />
                                {passwordFormik.errors.newPassword ? (
                                    <div className="text-sm text-white mt-2 ml-2">{passwordFormik.errors.newPassword}</div>
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
