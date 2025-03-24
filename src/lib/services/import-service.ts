import Papa from 'papaparse';

export interface ImportData {
  [key: string]: any;
}

export interface PreviewResult {
  data: ImportData[];
  errors?: string[];
}

export interface BrandingOptions {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export class ImportService {
  private static instance: ImportService;

  private constructor() {}

  public static getInstance(): ImportService {
    if (!ImportService.instance) {
      ImportService.instance = new ImportService();
    }
    return ImportService.instance;
  }

  async previewImport(file: File, type: string): Promise<PreviewResult> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const errors = this.validateData(results.data, type);
          resolve({
            data: results.data,
            errors: errors.length > 0 ? errors : undefined
          });
        },
        error: (error) => {
          reject(new Error(`Failed to parse CSV file: ${error.message}`));
        }
      });
    });
  }

  private validateData(data: ImportData[], type: string): string[] {
    const errors: string[] = [];
    const requiredFields = this.getRequiredFields(type);

    if (!Array.isArray(data) || data.length === 0) {
      errors.push('No data found in the file');
      return errors;
    }

    // Check if all required fields are present
    const missingFields = requiredFields.filter(
      field => !Object.keys(data[0]).includes(field)
    );

    if (missingFields.length > 0) {
      errors.push(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return errors;
  }

  private getRequiredFields(type: string): string[] {
    switch (type.toLowerCase()) {
      case 'students':
        return ['firstName', 'lastName', 'email', 'yearGroup'];
      case 'staff':
        return ['firstName', 'lastName', 'email', 'department'];
      case 'classes':
        return ['name', 'subject', 'teacher'];
      default:
        return [];
    }
  }

  async importData(
    data: ImportData[],
    type: string,
    branding?: BrandingOptions
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validate data
      const errors = this.validateData(data, type);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      // Process data based on type
      switch (type.toLowerCase()) {
        case 'students':
          await this.importStudents(data, branding);
          break;
        case 'staff':
          await this.importStaff(data, branding);
          break;
        case 'classes':
          await this.importClasses(data, branding);
          break;
        default:
          throw new Error('Unsupported import type');
      }

      return {
        success: true,
        message: `Successfully imported ${data.length} ${type} records`
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async importStudents(data: ImportData[], branding?: BrandingOptions): Promise<void> {
    // Implementation for student import
    console.log('Importing students with branding:', branding);
  }

  private async importStaff(data: ImportData[], branding?: BrandingOptions): Promise<void> {
    // Implementation for staff import
    console.log('Importing staff with branding:', branding);
  }

  private async importClasses(data: ImportData[], branding?: BrandingOptions): Promise<void> {
    // Implementation for classes import
    console.log('Importing classes with branding:', branding);
  }
}