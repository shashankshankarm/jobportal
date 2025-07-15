import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Users, ArrowRight, Shield, Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!input.email || !input.password || !input.role) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />
            
            <div className='flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
                <div className='w-full max-w-md space-y-8'>
                    
                    {/* Header Section */}
                    <div className='text-center'>
                        <div className='mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4'>
                            <Shield className='h-8 w-8 text-white' />
                        </div>
                        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h2>
                        <p className='text-gray-600 text-sm'>Sign in to your account to continue</p>
                    </div>

                    {/* Login Form */}
                    <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
                        <form onSubmit={submitHandler} className='space-y-6'>
                            
                            {/* Email Field */}
                            <div className='space-y-2'>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-blue-600" />
                                    Email Address
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        disabled={loading}
                                        required
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className='space-y-2'>
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Lock className="h-4 w-4 text-purple-600" />
                                    Password
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className="pl-10 pr-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        disabled={loading}
                                        required
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        disabled={loading}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className='space-y-3'>
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <User className="h-4 w-4 text-green-600" />
                                    Select Role
                                </Label>
                                <RadioGroup className="grid grid-cols-2 gap-4">
                                    <div className={`relative flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                        input.role === 'student' 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}>
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            disabled={loading}
                                        />
                                        <div className='flex items-center gap-2'>
                                            <User className="h-4 w-4 text-blue-600" />
                                            <Label htmlFor="student" className="text-sm font-medium text-gray-700 cursor-pointer">
                                                Student
                                            </Label>
                                        </div>
                                    </div>
                                    <div className={`relative flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                        input.role === 'recruiter' 
                                            ? 'border-purple-500 bg-purple-50' 
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}>
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                            disabled={loading}
                                        />
                                        <div className='flex items-center gap-2'>
                                            <Users className="h-4 w-4 text-purple-600" />
                                            <Label htmlFor="recruiter" className="text-sm font-medium text-gray-700 cursor-pointer">
                                                Recruiter
                                            </Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='h-4 w-4 animate-spin' />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className='h-4 w-4' />
                                    </>
                                )}
                            </Button>

                            {/* Forgot Password Link */}
                            <div className='text-center'>
                                <Link to="/forgot-password" className='text-sm text-blue-600 hover:text-blue-700 transition-colors'>
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Sign Up Link */}
                    <div className='text-center'>
                        <p className='text-sm text-gray-600'>
                            Don't have an account?{' '}
                            <Link 
                                to="/signup" 
                                className='font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline'
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>

                    {/* Features */}
                    <div className='grid grid-cols-3 gap-4 mt-8'>
                        <div className='text-center'>
                            <div className='mx-auto h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mb-2'>
                                <Shield className='h-4 w-4 text-blue-600' />
                            </div>
                            <p className='text-xs text-gray-500'>Secure Login</p>
                        </div>
                        <div className='text-center'>
                            <div className='mx-auto h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mb-2'>
                                <User className='h-4 w-4 text-green-600' />
                            </div>
                            <p className='text-xs text-gray-500'>Easy Access</p>
                        </div>
                        <div className='text-center'>
                            <div className='mx-auto h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mb-2'>
                                <Users className='h-4 w-4 text-purple-600' />
                            </div>
                            <p className='text-xs text-gray-500'>Multi-Role</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login