import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllDeliveryMen = () => {
  const [deliverMen, setDeliveryMen] = useState([]);
  useEffect(() => {
    getBookings();
  }, []);

  async function getBookings() {
    const res = await axios.post('https://mm-courier-server.onrender.com/delivery-men', { userType: 'delivery_man' });
    setDeliveryMen(res.data);
    console.log(res.data);
  }
  return (
    <>
      <table className="w-full">
        <tr>
          <th>Delivery Man's Name</th>
          <th>Phone Number</th>
          <th>Number of parcel delivered</th>
          <th>Average review</th>
        </tr>
        {deliverMen.map(man => {
          return (
            <tr key={man._id}>
              <td>{man.name}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default AllDeliveryMen;
