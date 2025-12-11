
import { useState } from 'react';
import { useRouter } from 'next/router';
import SignInContainer from '@/components/signin_components/signin_container';
import BookFormComponent from '../Book-form';
 
export default function ButtonLoginHeader() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const router = useRouter();
 
    const handleClick = () => {
        router.push("/auth/signin");
        setIsPopupVisible(true);
    };
    const [PopupVisible, setPopupVisible] = useState(false);
 
    const togglePopup = () => {
      setPopupVisible(!isPopupVisible);
    };
 
 
    return (
        <>
      
            <div
                onClick={handleClick}
                className='cursor-pointer bg-[#FCDC30] text-md text-[#00051F] font-bold py-2 px-8 border-1 rounded-xl border-separate border-blue'            >
                Login
            </div>
            {isPopupVisible && <SignInContainer onClose={() => setIsPopupVisible(false)} />}
        </>
    );
}