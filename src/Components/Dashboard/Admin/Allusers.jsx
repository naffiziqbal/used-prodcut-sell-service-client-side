import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const Allusers = () => {
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch(`http://localhost:5000/users`).then((res) => res.json()),
  });
  //   console.log(users);
  const handleAdmin = (id) => {
    fetch(`http://localhost:5000/admin/users/${id}`, {
      method: "PUT",
      //JWT Header Goes Here;
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch()
        }
      });
  };
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
        console.log(data);
      });
  };
  
  if(isLoading){
    return <Loading/>
  }

  return (
    <div>
      All Users Goes Here
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Handle Data</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user?.email ? user.email : "No Data Avaiable"}
                    <br />
                  </td>
                  <td>{user?.role}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length < 1 && <div className="text-4xl text-red-400 ">No Buyers Available..... </div>}
        </div>
      </div>
    </div>
  );
};

export default Allusers;
