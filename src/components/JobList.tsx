// imports
// import { useAuth } from '@/app/Context/AuthContext';
import { useJobs } from '../app/Context/JobContext';
import Gilroy from '../lib/fonts2';
import React from 'react';
// imports

const JobList: React.FC = () => {
  const { jobs, setSelectedJob, loading, error } = useJobs();
  // const { user } = useAuth();

  if (loading) {
    return <p className="text-center">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className={`${Gilroy.className} space-y-4 `}>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedJob(job)}
        >
          <h2 className='text-xl font-bold'>{job.title}</h2>
          <p className="text-gray-600">{job.company} - {job.location}</p>
          <p className="text-gray-800">{job.salary}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;