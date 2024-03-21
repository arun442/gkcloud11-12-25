import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'


export default function CourseCard() {
    return <div className="cursor-pointer box-border border flex flex-col p-6 justify-start items-start border-blue border-1 bg-dark_blue rounded-2xl">
      <p className="text-text_grey text-[12px] font-medium">Gen002</p>
      <h2 className="text-white text-xl font-medium">Prompt Engineering for Generative AI</h2>
      <div className="flex flex-row gap-1 mt-2 items-center">
        <MagnifyingGlassIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-base font-normal">4 days</p>
      </div>
  
      <div className="mx-auto box-border border flex flex-row gap-3 mt-7 items-center p-3  border-blue border-1 bg-primary_color rounded-2xl">
  
        <h3 className="text-blue text-lg font-medium">₹ 11,550/-</h3>
        <h3 className="text-text_grey_one line-through text-lg font-normal">₹ 19,550/-</h3>
      </div>
    </div>;
  }