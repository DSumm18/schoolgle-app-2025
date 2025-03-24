import { getContrastColor } from '@/lib/utils/color';

interface BrandingConfigProps {
  onUpdate: (colors: { primary: string; secondary: string; accent: string }) => void;
}

export function BrandingConfig({ onUpdate }: BrandingConfigProps) {
  const handleColorChange = (type: 'primary' | 'secondary' | 'accent', color: string) => {
    onUpdate({
      primary: type === 'primary' ? color : document.getElementById('primary-color')?.value || '#000000',
      secondary: type === 'secondary' ? color : document.getElementById('secondary-color')?.value || '#ffffff',
      accent: type === 'accent' ? color : document.getElementById('accent-color')?.value || '#0000ff',
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Branding Configuration</h3>
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="primary-color">Primary Color:</label>
          <input
            type="color"
            id="primary-color"
            defaultValue="#000000"
            onChange={(e) => handleColorChange('primary', e.target.value)}
            className="h-8 w-16"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="secondary-color">Secondary Color:</label>
          <input
            type="color"
            id="secondary-color"
            defaultValue="#ffffff"
            onChange={(e) => handleColorChange('secondary', e.target.value)}
            className="h-8 w-16"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="accent-color">Accent Color:</label>
          <input
            type="color"
            id="accent-color"
            defaultValue="#0000ff"
            onChange={(e) => handleColorChange('accent', e.target.value)}
            className="h-8 w-16"
          />
        </div>
      </div>
    </div>
  );
}