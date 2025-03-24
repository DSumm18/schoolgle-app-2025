'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImportService } from '@/lib/services/import-service';
import { ImportPreviewData } from '@/types/school-data';
import { BrandingPreview } from '@/types/branding';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ImportDataFormProps {
  type: 'trust' | 'school';
  branding?: BrandingPreview;
}

export function ImportDataForm({ type, branding }: ImportDataFormProps) {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<ImportPreviewData>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const importService = ImportService.getInstance();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setFile(selectedFile);
    setError(undefined);
    setImportSuccess(false);

    try {
      setIsLoading(true);
      const previewData = await importService.previewImport(selectedFile, type);
      setPreview(previewData);
      if (previewData.errors?.length) {
        setError('There are validation errors in the CSV file');
      }
    } catch (err) {
      setError('Failed to parse CSV file');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    if (!file || !preview || preview.errors?.length) return;

    try {
      setIsLoading(true);
      const result = await importService.importData(preview, type, branding ? {
        primaryColor: branding.colors.primary,
        secondaryColor: branding.colors.secondary,
        accentColor: branding.colors.accent,
        logoUrl: branding.logo ? URL.createObjectURL(branding.logo) : undefined,
        favicon: branding.favicon ? URL.createObjectURL(branding.favicon) : undefined,
        fontFamily: branding.font,
      } : undefined);

      if (result.success) {
        setImportSuccess(true);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to import data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <p className="text-sm text-gray-500 mt-2">
          Upload a CSV file containing {type} data
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {importSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Data imported successfully
          </AlertDescription>
        </Alert>
      )}

      {preview && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          
          {preview.errors && preview.errors.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">Validation Errors</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preview.errors.map((error, index) => (
                    <TableRow key={index}>
                      <TableCell>{error.row}</TableCell>
                      <TableCell>{error.field}</TableCell>
                      <TableCell>{error.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!preview.errors?.length && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {type === 'trust' && preview.trust && (
                    Object.entries(preview.trust).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{String(value)}</TableCell>
                      </TableRow>
                    ))
                  )}
                  {type === 'school' && preview.schools && (
                    Object.entries(preview.schools[0] || {}).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{String(value)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {type === 'school' && preview.schools && preview.schools.length > 1 && (
                <p className="text-sm text-gray-500">
                  Showing preview of first school. Total schools: {preview.schools.length}
                </p>
              )}

              <Button
                onClick={handleImport}
                disabled={isLoading || preview.errors?.length > 0}
              >
                {isLoading ? 'Importing...' : 'Confirm Import'}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}