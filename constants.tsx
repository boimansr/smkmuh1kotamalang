import React from 'react';
import { 
  Code, 
  Settings, 
  Camera, 
  CreditCard, 
  Briefcase, 
  Cpu,
  // Fixed: Renamed to UserIcon to avoid duplicate identifier with User type
  User as UserIcon,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Award,
  Bell
} from 'lucide-react';
import { Major, UserRole, User, Announcement, Assignment, PKLCompany } from './types';

export const MAJORS: Major[] = [
  {
    id: 'm1',
    code: 'RPL',
    name: 'Software Engineering',
    description: 'Focused on programming, software development, and database systems.',
    curriculum: ['Web Development', 'Mobile Dev', 'Java Programming', 'Database Systems'],
    headOfDepartment: 'Budi Santoso, M.Kom'
  },
  {
    id: 'm2',
    code: 'TKJ',
    name: 'Computer & Network Engineering',
    description: 'Learn about server configuration, network infrastructure, and cybersecurity.',
    curriculum: ['Network Admin', 'Cisco Systems', 'Linux Server', 'Cybersecurity'],
    headOfDepartment: 'Dedi Kurniawan, S.T'
  },
  {
    id: 'm3',
    code: 'MM',
    name: 'Multimedia',
    description: 'Visual communication design, video production, and 3D animation.',
    curriculum: ['Video Editing', 'Photography', 'UI/UX Design', '3D Modeling'],
    headOfDepartment: 'Laras Ati, M.Ds'
  },
  {
    id: 'm4',
    code: 'AKL',
    name: 'Accounting & Finance',
    description: 'Financial management, taxation, and corporate auditing.',
    curriculum: ['Basic Accounting', 'Financial Statements', 'Tax Law', 'MYOB'],
    headOfDepartment: 'Siti Aminah, S.E'
  },
  {
    id: 'm5',
    code: 'OTKP',
    name: 'Office Management',
    description: 'Modern office administration and human resource management.',
    curriculum: ['Public Relations', 'Document Control', 'Business Corresp.', 'HRM'],
    headOfDepartment: 'Rina Wijaya, M.Pd'
  },
  {
    id: 'm6',
    code: 'TKRO',
    name: 'Automotive Engineering',
    description: 'Vehicle maintenance, engine repair, and automotive electronics.',
    curriculum: ['Engine Overhaul', 'Chassis Repair', 'Electrical Systems', 'Auto EFI'],
    headOfDepartment: 'Agus Salim, S.T'
  }
];

export const MOCK_STUDENT: User = {
  id: 'u1',
  name: 'Bagus Prayoga',
  username: 'bagus123',
  email: 'bagus@student.edupro.sch.id',
  role: UserRole.STUDENT,
  avatar: 'https://picsum.photos/seed/bagus/200',
  nisn: '0054321987',
  majorId: 'm1',
  className: 'XII RPL 1',
  status: 'Active'
};

export const MOCK_TEACHER: User = {
  id: 'u2',
  name: 'Anita Widjaja',
  username: 'anita_teacher',
  email: 'anita@teacher.edupro.sch.id',
  role: UserRole.TEACHER,
  avatar: 'https://picsum.photos/seed/anita/200',
  nip: '198804052012012001',
  subjects: ['Web Development', 'UI/UX Design'],
  status: 'Active'
};

export const MOCK_ADMIN: User = {
  id: 'u3',
  name: 'System Admin',
  username: 'admin',
  email: 'admin@edupro.sch.id',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/admin/200',
  status: 'Active'
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Mid-Term Exam Schedule Released',
    content: 'The UTS for Semester 5 will be held from Oct 15 - Oct 22. Please download the schedule.',
    date: '2024-10-01',
    category: 'Exam',
    author: 'Admin Kurikulum'
  },
  {
    id: 'a2',
    title: 'Career Fair 2024',
    content: 'Join us next week for the annual Career Fair with 20+ industry partners.',
    date: '2024-10-05',
    category: 'Event',
    author: 'Hubungan Industri'
  }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'as1', title: 'React State Management', subject: 'Web Dev', dueDate: '2024-10-10', status: 'Pending' },
  { id: 'as2', title: 'Network Topology Design', subject: 'Networking', dueDate: '2024-10-12', status: 'Submitted' },
  { id: 'as3', title: 'UI/UX Case Study', subject: 'Multimedia', dueDate: '2024-10-15', status: 'Graded', score: 95 }
];

export const COMPANIES: PKLCompany[] = [
  { id: 'c1', name: 'Telkom Indonesia', industry: 'Telecommunications', location: 'Jakarta', slots: 5, available: true },
  { id: 'c2', name: 'Gojek Tech', industry: 'Software', location: 'Remote', slots: 3, available: true },
  { id: 'c3', name: 'Astra International', industry: 'Automotive', location: 'Bekasi', slots: 10, available: false }
];