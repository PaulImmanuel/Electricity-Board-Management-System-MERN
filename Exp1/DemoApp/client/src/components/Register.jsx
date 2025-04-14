import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register', { username, password, email });
            setStatus(response.data.msg);
        } catch (err) {
            setStatus('Error registering' + err.message);
        }
    };

    return ( // <--- Move the return statement inside the Register function
        <div className="flex flex-col mt-12 bg-white-100 p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="w-80 mx-auto">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 mb-2 border border-gray-300 focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 mb-2 bg-white border border-gray-300"
                />
                <input
                    type="email"
                    placeholder="Email-ID"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 mb-2 bg-white border border-gray-300"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-indigo-900 text-white border cursor-pointer"
                >
                    Register
                </button>
                {status && <p className="mt-4 text-center text-red-500">{status}</p>}
                <div className="mt-4">
                    Existing User?{" "}
                    <Link to="/login" className="inline underline ms-3 text-blue-500">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;