'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImportService } from '@/lib/services/import-service'
import type { ImportPreviewData, ImportError } from '@/lib/types/import-types'
import { useToast } from '@/components/ui/use-toast'
import ImportDataForm from './ImportDataForm'

export default function ImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importType, setImportType] = useState<'school' | 'trust'>('school')
  const [previewData, setPreviewData] = useState<ImportPreviewData[]>([])
  const [errors, setErrors] = useState<ImportError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    try {
      const importService = ImportService.getInstance()
      const result = await importService.previewImport(file, importType)
      setPreviewData(result.data)
      setErrors(result.errors)
    } catch (error) {
      console.error('Error previewing file:', error)
      setErrors([{
        row: 0,
        field: 'file',
        message: 'Failed to parse file. Please ensure it is a valid CSV file.'
      }])
      setPreviewData([])
    }
  }

  const handleImportTypeChange = (type: 'school' | 'trust') => {
    setImportType(type)
    setSelectedFile(null)
    setPreviewData([])
    setErrors([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (data: ImportPreviewData[]) => {
    try {
      setIsLoading(true)
      const importService = ImportService.getInstance()
      const result = await importService.importData(data, importType)
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
          variant: 'default'
        })
        // Reset form
        handleImportTypeChange(importType)
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive'
        })
        if (result.errors) {
          setErrors(result.errors)
        }
      }
    } catch (error) {
      console.error('Error importing data:', error)
      toast({
        title: 'Error',
        description: 'Failed to import data. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Button
              variant={importType === 'school' ? 'default' : 'outline'}
              onClick={() => handleImportTypeChange('school')}
            >
              School Import
            </Button>
            <Button
              variant={importType === 'trust' ? 'default' : 'outline'}
              onClick={() => handleImportTypeChange('trust')}
            >
              Trust Import
            </Button>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            <p className="text-sm text-muted-foreground">
              Upload a CSV file containing {importType} data
            </p>
          </div>
        </CardContent>
      </Card>

      {(previewData.length > 0 || errors.length > 0) && (
        <Card>
          <CardContent className="pt-6">
            <ImportDataForm
              data={previewData}
              errors={errors}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}