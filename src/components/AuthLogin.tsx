
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ship, User, Anchor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthLoginProps {
  setCurrentUser: (user: string) => void;
  setUserRole: (role: string) => void;
}

const AuthLogin = ({ setCurrentUser, setUserRole }: AuthLoginProps) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');
  const { toast } = useToast();

  const roles = [
    { 
      id: 'admin', 
      name: 'Admin', 
      description: 'Manage shipments and track cargo',
      icon: Ship,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      id: 'mariner', 
      name: 'Mariner', 
      description: 'Scan QR codes at checkpoints',
      icon: Anchor,
      color: 'bg-teal-600 hover:bg-teal-700'
    },
    { 
      id: 'driver', 
      name: 'Driver', 
      description: 'Transport and update status',
      icon: User,
      color: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  const handleLogin = () => {
    if (!selectedRole || !username.trim()) {
      toast({
        title: "Login Required",
        description: "Please select a role and enter your name",
        variant: "destructive"
      });
      return;
    }

    setCurrentUser(username.trim());
    setUserRole(selectedRole);
    
    toast({
      title: "Welcome aboard!",
      description: `Logged in as ${roles.find(r => r.id === selectedRole)?.name}`,
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <Ship className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">QRgo Compass</CardTitle>
          <CardDescription className="text-gray-600">
            Cargo Shipment Tracker - Choose your role to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Your Name</Label>
            <Input
              id="username"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Select Role</Label>
            <div className="grid gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRole === role.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${
                        selectedRole === role.id ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                      <div>
                        <h3 className="font-medium text-gray-900">{role.name}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLogin;
