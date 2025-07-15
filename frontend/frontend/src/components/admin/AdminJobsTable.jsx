import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
  withCredentials: true
})
              console.log("Response:", res.data.success);
            if (res.data.success) {
                toast.success("Job deleted successfully!");
                setFilterJobs(prevJobs => prevJobs.filter(job => job._id !== id));
            } else {
                toast.error(res.data.message || "Failed to delete.");
            }
            navigate("/admin/jobs");
        } catch (err) {
            console.error(err);
            toast.error("Error deleting the job.");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {console.log(filterJobs)}
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal className="cursor-pointer" /></PopoverTrigger>
                                        <PopoverContent className="w-36 space-y-2">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className='flex items-center gap-2 cursor-pointer hover:text-blue-600'
                                            >
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className='flex items-center gap-2 cursor-pointer hover:text-green-600'
                                            >
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                            <div
                                                onClick={() => handleDelete(job._id)}
                                                className='flex items-center gap-2 cursor-pointer text-red-600 hover:underline'
                                            >
                                                <Trash2 className='w-4' />
                                                <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;