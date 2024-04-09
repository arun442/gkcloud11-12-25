// hooks/useTechnologyMode.js

import { axiosPrivate } from '@/common/axiosPrivate';
import { axiosPublic } from '@/common/axiosPublic';
import { useEffect, useState } from 'react';


const useTechnologyMode = () => {
  const [technologyData, setTechnology] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  function removeDuplicates(array:any, property:any) {
    let seen:any = {};
    return array.filter(function(item:any) {
        let key = item[property];
        return seen.hasOwnProperty(key) ? false : (seen[key] = true);
    });
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user data exists in local storage
        const response = await axiosPublic.get('/lms/course-category'); // Assuming you have an API route for user data
        setTechnology(removeDuplicates(response.data.CourseCategory, 'categoryName'));
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
