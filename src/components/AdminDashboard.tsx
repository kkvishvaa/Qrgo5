
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Ship, MapPin, QrCode, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreateShipmentModal from './CreateShipmentModal';
import ShipmentCard from './ShipmentCard';

const AdminDashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [shipments, setShipments] = useState([
    {
      id: 'SH001',
      title: 'Electronics to Mumbai',
      origin: 'Delhi',
      destination: 'Mumbai',
      status: 'In Transit',
      progress: 60,
      checkpoints: 5,
      completedCheckpoints: 3,
      lastUpdate: '2 hours ago',
      estimatedDelivery: '2024-01-15'
    },
    {
      id: 'SH002', 
      title: 'Textiles to Bangalore',
      origin: 'Chennai',
      destination: 'Bangalore',
      status: 'Pending',
      progress: 20,
      checkpoints: 4,
      completedCheckpoints: 1,
      lastUpdate: '5 hours ago',
      estimatedDelivery: '2024-01-18'
    }
  ]);

  const { toast } = useToast();

  const handleCreateShipment = (shipmentData: any) => {
    const newShipment = {
      id: `SH${String(shipments.length + 1).padStart(3, '0')}`,
      ...shipmentData,
      status: 'Pending',
      progress: 0,
      completedCheckpoints: 0,
      lastUpdate: 'Just created',
      estimatedDelivery: shipmentData.estimatedDelivery
    };

    setShipments([...shipments, newShipment]);
    setShowCreateModal(false);
    
    toast({
      title: "Shipment Created!",
      description: `Shipment ${newShipment.id} has been created with ${newShipment.checkpoints} checkpoints.`
    });
  };

  const stats = [
    { title: 'Active Shipments', value: shipments.length, icon: Ship, color: 'text-blue-600' },
    { title: 'In Transit', value: shipments.filter(s => s.status === 'In Transit').length, icon: MapPin, color: 'text-green-600' },
    { title: 'Total Checkpoints', value: shipments.reduce((acc, s) => acc + s.checkpoints, 0), icon: QrCode, color: 'text-purple-600' },
    { title: 'Completed Today', value: 12, icon: Clock, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track your cargo shipments</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Shipment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Shipments */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Ship className="h-6 w-6 text-blue-600" />
            <span>Recent Shipments</span>
          </CardTitle>
          <CardDescription>
            Track and manage your cargo shipments in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {shipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Shipment Modal */}
      <CreateShipmentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateShipment}
      />
    </div>
  );
};

export default AdminDashboard;
