'use client'
import React, { useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import LeadFormModel from "../LeadFromModel";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
    openModal() ;
  };

  if (showConsent) {
    return null;
  }
  
  function closeModal(isDownloaded: any) {

    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <div className="fixed inset-0 ">
      <LeadFormModel data={{}} isOpen={isOpen} closeModal={closeModal} courseCode={""} courseName={""} />
      <div className="bg-dark_blue fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-8 m-4">
        <span className="text-white text-base mr-16">
          This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy.
        </span>
        <button className="bg-blue py-2 px-8 rounded text-white" onClick={() => acceptCookie()}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;