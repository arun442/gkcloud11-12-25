// hooks/useTechnologyMode.js

import { axiosPrivate } from '@/common/axiosPrivate';
import { axiosPublic } from '@/common/axiosPublic';
import { useEffect, useState } from 'react';


const useTechnologyMode = () => {
  const [technologyData, setTechnology] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user data exists in local storage
        const response = await axiosPublic.get('/lms/course-category'); // Assuming you have an API route for user data
        setTechnology(response.data.CourseCategory);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();

  }, []);

  return { technologyData, isLoading };
};

export default useTechnologyMode;
