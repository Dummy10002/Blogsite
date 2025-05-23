import React, { useState } from 'react';
import authService from '../appwrite/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
            {/* Animation styles */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn { animation: fadeIn 0.7s ease; }
                @keyframes shake {
                    10%, 90% { transform: translateX(-1px); }
                    20%, 80% { transform: translateX(2px); }
                    30%, 50%, 70% { transform: translateX(-4px); }
                    40%, 60% { transform: translateX(4px); }
                }
                .animate-shake { animation: shake 0.4s; }
            `}</style>
            <div className="mx-auto w-full max-w-lg bg-white rounded-2xl shadow-lg p-10 border border-gray-200 animate-fadeIn">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-2">Sign up to create account</h2>
                <p className="mb-6 text-center text-base text-gray-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mb-6 text-center font-medium animate-shake">{error}</p>
                )}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-6">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            className="w-full h-10 pl-2"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="w-full h-10 pl-2"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email address must be a valid address',
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full h-10"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full mt-2 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;