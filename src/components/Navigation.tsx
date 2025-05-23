
import { Ship, QrCode, MapPin, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentUser: any;
  setCurrentUser: (user: any) => void;
  userRole: string | null;
}

const Navigation = ({ currentUser, setCurrentUser, userRole }: NavigationProps) => {
  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) return null;

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Ship className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">QRgo Compass</h1>
                <p className="text-xs text-blue-600">Cargo Shipment Tracker</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-700">{currentUser} ({userRole})</span>
            </div>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
