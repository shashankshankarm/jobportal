import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Upload, Image } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        let value = e.target.value;
        
        // Format URL to include protocol if missing
        if (e.target.name === 'website' && value && !value.startsWith('http://') && !value.startsWith('https://')) {
            value = 'https://' + value;
        }
        
        setInput({ ...input, [e.target.name]: value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setInput({ ...input, file });
            } else {
                toast.error('Please upload an image file');
            }
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!input.name.trim()) {
            toast.error('Company name is required');
            return;
        }
        
        // Validate logo upload
        if (!input.file) {
            toast.error('Please upload a company logo');
            return;
        }
        
        // Validate URL format if provided
        if (input.website && input.website.trim()) {
            try {
                new URL(input.website);
            } catch (error) {
                toast.error('Please enter a valid website URL');
                return;
            }
        }
        
        const formData = new FormData();
        formData.append("name", input.name.trim());
        formData.append("description", input.description.trim());
        formData.append("website", input.website.trim());
        formData.append("location", input.location.trim());
        if (input.file) {
            formData.append("file", input.file);
        }
        
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred while updating the company');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Button 
                        onClick={() => navigate("/admin/companies")} 
                        variant="outline" 
                        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Companies</span>
                    </Button>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Company Setup</h1>
                        <p className="text-gray-600">Configure your company information and branding</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                        <div className="flex items-center gap-3 text-white">
                            <Building2 className="h-6 w-6" />
                            <h2 className="text-xl font-semibold">Company Information</h2>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Company Name */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-blue-500" />
                                    Company Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="Enter company name"
                                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-red-500" />
                                    Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="Enter company location"
                                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-green-500" />
                                    Website
                                </Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="example.com"
                                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-500" />
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Brief company description"
                                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div className="mb-8">
                            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
                                <Image className="h-4 w-4 text-orange-500" />
                                Company Logo *
                            </Label>
                            <div 
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                                    dragActive 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <Upload className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {input.file ? input.file.name : 'Drop your logo here, or click to browse'}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="sm:w-auto w-full h-11 border-gray-300 hover:border-gray-400"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="sm:w-auto w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Update Company'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup