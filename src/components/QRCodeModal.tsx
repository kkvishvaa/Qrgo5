
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Download, MapPin, Clock } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: any;
}

const QRCodeModal = ({ isOpen, onClose, shipment }: QRCodeModalProps) => {
  // Generate mock checkpoints for demo
  const checkpoints = [
    { id: 'CP001', name: 'Origin Warehouse', location: shipment.origin, status: 'completed', time: '2 hours ago' },
    { id: 'CP002', name: 'Transit Hub A', location: 'Highway Checkpoint', status: 'completed', time: '1 hour ago' },
    { id: 'CP003', name: 'City Entry Point', location: 'Mumbai Entry', status: 'pending', time: '-' },
    { id: 'CP004', name: 'Final Warehouse', location: shipment.destination, status: 'pending', time: '-' },
  ];

  const generateQRCodeURL = (checkpointId: string) => {
    // In a real app, this would generate actual QR codes
    // For demo, we'll show a placeholder
    return `${window.location.origin}/scan/${checkpointId}`;
  };

  const downloadQRCode = (checkpointId: string, checkpointName: string) => {
    // In a real app, this would generate and download a QR code image
    alert(`Downloading QR code for ${checkpointName} (${checkpointId})`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center space-x-2">
            <QrCode className="h-6 w-6 text-blue-600" />
            <span>QR Codes - {shipment.title}</span>
          </DialogTitle>
          <DialogDescription>
            Scan these QR codes at each checkpoint to update shipment status
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {checkpoints.map((checkpoint, index) => (
            <Card key={checkpoint.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>{checkpoint.name}</span>
                  </CardTitle>
                  <Badge className={getStatusColor(checkpoint.status)}>
                    {checkpoint.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  {/* QR Code Placeholder */}
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>

                  {/* Checkpoint Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{checkpoint.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Last scan: {checkpoint.time}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      ID: {checkpoint.id}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => downloadQRCode(checkpoint.id, checkpoint.name)}
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download QR
                    </Button>
                    <Button
                      onClick={() => window.open(generateQRCodeURL(checkpoint.id), '_blank')}
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Test Scan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Download All QR Codes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
