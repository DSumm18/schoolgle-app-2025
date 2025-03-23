// This is a placeholder file that will be replaced with a real Supabase client in the future
// Currently it provides type definitions and mock functions to allow the code to compile

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

// Mock function for getting school data
export const getSchoolData = async (schoolId: string): Promise<School> => {
  // Mock data
  return {
    id: schoolId,
    name: "Example School",
    logo_url: "",
    primary_color: "#3B82F6",
    secondary_color: "#10B981",
    created_at: new Date().toISOString(),
    trust_id: "trust-123"
  };
};

// Mock function for getting widgets
export const getSchoolWidgets = async (schoolId: string): Promise<IntranetWidget[]> => {
  // Mock data
  return [
    { 
      id: "widget-1", 
      school_id: schoolId, 
      type: 'video', 
      title: 'School Highlights', 
      content: 'https://example.com/school-video.mp4',
      position: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { 
      id: "widget-2", 
      school_id: schoolId, 
      type: 'image', 
      title: 'School Gallery', 
      content: '',
      position: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { 
      id: "widget-3", 
      school_id: schoolId, 
      type: 'text', 
      title: 'Principal\'s Message', 
      content: 'Welcome to our school! We are committed to providing an excellent education for all students...',
      position: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
};

// Mock function for updating widget positions
export const updateWidgetPositions = async (widgets: Pick<IntranetWidget, 'id' | 'position'>[]) => {
  console.log('Would update widget positions:', widgets);
  return widgets;
};

// Mock function for getting a media URL
export const getMediaUrl = (filePath: string) => {
  return `https://example.com/media/${filePath}`;
};

// Mock Supabase client
export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: {}, error: null }),
        order: () => ({ data: [], error: null })
      }),
      order: () => ({ data: [], error: null })
    }),
    upsert: async () => ({ data: [], error: null }),
    insert: () => ({ select: () => ({ single: async () => ({ data: {}, error: null }) }) })
  }),
  storage: {
    from: () => ({
      upload: async () => ({ data: {}, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: 'https://example.com/placeholder.jpg' } })
    })
  }
};