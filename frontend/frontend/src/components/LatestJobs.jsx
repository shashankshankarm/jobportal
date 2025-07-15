import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        <span className="text-blue-600">Latest & Top </span> 
                        Job Openings
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover exciting career opportunities from top companies around the world
                    </p>
                </div>

                {/* Jobs Grid */}
                <div className="relative">
                    {allJobs.length <= 0 ? (
                        <div className="text-center py-16">
                            <div className="mb-8">
                                <svg 
                                    className="w-20 h-20 mx-auto text-gray-300 mb-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={1.5} 
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" 
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Jobs Available</h3>
                            <p className="text-gray-500 text-lg">
                                We're working hard to bring you the latest opportunities. Check back soon!
                            </p>
                            {/* <div className="mt-6">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                                    Get Notified
                                </button>
                            </div> */}
                        </div>
                    ) : (
                        <>
                            {/* Jobs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {allJobs.slice(0, 6).map((job) => (
                                    <div 
                                        key={job._id} 
                                        className="transform transition-all duration-300 hover:scale-105"
                                    >
                                        <LatestJobCards job={job} />
                                    </div>
                                ))}
                            </div>

                            {/* View More Button */}
                            {allJobs.length > 6 && (
                                <div className="text-center mt-12">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        View More Jobs
                                        <svg 
                                            className="w-5 h-5 ml-2 inline-block" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Bottom decoration */}
                <div className="flex justify-center mt-16">
                    <div className="flex space-x-2">
                        {[...Array(3)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-3 h-3 rounded-full bg-blue-200 opacity-60"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-32 translate-x-32 opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full translate-y-48 -translate-x-48 opacity-20"></div>
            </div>
        </div>
    );
};

export default LatestJobs;