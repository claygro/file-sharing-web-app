import { X } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import connection from "../config/connection.config";
interface ShareFile {
  setIsSharePopUpShow: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
}
const SharePopUp = ({ setIsSharePopUpShow, fileId }: ShareFile) => {
  const [isOn, setIsOn] = useState(false);
  const [accessType, setAccessType] = useState<string | null>("Restricted");
  const [time, setTime] = useState<number | null>(null);
  const [timeUnit, setTimeUnit] = useState<string | null>(null);
  const handleAccessChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAccessType(e.target.value);
  };
  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(Number(e.target.value)); //converting the string value in number
  };
  const handleTimeUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimeUnit(e.target.value);
  };
  console.log(accessType);
  console.log(time);
  console.log(timeUnit);
  console.log(fileId);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const accessDetails = new FormData();

      console.log(Object.fromEntries(accessDetails.entries()));

      await connection.post("/shareUrl/create", {
        fileId,
        timeDuration: time,
        timeDurationUnit: timeUnit,
        isRestriction: accessType,
      });
    } catch (error) {
      console.log("Error submitting access details", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Card */}
      <div className="bg-white w-96 p-6 rounded-2xl shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={() => setIsSharePopUpShow(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Share Settings</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Access Type */}
          <select
            onChange={handleAccessChange}
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Restricted">Restricted</option>
            <option value="Anyone with the link">Anyone with the link</option>
          </select>

          {/* Toggle Section */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Set Expiry
            </span>

            <button
              type="button"
              onClick={() => setIsOn(!isOn)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
                isOn ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${
                  isOn ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Expiry Inputs */}
          {isOn && (
            <div className="flex gap-2">
              <input
                onChange={handleTimeChange}
                type="number"
                placeholder="Enter time"
                className="w-1/2 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                onChange={handleTimeUnitChange}
                className="w-1/2 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value=""></option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SharePopUp;
