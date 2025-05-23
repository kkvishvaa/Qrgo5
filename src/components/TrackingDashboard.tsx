
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Ship, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const TrackingDashboard = () => {
  // Mock shipment data for tracking view
  const shipments = [
    {
      id: 'SH001',
      title: 'Electronics to Mumbai',
      origin: 'Delhi',
      destination: 'Mumbai',
      status: 'In Transit',
      progress: 60,
      lastUpdate: '2 hours ago',
      currentLocation: 'Highway Checkpoint A',
      checkpoints: [
        { name: 'Origin Warehouse', status: 'completed', time: '6 hours ago', location: 'Delhi' },
        { name: 'Transit Hub A', status: 'completed', time: '2 hours ago', location: 'Highway' },
        { name: 'City Entry Point', status: 'current', time: 'In progress', location: 'Mumbai Entry' },
        { name: 'Final Warehouse', status: 'pending', time: '-', location: 'Mumbai' }
      ]
    },
    {
      id: 'SH002',
      title: 'Textiles to Bangalore',
      origin: 'Chennai',
      destination: 'Bangalore',
      status: 'Pending',
      progress: 20,
      lastUpdate: '5 hours ago',
      currentLocation: 'Chennai Warehouse',
      checkpoints: [
        { name: 'Origin Warehouse', status: 'completed', time: '5 hours ago', location: 'Chennai' },
        { name: 'Highway Junction', status: 'pending', time: '-', location: 'Highway' },
        { name: 'City Entry Point', status: 'pending', time: '-', location: 'Bangalore Entry' },
        { name: 'Final Warehouse', status: 'pending', time: '-', location: 'Bangalore' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current': return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default: return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shipment Tracking</h1>
        <p className="text-gray-600 mt-1">Real-time tracking of cargo shipments</p>
      </div>

      {/* Shipments List */}
      <div className="grid gap-6">
        {shipments.map((shipment) => (
          <Card key={shipment.id} className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Ship className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-xl">{shipment.title}</CardTitle>
                    <p className="text-gray-600">{shipment.origin} → {shipment.destination}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(shipment.status)}>
                  {shipment.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Progress Overview */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm text-gray-600">{shipment.progress}% complete</span>
                </div>
                <Progress value={shipment.progress} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Current: {shipment.currentLocation}</span>
                  <span>Last update: {shipment.lastUpdate}</span>
                </div>
              </div>

              {/* Checkpoint Timeline */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Checkpoint Progress</span>
                </h4>
                
                <div className="space-y-3">
                  {shipment.checkpoints.map((checkpoint, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        {getStatusIcon(checkpoint.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {checkpoint.name}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{checkpoint.time}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">{checkpoint.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrackingDashboard;
