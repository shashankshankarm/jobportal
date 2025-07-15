import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Calendar, Briefcase } from 'lucide-react';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Goes back to previous page
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    if (!singleJob) {
        return (
            <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto my-6 sm:my-10 px-4 sm:px-6 lg:px-8'>
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    onClick={handleGoBack}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden sm:inline">Back to Jobs</span>
                    <span className="sm:hidden">Back</span>
                </Button>
            </div>

            {/* Job Header Card */}
            <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8'>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
                    <div className="flex-1">
                        <h1 className='font-bold text-2xl sm:text-3xl text-gray-900 mb-2'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 text-gray-600 mb-4'>
                            <MapPin size={16} />
                            <span className="text-sm sm:text-base">{singleJob?.location}</span>
                        </div>
                        <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                            <Badge className='bg-blue-50 text-blue-700 font-semibold border-blue-200 px-3 py-1' variant="outline">
                                <Users size={14} className="mr-1" />
                                {singleJob?.postion} Positions
                            </Badge>
                            <Badge className='bg-red-50 text-red-700 font-semibold border-red-200 px-3 py-1' variant="outline">
                                <Briefcase size={14} className="mr-1" />
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className='bg-purple-50 text-purple-700 font-semibold border-purple-200 px-3 py-1' variant="outline">
                                <DollarSign size={14} className="mr-1" />
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied || isLoading}
                            size="lg"
                            className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                isApplied 
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200' 
                                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Applying...
                                </div>
                            ) : (
                                isApplied ? 'Already Applied' : 'Apply Now'
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Job Details Card */}
            <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8'>
                <h2 className='text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Job Details
                </h2>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="space-y-4">
                        <div className='flex items-start gap-3'>
                            <Briefcase size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className='font-semibold text-gray-900'>Role</h3>
                                <p className='text-gray-700 mt-1'>{singleJob?.title}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <MapPin size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className='font-semibold text-gray-900'>Location</h3>
                                <p className='text-gray-700 mt-1'>{singleJob?.location}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <Clock size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className='font-semibold text-gray-900'>Experience</h3>
                                <p className='text-gray-700 mt-1'>{singleJob?.experience} years</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className='flex items-start gap-3'>
                            <DollarSign size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className='font-semibold text-gray-900'>Salary</h3>
                                <p className='text-gray-700 mt-1'>{singleJob?.salary} LPA</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <Users size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className='font-semibold text-gray-900'>Total Applicants</h3>
                                <p className='text-gray-700 mt-1'>{singleJob?.applications?.length || 0}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-start gap-3'>
                            <Calendar size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className='font-semibold text-gray-900'>Posted Date</h3>
                                <p className='text-gray-700 mt-1'>{singleJob?.createdAt?.split("T")[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Description */}
                <div className='mt-8 pt-6 border-t border-gray-200'>
                    <h3 className='font-semibold text-gray-900 mb-3'>Description</h3>
                    <p className='text-gray-700 leading-relaxed'>{singleJob?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default JobDescription