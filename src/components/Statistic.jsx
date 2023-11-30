import axios from 'axios';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const Statistic = () => {
  const [bookingCount, setBookingCount] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);
  async function getBookings() {
    const res = await axios.get('https://mm-courier-server.onrender.com/all-bookings');
    const users = await axios.get('https://mm-courier-server.onrender.com/users');
    setBookingCount(res.data);
    setDelivered(res.data.filter(item => item.status.toLowerCase() === 'delivered'));
    setUsers(users.data);
  }

  return (
    <div className="py-12 bg-gradient-to-b from-blue-300 from-0% via-blue-100 via-60% to-white to-90%">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1320px] px-4 mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body" data-aos="fade-up">
            <p className="text-sm lg:text-xl text-center mb-2">Number of Parcel Booked</p>
            <CountUp className="card-title text-2xl lg:text-5xl justify-center" duration={0.75} start={0} end={bookingCount.length} />
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl" data-aos="fade-up">
          <div className="card-body">
            <p className="text-sm lg:text-xl text-center mb-2">Number of Parcel Delivered</p>
            <CountUp className="card-title text-2xl lg:text-5xl justify-center" duration={0.75} start={0} end={delivered.length} />
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl" data-aos="fade-up">
          <div className="card-body">
            <p className="text-sm lg:text-xl text-center mb-2">Number of registered users</p>
            <CountUp className="card-title text-2xl lg:text-5xl justify-center" duration={1.75} start={0} end={users.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
