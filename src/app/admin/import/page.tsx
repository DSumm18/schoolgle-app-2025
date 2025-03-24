'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImportDataForm } from './ImportDataForm';
import { BrandingConfig } from './BrandingConfig';
import { BrandingPreview } from '@/types/branding';

export default function ImportPage() {
  const [brandingPreview, setBrandingPreview] = useState<BrandingPreview>();
  const [activeTab, setActiveTab] = useState<'trust' | 'school'>('trust');

  const handleBrandingChange = (preview: BrandingPreview) => {
    setBrandingPreview(preview);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Data Import & Branding</h1>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'trust' | 'school')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trust">Trust Setup</TabsTrigger>
          <TabsTrigger value="school">School Setup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trust">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import Trust Data</CardTitle>
                <CardDescription>
                  Upload a CSV file containing trust information. The file should include trust ID,
                  name, address, contact details, and other relevant information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImportDataForm type="trust" />
              </CardContent>
            </Card>

            <BrandingConfig 
              type="trust"
              onBrandingChange={handleBrandingChange}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="school">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import School Data</CardTitle>
                <CardDescription>
                  Upload a CSV file containing school information. The file should include school ID,
                  trust ID, name, address, contact details, and pupil numbers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImportDataForm type="school" />
              </CardContent>
            </Card>

            <BrandingConfig 
              type="school"
              onBrandingChange={handleBrandingChange}
            />
          </div>
        </TabsContent>
      </Tabs>

      {brandingPreview && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>
              This is how your {activeTab === 'trust' ? 'trust' : 'school'} branding will look
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden border">
              <div
                className="p-4"
                style={{
                  backgroundColor: brandingPreview.colors.primary,
                  color: '#ffffff',
                  fontFamily: brandingPreview.font || 'inherit',
                }}
              >
                <div className="flex items-center gap-4">
                  {brandingPreview.logo && (
                    <img
                      src={URL.createObjectURL(brandingPreview.logo)}
                      alt="Logo"
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <h2 className="text-xl font-bold">
                    {activeTab === 'trust' ? 'Your Trust Name' : 'Your School Name'}
                  </h2>
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <div
                  className="p-4 rounded-md mb-4"
                  style={{
                    backgroundColor: brandingPreview.colors.secondary,
                    color: '#ffffff',
                  }}
                >
                  Secondary Colour Section
                </div>
                
                <button
                  className="px-4 py-2 rounded-md text-white"
                  style={{
                    backgroundColor: brandingPreview.colors.accent,
                  }}
                >
                  Accent Button
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}