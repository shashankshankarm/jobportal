import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, X, User, Mail, Phone, FileText, Code, Upload } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const phoneChangeHandler = (e) => {
        // Only allow numbers and basic formatting characters
        const value = e.target.value.replace(/[^0-9+\-\s()]/g, '');
        setInput({ ...input, phoneNumber: value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const handleClose = () => {
        setOpen(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                {/* Custom Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
                    disabled={loading}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>

                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                        <User className="h-6 w-6 text-blue-600" />
                        Update Profile
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground text-center">
                        Keep your information up to date
                    </p>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="fullname" className="text-sm font-medium flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-600" />
                                Full Name
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Enter your full name"
                                disabled={loading}
                            />
                        </div>

                        {/* Email */}
                         {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                <Mail className="h-4 w-4 text-green-600" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gray-50 cursor-not-allowed"
                                placeholder="Enter your email address"
                                disabled={true}
                                readOnly={true}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
                                <Phone className="h-4 w-4 text-purple-600" />
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={input.phoneNumber}
                                onChange={phoneChangeHandler}
                                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Enter your phone number"
                                disabled={loading}
                            />
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-sm font-medium flex items-center gap-2">
                                <FileText className="h-4 w-4 text-orange-600" />
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Tell us about yourself"
                                disabled={loading}
                            />
                        </div>

                        {/* Skills */}
                        <div className="space-y-2">
                            <Label htmlFor="skills" className="text-sm font-medium flex items-center gap-2">
                                <Code className="h-4 w-4 text-indigo-600" />
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="e.g., JavaScript, React, Node.js"
                                disabled={loading}
                            />
                        </div>

                        {/* Resume Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="file" className="text-sm font-medium flex items-center gap-2">
                                <Upload className="h-4 w-4 text-red-600" />
                                Resume
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept=",pdf,.png,.jpg,jpeg,application/png,application/jpg,application/jpeg,application/pdf"
                                onChange={fileChangeHandler}
                                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium"
                                disabled={loading}
                            />
                            <p className="text-xs text-muted-foreground">
                                Upload your resume (PNG, JPG, JPEG formats only)
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleClose}
                            className="w-full sm:w-auto order-2 sm:order-1"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            className="w-full sm:w-auto order-1 sm:order-2 bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Profile'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog