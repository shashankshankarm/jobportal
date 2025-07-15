import React, { useState } from 'react'
import { Search, Sparkles, TrendingUp, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse delay-500'></div>
            </div>

            {/* Floating elements */}
            <div className='absolute top-20 left-20 animate-bounce delay-1000'>
                <div className='bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg'>
                    <TrendingUp className='h-6 w-6 text-blue-600' />
                </div>
            </div>
            <div className='absolute top-40 right-20 animate-bounce delay-2000'>
                <div className='bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg'>
                    <Users className='h-6 w-6 text-purple-600' />
                </div>
            </div>
            <div className='absolute bottom-40 left-40 animate-bounce delay-3000'>
                <div className='bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg'>
                    <Sparkles className='h-6 w-6 text-pink-600' />
                </div>
            </div>

            <div className='relative z-10 text-center max-w-4xl mx-auto px-4'>
                <div className='flex flex-col gap-8'>
                    {/* Badge */}
                    <div className='animate-fadeIn'>
                        <span className='inline-flex items-center gap-2 mx-auto px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 font-semibold shadow-lg border border-orange-200/50 backdrop-blur-sm'>
                            <Sparkles className='h-4 w-4' />
                            No. 1 Job Hunt Website
                            <Sparkles className='h-4 w-4' />
                        </span>
                    </div>

                    {/* Main heading */}
                    <div className='animate-slideUp'>
                        <h1 className='text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight'>
                            Search, Apply & <br /> 
                            Get Your <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Dream Jobs</span>
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <div className='animate-slideUp delay-200'>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Discover thousands of opportunities from top companies worldwide. Your perfect career awaits just a search away.
                        </p>
                    </div>

                    {/* Search bar */}
                    <div className='animate-slideUp delay-400'>
                        <div className='flex w-full max-w-2xl mx-auto'>
                            <div className='relative flex-1 group'>
                                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-300'></div>
                                <div className='relative flex items-center bg-white/90 backdrop-blur-sm border border-white/20 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300'>
                                    <input
                                        type="text"
                                        placeholder='Find your dream jobs...'
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className='flex-1 outline-none border-none bg-transparent px-6 py-4 text-gray-700 placeholder-gray-400 text-lg'
                                    />
                                    <button 
                                        onClick={searchJobHandler}
                                        className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95'
                                    >
                                        <Search className='h-6 w-6' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className='animate-slideUp delay-600'>
                        <div className='flex justify-center gap-8 mt-8'>
                            <div className='text-center'>
                                <div className='text-3xl font-bold text-blue-600'>10K+</div>
                                <div className='text-gray-600'>Active Jobs</div>
                            </div>
                            <div className='text-center'>
                                <div className='text-3xl font-bold text-purple-600'>5K+</div>
                                <div className='text-gray-600'>Companies</div>
                            </div>
                            <div className='text-center'>
                                <div className='text-3xl font-bold text-pink-600'>100K+</div>
                                <div className='text-gray-600'>Job Seekers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.8s ease-out;
                }
                
                .delay-200 {
                    animation-delay: 0.2s;
                    animation-fill-mode: both;
                }
                
                .delay-400 {
                    animation-delay: 0.4s;
                    animation-fill-mode: both;
                }
                
                .delay-600 {
                    animation-delay: 0.6s;
                    animation-fill-mode: both;
                }
            `}</style>
        </div>
    )
}

export default HeroSection