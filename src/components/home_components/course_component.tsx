import api from "@/helpers/intercepter";
import {useState,useEffect} from 'react'






const CourseComponent: React.FC = () => {
    const [items,setItems]=useState([]);
 
    useEffect(() => {
     
      fetchData();
      
    }, [])
    
    
    
    const fetchData=async()=>{
      try {
        const result = await api.get('/course-landing');
       console.log("what is the result");
       console.log(result.data.courses);
    
    
       setItems(result.data.courses);
      } catch (error) {
     
      }
    }

    return (

       
  <div className="px-[70px] w-full grid grid-cols-3 gap-10">

  {
items.map((e:any)=>{
return  <div className="cursor-pointer box-border h-20 border flex flex-row p-3 justify-start items-start border-blue-100 bg-blue-50 rounded-lg">


<p className="text-center font-medium">{e.Course.course_title}</p>
</div>
})
  }




  </div>
    )
}

export default CourseComponent;





