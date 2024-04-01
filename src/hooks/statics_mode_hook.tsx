// hooks/useStatics.js

import { axiosPrivate } from '@/common/axiosPrivate';
import { axiosPublic } from '@/common/axiosPublic';
import { useEffect, useState } from 'react';


const useStatics = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user data exists in local storage
        const response = await axiosPublic.get('/lms/course-statistics'); // Assuming you have an API route for user data
        setData(response.data.courseStatistics);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  return { data, isLoading };
};

export default useStatics;
