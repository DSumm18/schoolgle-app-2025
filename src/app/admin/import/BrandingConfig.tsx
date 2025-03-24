import { getContrastColor } from '@/lib/utils/color';
import { useRef } from 'react';

interface BrandingConfigProps {
  onUpdate: (colors: { primary: string; secondary: string; accent: string }) => void;
}

export function BrandingConfig({ onUpdate }: BrandingConfigProps) {
  const primaryRef = useRef<HTMLInputElement>(null);
  const secondaryRef = useRef<HTMLInputElement>(null);
  const accentRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (type: 'primary' | 'secondary' | 'accent', color: string) => {
    onUpdate({
      primary: type === 'primary' ? color : primaryRef.current?.value || '#000000',
      secondary: type === 'secondary' ? color : secondaryRef.current?.value || '#ffffff',
      accent: type === 'accent' ? color : accentRef.current?.value || '#0000ff',
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Branding Configuration</h3>
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="primary-color">Primary Colour:</label>
          <input
            type="color"
            id="primary-color"
            ref={primaryRef}
            defaultValue="#000000"
            onChange={(e) => handleColorChange('primary', e.target.value)}
            className="h-8 w-16"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="secondary-color">Secondary Colour:</label>
          <input
            type="color"
            id="secondary-color"
            ref={secondaryRef}
            defaultValue="#ffffff"
            onChange={(e) => handleColorChange('secondary', e.target.value)}
            className="h-8 w-16"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="accent-color">Accent Colour:</label>
          <input
            type="color"
            id="accent-color"
            ref={accentRef}
            defaultValue="#0000ff"
            onChange={(e) => handleColorChange('accent', e.target.value)}
            className="h-8 w-16"
          />
        </div>
      </div>
    </div>
  );
}