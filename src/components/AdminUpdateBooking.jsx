import React from 'react';
import { useParams } from 'react-router-dom';

const AdminUpdateBooking = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default AdminUpdateBooking;
