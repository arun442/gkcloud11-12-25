import React, { Fragment,useState } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import classNames from '@/helpers/add_class';
import PartnerComponent from './partner_component';
import TechnologyComponent from './technology_component';
import CourseComponent from './course_component';




export default function ExploreCourseComponent() {
    const [index, setIndex] = useState(0);
    return (
        <main className="w-full flex flex-col items-center mt-24">
    <MainHeading text='Explore Our Courses' />
    <div className={classNames("w-full cursor-pointer text-xl  flex flex-row mt-12 mb-12 justify-center items-center  gap-7")}>
                <div className={index!=0?"text-white font-normal":"text-blue font-medium"} onClick={(e) => setIndex(0)}>
                    Partners
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index!=1?"text-white font-normal":"text-blue font-medium"} onClick={(e) => setIndex(1)}>
                    Technologies
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index!=2?"text-white font-normal":"text-blue font-medium"} onClick={(e) => setIndex(2)}>
                    Popular Courses

                </div>
            </div>
            {
                index == 0 ? <PartnerComponent />
                    : index == 1 ? <TechnologyComponent /> :
                        <CourseComponent />
            }
     </main>
    )
}
