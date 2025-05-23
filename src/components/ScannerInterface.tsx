
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ScannerInterface = () => {
  const { checkpointId } = useParams();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [locationData, setLocationData] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  // Mock checkpoint data
  const checkpointData = {
    id: checkpointId,
    name: 'Transit Hub A',
    shipmentId: 'SH001',
    shipmentTitle: 'Electronics to Mumbai',
    location: 'Highway Checkpoint',
    expectedLocation: { lat: 28.6139, lng: 77.2090 } // Delhi coordinates for demo
  };

  const getCurrentLocation = () => {
    setScanning(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationData({ lat: latitude, lng: longitude });
          
          // Simulate API call to update backend
          setTimeout(() => {
            setScanning(false);
            setScanComplete(true);
            
            toast({
              title: "Checkpoint Scanned!",
              description: `Location updated for ${checkpointData.name}`,
            });
          }, 2000);
        },
        (error) => {
          setScanning(false);
          // For demo purposes, use mock coordinates
          setLocationData({ lat: 28.6139, lng: 77.2090 });
          setScanComplete(true);
          
          toast({
            title: "Location Simulated",
            description: "Using demo coordinates for checkpoint scan",
            variant: "default"
          });
        }
      );
    } else {
      // Fallback for devices without geolocation
      setLocationData({ lat: 28.6139, lng: 77.2090 });
      setScanning(false);
      setScanComplete(true);
      
      toast({
        title: "Demo Mode",
        description: "Using simulated location data",
      });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <QrCode className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">QR Checkpoint Scanner</CardTitle>
          <Badge variant="outline" className="mx-auto mt-2">
            {checkpointData.id}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Checkpoint Information */}
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {checkpointData.name}
            </h3>
            <p className="text-gray-600">
              Shipment: {checkpointData.shipmentTitle}
            </p>
            
            <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{checkpointData.location}</span>
            </div>
          </div>

          {/* Location Status */}
          {locationData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">GPS Location Captured</span>
              </div>
              <div className="mt-2 text-sm text-green-700 font-mono">
                Lat: {locationData.lat.toFixed(6)}<br/>
                Lng: {locationData.lng.toFixed(6)}
              </div>
            </div>
          )}

          {/* Scan Button */}
          <div className="text-center">
            {!scanComplete ? (
              <Button
                onClick={getCurrentLocation}
                disabled={scanning}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {scanning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Capturing Location...
                  </>
                ) : (
                  <>
                    <QrCode className="h-5 w-5 mr-2" />
                    Scan Checkpoint
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg font-medium">Scan Complete!</span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Scanned at: {new Date().toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="w-full"
                >
                  Return to Dashboard
                </Button>
              </div>
            )}
          </div>

          {/* Instructions */}
          {!scanComplete && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Instructions:</p>
                  <p>Click "Scan Checkpoint" to capture your current GPS location and update the shipment status.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScannerInterface;
