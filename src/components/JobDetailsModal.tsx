import React from 'react';
import { useJobs } from '../app/Context/JobContext';
import UpskillingAlert from './UpskillingAlert';
import { useAuth } from '../app/Context/AuthContext';
import abeezee from '../lib/font';

const JobDetailsModal: React.FC = () => {
  const {
    selectedJob,
    setSelectedJob,
    calculateMatchScore,
    applyForJob,
    showUpskillingAlert,
    setShowUpskillingAlert,
    missingSkills,
    appliedJobTitle,
  } = useJobs();
  const { user } = useAuth();

  if (!selectedJob || !user) return null;

  // Calculate match score
  const matchScore = calculateMatchScore(user.skills, selectedJob.requiredSkills);

  // Determine progress bar color
  const progressBarColor =
    matchScore >= 80 ? 'bg-green-500' :
      matchScore >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <>
      <div className={`${abeezee.className} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 `}>
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
          <p className="text-gray-600">{selectedJob.company} - {selectedJob.location}</p>
          <p className="text-gray-800">{selectedJob.salary}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Required Skills:</h3>
            <ul className="list-disc list-inside">
              {selectedJob.requiredSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Your Match Score:</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className={`h-2.5 rounded-full ${progressBarColor}`}
                style={{ width: `${matchScore}%` }}
              ></div>
            </div>
            <span className={`text-sm font-semibold ${matchScore >= 80 ? 'text-green-600' :
                matchScore >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>
              {matchScore.toFixed(1)}%
            </span>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setSelectedJob(null)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
            <button
              onClick={() => applyForJob(selectedJob.id, user.skills, user.name)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Upskilling Alert */}
      {showUpskillingAlert && (
        <UpskillingAlert
          userName={user.name} // Pass the user's name
          jobTitle={appliedJobTitle}
          missingSkills={missingSkills}
          onClose={() => setShowUpskillingAlert(false)}
        />
      )}
    </>
  );
};

export default JobDetailsModal;