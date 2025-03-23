"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Check, AlertTriangle } from 'lucide-react';
import { uploadMediaAsset, getMediaUrl } from '@/lib/supabase';

interface MediaUploadProps {
  schoolId: string;
  userId: string;
  onUploadComplete: (url: string) => void;
  acceptedTypes?: string;
  buttonText?: string;
  maxSizeMB?: number;
}

export function MediaUpload({
  schoolId,
  userId,
  onUploadComplete,
  acceptedTypes = "image/*,video/*,.pdf,.pptx,.docx",
  buttonText = "Upload File",
  maxSizeMB = 50
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Maximum file size in bytes
  const maxSize = maxSizeMB * 1024 * 1024;

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file size
    if (file.size > maxSize) {
      setError(`File size exceeds the maximum limit of ${maxSizeMB}MB`);
      return;
    }
    
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate progress (in a real app, we'd use Supabase's upload progress callback)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 300);

      // Upload to Supabase
      const mediaAsset = await uploadMediaAsset(schoolId, file, userId);
      
      // Get the public URL
      const publicUrl = getMediaUrl(mediaAsset.file_path);
      
      // Clear the interval and set progress to 100%
      clearInterval(progressInterval);
      setProgress(100);
      
      // Let parent component know the upload is complete
      onUploadComplete(publicUrl);
      
      // Reset after a second
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 1000);
      
    } catch (err) {
      setError(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
          <Progress value={progress} className="h-2" />
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
            <X className="h-3 w-3" />
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