import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Briefcase, Building, Home, Search, Menu, X, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'


const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }

    return (
        <div className='bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg border-b border-blue-500/20 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                {/* Logo */}


<div className='flex items-center'>
    <Link to="/" className='bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20 hover:bg-white/20 transition-colors duration-300 cursor-pointer'>
        <h1 className='text-xl sm:text-2xl font-bold text-white'>
            Job<span className='text-yellow-300'>Portal</span>
        </h1>
    </Link>
</div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-1'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className='flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'>
                                            <Building size={18} />
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className='flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'>
                                            <Briefcase size={18} />
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'>
                                            <Home size={18} />
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className='flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'>
                                            <Briefcase size={18} />
                                            Jobs
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/browse" className='flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'>
                                            <Search size={18} />
                                            Browse
                                        </Link>
                                    </li> */}
                                </>
                            )
                        }
                    </ul>

                    {/* Desktop Auth Section */}
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button 
                                        variant="outline" 
                                        className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-0">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className='flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-all duration-200'>
                                        <Avatar className="cursor-pointer ring-2 ring-white/30 hover:ring-white/50 transition-all duration-200">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                        </Avatar>
                                        <div className='text-white hidden lg:block'>
                                            <p className='text-sm font-medium'>{user?.fullname}</p>
                                            <p className='text-xs text-white/70'>{user?.role}</p>
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white/95 backdrop-blur-md border-0 shadow-xl">
                                    <div className=''>
                                        <div className='flex gap-3 items-center mb-4 p-2'>
                                            <Avatar className="cursor-pointer ring-2 ring-blue-200">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-gray-800'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        
                                        <div className='flex flex-col gap-1'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200'>
                                                        <User2 size={18} className='text-blue-600' />
                                                        <Button variant="link" className="p-0 h-auto text-gray-700 hover:text-blue-600">
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                            
                                            <div className='flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-all duration-200'>
                                                <LogOut size={18} className='text-red-600' />
                                                <Button 
                                                    onClick={logoutHandler} 
                                                    variant="link" 
                                                    className="p-0 h-auto text-gray-700 hover:text-red-600"
                                                >
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* Mobile Menu Button & User Avatar */}
                <div className='md:hidden flex items-center gap-2'>
                    {user && (
                        <div className='relative'>
                            <div 
                                className='flex items-center gap-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-all duration-200'
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <Avatar className="w-8 h-8 ring-2 ring-white/30">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                </Avatar>
                                <ChevronDown size={16} className={`text-white/70 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {/* Mobile User Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-lg p-4 z-50">
                                    <div className='flex gap-3 items-center mb-4 p-2'>
                                        <Avatar className="w-10 h-10 ring-2 ring-blue-200">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-gray-800 text-sm'>{user?.fullname}</h4>
                                            <p className='text-xs text-gray-600'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    
                                    <div className='flex flex-col gap-1'>
                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200'>
                                                    <User2 size={16} className='text-blue-600' />
                                                    <Link to="/profile" className="text-sm text-gray-700 hover:text-blue-600">View Profile</Link>
                                                </div>
                                            )
                                        }
                                        
                                        <div 
                                            className='flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer'
                                            onClick={logoutHandler}
                                        >
                                            <LogOut size={16} className='text-red-600' />
                                            <span className="text-sm text-gray-700 hover:text-red-600">Logout</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <button
                        onClick={toggleMobileMenu}
                        className='text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-200'
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='md:hidden bg-blue-800/95 backdrop-blur-md border-t border-blue-500/20'>
                    <div className='px-4 py-4 space-y-2'>
                        {/* Mobile Navigation Links */}
                        <div className='space-y-1'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <Link 
                                            to="/admin/companies" 
                                            onClick={closeMobileMenu}
                                            className='flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'
                                        >
                                            <Building size={18} />
                                            Companies
                                        </Link>
                                        <Link 
                                            to="/admin/jobs" 
                                            onClick={closeMobileMenu}
                                            className='flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'
                                        >
                                            <Briefcase size={18} />
                                            Jobs
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            to="/" 
                                            onClick={closeMobileMenu}
                                            className='flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'
                                        >
                                            <Home size={18} />
                                            Home
                                        </Link>
                                        <Link 
                                            to="/jobs" 
                                            onClick={closeMobileMenu}
                                            className='flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'
                                        >
                                            <Briefcase size={18} />
                                            Jobs
                                        </Link>
                                        <Link 
                                            to="/browse" 
                                            onClick={closeMobileMenu}
                                            className='flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200'
                                        >
                                            <Search size={18} />
                                            Browse
                                        </Link>
                                    </>
                                )
                            }
                        </div>

                        {/* Mobile Auth Section */}
                        {!user && (
                            <div className='pt-4 border-t border-blue-500/20 space-y-2'>
                                <Link to="/login" onClick={closeMobileMenu}>
                                    <Button 
                                        variant="outline" 
                                        className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 backdrop-blur-sm transition-all duration-200"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup" onClick={closeMobileMenu}>
                                    <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-0">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar