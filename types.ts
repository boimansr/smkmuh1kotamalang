
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  username: string;
  // Role specific fields
  nisn?: string;
  nip?: string;
  majorId?: string;
  className?: string;
  subjects?: string[];
  status?: 'Active' | 'On Leave' | 'Graduated';
}

export interface Major {
  id: string;
  name: string;
  code: string;
  description: string;
  curriculum: string[];
  headOfDepartment: string;
}

export interface Attendance {
  id: string;
  userId: string;
  date: string;
  status: 'Present' | 'Late' | 'Absent' | 'Permission';
  checkInTime?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Exam' | 'Event' | 'General';
  author: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  score?: number;
}

export interface PKLCompany {
  id: string;
  name: string;
  industry: string;
  location: string;
  slots: number;
  available: boolean;
}
