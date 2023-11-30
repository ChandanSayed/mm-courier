import { useState, useContext, useEffect } from 'react';
import ParcelForm from './ParcelForm';
import { Context } from '../context/AppContext';
import BookingList from './BookingList';

const Dashboard = () => {
  const { loggedUser, setLoggedUser } = useContext(Context);
  const [showTab, setShowTab] = useState(0);
  const [loading, setLoading] = useState(true);
  function tabChange(index) {
    setShowTab(index);
  }
  console.log(loggedUser);

  if (!loggedUser) {
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')));
    setLoading(false);
  }, []);

  if (loading) {
    return <span className="loading loading-spinner text-warning"></span>;
  }

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <aside className="bg-gray-800 text-gray-100 w-64 min-h-screen">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

          <div className="tab-container flex flex-col">
            {loggedUser.userType.toLowerCase() === 'user' ? (
              <>
                <button className="text-left" onClick={() => tabChange(1)}>
                  Book a Parcel
                </button>
                <button className="text-left" onClick={() => tabChange(2)}>
                  My Parcels
                </button>
                <button className="text-left" onClick={() => tabChange(3)}>
                  My Profile
                </button>
              </>
            ) : null}

            {loggedUser.userType.toLowerCase() === 'delivery_man' ? (
              <>
                <button className="text-left" onClick={() => tabChange(1)}>
                  My Delivery List
                </button>
                <button className="text-left" onClick={() => tabChange(2)}>
                  My Reviews
                </button>
              </>
            ) : null}

            {loggedUser.userType.toLowerCase() === 'admin' ? (
              <>
                <button className="text-left" onClick={() => tabChange(1)}>
                  All Parcels
                </button>
                <button className="text-left" onClick={() => tabChange(2)}>
                  All Users
                </button>
                <button className="text-left" onClick={() => tabChange(3)}>
                  All Delivery Men
                </button>
                <button className="text-left" onClick={() => tabChange(4)}>
                  Statistics
                </button>
              </>
            ) : null}
          </div>
        </div>
      </aside>
      <div className="p-4 grow">
        {loggedUser.userType.toLowerCase() === 'user' ? (
          <>
            <div className={`w-full ${showTab == 1 ? 'block' : 'hidden'}`}>
              <ParcelForm />
            </div>
            <div className={`w-full ${showTab == 2 ? 'block' : 'hidden'}`}>
              <BookingList />
            </div>
            <div className={`w-full ${showTab == 3 ? 'block' : 'hidden'}`}>
              <h3>Tab 3</h3>
            </div>
          </>
        ) : null}
        {loggedUser.userType.toLowerCase() === 'delivery_man' ? (
          <>
            <div className={`w-full ${showTab == 1 ? 'block' : 'hidden'}`}>
              <h3>My Delivery List</h3>
            </div>
            <div className={`w-full ${showTab == 2 ? 'block' : 'hidden'}`}>
              <h3>My Reviews</h3>
            </div>
          </>
        ) : null}
        {loggedUser.userType.toLowerCase() === 'admin' ? (
          <>
            <div className={`w-full ${showTab == 1 ? 'block' : 'hidden'}`}>
              <h3>All Parcels</h3>
            </div>
            <div className={`w-full ${showTab == 2 ? 'block' : 'hidden'}`}>
              <h3>All Users</h3>
            </div>
            <div className={`w-full ${showTab == 3 ? 'block' : 'hidden'}`}>
              <h3>All Delivery Men</h3>
            </div>
            <div className={`w-full ${showTab == 4 ? 'block' : 'hidden'}`}>
              <h3>Statistics</h3>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
