import React from 'react';
// interface for UpskillingAlertProps
interface UpskillingAlertProps {
  userName: string; 
  jobTitle: string;
  missingSkills: string[];
  onClose: () => void;
}
// interface for UpskillingAlertProps

const UpskillingAlert: React.FC<UpskillingAlertProps> = ({ userName, jobTitle, missingSkills, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">🚀 Upskilling Suggestions</h2>
        <p className="text-gray-700 mb-4">
          Hey <span className="font-semibold text-blue-600">{userName}</span>, to apply for{" "}
          <span className="font-semibold">{jobTitle}</span>, you're missing the following skills:
        </p>
        <ul className="list-disc list-inside mb-4">
          {missingSkills.map((skill, index) => (
            <li key={index} className="text-gray-800">
              {skill} {index === missingSkills.length - 1 ? "🎯" : "📚"}
            </li>
          ))}
        </ul>
        <p className="text-gray-700 mb-4">
          {"Don't worry! You can learn these skills and boost your match score! 💪"}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Got it! 👍
        </button>
      </div>
    </div>
  );
};

export default UpskillingAlert;