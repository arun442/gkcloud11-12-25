// hooks/usePartnerMode.js

import { axiosPrivate } from '@/common/axiosPrivate';
import { axiosPublic } from '@/common/axiosPublic';
import { useEffect, useState } from 'react';


const usePartnerMode = () => {
  const [partnerData, setPartner] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user data exists in local storage
        const response = await axiosPublic.get('/lms/partner'); // Assuming you have an API route for user data
        setPartner(response.data.partners);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();

  }, []);

  return { partnerData, isLoading };
};

export default usePartnerMode;
