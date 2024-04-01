// hooks/useTrainingMode.js

import { axiosPrivate } from '@/common/axiosPrivate';
import { axiosPublic } from '@/common/axiosPublic';
import { useEffect, useState } from 'react';


const useTrainingMode = () => {
  const [trainingData, setTrainingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user data exists in local storage
        const response = await axiosPublic.get('/lms/course-training-mode'); // Assuming you have an API route for user data
        setTrainingData(response.data.trainingMode);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();

  }, []);

  return { trainingData, isLoading };
};

export default useTrainingMode;
