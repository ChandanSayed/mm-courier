import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);
  async function getBookings() {
    const users = await axios.get('https://mm-courier-server.onrender.com/users');

    setUsers(users.data.filter(list => list.userType !== 'admin'));
  }

  return (
    <div>
      <table className="w-full">
        <tr>
          <th>User’s Name</th>
          <th>Phone Number</th>
          <th>Number of parcel Booked</th>
          <th>Assign User Role</th>
          <th>Assign User Role</th>
        </tr>
        {users.map(user => {
          return (
            <tr key={user._id}>
              <td className="text-center">{user.name}</td>
              <td className="text-center">{user.phone}</td>
              <td className="text-center"></td>
              <td className="text-center">
                <button className="btn">Delivery Man</button>
              </td>
              <td className="text-center">
                <button className="btn">Admin</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AllUsers;
