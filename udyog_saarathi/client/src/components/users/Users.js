import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import "./Users.css";



const Users = () => {
  
  let [error, setError] = useState("");
  let [users, setUsers] = useState([]);
  let token = sessionStorage.getItem("token");




  const getUsers = () => {
    axios
      .get(`/user-api/get-users`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.payload);
        }
        if (response.status !== 200) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
          console.log(err.response);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  };



  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users">
      {error?.length !== 0 && <p className="text-danger display-1"> {error}</p>}
    <div className="py-5">

    <main className="table d-block m-auto  ">
        <section className="table__header text-center">
          <h1 className="d-block m-auto">USERS</h1>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr >
                <th className="text-center">UserName</th>
                <th className="text-center">data of birth</th>
                <th className="text-center">Email</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Contact Number</th>
                <th className="text-center">UDID</th>
                <th className="text-center">Category</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstname+" "+user.middlename+" "+user.lastname}</td>
                  <td>{user.dob.split("-").reverse().join("-")}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.phone}</td>
                  <td>{user.udid}</td>
                  <td>{user.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
   

    
    </div>
  );
};

export default Users;