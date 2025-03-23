import { createClient } from '@supabase/supabase-js';

// These environment variables are set in Vercel and locally in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our data models
export type School = {
  id: string;
  name: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  created_at: string;
  trust_id: string;
};

export type Trust = {
  id: string;
  name: string;
  created_at: string;
};

export type IntranetWidget = {
  id: string;
  school_id: string;
  type: 'video' | 'image' | 'text' | 'calendar' | 'social' | 'links';
  title: string;
  content: string;
  position: number;
  created_at: string;
  updated_at: string;
};

export type MediaAsset = {
  id: string;
  school_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  created_at: string;
  uploaded_by: string;
};

// Helper functions for data access with proper multi-tenant isolation
export const getSchoolData = async (schoolId: string) => {
  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .eq('id', schoolId)
    .single();
    
  if (error) throw error;
  return data as School;
};

export const getSchoolWidgets = async (schoolId: string) => {
  const { data, error } = await supabase
    .from('intranet_widgets')
    .select('*')
    .eq('school_id', schoolId)
    .order('position', { ascending: true });
    
  if (error) throw error;
  return data as IntranetWidget[];
};

export const updateWidgetPositions = async (widgets: Pick<IntranetWidget, 'id' | 'position'>[]) => {
  const updates = widgets.map(widget => ({
    id: widget.id,
    position: widget.position,
  }));
  
  const { data, error } = await supabase
    .from('intranet_widgets')
    .upsert(updates);
    
  if (error) throw error;
  return data;
};

export const uploadMediaAsset = async (
  schoolId: string, 
  file: File, 
  userId: string
) => {
  // Create a unique file path using the schoolId to ensure separation
  const filePath = `schools/${schoolId}/${new Date().getTime()}-${file.name}`;
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('media')
    .upload(filePath, file);
    
  if (error) throw error;
  
  // Record the metadata in the database with school_id for isolation
  const { data: assetData, error: assetError } = await supabase
    .from('media_assets')
    .insert({
      school_id: schoolId,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      file_path: filePath,
      uploaded_by: userId
    })
    .select()
    .single();
    
  if (assetError) throw assetError;
  
  return assetData as MediaAsset;
};

// Function to get public URL for media assets
export const getMediaUrl = (filePath: string) => {
  const { data } = supabase.storage.from('media').getPublicUrl(filePath);
  return data.publicUrl;
};