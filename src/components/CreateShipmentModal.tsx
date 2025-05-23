
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreateShipmentModal = ({ isOpen, onClose, onSubmit }: CreateShipmentModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    origin: '',
    destination: '',
    description: '',
    estimatedDelivery: ''
  });
  
  const [checkpoints, setCheckpoints] = useState([
    { id: 1, name: '', description: '' }
  ]);

  const addCheckpoint = () => {
    setCheckpoints([...checkpoints, { id: Date.now(), name: '', description: '' }]);
  };

  const removeCheckpoint = (id: number) => {
    if (checkpoints.length > 1) {
      setCheckpoints(checkpoints.filter(cp => cp.id !== id));
    }
  };

  const updateCheckpoint = (id: number, field: string, value: string) => {
    setCheckpoints(checkpoints.map(cp => 
      cp.id === id ? { ...cp, [field]: value } : cp
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const shipmentData = {
      ...formData,
      checkpoints: checkpoints.length,
      checkpointDetails: checkpoints.filter(cp => cp.name.trim()),
    };
    
    onSubmit(shipmentData);
    
    // Reset form
    setFormData({
      title: '',
      origin: '',
      destination: '',
      description: '',
      estimatedDelivery: ''
    });
    setCheckpoints([{ id: 1, name: '', description: '' }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Shipment</DialogTitle>
          <DialogDescription>
            Set up a new cargo shipment with checkpoints and QR codes will be automatically generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Shipment Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Electronics to Mumbai"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                  <Input
                    id="estimatedDelivery"
                    type="date"
                    value={formData.estimatedDelivery}
                    onChange={(e) => setFormData({...formData, estimatedDelivery: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    placeholder="e.g., Delhi"
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Mumbai"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the cargo..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Checkpoints */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Route Checkpoints</span>
                </span>
                <Button
                  type="button"
                  onClick={addCheckpoint}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Checkpoint
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {checkpoints.map((checkpoint, index) => (
                <div key={checkpoint.id} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Checkpoint {index + 1}</h4>
                    {checkpoints.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeCheckpoint(checkpoint.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Checkpoint Name</Label>
                      <Input
                        placeholder="e.g., Warehouse A"
                        value={checkpoint.name}
                        onChange={(e) => updateCheckpoint(checkpoint.id, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        placeholder="e.g., Loading dock"
                        value={checkpoint.description}
                        onChange={(e) => updateCheckpoint(checkpoint.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Shipment & Generate QR Codes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShipmentModal;
