import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Download, User, Briefcase, Award, FileText, MapPin, Calendar } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Main Profile Container */}
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                
                {/* Profile Header Card */}
                <div className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8 mb-6'>
                    {/* Header Section */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6'>
                        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto'>
                            <div className='relative'>
                                <Avatar className="h-24 w-24 sm:h-28 sm:w-28 ring-4 ring-blue-100 hover:ring-blue-200 transition-all duration-300">
                                    <AvatarImage 
                                        src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" 
                                        alt="profile" 
                                        className="object-cover"
                                    />
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center">
                                    <div className="h-2 w-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className='text-center sm:text-left flex-1'>
                                <h1 className='font-bold text-2xl sm:text-3xl text-gray-900 mb-2'>
                                    {user?.fullname || 'Your Name'}
                                </h1>
                                <p className='text-gray-600 text-sm sm:text-base max-w-md leading-relaxed'>
                                    {user?.profile?.bio || 'Add a bio to tell others about yourself'}
                                </p>
                                <div className='flex flex-wrap justify-center sm:justify-start gap-2 mt-3'>
                                    <Badge variant="secondary" className="text-xs">
                                        <User className="h-3 w-3 mr-1" />
                                        Professional
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        Available
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <Pen className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    </div>
                </div>

                {/* Contact Information & Skills Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                    
                    {/* Contact Information Card */}
                    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6'>
                        <h2 className='font-bold text-lg text-gray-900 mb-4 flex items-center gap-2'>
                            <Contact className="h-5 w-5 text-blue-600" />
                            Contact Information
                        </h2>
                        <div className='space-y-4'>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                                <div className='bg-blue-100 p-2 rounded-full'>
                                    <Mail className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm text-gray-500'>Email</p>
                                    <p className='font-medium text-gray-900 truncate'>{user?.email || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                                <div className='bg-green-100 p-2 rounded-full'>
                                    <Contact className="h-4 w-4 text-green-600" />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm text-gray-500'>Phone</p>
                                    <p className='font-medium text-gray-900 truncate'>{user?.phoneNumber || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills Card */}
                    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6'>
                        <h2 className='font-bold text-lg text-gray-900 mb-4 flex items-center gap-2'>
                            <Award className="h-5 w-5 text-purple-600" />
                            Skills & Expertise
                        </h2>
                        <div className='flex flex-wrap gap-2'>
                            {user?.profile?.skills?.length > 0 ? (
                                user.profile.skills.map((skill, index) => (
                                    <Badge 
                                        key={index} 
                                        variant="secondary" 
                                        className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-200 px-3 py-1"
                                    >
                                        {skill}
                                    </Badge>
                                ))
                            ) : (
                                <div className='text-center w-full py-8'>
                                    <Award className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                                    <p className='text-gray-500 text-sm'>No skills added yet</p>
                                    <p className='text-gray-400 text-xs mt-1'>Add your skills to showcase your expertise</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Resume Card */}
                <div className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 mb-6'>
                    <h2 className='font-bold text-lg text-gray-900 mb-4 flex items-center gap-2'>
                        <FileText className="h-5 w-5 text-orange-600" />
                        Resume & Documents
                    </h2>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-orange-100 p-2 rounded-full'>
                                <FileText className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                                <p className='font-medium text-gray-900'>
                                    {user?.profile?.resumeOriginalName || 'No resume uploaded'}
                                </p>
                                <p className='text-sm text-gray-500 mt-1'>
                                    {user?.profile?.resume ? 'Click to download' : 'Upload your resume to get started'}
                                </p>
                            </div>
                        </div>
                        {user?.profile?.resume ? (
                            <a 
                                href={user.profile.resume} 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium'
                            >
                                <Download className="h-4 w-4" />
                                Download
                            </a>
                        ) : (
                            <Button 
                                onClick={() => setOpen(true)} 
                                variant="outline" 
                                className="flex items-center gap-2 text-sm"
                            >
                                <FileText className="h-4 w-4" />
                                Upload Resume
                            </Button>
                        )}
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
                        <h2 className='font-bold text-xl text-gray-900 flex items-center gap-2'>
                            <Briefcase className="h-6 w-6 text-indigo-600" />
                            Applied Jobs
                        </h2>
                        <Badge variant="outline" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            Recent Activity
                        </Badge>
                    </div>
                    <div className='overflow-x-auto'>
                        <AppliedJobTable />
                    </div>
                </div>
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile