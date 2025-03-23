"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, AlertTriangle, Check } from 'lucide-react';

// Simple placeholder component until Supabase is integrated
export function MediaUpload({
  buttonText = "Upload File",
  acceptedTypes = "image/*,video/*,.pdf,.pptx,.docx",
}: {
  schoolId?: string;
  userId?: string;
  onUploadComplete?: (url: string) => void;
  acceptedTypes?: string;
  buttonText?: string;
  maxSizeMB?: number;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Simulate upload
    setIsUploading(true);
    setProgress(0);
    setError(null);

    // Mock progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            alert(`File "${file.name}" would be uploaded in the full implementation.`);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={acceptedTypes}
        onChange={handleFileChange}
      />
      
      {!isUploading && !error && (
        <Button 
          variant="outline" 
          onClick={handleUploadClick}
          className="w-full flex items-center gap-2"
          disabled={isUploading}
        >
          <Upload className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
      
      {isUploading && (
        <div className="space-y-2">
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}
      
      {error && (
        <div className="text-sm text-red-500 flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
          <AlertTriangle className="h-4 w-4" />
          <p>{error}</p>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto h-5 w-5"
            onClick={() => setError(null)}
          >
            <span className="sr-only">Dismiss</span>
            ×
          </Button>
        </div>
      )}
      
      {progress === 100 && (
        <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-green-600 dark:text-green-400">
          <Check className="h-4 w-4" />
          <p className="text-sm">Upload complete!</p>
        </div>
      )}
    </div>
  );
}