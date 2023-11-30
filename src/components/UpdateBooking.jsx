import { useState, useContext, useEffect } from 'react';
import { Context } from '../context/AppContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateBooking = () => {
  let { id } = useParams();
  const { loggedUser } = useContext(Context);
  const [bookingDetails, setBookingDetails] = useState({});
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    parcelType: '',
    parcelWeight: '',
    receiverName: '',
    receiverPhone: '',
    deliveryAddress: '',
    requestedDeliveryDate: '',
    deliveryAddressLatitude: '',
    deliveryAddressLongitude: '',
    price: '',
    status: 'pending',
    approximateDeliveryDate: '',
    deliveryMen: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handlePriceChange = e => {
    const weight = parseFloat(e.target.value);
    if (e.target.value.trim() === '') {
      setFormData({
        ...formData,
        parcelWeight: '',
        price: 0
      });
      return;
    }
    let price = weight * 50;
    setFormData({
      ...formData,
      parcelWeight: e.target.value,
      price: price
    });
    console.log(price);
  };

  function getFormattedDate() {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:5000/update-booking/${id}`, formData);
    if (res.data) {
      Swal.fire('Updated!');
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

  async function getBookingDetails() {
    const res = await axios.get(`http://localhost:5000/booking/${id}`, id);

    setFormData(res.data);
    setLoader(false);
  }

  if (loader) {
    return <span className="loading loading-spinner text-warning"></span>;
  }

  return (
    <form className="max-w-2xl rounded-lg mx-auto my-8 p-8 bg-white shadow-md">
      <h2 className="text-2xl mb-2 font-semibold">Book your parcel</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-2">
          <label htmlFor="name">Name</label>
          <input readOnly type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Your Name" />
        </div>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input readOnly type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Your Email" />
        </div>
        <div className="mb-2">
          <label htmlFor="number">Phone Number</label>
          <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Phone Number" />
        </div>
        <div className="mb-2">
          <label htmlFor="parcelType">Parcel Type</label>
          <input type="text" id="parcelType" name="parcelType" value={formData.parcelType} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Parcel Type" />
        </div>
        <div className="mb-2">
          <label htmlFor="parcelWeight">Parcel Weight</label>
          <input type="email" id="parcelWeight" name="parcelWeight" value={formData.parcelWeight} onChange={handlePriceChange} className="input input-bordered mt-2 block w-full" placeholder="Parcel Weight" />
        </div>
        <div className="mb-2">
          <label htmlFor="receiverName">Receiver Name</label>
          <input type="text" id="receiverName" name="receiverName" value={formData.receiverName} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Receiver Name" />
        </div>
        <div className="mb-2">
          <label htmlFor="r_number">Receiver Phone Number</label>
          <input type="number" id="r_number" name="receiverPhone" value={formData.receiverPhone} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Receiver Phone Number" />
        </div>
        <div className="mb-2">
          <label htmlFor="da">Parcel Delivery Address</label>
          <input type="text" id="da" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Parcel Delivery Address" />
        </div>
        <div className="mb-2">
          <label htmlFor="dd">Parcel Delivery Date</label>
          <input type="date" id="dd" name="requestedDeliveryDate" value={formData.requestedDeliveryDate} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Parcel Delivery Date" />
        </div>
        <div className="mb-2">
          <label htmlFor="Latitude">Delivery Address Latitude</label>
          <input type="text" id="Latitude" name="deliveryAddressLatitude" value={formData.deliveryAddressLatitude} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder=".e 21.121365496" />
        </div>
        <div className="mb-2">
          <label htmlFor="Longitude">Delivery Address Longitude</label>
          <input type="text" id="Longitude" name="deliveryAddressLongitude" value={formData.deliveryAddressLongitude} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="i.e 21.121365496" />
        </div>
        <div className="mb-2">
          <label htmlFor="price">Price</label>
          <input readOnly type="text" id="price" name="price" value={formData.price} onChange={handleChange} className="input input-bordered mt-2 block w-full" placeholder="Price" />
        </div>
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-4 w-full">
        Submit
      </button>
    </form>
  );
};

export default UpdateBooking;
