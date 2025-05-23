import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/Auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="mx-auto w-full max-w-lg bg-white rounded-2xl shadow-xl p-10 border border-gray-200 animate-fadeIn">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-2">Sign in to your account</h2>
                <p className="mb-6 text-center text-base text-gray-500">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mb-4 text-center animate-shake">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <div>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            autoComplete="email"
                            className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>
                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 text-sm"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
                <div className="mt-6 text-center text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} Blogsite. All rights reserved.
                </div>
            </div>
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
        </div>
    )
}

export default Login