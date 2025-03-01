'use client'
// imports
import JobDetailsModal from '../components/JobDetailsModal';
import JobList from '../components/JobList';
import { useAuth } from './Context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Arimo from '../lib/font3';
// imports


export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/sign-up');
    }
  }, [user, router]);

  if (!user) {
    return null; // Redirecting, so no need to render anything
  }
  return (
    <div className='bg-[#15c9edad] w-[100%]'>
      <div className='hero min-h-screen bg-cover bg-center w-[100%]'>
      <div className="container mx-auto p-4">
      <h1 className={`lg:text-3xl md:text-2xl sm:text-xl text-xl font-bold mb-6 ${Arimo.className} text-center mt-5`}>AI-Powered Job Match Dashboard</h1>
      <JobList />
      <JobDetailsModal />
    </div>
      </div>
    </div>

  );
}



