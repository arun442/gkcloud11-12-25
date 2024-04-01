// hooks/usePopular.js

import { axiosPrivate } from '@/common/axiosPrivate';
import { axiosPublic } from '@/common/axiosPublic';
import { useEffect, useState } from 'react';


const usePopular = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user data exists in local storage
        const response = await axiosPublic.get('/lms/course-popular'); // Assuming you have an API route for user data
        setData(response.data.popularCourses);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  return { data, isLoading };
};

export default usePopular;
