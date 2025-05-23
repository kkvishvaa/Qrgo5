
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import ScannerInterface from '../components/ScannerInterface';
import TrackingDashboard from '../components/TrackingDashboard';
// import AuthLogin from '../components/AuthLogin'; // No longer directly used here
import LandingPage from '../components/LandingPage'; // Import the new LandingPage
import Navigation from '../components/Navigation';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50"> {/* Updated background for overall app */}
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} userRole={userRole} />
      
      <main className={!currentUser ? "" : "container mx-auto px-4 py-8"}> {/* Conditional padding */}
        {!currentUser ? (
          <LandingPage setCurrentUser={setCurrentUser} setUserRole={setUserRole} />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              userRole === 'admin' ? <AdminDashboard /> : <TrackingDashboard />
            } />
            <Route path="/scan/:checkpointId" element={<ScannerInterface />} />
            <Route path="/tracking" element={<TrackingDashboard />} />
          </Routes>
        )}
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;

