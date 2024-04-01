import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosPublic } from '@/common/axiosPublic';
import { useState } from 'react';
import classNames from '@/helpers/add_class';

export default function FormComponent({
    type
}: { type: string }) {
    const [isLoading, setLoading] = useState(false);

    const [index, setIndex] = useState(0);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            address: '',
            company: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()

                .required('Required'),

            lastName: Yup.string()

            ,
            email: Yup.string()

            ,
            phone: Yup.string()

            ,
            country: Yup.string()

            ,
            city: Yup.string()

            ,
            address: Yup.string()

            ,
            company: Yup.string()

            ,

        }),
        onSubmit: async (values, { resetForm }) => {


            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);
                const result = await axiosPublic.post('/lms/add-request-form', {
                    "email": values.email,
                    "requestType":type,
                    "requestedBy":index==0? "Individual":'Corporate',
                    "firstName":values.firstName,
                    "lastName" : values.lastName,
                    "companyName" :values.company,
                    "mobile" :values.phone,
                    "phone" : values.phone,
                    "country" :values.country,
                    "city" :values.city,
                    "address" :values.address,
                    "message": "RequstForm"
                    });


                setLoading(false);
                alert("Form submitted successfully")
                console.log(result.data);
                resetForm();

            } catch (error: any) {
                setLoading(false);
                console.log(error);
                alert(error!.message);

            }
        },
    });
    return <form onSubmit={formik.handleSubmit} className='mt-20  mx-auto box-border border w-[80%] py-14 px-24 border-blue border-1 bg-dark_blue rounded-2xl'>
      
            <section className='flex'>
                <div className=" mx-auto box-border border flex flex-row w-96 items-center   border-blue border-1 bg-dark_blue rounded-lg">

                    <div onClick={(e)=>setIndex(0)} className={classNames("cursor-pointer py-3 w-1/2 box-border border flex flex-row items-center justify-center text-white text-lg font-semibold  bg-primary_color rounded-lg",index==1?"border-none":"border-blue border-1")}>Individual</div>
                    <div onClick={(e)=>setIndex(1)} className={classNames("cursor-pointer py-3 w-1/2 box-border border flex flex-row items-center justify-center text-white text-lg font-semibold  bg-primary_color rounded-lg",index==0?"border-none":"border-blue border-1")}>Corporate</div>
                </div>

            </section>
            <h3 className='text-lg mt-8 text-white text-center'>Request More Information</h3>

            <section>
                <div className='mt-8 flex flex-row gap-8'>
                    <div className='flex-1'>
                        <input
                            {...formik.getFieldProps('firstName')}
                            type="text"


                            autoComplete="text"
                            placeholder='First Name'
                            required
                            className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formik.errors.firstName ? (
                            <div className="text-sm text-white mt-2 ml-2">{formik.errors.firstName}</div>
                        ) : null}
                    </div>
                    <div  className='flex-1'>
                        <input
                            {...formik.getFieldProps('lastName')}
                            type="text"


                            autoComplete="text"
                            placeholder='Last Name'
                            required
                            className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formik.errors.lastName ? (
                            <div className="text-sm text-white mt-2 ml-2">{formik.errors.lastName}</div>
                        ) : null}
                    </div>
                </div>
                <div className='mt-8 flex flex-row gap-8'>
                    <div  className='flex-1'>
                        <input
                            {...formik.getFieldProps('email')}
                            type="text"


                            autoComplete="text"
                            placeholder='Email'
                            required
                            className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formik.errors.email ? (
                            <div className="text-sm text-white mt-2 ml-2">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div  className='flex-1'>
                        <input
                            {...formik.getFieldProps('phone')}
                            type="text"


                            autoComplete="text"
                            placeholder='Phone Number'
                            required
                            className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formik.errors.phone ? (
                            <div className="text-sm text-white mt-2 ml-2">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                </div>
                <div className='mt-8 flex flex-row gap-8'>
                    <div  className='flex-1'>
                        <input
                            {...formik.getFieldProps('country')}
                            type="text"


                            autoComplete="text"
                            placeholder='Country'
                            required
                            className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formik.errors.country ? (
                            <div className="text-sm text-white mt-2 ml-2">{formik.errors.country}</div>
                        ) : null}
                    </div>
                    <div  className='flex-1'>
                        <input
                            {...formik.getFieldProps('city')}
                            type="text"


                            autoComplete="text"
                            placeholder='City'
                            required
                            className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formik.errors.city ? (
                            <div className="text-sm text-white mt-2 ml-2">{formik.errors.city}</div>
                        ) : null}
                    </div>
                </div>
                {
                    index == 1 ? <div className='mt-8 flex flex-row gap-8'>
                        <div  className='flex-1'>
                            <input
                                {...formik.getFieldProps('company')}
                                type="text"


                                autoComplete="text"
                                placeholder='Company Name'
                                required
                                className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.company ? (
                                <div className="text-sm text-white mt-2 ml-2">{formik.errors.company}</div>
                            ) : null}
                        </div>

                    </div> : <div></div>
                }
                <div className='mt-8 flex flex-row gap-8'>
                    <div  className='flex-1'>
                        <input
                            {...formik.getFieldProps('address')}
                            type="text"


                            autoComplete="text"
                            placeholder='Address'
                            required
                            className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formik.errors.address ? (
                            <div className="text-sm text-white mt-2 ml-2">{formik.errors.address}</div>
                        ) : null}
                    </div>

                </div>
                <button type='submit' className="mt-8 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
                    {
                        isLoading ? "Loading.." : "Submit"
                    }
                </button>
            </section>
       
    </form>
}