'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { EnvironmentService, Environment } from '@/lib/services/environment-service';

export default function EnvironmentsPage() {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [newEnvName, setNewEnvName] = useState('');
  const [newEnvDescription, setNewEnvDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const environmentService = EnvironmentService.getInstance();

  useEffect(() => {
    loadEnvironments();
  }, []);

  const loadEnvironments = async () => {
    try {
      const data = await environmentService.getEnvironments();
      setEnvironments(data);
    } catch (err) {
      setError('Failed to load environments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEnvironment = async () => {
    try {
      setLoading(true);
      const newEnv = await environmentService.createNewEnvironmentFromTemplate(
        newEnvName,
        newEnvDescription
      );
      setEnvironments([newEnv, ...environments]);
      setDialogOpen(false);
      setNewEnvName('');
      setNewEnvDescription('');
    } catch (err) {
      setError('Failed to create environment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (envId: number, newStatus: Environment['status']) => {
    try {
      const updatedEnv = await environmentService.updateEnvironmentStatus(envId, newStatus);
      setEnvironments(environments.map(env => 
        env.id === updatedEnv.id ? updatedEnv : env
      ));
    } catch (err) {
      setError('Failed to update environment status');
      console.error(err);
    }
  };

  const getStatusBadgeColor = (status: Environment['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'template':
        return 'bg-blue-100 text-blue-800';
      case 'uat':
        return 'bg-yellow-100 text-yellow-800';
      case 'production':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Environments</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Environment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Environment</DialogTitle>
              <DialogDescription>
                This will create a new environment based on the base template.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Environment Name</Label>
                <Input
                  id="name"
                  value={newEnvName}
                  onChange={(e) => setNewEnvName(e.target.value)}
                  placeholder="e.g., UAT_Client1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newEnvDescription}
                  onChange={(e) => setNewEnvDescription(e.target.value)}
                  placeholder="Environment description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleCreateEnvironment}
                disabled={!newEnvName || loading}
              >
                {loading ? 'Creating...' : 'Create Environment'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Environments</CardTitle>
          <CardDescription>
            Manage your Schoolgle environments and their configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {environments.map((env) => (
                <TableRow key={env.id}>
                  <TableCell className="font-medium">{env.name}</TableCell>
                  <TableCell>{env.description}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(env.status)}>
                      {env.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{env.version}</TableCell>
                  <TableCell>
                    {new Date(env.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(env.id, 'active')}
                        disabled={env.status === 'active' || env.isTemplate}
                      >
                        Activate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(env.id, 'inactive')}
                        disabled={env.status === 'inactive' || env.isTemplate}
                      >
                        Deactivate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}