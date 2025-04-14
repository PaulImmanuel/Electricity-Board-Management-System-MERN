import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      if (!response.data.token) {
        setError(response.data.msg);
      } else {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.log(err);
      setError('Error');
    }
  };

  return (
    <div className="flex flex-col mt-12 bg-white-100 p-12">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="w-80 mx-auto">
        <input type="email" placeholder="Email ID" value={email} onChange={function (e) { setEmail(e.target.value); }} required className="w-full px-4 py-2.5 mb-4 bg-white border border-gray-300 focus:border-blue-500" />
        <input type="password" placeholder="Password" value={password} onChange={function (e) { setPassword(e.target.value); }} required className="w-full px-4 py-2.5 mb-4 bg-white border border-gray-300 focus:border-blue-500" />
        <button type="submit" className="w-full px-4 py-2.5 bg-indigo-900 text-white cursor-pointer">Login</button>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <div className="mt-4">
          New User? <Link to="/register" className="inline ms-3 underline underline-offset-4 text-blue-500">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
