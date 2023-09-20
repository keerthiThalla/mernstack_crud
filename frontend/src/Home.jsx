import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [inputUser, setInputUser] = useState({
    title: "",
    description: "",
    
  });

  const handleChnage = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.title]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputUser);
    const res = await axios.post("http://localhost:8000/createuser", inputUser);
    console.log(res);
    fetchAllUser();
  };

  // data fetching all
  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get("http://localhost:8000/readalluser");
    console.log(res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:8000/delete/${id}`);
    if (res.status === 200) {
      fetchAllUser();
    }
  };
  return (
    <div className="w-2/3 mx-auto mt-5">
      {/* creating form */}
      <form onSubmit={handleSubmit}>
        <h1>Create Data</h1>
        <div className="">
          <label className=" text-sm text-gray-500 ">Title</label>
          <input
            type="text"
            title="title"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter title"
            required
            value={inputUser.title}
            onChange={handleChnage}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Description</label>
          <input
            type="text"
            title="description"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter description "
            required
            value={inputUser.description}
            onChange={handleChnage}
          />
        </div>
        

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Add DATA
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.title}
                </th>
                <td className="px-6 py-4"> {item?.description}</td>
                
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <NavLink
                      to={`/readuser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                    >
                      Read
                    </NavLink>
                    <NavLink
                      to={`/updateuser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500  hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
