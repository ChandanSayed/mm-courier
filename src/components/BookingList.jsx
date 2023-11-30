import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/AppContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookingList = () => {
  const { loggedUser, refreshBookingList, setRefreshBookingList } = useContext(Context);
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    async function getBookings() {
      const res = await axios.get(`https://mm-courier-server.onrender.com/bookings?email=${loggedUser.email}`);
      setBookingList(res.data);
    }
    getBookings();
  }, []);
  useEffect(() => {
    async function getBookings() {
      const res = await axios.get(`https://mm-courier-server.onrender.com/bookings?email=${loggedUser.email}`);
      setBookingList(res.data);
    }
    getBookings();
  }, [refreshBookingList]);

  function handleSort() {
    setBookingList(
      bookingList.sort((a, b) => {
        const nameA = a.status.toLowerCase();
        const nameB = b.status.toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }

  function handleUpdateError() {
    Swal.fire('You can not update now!');
  }

  function handleCancel(id) {
    Swal.fire({
      title: 'Do you want to cancel the booking?',
      showDenyButton: true,
      confirmButtonText: 'Cancel',
      denyButtonText: `Don't cancel`
    }).then(async result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await axios.post('https://mm-courier-server.onrender.com/cancel', { id });
        if (res.data) {
          Swal.fire('Cancelled!', '', 'success');
          setRefreshBookingList(prev => prev + 1);
        }
      } else if (result.isDenied) {
        Swal.fire('Status remains the same!', '', 'info');
      }
    });
  }

  return (
    <>
      <p className="text-red-700 text-center text-base">You can only update and cancel the booking if the status is pending</p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Parcel Type</th>
              <th>Requested Delivery Date</th>
              <th>Approximate Delivery Date</th>
              <th>Booking Date</th>
              <th>Delivery Men ID</th>
              <th>
                Booking Status{' '}
                <button onClick={handleSort} className="btn">
                  Sort
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map(list => {
              return (
                <tr key={list._id}>
                  <th>{list.parcelType}</th>
                  <td>{list.requestedDeliveryDate}</td>
                  <td>{list?.approximateDeliveryDate}</td>
                  <td>{list.bookingDate}</td>
                  <td>{list?.deliveryMen}</td>
                  <td>{list.status}</td>
                  <td>
                    {list.status.toLowerCase() === 'pending' ? (
                      <Link className="btn" to={`/update-booking/${list._id}`}>
                        Update
                      </Link>
                    ) : (
                      <button className="btn" disabled={true} onClick={handleUpdateError}>
                        Update
                      </button>
                    )}
                    <button className="btn ml-2" onClick={() => handleCancel(list._id)} disabled={list.status.toLowerCase() === 'pending' ? false : true}>
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingList;
