import Papa, { ParseResult } from 'papaparse'
import type { ImportError, ImportPreviewData, PreviewResult, BrandingOptions } from '../types/import-types'

export type { ImportError, ImportPreviewData, PreviewResult, BrandingOptions }

export interface ImportResult {
  success: boolean
  message: string
  errors?: ImportError[]
}

export class ImportService {
  private static instance: ImportService
  private requiredFields: { [key: string]: string[] } = {
    school: ['name', 'address', 'postcode', 'phone', 'email'],
    trust: ['name', 'registration_number', 'address', 'postcode']
  }

  private constructor() {}

  public static getInstance(): ImportService {
    if (!ImportService.instance) {
      ImportService.instance = new ImportService()
    }
    return ImportService.instance
  }

  public async previewImport(file: File, type: 'school' | 'trust'): Promise<PreviewResult> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<ImportPreviewData>) => {
          const errors: ImportError[] = []
          const data = results.data

          // Check for required fields
          const missingFields = this.validateRequiredFields(results.meta.fields || [], type)
          if (missingFields.length > 0) {
            errors.push({
              row: 0,
              field: 'headers',
              message: `Missing required fields: ${missingFields.join(', ')}`
            })
          }

          // Validate each row
          data.forEach((row, index) => {
            const rowErrors = this.validateData(row, type, index + 1)
            errors.push(...rowErrors)
          })

          resolve({ data, errors })
        },
        error: (error: Error) => {
          reject(new Error(`Failed to parse CSV file: ${error.message}`))
        }
      })
    })
  }

  public async importData(data: ImportPreviewData[], type: 'school' | 'trust', branding?: BrandingOptions): Promise<ImportResult> {
    try {
      // Validate the data again before importing
      const errors: ImportError[] = []
      data.forEach((row, index) => {
        const rowErrors = this.validateData(row, type, index + 1)
        errors.push(...rowErrors)
      })

      if (errors.length > 0) {
        return {
          success: false,
          message: 'Validation failed',
          errors
        }
      }

      // TODO: Implement actual database import logic here
      // For now, just simulate a successful import
      return {
        success: true,
        message: `Successfully imported ${data.length} ${type} records`
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to import data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        errors: [{
          row: 0,
          field: 'system',
          message: 'System error during import'
        }]
      }
    }
  }

  private validateRequiredFields(fields: string[], type: 'school' | 'trust'): string[] {
    const required = this.requiredFields[type]
    return required.filter(field => !fields.includes(field))
  }

  private validateData(row: ImportPreviewData, type: 'school' | 'trust', rowNumber: number): ImportError[] {
    const errors: ImportError[] = []
    const required = this.requiredFields[type]

    required.forEach(field => {
      const value = row[field]
      if (!value || String(value).trim() === '') {
        errors.push({
          row: rowNumber,
          field,
          message: `${field} is required`
        })
      }
    })

    // Additional validation rules
    if (type === 'school') {
      if (row.email && !this.isValidEmail(String(row.email))) {
        errors.push({
          row: rowNumber,
          field: 'email',
          message: 'Invalid email format'
        })
      }
      if (row.phone && !this.isValidPhone(String(row.phone))) {
        errors.push({
          row: rowNumber,
          field: 'phone',
          message: 'Invalid phone number format'
        })
      }
    }

    if (type === 'trust' && row.registration_number) {
      if (!this.isValidRegistrationNumber(String(row.registration_number))) {
        errors.push({
          row: rowNumber,
          field: 'registration_number',
          message: 'Invalid registration number format'
        })
      }
    }

    return errors
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-+()]{10,}$/
    return phoneRegex.test(phone)
  }

  private isValidRegistrationNumber(number: string): boolean {
    const regNumberRegex = /^\d{7}$/
    return regNumberRegex.test(number)
  }
}