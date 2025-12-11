import { useEffect, useState } from "react";
import usePartnerMode from "@/hooks/partner_mode_hook";
 
export default function PartnerDropdown({
  data,
  setData,
}: {
  data: any;
  setData: any;
}) {
  const { partnerData, isLoading } = usePartnerMode();
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
let [partnerset,setpartnerset]=useState<any[]>([])

 
  const handleChange = (partner: any) => {
    console.log(partner);

    
    setSelectedPartner(partner);
    setData(partner);
  };
 
  useEffect(() => {
    console.log("data",data);

    
    
     
    if (data === null) {
      setSelectedPartner(null);
    } else {

  partnerset=partnerData.filter((e) => {
        return e.partnerId == data.partnerId;
      })
      setSelectedPartner(partnerset[0]);
      setData(partnerset[0]);

    }
  }, [data]);
 
  return (
    <div className="px-1 py-1 bg-dark_blue">
      <div className="flex justify-center bg-purple rounded-lg">
      <p className="inline-flex px-1 py-1 w-auto gap-20 text-lg font-normal text-white">
        Partner
      </p>
      </div>
     
      <ul className="mt-5">
        {partnerData.map((e, index) => (
          <li
            key={index}
            className={`px-1 py-1 cursor-pointer ${
              selectedPartner === e ? "bg-white opacity-75 rounded " : "bg-transparent"
            }`}
            onClick={() => handleChange(e)}
          >
            <label
              className={`group flex w-full text-start items-center cursor-pointer rounded-md px-2 py-1 text-sm ${
                selectedPartner === e ? "text-black" : "text-white opacity-80"
              }`}
            >
              {e.partnerName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}