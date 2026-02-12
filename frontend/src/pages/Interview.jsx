import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Interview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div className="text-center p-10">Please login first</div>;
  }

  const startInterview = (type) => {
    navigate(`/interview/start?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome, {user.name || 'User'}!
      </h1>
      <p className="text-xl text-center mb-12">Choose your interview type</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div
          onClick={() => startInterview('technical')}
          className="bg-gray-800 p-8 rounded-2xl cursor-pointer hover:bg-gray-700 transition border border-blue-600"
        >
          <h2 className="text-2xl font-bold mb-4">Technical</h2>
          <p>Coding, DSA, System Design, Frontend/Backend questions</p>
        </div>

        <div
          onClick={() => startInterview('behavioral')}
          className="bg-gray-800 p-8 rounded-2xl cursor-pointer hover:bg-gray-700 transition border border-purple-600"
        >
          <h2 className="text-2xl font-bold mb-4">Behavioral</h2>
          <p>STAR method, leadership, teamwork, past experience</p>
        </div>

        <div
          onClick={() => startInterview('mixed')}
          className="bg-gray-800 p-8 rounded-2xl cursor-pointer hover:bg-gray-700 transition border border-pink-600"
        >
          <h2 className="text-2xl font-bold mb-4">Mixed</h2>
          <p>Combination of technical + behavioral questions</p>
        </div>
      </div>
    </div>
  );
};

export default Interview;