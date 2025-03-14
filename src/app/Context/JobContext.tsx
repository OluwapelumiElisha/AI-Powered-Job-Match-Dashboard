'use client';

import { createContext, useContext, useState, useEffect } from 'react';
// interface for Job 
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
}
// interface for Job 
 
// interface for JobContextType 

interface JobContextType {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  applyForJob: (jobId: number, userSkills: string[], userName: string) => void;
  loading: boolean;
  error: string | null;
  calculateMatchScore: (userSkills: string[], requiredSkills: string[]) => number;
  getMissingSkills: (userSkills: string[], requiredSkills: string[]) => string[];
  showUpskillingAlert: boolean;
  setShowUpskillingAlert: (show: boolean) => void;
  missingSkills: string[];
  setMissingSkills: (skills: string[]) => void;
  appliedJobTitle: string;
  setAppliedJobTitle: (title: string) => void;
  userName: string;
  setUserName: (name: string) => void;
}
// interface for JobContextType 

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpskillingAlert, setShowUpskillingAlert] = useState<boolean>(false);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [appliedJobTitle, setAppliedJobTitle] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://67bdb194321b883e790d8762.mockapi.io/api/elisha/v1/Job-Details');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Calculate match score
  const calculateMatchScore = (userSkills: string[], requiredSkills: string[]): number => {
    const matchedSkills = requiredSkills.filter((skill) => userSkills.includes(skill));
    return (matchedSkills.length / requiredSkills.length) * 100;
  };

  // Get missing skills
  const getMissingSkills = (userSkills: string[], requiredSkills: string[]): string[] => {
    return requiredSkills.filter((skill) => !userSkills.includes(skill));
  };

  // Apply for job
  const applyForJob = (jobId: number, userSkills: string[], userName: string) => {
    const job = jobs.find((job) => job.id === jobId);
    if (!job) return;

    const missingSkills = getMissingSkills(userSkills, job.requiredSkills);
    if (missingSkills.length > 0) {
      setMissingSkills(missingSkills);
      setAppliedJobTitle(job.title);
      setShowUpskillingAlert(true);
      setUserName(userName); 
    } else {
      alert(`Successfully applied for ${job.title}`);
      setSelectedJob(null);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        selectedJob,
        setSelectedJob,
        applyForJob,
        loading,
        error,
        calculateMatchScore,
        getMissingSkills,
        showUpskillingAlert,
        setShowUpskillingAlert,
        missingSkills,
        setMissingSkills,
        appliedJobTitle,
        setAppliedJobTitle,
        userName,
        setUserName,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};