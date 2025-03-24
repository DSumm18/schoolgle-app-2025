import React from 'react';
import { getContrastColor } from '@/lib/utils/color';

interface BrandingConfigProps {
  preview: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
}

export default function BrandingConfig({ preview }: BrandingConfigProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <div
          className="p-4 rounded-md"
          style={{
            backgroundColor: preview.colors.primary,
            color: getContrastColor(preview.colors.primary),
          }}
        >
          Primary Colour
        </div>
        <div
          className="p-4 rounded-md"
          style={{
            backgroundColor: preview.colors.secondary,
            color: getContrastColor(preview.colors.secondary),
          }}
        >
          Secondary Colour
        </div>
        <div
          className="p-4 rounded-md"
          style={{
            backgroundColor: preview.colors.accent,
            color: getContrastColor(preview.colors.accent),
          }}
        >
          Accent Colour
        </div>
      </div>
    </div>
  );
}