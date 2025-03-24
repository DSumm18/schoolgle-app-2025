export interface TrustData {
  trustId: string;
  trustName: string;
  address: string;
  postcode: string;
  contactEmail: string;
  contactPhone: string;
  numberOfSchools: number;
  totalPupils: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SchoolData {
  schoolId: string;
  trustId: string;
  schoolName: string;
  address: string;
  postcode: string;
  contactEmail: string;
  contactPhone: string;
  headteacherName: string;
  headteacherEmail: string;
  schoolType: 'primary' | 'secondary' | 'other';
  numberOfPupils: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImportPreviewData {
  trust?: Partial<TrustData>;
  schools?: Partial<SchoolData>[];
  errors?: {
    row: number;
    field: string;
    message: string;
  }[];
}

export interface ImportResult {
  success: boolean;
  message: string;
  errors?: {
    row: number;
    field: string;
    message: string;
  }[];
  data?: {
    trust?: TrustData;
    schools?: SchoolData[];
  };
}