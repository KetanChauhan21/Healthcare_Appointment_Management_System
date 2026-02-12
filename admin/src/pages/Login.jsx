import React, { useContext, useState } from 'react';
import { AdminContext } from '../Context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { setAtoken, backendurl } = useContext(AdminContext);
    // const navigate = useNavigate();

    const onsubmithandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let url = '';
            if (state === 'Admin') {
                url = '/api/admin/login';
            } else if (state === 'Doctor') {
                url = '/api/doctor/login';
            }

            const { data } = await axios.post(backendurl + url, { email, password });

            if (data.success) {
                localStorage.setItem(`${state.toLowerCase()}token`, data.token);
                setAtoken(data.token);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={onsubmithandler}
                className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md"
            >
                <div>
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                        {state} Login
                    </h2>

                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            value={password}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} cursor-pointer text-white font-semibold py-2 rounded-lg transition duration-300`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        {state === 'Admin' ? (
                            <>
                                Doctor Login?{' '}
                                <span
                                    onClick={() => setState('Doctor')}
                                    className="text-blue-600 hover:underline cursor-pointer"
                                >
                                    Click here
                                </span>
                            </>
                        ) : (
                            <>
                                Admin Login?{' '}
                                <span
                                    onClick={() => setState('Admin')}
                                    className="text-blue-600 hover:underline cursor-pointer"
                                >
                                    Click here
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
