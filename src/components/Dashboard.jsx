import { useState, useContext } from 'react';
import ParcelForm from './ParcelForm';
import { Context } from '../context/AppContext';
import BookingList from './BookingList';

const Dashboard = () => {
  const { loggedUser } = useContext(Context);
  let [showTab, setShowTab] = useState(1);
  function tabChange(index) {
    setShowTab(index);
  }
  console.log(loggedUser);

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <aside className="bg-gray-800 text-gray-100 w-64 min-h-screen">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

          <div className="tab-container flex flex-col">
            <button className="text-left" onClick={() => tabChange(1)}>
              Book a Parcel
            </button>
            <button className="text-left" onClick={() => tabChange(2)}>
              My Parcels
            </button>
            <button className="text-left" onClick={() => tabChange(3)}>
              My Profile
            </button>
          </div>
        </div>
      </aside>
      <div className="p-4 grow">
        <div className={`w-full ${showTab == 1 ? 'block' : 'hidden'}`}>
          <ParcelForm />
        </div>
        <div className={`w-full ${showTab == 2 ? 'block' : 'hidden'}`}>
          <BookingList />
        </div>
        <div className={`w-full ${showTab == 3 ? 'block' : 'hidden'}`}>
          <h3>Tab 3</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
