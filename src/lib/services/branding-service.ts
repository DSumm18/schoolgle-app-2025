import { BrandingConfig, BrandingPreview } from '@/types/branding';

export class BrandingService {
  private static instance: BrandingService;

  private constructor() {}

  public static getInstance(): BrandingService {
    if (!BrandingService.instance) {
      BrandingService.instance = new BrandingService();
    }
    return BrandingService.instance;
  }

  async uploadImage(file: File, type: 'logo' | 'favicon'): Promise<string> {
    // This would typically upload to your storage service (e.g., S3, Azure Blob)
    // For now, we'll create an object URL for preview
    return URL.createObjectURL(file);
  }

  async validateImage(file: File): Promise<{ valid: boolean; message?: string }> {
    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        message: 'Invalid file type. Please upload PNG, JPEG, or SVG files.',
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        message: 'File size too large. Maximum size is 5MB.',
      };
    }

    return { valid: true };
  }

  generateCssVariables(config: BrandingConfig): string {
    return `
      :root {
        --primary: ${config.primaryColor};
        --primary-foreground: ${this.getContrastColor(config.primaryColor)};
        --secondary: ${config.secondaryColor};
        --secondary-foreground: ${this.getContrastColor(config.secondaryColor)};
        --accent: ${config.accentColor};
        --accent-foreground: ${this.getContrastColor(config.accentColor)};
        ${config.fontFamily ? `--font-family: ${config.fontFamily};` : ''}
      }
      ${config.customCss || ''}
    `;
  }

  async previewBranding(preview: BrandingPreview): Promise<BrandingConfig> {
    const config: Partial<BrandingConfig> = {
      primaryColor: preview.colors.primary,
      secondaryColor: preview.colors.secondary,
      accentColor: preview.colors.accent,
    };

    if (preview.logo) {
      config.logoUrl = await this.uploadImage(preview.logo, 'logo');
    }

    if (preview.favicon) {
      config.favicon = await this.uploadImage(preview.favicon, 'favicon');
    }

    if (preview.font) {
      config.fontFamily = preview.font;
    }

    return config as BrandingConfig;
  }

  private getContrastColor(hexColor: string): string {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black or white based on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }
}