import React, { useState } from "react";
import axios from "axios";
const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password:"",
    username:"",
    address:"",
    phonenumber:"",
    hIN:""
  });
      

  return (
    <div>
      <h1>Registration </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted:", formData);
        }}
      >
        <div className="bg-teal-200 p-5">
          <div className="m-3">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <label>Phone No:</label>
            <input
              type="number"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <label>hIN:</label>
            <input
              type="text"
              name="hIN"
              value={formData.hIN}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <button className="bg-blue-600 px-2 rounded-xl" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
