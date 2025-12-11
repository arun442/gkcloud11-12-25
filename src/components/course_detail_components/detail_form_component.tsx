import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosLead, axiosPublic } from '@/common/axiosPublic';
import { useState } from 'react';
import classNames from '@/helpers/add_class';
import { toast } from "react-toastify";
import useUserData from '@/hooks/userData';
import { setCookie } from 'cookies-next';
import CryptoJS from 'crypto-js';


const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'ENCRYPTION-KEY-DATA-20';
 
// AES encryption function
const encryptData = (data: object): string => {
  try {
    const dataString = JSON.stringify(data); // Convert object to string
    const encrypted = CryptoJS.AES.encrypt(dataString, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};
 
// AES decryption function (if needed for validation or retrieval)
const decryptData = (encryptedData: string): object | null => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const dataString = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(dataString); // Convert string back to object
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
export default function FormComponent({
    type, referenceId, referenceCode, requestDescription
}: { type: string, referenceId: number, referenceCode: string, requestDescription: string }) {
    const { userData } = useUserData();
    const [isLoading, setLoading] = useState(false);
    const phoneRegExp = /^(?!.*\D).{10}$/;
 
    const formik = useFormik({
        validateOnBlur: false,
        initialValues: {
            firstName: '',
            lastName: '',
            email: "",
            phone: '',
            company: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Please enter a valid first name').matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),
            lastName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),
            email: Yup.string().email('Invalid email address').required('Please enter a valid email'),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter a valid phone number'),
            company: Yup.string().matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/, 'Please enter a valid company name'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);
 
                const result = await axiosPublic.post('/lms/add-request-form', {
                    email: values.email,
                    requestType: type,
                    fullName: values.firstName,
                    companyName: values.company,
                    mobile: values.phone,
                    phone: values.phone,
                    message: "RequestForm",
                    referenceId: referenceId,
                    referenceCode: referenceCode,
                    requestDescription: requestDescription,
                    requestedBy:"Individual"
                });

                let payloadData={
                    firstName : values.firstName,
                    phNumber : values.phone,
                    emailId : values.email,
                    company : values.company,
                    utmSource : 'Website-Leads',
                    action : 'Course-Enquiry',
                }
 

                const res = await axiosLead.post('/gktsage/gkcs/leadCapture/store', payloadData);
                const cookieData = {
                    firstName: values.firstName,
                    email: values.email,
                    phone: values.phone,
                  };
         
                  const encryptedData = encryptData(cookieData);
         
                  setCookie("_req", encryptedData, { maxAge: 30 * 24 * 60 * 60 });
                setLoading(false);
                toast.success("Form submitted successfully");
                resetForm();
            } catch (error: any) {
                setLoading(false);
                toast.error(error.message);
            }
        },
    });
 
    return (
        <form autoComplete="off" onSubmit={formik.handleSubmit} className="mt-5 mx-auto w-11/12 sm:w-96 h-auto p-6 bg-black rounded-2xl shadow-md">
            <h3 className='text-lg mt-2 text-center text-white'>Request More Information</h3>
            <div className="mt-8 flex flex-col gap-3">
                <input
                    {...formik.getFieldProps('firstName')}
                    type="text"
                    placeholder='Name *'
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm ${formik.errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.firstName && <div className="text-red text-xs mt-1">{formik.errors.firstName}</div>}
                <input
                    {...formik.getFieldProps('email')}
                    type="email"
                    placeholder='Email *'
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm ${formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.email && <div className="text-red text-xs mt-1">{formik.errors.email}</div>}
                <input
                    {...formik.getFieldProps('phone')}
                    type="text"
                    placeholder='Phone Number *'
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm ${formik.errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.phone && <div className="text-red text-xs mt-1">{formik.errors.phone}</div>}
                <input
                    {...formik.getFieldProps('company')}
                    type="text"
                    placeholder='Company Name'
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm ${formik.errors.company ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.company && <div className="text-red text-xs mt-1">{formik.errors.company}</div>}
            </div>
            <button type="submit" className="mt-8 w-full py-3 bg-yellow text-black font-semibold rounded-md hover:bg-yellow-600">
                {isLoading ? "Loading..." : "Submit"}
            </button>
        </form>
    );
}