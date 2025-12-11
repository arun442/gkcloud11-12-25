import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TextTransition, { presets } from "react-text-transition";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosPublic } from "@/common/axiosPublic";
import { useRouter } from "next/navigation";
import { IoIosCloseCircle } from "react-icons/io";
import {
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import errorHelper from "@/common/error_helper";
import Signup from "../signup_components/signup_container";
import { commonbasePath } from "@/common/constants";

interface SigninProps {
  onClose: () => void;
}
 
export default function SignInContainer({ onClose }: SigninProps) {
  const basePath  = commonbasePath;
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
 
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
 
  const formik = useFormik({
    validateOnBlur: false,
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please provide a password."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter a valid email"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isLoading) return;
        setLoading(true);
        const result = await axiosPublic.post("/auth/login", {
          email: values.email,
          password: values.password,
        });
 
        localStorage.setItem("session", JSON.stringify(result.data));
 
        router.push("/");
        setTimeout(() => {
          setLoading(false);
          resetForm();
        }, 2000);
      } catch (error: any) {
        setLoading(false);
        toast.error(errorHelper(error));
      }
    },
  });
 
  const handleSignupClick = () => {
    router.push("/auth/signup");
    setIsPopupVisible(true);
  };
 
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/70 justify-center items-center"
        onClick={onClose}
      />
 
 
 
      <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="lg:w-full lg:max-w-md lg:h-auto mx-4 flex flex-col items-center md:h-96 overflow-y-auto bg-white rounded-lg p-6">          <main className="flex-1 flex flex-col justify-center items-center">
            <button
              className="self-end text-black hover:text-blue transition-colors"
              onClick={() => router.push("/")}
            >
              <IoIosCloseCircle style={{fontSize:"30px"}}/>
            </button>
            <div className="flex flex-row gap-2 mb-2 text-center">
              <h3 className="text-3xl text-blue font-semibold">
                Welcome <span className="text-black">Back</span>
              </h3>
            </div>
            <p className="text-sm font-normal mb-10 text-black">
              Login to Continue
            </p>
 
            <form
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              className="w-full md:w-[375px]"
            >
              <div className="mb-4 relative">
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="Email *"
                  maxLength={50}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                />
                <span className="absolute top-4 right-4">
                  <img
                    alt="email icon"
                    className="text-blue h-4 w-5"
                    src={`${basePath}/email.png`}
                  />
                </span>
                {formik.errors.email && (
                  <div className="text-sm text-red mt-2 ml-2">
                    {formik.errors.email}
                  </div>
                )}
              </div>
 
              <div className="mb-5 relative">
                <input
                  type={passwordType}
                  placeholder="Password *"
                  maxLength={30}
                  {...formik.getFieldProps("password")}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
                />
                <span
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <EyeIcon className="text-blue h-4 w-4" />
                  ) : (
                    <EyeSlashIcon className="text-blue h-4 w-4" />
                  )}
                </span>
                {formik.errors.password && (
                  <div className="text-sm text-red mt-2 ml-2">
                    {formik.errors.password}
                  </div>
                )}
              </div>
 
              <div className="mb-8 flex items-center justify-between">
                <label
                  htmlFor="formCheckbox"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="relative pt-0.5">
                    <input
                      type="checkbox"
                      id="formCheckbox"
                      className="text-black"
                    />
                  </div>
                  <p className="text-sm text-black">Keep me signed in</p>
                </label>
              </div>
 
              <button className="mb-3 flex w-full justify-center rounded bg-blue p-3 font-medium text-black">
                {isLoading ? "Loading.." : "Login"}
              </button>
            </form>
 
            <div className="flex flex-row justify-center items-center">
              <p className="text-black">{"Don't have an account?"}</p>
              <div
                onClick={handleSignupClick}
                className="rounded bg-blue-600 px-2 py-2 text-blue cursor-pointer"
              >
                Signup
              </div>
              {isPopupVisible && (
                <Signup onClose={() => setIsPopupVisible(false)} />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}