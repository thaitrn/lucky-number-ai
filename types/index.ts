export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LuckyNumberRequest {
  fullName: string;
  birthDate: string;
  gender: 'male' | 'female';
  age: number;
  houseDirection?: string;
  profession?: string;
}

export interface LuckyNumberResult {
  id: string;
  userId?: string;
  request: LuckyNumberRequest;
  luckyNumbers: number[];
  luckyDays: string[];
  luckyHours: string[];
  luckyColors: string[];
  fengShuiAdvice: string;
  fiveElements: {
    element: string;
    description: string;
  };
  heavenlyStems: {
    stem: string;
    description: string;
  };
  earthlyBranches: {
    branch: string;
    description: string;
  };
  createdAt: Date;
}

export interface Theme {
  theme: 'light' | 'dark' | 'system';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 