import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
        console.log("local",localStorage.getItem("users"))
      try {
        const storedData = JSON.parse(localStorage.getItem("users"));
        if (storedData) {
          setTableData(storedData);
        }
      } catch (error) {
        console.error("Error fetching users from localStorage:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Table</h1>
      {tableData.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 bg-white border border-gray-200 rounded-lg">
            <thead className="text-xl uppercase bg-gray-100 text-gray-600">
              <tr>
                <th scope="col" className="px-6 py-3 border-b">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Password
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-all duration-200 border-b"
                >
                  <td className="px-6 py-4 text-gray-800 text-xl">{user._id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-xl">{user.name}</td>
                  <td className="px-6 py-4 text-gray-800 text-xl">{user.email}</td>
                  <td className="px-6 py-4 text-gray-800 text-xl">{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No users found.</p>
      )}
    </div>
  );
};

export default Dashboard;
