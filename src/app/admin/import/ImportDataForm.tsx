import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ImportPreviewData, ImportError } from '@/lib/services/import-service'

interface ImportDataFormProps {
  data: ImportPreviewData[]
  errors?: ImportError[]
  onSubmit?: (data: ImportPreviewData[]) => void
  isLoading?: boolean
}

export default function ImportDataForm({ data = [], errors = [], onSubmit, isLoading = false }: ImportDataFormProps) {
  return (
    <div className="w-full space-y-6">
      {errors.length > 0 && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          <h3 className="font-semibold mb-2">Validation Errors:</h3>
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>
                Row {error.row}: {error.message} (Field: {error.field})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Preview Data</h2>
        
        {data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(data[0]).map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {Object.entries(row).map(([key, value]) => (
                    <TableCell key={key}>{String(value)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">No data to preview</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button
          onClick={() => onSubmit?.(data)}
          disabled={!data.length || errors.length > 0 || isLoading}
          variant="default"
        >
          {isLoading ? 'Importing...' : 'Import Data'}
        </Button>
      </div>
    </div>
  )
}