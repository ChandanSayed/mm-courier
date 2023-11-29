import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';
import Axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth = getAuth(app);
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  function handleRegistration(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password.length >= 6 || !/[A-Z]/.test(password) || !specialCharacters.test(password)) {
      return setError('Password must be 6 characters with a capital letter and a special character!');
    }

    if (!profilePicture.trim() || !userType.trim() || !name.trim()) {
      return setError('Fields can not be empty!');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        setSuccess('User registration successful!');

        updateProfile(user, {
          displayName: name,
          photoURL: profilePicture
        })
          .then(async () => {
            console.log('Profile updated!');
            const res = await Axios.post('http://localhost:5000/register', { name, email, profilePicture, userType });
            console.log(res);
          })
          .catch(error => {
            // An error occurred
            console.log(error);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <form action="#" className="my-5" onSubmit={handleRegistration}>
      <div className="pb-5">
        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Your Name" />
      </div>
      <div className="pb-5">
        <input type="text" value={profilePicture} onChange={e => setProfilePicture(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Profile Picture Link" />
      </div>

      <div className="pb-5">
        <select onChange={e => setUserType(e.target.value)} name="user-Type" id="user-type" className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none">
          <option value="">Select user type</option>
          <option value="user">User</option>
          <option value="delivery_man">Delivery Man</option>
        </select>
      </div>

      <div className="pb-5">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Email" />
      </div>

      <div className="pb-5">
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Password" />
      </div>

      <button type="submit" className="bg-blue-500 p-2 w-full text-white rounded">
        Register
      </button>
      <p className={`${error ? 'my-2 text-red-700' : 'hidden'}`}>{error}</p>
      <p className={`${success ? 'my-2 text-green-700' : 'hidden'}`}>{success}</p>
    </form>
  );
};

export default RegisterForm;
