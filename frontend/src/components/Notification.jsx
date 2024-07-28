import axios from "axios";
import { useEffect, useState } from "react";

const Notification = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/forms");
      //   console.log("Notification data", response.data.forms[0].createdAt);
      const { forms } = response.data;
      setUserData(forms);
    } catch (error) {
      console.error("Error fetching forms data", error);
    }
  };

  const formatDateTime = (timeStamp) => {
    const date = new Date(timeStamp);

    return date.toLocaleString();
  };

  return (
    <div className="w-full mx-auto p-2">
      <h3 className="text-xl font-light mt-4">Recent Notification</h3>
      <ul className="mt-4 overflow-y-auto px-2 h-60">
        {userData.map((user, index) => (
          <li key={index} className="bg-white shadow-md rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-light">
                  {user.name} Submitted a New Form
                </h2>
                <p className="text-sm text-gray-500">
                  Submitted on {formatDateTime(user.createdAt)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
