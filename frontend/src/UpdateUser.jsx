import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const [inputUser, setInputUser] = useState({
    title: "",
    description: "",
    
  });

  const { id } = useParams();
  // data fetching single
  const fetchSingleUser = async () => {
    const res = await axios.get(`http://localhost:8000/read/${id}`);
    console.log(res);
    setInputUser({
      title: res.data.title,
      description: res.data.description,
      
    });
  };
  useEffect(() => {
    fetchSingleUser();
  }, []);

  const handleChnage = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.title]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputUser);
    const res = await axios.put(
      `http://localhost:8000/updateuser/${id}`,
      inputUser
    );
    console.log(res);
    if (res.status === 200) {
      window.location = "/";
    }
    // fetchAllUser();
  };
  return (
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={handleSubmit}>
        <h1>Update User</h1>
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
            placeholder="Enter description"
            required
            value={inputUser.description}
            onChange={handleChnage}
          />
        </div>
        

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Update Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
