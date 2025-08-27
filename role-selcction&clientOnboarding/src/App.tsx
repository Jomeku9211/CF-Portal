import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to role selection page
    navigate('/role-selection');
  }, [navigate]);
  return <div className="flex w-full min-h-screen justify-center items-center">
      Loading...
    </div>;
}