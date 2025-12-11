import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosLead, axiosPublic } from '@/common/axiosPublic';
import { useState } from 'react';
import classNames from '@/helpers/add_class';
import { toast } from "react-toastify";
import useUserData from '@/hooks/userData';
 
export default function Webinar_form() {
    const { userData } = useUserData();
    const [isLoading, setLoading] = useState(false);
    const phoneRegExp = /^(?!.*\D).{10}$/;
 
    const formik = useFormik({
        validateOnBlur: false,
        initialValues: {
            name: '',
            email: "",
            phone: '',
            domain: '',
            Education_status:'',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Please enter a valid first name').matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),
            email: Yup.string().email('Invalid email address').required('Please enter a valid email'),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter a valid phone number'),
            domain: Yup.string().matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/, 'Please enter a valid company name'),
            Education_status: Yup.string(),
 
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);
                let payloadData={
                    name : values.name,
                    contactNo : values.phone,
                    email : values.email,
                    domain : values.domain,
                    educationStatus:values.Education_status,
                }
                let payloadData1={
                    firstName :values.name,
                    phNumber : values.phone,
                    emailId : values.email,
                    company : values.domain,
                    utmSource : 'Website-Leads',
                    action : 'Course-Enquiry',
                }
 

                const res1 = await axiosLead.post('/gktsage/gkcs/leadCapture/store', payloadData1);
 
 
                const res = await axiosPublic.post('/lms/store-webinar', payloadData);
                setLoading(false);
                toast.success("Webinar Register successfully");
                resetForm();
            } catch (error: any) {
                setLoading(false);
                toast.error(error.message);
            }
        },
    });
 
    return (
        <form autoComplete="off" onSubmit={formik.handleSubmit} className="mx-auto w-11/12 sm:w-96 h-auto px-6 py-4 bg-blue/20 rounded-2xl shadow-md">
            <h3 className='text-3xl mt-2 text-center text-white p-2 -mr-20 transform -translate-x-10  bg-purple'>Register now</h3>
            <div className="mt-4 flex flex-col gap-3">
                <input
                    {...formik.getFieldProps('name')}
                    type="text"
                    placeholder='Name *'
                    className={`block w-full px-3 py-2 border-b-2  border-black rounded-md shadow-sm ${formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.name && <div className="text-red text-xs mt-1">{formik.errors.name}</div>}
                <input
                    {...formik.getFieldProps('email')}
                    type="email"
                    placeholder='Email *'
                    className={`block w-full px-3 py-2 border-b-2  border-black  rounded-md shadow-sm ${formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.email && <div className="text-red text-xs mt-1">{formik.errors.email}</div>}
                <input
                    {...formik.getFieldProps('phone')}
                    type="text"
                    placeholder='Phone Number *'
                    className={`block w-full px-3 py-2 border-b-2  border-black  rounded-md shadow-sm ${formik.errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.phone && <div className="text-red text-xs mt-1">{formik.errors.phone}</div>}
                <input
                    {...formik.getFieldProps('domain')}
                    type="text"
                    placeholder='Department'
                    className={`block w-full px-3 py-2 border-b-2  border-black  rounded-md shadow-sm ${formik.errors.domain ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.domain && <div className="text-red text-xs mt-1">{formik.errors.domain}</div>}
                <input
                    {...formik.getFieldProps('Education_status')}
                    type="text"
                    placeholder='Education status'
                    className={`block w-full px-3 py-2 border-b-2  border-black  rounded-md shadow-sm ${formik.errors.Education_status ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.Education_status && <div className="text-red text-xs mt-1">{formik.errors.Education_status}</div>}
            </div>
            <button type="submit" className="mt-2 w-full py-3 bg-purple text-white font-semibold rounded-md hover:bg-yellow-600">
                {isLoading ? "Loading..." : "Submit"}
            </button>
        </form>
    );
}
 
 