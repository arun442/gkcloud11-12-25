import { useEffect, useState } from "react";
import useTechnologyMode from "@/hooks/technology_mode_hook";
 
export default function TechnologyDropdown({
  partner,
  data,
  setData,
}: {
  partner: any;
  data: any;
  setData: any;
}) {
  const { technologyData, isLoading } = useTechnologyMode();
  const [item, setItem] = useState<any[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);
 
  const handleChange = (technology: any) => {
    setSelectedTechnology(technology);
    setData(technology);
  };
 
  useEffect(() => {
    if (partner) {
      setItem(technologyData.filter((e) => e.partnerId === partner.partnerId));
    } else {
      setItem(technologyData);
    }
  }, [partner, technologyData]);
 
  useEffect(() => {
    if (data === null) {
      setSelectedTechnology(null);
    } else {
      setSelectedTechnology(data);
    }
  }, [data]);
 
  return (
    <div className="px-1 py-1 bg-dark_blue">
     <div className="flex justify-center bg-purple rounded-lg">
      <p className="inline-flex px-1 py-1 w-auto gap-20 text-lg font-normal text-white">
        Technology
      </p>
      </div>
      <ul className="mt-5">
        {item.map((e, index) => (
          <li
            key={index}
            className={`px-1 py-1 cursor-pointer ${
              selectedTechnology === e ? "bg-white opacity-75 rounded" : "bg-transparent"
            }`}
            onClick={() => handleChange(e)}
          >
            <label
              className={`group flex w-full text-start items-center cursor-pointer rounded-md px-2 py-1 text-sm ${
                selectedTechnology === e ? "text-black" : "text-white opacity-80"
              }`}
            >
              {e.categoryName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}