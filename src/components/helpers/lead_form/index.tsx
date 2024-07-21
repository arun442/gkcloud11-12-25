import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosLead, } from '@/common/axiosPublic';
import { useState, useEffect } from 'react';
import classNames from '@/helpers/add_class';
import useUserData from '@/hooks/userData';
import { toast } from 'react-toastify';

export default function LeadFormComponent({
    isFromOffer=false,   data, closeModel, courseCode, courseName
}: {isFromOffer:boolean, data: any, closeModel: any, courseCode: string, courseName: string }) {
    const [isLoading, setLoading] = useState(false);
    // const { userData, } = useUserData();
    // useEffect(() => {
    //     if(!userData){
    //         return;
    //     }
    //     formik.setValues({
    //         firstName: userData?.
    //             first_name
    //             ?? "",

    //         email: userData?.email ?? "",
    //         phone: userData?.

    //             mobile_number

    //             ?? "",

    //         company: '',
    //     })
    // }, [userData])
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

    const formik = useFormik({
        validateOnBlur:false,
        initialValues: {
            firstName: '',
            lastName: '',

            email: '',
            phone: '',

            company: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()

                .required('Please enter a valid first name').matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),
            lastName: Yup.string()

                .required('Please enter a valid last name').matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),


            email: Yup.string().email('Invalid email address') .required('Please enter a valid email'),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter a valid phone number'),
            company: Yup.string().matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/,'Pleaes enter a valid company name')

            ,

        }),
        onSubmit: async (values, { resetForm }) => {


            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);
                let payload: any = {
                    "firstName": values.firstName,
                    "lastName": values.lastName,
                    "emailId": values.email,
                    "courseCode": courseCode,
                    "courseName": courseName,
                    "phNumber": values.phone,
                    "company": values.company

                };

                const result = await axiosLead.post('/gktsage/gkcs/leadCapture/store', payload);


                setLoading(false);
                if(isFromOffer){
                    toast.success("Thanks for your interest, one of our Sales Agent will get in touch with you shortly")
                }else{
                    toast.success("Form submitted successfully")
                }
               
                closeModel(true);
                console.log(result.data);
                resetForm();

            } catch (error: any) {
                setLoading(false);
                console.log(error);
                toast.error(error!.message);
                closeModel();

            }
        },
    });
    return <section className='relative  mx-auto box-border border  p-10 border-blue border-1 bg-dark_blue rounded-2xl'>
        <img
            onClick={(e) => {
                closeModel(false)
            }}
            alt='cancel icon'
            className="cursor-pointer absolute text-blue h-6 w-6 top-4 right-4"
            src="/cancel.png" />

        <form   id='my-form' autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('firstName')}
                        type="text"
                        maxLength={50}

                        
                        placeholder='First Name *'

                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.firstName ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.firstName}</div>
                    ) : null}
                </div>

            </div>
            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('lastName')}
                        type="text"

                        maxLength={50}
                        
                        placeholder='Last Name *'

                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.lastName ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.lastName}</div>
                    ) : null}
                </div>

            </div>

            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('phone')}
                        type="text"

                        maxLength={10}
                        
                        placeholder='Phone Number *'

                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.phone ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.phone}</div>
                    ) : null}
                </div>
            </div>
            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('email')}
                        type="text"

                        maxLength={50}
                        
                        placeholder='Email *'

                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.email ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.email}</div>
                    ) : null}
                </div>

            </div>
            {
              isFromOffer==true?<></>:  <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('company')}
                        type="text"


                        maxLength={50}
                        placeholder='Company Name'

                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.company ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.company}</div>
                    ) : null}
                </div>

            </div>
            }


            <button form='my-form' type='submit' className="mt-4 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
                {
                    isLoading ? "Loading.." : "Submit"
                }
            </button>
        </form>

    </section>
}