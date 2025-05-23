
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Clock, QrCode, Eye } from 'lucide-react';
import { useState } from 'react';
import QRCodeModal from './QRCodeModal';

interface ShipmentCardProps {
  shipment: {
    id: string;
    title: string;
    origin: string;
    destination: string;
    status: string;
    progress: number;
    checkpoints: number;
    completedCheckpoints: number;
    lastUpdate: string;
    estimatedDelivery: string;
  };
}

const ShipmentCard = ({ shipment }: ShipmentCardProps) => {
  const [showQRModal, setShowQRModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{shipment.title}</h3>
              <Badge className={getStatusColor(shipment.status)}>
                {shipment.status}
              </Badge>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{shipment.origin} → {shipment.destination}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>ETA: {shipment.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => setShowQRModal(true)}
              size="sm"
              variant="outline"
              className="flex items-center space-x-1"
            >
              <QrCode className="h-4 w-4" />
              <span>QR Codes</span>
            </Button>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              Track
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{shipment.completedCheckpoints}/{shipment.checkpoints} checkpoints</span>
          </div>
          
          <Progress value={shipment.progress} className="h-2" />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Last update: {shipment.lastUpdate}</span>
            <span>{shipment.progress}% complete</span>
          </div>
        </div>

        {/* QR Code Modal */}
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          shipment={shipment}
        />
      </CardContent>
    </Card>
  );
};

export default ShipmentCard;
