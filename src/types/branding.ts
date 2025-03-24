export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
  favicon: string;
  fontFamily?: string;
  customCss?: string;
}

export interface TrustBranding extends BrandingConfig {
  trustId: string;
  trustName: string;
}

export interface SchoolBranding extends BrandingConfig {
  schoolId: string;
  trustId: string;
  schoolName: string;
}

export interface BrandingPreview {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo?: File;
  favicon?: File;
  font?: string;
}