import { TrustData, SchoolData, ImportPreviewData, ImportResult } from '@/types/school-data';
import Papa from 'papaparse';

export class ImportService {
  private static instance: ImportService;

  private constructor() {}

  public static getInstance(): ImportService {
    if (!ImportService.instance) {
      ImportService.instance = new ImportService();
    }
    return ImportService.instance;
  }

  async parseCSV(file: File): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => resolve(results.data as string[][]),
        error: (error) => reject(error),
      });
    });
  }

  async validateHeaders(headers: string[], fileType: 'trust' | 'school'): Promise<boolean> {
    const requiredTrustHeaders = [
      'trustId',
      'trustName',
      'address',
      'postcode',
      'contactEmail',
      'contactPhone',
      'numberOfSchools',
      'totalPupils',
    ];

    const requiredSchoolHeaders = [
      'schoolId',
      'trustId',
      'schoolName',
      'address',
      'postcode',
      'contactEmail',
      'contactPhone',
      'headteacherName',
      'headteacherEmail',
      'schoolType',
      'numberOfPupils',
    ];

    const required = fileType === 'trust' ? requiredTrustHeaders : requiredSchoolHeaders;
    return required.every((header) => headers.includes(header));
  }

  async previewImport(file: File, fileType: 'trust' | 'school'): Promise<ImportPreviewData> {
    try {
      const data = await this.parseCSV(file);
      const headers = data[0];
      const rows = data.slice(1);

      if (!this.validateHeaders(headers, fileType)) {
        return {
          errors: [{
            row: 0,
            field: 'headers',
            message: 'Invalid headers in CSV file',
          }],
        };
      }

      const errors: { row: number; field: string; message: string }[] = [];
      const processedData: any[] = [];

      rows.forEach((row, index) => {
        const rowData: { [key: string]: any } = {};
        let hasError = false;

        headers.forEach((header, colIndex) => {
          const value = row[colIndex];
          if (!value && this.isRequiredField(header, fileType)) {
            errors.push({
              row: index + 1,
              field: header,
              message: `Missing required field: ${header}`,
            });
            hasError = true;
          }

          if (this.isNumericField(header) && !this.isValidNumber(value)) {
            errors.push({
              row: index + 1,
              field: header,
              message: `Invalid number format for field: ${header}`,
            });
            hasError = true;
          }

          rowData[header] = this.formatValue(header, value);
        });

        if (!hasError) {
          processedData.push(rowData);
        }
      });

      return {
        [fileType]: fileType === 'trust' ? processedData[0] : processedData,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      return {
        errors: [{
          row: 0,
          field: 'file',
          message: 'Failed to parse CSV file',
        }],
      };
    }
  }

  private isRequiredField(field: string, fileType: 'trust' | 'school'): boolean {
    const requiredTrustFields = ['trustId', 'trustName'];
    const requiredSchoolFields = ['schoolId', 'trustId', 'schoolName'];
    return fileType === 'trust' 
      ? requiredTrustFields.includes(field)
      : requiredSchoolFields.includes(field);
  }

  private isNumericField(field: string): boolean {
    return ['numberOfSchools', 'totalPupils', 'numberOfPupils'].includes(field);
  }

  private isValidNumber(value: string): boolean {
    return !isNaN(Number(value)) && value.trim() !== '';
  }

  private formatValue(field: string, value: string): any {
    if (this.isNumericField(field)) {
      return Number(value);
    }
    return value;
  }
}