'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BrandingService } from '@/lib/services/branding-service';
import { BrandingPreview } from '@/types/branding';
import Image from 'next/image';

interface BrandingConfigProps {
  type: 'trust' | 'school';
  onBrandingChange: (preview: BrandingPreview) => void;
}

export function BrandingConfig({ type, onBrandingChange }: BrandingConfigProps) {
  const [preview, setPreview] = useState<BrandingPreview>({
    colors: {
      primary: '#1e40af',
      secondary: '#6b7280',
      accent: '#f59e0b',
    },
  });
  const [logoPreview, setLogoPreview] = useState<string>();
  const [faviconPreview, setFaviconPreview] = useState<string>();
  const [error, setError] = useState<string>();

  const brandingService = BrandingService.getInstance();

  const handleColorChange = (color: string, type: 'primary' | 'secondary' | 'accent') => {
    const newPreview = {
      ...preview,
      colors: {
        ...preview.colors,
        [type]: color,
      },
    };
    setPreview(newPreview);
    onBrandingChange(newPreview);
  };

  const handleImageUpload = async (file: File, type: 'logo' | 'favicon') => {
    setError(undefined);
    
    const validation = await brandingService.validateImage(file);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    const imageUrl = await brandingService.uploadImage(file, type);
    
    if (type === 'logo') {
      setLogoPreview(imageUrl);
      setPreview({ ...preview, logo: file });
    } else {
      setFaviconPreview(imageUrl);
      setPreview({ ...preview, favicon: file });
    }
    
    onBrandingChange(preview);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Primary Colour</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={preview.colors.primary}
                  onChange={(e) => handleColorChange(e.target.value, 'primary')}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={preview.colors.primary}
                  onChange={(e) => handleColorChange(e.target.value, 'primary')}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label>Secondary Colour</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={preview.colors.secondary}
                  onChange={(e) => handleColorChange(e.target.value, 'secondary')}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={preview.colors.secondary}
                  onChange={(e) => handleColorChange(e.target.value, 'secondary')}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label>Accent Colour</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={preview.colors.accent}
                  onChange={(e) => handleColorChange(e.target.value, 'accent')}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={preview.colors.accent}
                  onChange={(e) => handleColorChange(e.target.value, 'accent')}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'logo');
                  }}
                />
                {logoPreview && (
                  <div className="relative w-16 h-16">
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>Favicon</Label>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/png,image/x-icon,image/svg+xml"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'favicon');
                  }}
                />
                {faviconPreview && (
                  <div className="relative w-8 h-8">
                    <Image
                      src={faviconPreview}
                      alt="Favicon preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>Font Family</Label>
              <select
                className="w-full mt-2 border rounded-md p-2"
                value={preview.font}
                onChange={(e) => {
                  const newPreview = { ...preview, font: e.target.value };
                  setPreview(newPreview);
                  onBrandingChange(newPreview);
                }}
              >
                <option value="">Default System Font</option>
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">Preview</h3>
            <div
              className="p-4 rounded-md"
              style={{
                backgroundColor: preview.colors.primary,
                color: brandingService.getContrastColor(preview.colors.primary),
              }}
            >
              Primary Colour
            </div>
            <div
              className="p-4 rounded-md mt-2"
              style={{
                backgroundColor: preview.colors.secondary,
                color: brandingService.getContrastColor(preview.colors.secondary),
              }}
            >
              Secondary Colour
            </div>
            <div
              className="p-4 rounded-md mt-2"
              style={{
                backgroundColor: preview.colors.accent,
                color: brandingService.getContrastColor(preview.colors.accent),
              }}
            >
              Accent Colour
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}