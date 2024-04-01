import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'


export default function ScheduleCard({ data,type }: { data: any,type:number }) {
  return <div className="cursor-pointer box-border  p-6  border flex flex-col justify-start items-start border-grey border-1 bg-dark_blue rounded-2xl">


    <h2 className="text-white text-lg font-medium">{data.title}</h2>
    <div className="w-full flex flex-row mt-6 items-center justify-between">
      <p className="text-text_grey_one text-[12px] font-normal">{data.courseCode}</p>
      <div className='flex-1 flex flex-row items-center justify-end gap-2'>
        <CalendarIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-[12px] font-normal">4 Days</p>
      </div>

    </div>
    <table className="border-collapse border border-table_border mt-6 w-full">
      <thead>
        <tr >

          <th className="border border-table_border text-base text-white font-normal py-6">Date</th>
          <th className="border border-table_border text-base text-white font-normal">Location</th>
          <th className="border border-table_border text-base text-white font-normal">Fees</th>
        </tr>
      </thead>
      <tbody>
        <tr>

          <td className="border border-table_border text-base font-medium text-table_font text-center py-4">19 Mar 2024 - 20 Mar 2024</td>
          <td className="border border-table_border text-base font-medium text-table_font text-center py-4">WBT</td>
          <td className="border border-table_border text-base font-medium text-table_font text-center py-4">INR 11,700</td>
        </tr>

      </tbody>
    </table>
    <div className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-8  rounded-full bg-blue">

      Enroll
    </div>

  </div>;
}