'use client';
// imports 
import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Arimo from '../../../lib/font3';
import abeezee from '@/lib/font';
// imports 

const SignupPage = () => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();

  // function handling AddSkill 
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  // function handling AddSkill 

  // function handling RemoveSkill 
  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };
  // function handling RemoveSkill 

  // function handling Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, skills);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    }
  };
  // function handling Submit

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className={`text-2xl font-bold mb-6 ${Arimo.className}`}>Sign Up</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {/* div carrying form  */}
        <form onSubmit={handleSubmit}>
          {/* div carrying input name  */}
          <div className="mb-4">
            <label className={`block text-[14px] text-gray-700 ${abeezee.className}`}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          {/* div carrying input name  */}

          {/* div carrying input skill  */}

          <div className="mb-4">
            <label className={`block text-[14px] text-gray-700 ${abeezee.className}`}>Skills</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-[#0148AB] text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-200 px-2 py-1 rounded-lg flex items-center gap-1"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* div carrying input skill  */}
          {/* Submit Button  */}
          <button
            type="submit"
            className="w-full bg-[#0148AB] text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {/* Submit Button  */}

        </form>
        {/* div carrying form  */}

      </div>
    </div>
  );
};

export default SignupPage;