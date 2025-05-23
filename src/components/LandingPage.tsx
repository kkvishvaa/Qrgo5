
import React from 'react';
import AuthLogin from './AuthLogin';
import { Button } from '@/components/ui/button';
import { Ship, Zap, MapPin, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  setCurrentUser: (user: any) => void;
  setUserRole: (role: string | null) => void;
}

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const LandingPage = ({ setCurrentUser, setUserRole }: LandingPageProps) => {
  const scrollToLogin = () => {
    document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in text-gray-700">
      {/* Hero Section */}
   <section
  className="relative py-20 md:py-32 lg:py-40 bg-cover bg-center text-white"
  style={{ backgroundImage: "url('/ship2.jpg')" }}
>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Ship className="mx-auto h-16 w-16 mb-6 text-blue-300" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            QRgo Compass
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Navigate Your Cargo with Precision. Real-time tracking powered by QR codes and GPS.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Why Choose QRgo Compass?</h2>
          <p className="text-lg text-center text-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto">
            Streamline your shipment tracking with our intuitive platform, designed for efficiency and transparency.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Real-Time Tracking"
              description="Monitor your shipments live with GPS updates at every checkpoint scan."
            />
            <FeatureCard
              icon={MapPin}
              title="QR Code Simplicity"
              description="Effortless checkpoint management using universally scannable QR codes."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Admin Control"
              description="Comprehensive dashboard for admins to manage shipments, routes, and users."
            />
          </div>
        </div>
      </section>
      
      {/* How it works (Simplified) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Simple Steps to Seamless Tracking</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6">
              <div className="text-blue-600 font-bold text-5xl mb-3">1.</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">Create Shipment</h3>
              <p className="text-gray-600 text-sm">Admins define shipment details and checkpoints, generating unique QR codes instantly.</p>
            </div>
            <div className="p-6">
              <div className="text-blue-600 font-bold text-5xl mb-3">2.</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">Scan at Checkpoint</h3>
              <p className="text-gray-600 text-sm">Mariners scan QR codes on their mobile devices, automatically logging GPS location.</p>
            </div>
            <div className="p-6">
              <div className="text-blue-600 font-bold text-5xl mb-3">3.</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">Track Progress</h3>
              <p className="text-gray-600 text-sm">View real-time shipment status, location history, and ETAs on the dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth/Login Section */}
      <section id="login-section" className="py-16 md:py-20 bg-gradient-to-br from-slate-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
              Access Your Dashboard
            </h2>
            <AuthLogin setCurrentUser={setCurrentUser} setUserRole={setUserRole} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-800 text-gray-400 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} QRgo Compass. All rights reserved.</p>
          <p className="text-xs mt-1">Precision Cargo Tracking for a Connected World.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

