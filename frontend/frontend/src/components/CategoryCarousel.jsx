import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer", 
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="w-full py-12 bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Explore Job Categories
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Find your perfect career path from our curated selection of top job categories
                    </p>
                </div>

                {/* Carousel Section */}
                <div className="relative max-w-5xl mx-auto">
                    <Carousel className="w-full">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {category.map((cat, index) => (
                                <CarouselItem 
                                    key={index} 
                                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                                >
                                    <div className="p-2">
                                        <Button 
                                            onClick={() => searchJobHandler(cat)} 
                                            variant="outline" 
                                            className="w-full h-16 md:h-20 rounded-2xl border-2 border-blue-200 hover:border-blue-500 
                                                     bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 
                                                     font-semibold text-sm md:text-base shadow-lg hover:shadow-xl 
                                                     transition-all duration-300 ease-in-out transform hover:-translate-y-1
                                                     group relative overflow-hidden"
                                        >
                                            {/* Background gradient effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 
                                                          opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                            
                                            {/* Button content */}
                                            <div className="relative z-10 flex flex-col items-center justify-center space-y-1">
                                                <span className="text-center leading-tight">{cat}</span>
                                                <div className="w-8 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100 
                                                              transition-opacity duration-300"></div>
                                            </div>
                                        </Button>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        {/* Navigation Buttons */}
                        <CarouselPrevious className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 
                                                   bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-500 
                                                   text-blue-600 hover:text-blue-700 shadow-lg hover:shadow-xl 
                                                   transition-all duration-300 w-10 h-10 md:w-12 md:h-12" />
                        <CarouselNext className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 
                                                bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-500 
                                                text-blue-600 hover:text-blue-700 shadow-lg hover:shadow-xl 
                                                transition-all duration-300 w-10 h-10 md:w-12 md:h-12" />
                    </Carousel>
                </div>

                {/* Bottom decoration */}
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                        {[...Array(5)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-2 h-2 rounded-full bg-blue-300 opacity-60"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;