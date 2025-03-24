export interface ImportError {
  row: number
  field: string
  message: string
}

export interface ImportPreviewData {
  [key: string]: string | number | boolean | null
}

export interface PreviewResult {
  data: ImportPreviewData[]
  errors: ImportError[]
}

export interface BrandingOptions {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logo?: string
}