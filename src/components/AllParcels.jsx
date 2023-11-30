import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllParcels = () => {
  const [bookingCount, setBookingCount] = useState([]);
  const [deliverMen, setDeliveryMen] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    status: '',
    approximateDeliveryDate: '',
    deliveryMen: ''
  });
  const [id, setId] = useState('');

  useEffect(() => {
    getBookings();
    getDeliveryMen();
  }, []);

  async function getBookings() {
    const res = await axios.get('https://mm-courier-server.onrender.com/all-bookings');
    setBookingCount(res.data);
    // setDelivered(res.data.filter(item => item.status.toLowerCase() === 'delivered'));
    console.log(res.data);
    setLoader(false);
  }

  function handleManage(id) {
    setId(id);
    setShowForm(true);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!formData.approximateDeliveryDate.trim() || !formData.deliveryMen.trim() || !formData.status.trim()) {
      return setError('Fill all the fields!');
    }
    const res = await axios.post(`https://mm-courier-server.onrender.com/admin-update-booking/${id}`, formData);
    if (res.data) {
      Swal.fire('Information updated');
      setFormData({
        status: '',
        approximateDeliveryDate: '',
        deliveryMen: ''
      });
    }
  }

  async function getDeliveryMen() {
    const res = await axios.post('https://mm-courier-server.onrender.com/delivery-men', { userType: 'delivery_man' });
    setDeliveryMen(res.data);
    console.log(res.data);
  }

  console.log(formData);
  if (loader) {
    return <span className="loading loading-spinner text-warning"></span>;
  }

  return (
    <>
      <div className={`fixed items-center justify-center inset-0 ${showForm ? 'flex' : 'hidden'}`}>
        <div className="absolute inset-0" onClick={() => setShowForm(false)}></div>
        <form onSubmit={handleUpdate} action="#" className="max-w-md mx-auto w-full shadow-lg p-4 bg-white rounded-md relative z-10">
          <div className="w-full mb-4">
            <h2 className="text-base lg:text-2xl text-center">Update information</h2>
          </div>
          <div className="lg:w-full my-2">
            <select name="status" value={formData.status} onChange={handleChange} id="delivery_id" className="w-full border py-1.5 px-2 text-black">
              <option value="">Select delivery status</option>
              <option value="On The Way">On The Way</option>
            </select>
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="lg:w-1/2">
              <select name="deliveryMen" value={formData.deliveryMen} onChange={handleChange} id="delivery_id" className="w-full border py-1.5 px-2">
                <option value="">Select a delivery Man</option>
                {deliverMen.map(man => {
                  return (
                    <option key={man._id} value={man._id}>
                      {man._id}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="lg:w-1/2">
              <input name="approximateDeliveryDate" onChange={handleChange} value={formData.approximateDeliveryDate} type="date" className="w-full  border py-1.5 px-2" />
            </div>
          </div>
          <button onClick={handleUpdate} className="btn btn-primary mt-4 mx-auto text-center">
            Update
          </button>
          <p className={`${error ? 'my-2 text-red-700' : 'hidden'}`}>{error}</p>
        </form>
      </div>
      <table className="w-full">
        <tr>
          <th>User’s Name</th>
          <th>User’s Phone</th>
          <th>Booking Date</th>
          <th>Requested Delivery Date</th>
          <th>Cost</th>
          <th>Status</th>
          <th>Manage</th>
        </tr>
        {bookingCount.map(count => {
          return (
            <tr key={count?._id}>
              <td className="text-center">{count?.name}</td>
              <td className="text-center">{count?.phone}</td>
              <td className="text-center">{count?.bookingDate}</td>
              <td className="text-center">{count?.requestedDeliveryDate}</td>
              <td className="text-center">{count?.price}</td>
              <td className="text-center">{count?.status}</td>
              <td className="text-center">
                <button disabled={count.status.toLowerCase() === 'pending' ? false : true} onClick={() => handleManage(count._id)} className="btn">
                  Manage
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default AllParcels;
