import { useEffect, useState } from "react";
import useTrainingMode from "@/hooks/training_mode_hook";
 
export default function TrainingModeDropdown({
  data,
  setData,
}: {
  data: any;
  setData: any;
}) {
  const { trainingData, isLoading } = useTrainingMode();
  const [selectedMode, setSelectedMode] = useState<any>(null);
 
  const handleChange = (mode: any) => {
    setSelectedMode(mode);
    setData(mode);
  };
 
  useEffect(() => {
    if (data === null) {
      setSelectedMode(null);
    } else {
      setSelectedMode(data);
    }
  }, [data]);
 
  return (
    <div className="px-1 py-1 bg-dark_blue">
      <div className="flex justify-center bg-purple rounded-lg">
      <p className="inline-flex px-1 py-1 w-auto gap-20 text-lg font-normal text-white">
      Learning Approach
      </p>
      </div>
      <ul className="mt-5">
        {trainingData.map((e, index) => (
          <li
            key={index}
            className={`px-1 py-1 cursor-pointer ${
              selectedMode === e ? "bg-white opacity-75 rounded" : "bg-transparent"
            }`}
            onClick={() => handleChange(e)}
          >
            <label
              className={`group flex w-full text-start items-center cursor-pointer rounded-md px-2 py-1 text-sm ${
                selectedMode === e ? "text-black" : "text-white opacity-80"
              }`}
            >
              {e.trainingModeName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}