export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  hospital: string;
  qualification: string;
  experience: number;
  phone: string;
  status: 'available' | 'busy' | 'offline';
  nextAvailable: string;
  todayPatients: number;
  emergencyCases: number;
}

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Anil Sharma',
    specialty: 'Cardiology',
    department: 'Cardiology',
    hospital: 'City Hospital, Pune',
    qualification: 'MBBS, MD, DM (Cardiology)',
    experience: 18,
    phone: '+91 98001 12345',
    status: 'available',
    nextAvailable: 'Now',
    todayPatients: 12,
    emergencyCases: 2,
  },
  {
    id: 'd2',
    name: 'Dr. Priya Kulkarni',
    specialty: 'Endocrinology',
    department: 'Medicine',
    hospital: 'Sahyadri Hospital, Pune',
    qualification: 'MBBS, MD (Medicine), DM (Endocrinology)',
    experience: 14,
    phone: '+91 98001 23456',
    status: 'busy',
    nextAvailable: '4:30 PM',
    todayPatients: 18,
    emergencyCases: 1,
  },
  {
    id: 'd3',
    name: 'Dr. Suresh Mehta',
    specialty: 'Pulmonology',
    department: 'Respiratory Medicine',
    hospital: 'Ruby Hall Clinic, Pune',
    qualification: 'MBBS, MD (Chest & TB)',
    experience: 22,
    phone: '+91 98001 34567',
    status: 'available',
    nextAvailable: 'Now',
    todayPatients: 9,
    emergencyCases: 0,
  },
  {
    id: 'd4',
    name: 'Dr. Kavitha Rao',
    specialty: 'Nephrology',
    department: 'Nephrology',
    hospital: 'Jehangir Hospital, Pune',
    qualification: 'MBBS, MD, DM (Nephrology)',
    experience: 11,
    phone: '+91 98001 45678',
    status: 'busy',
    nextAvailable: '5:00 PM',
    todayPatients: 14,
    emergencyCases: 3,
  },
  {
    id: 'd5',
    name: 'Dr. Rajesh Nair',
    specialty: 'General Medicine',
    department: 'General Medicine',
    hospital: 'Apollo Clinic, Pune',
    qualification: 'MBBS, MD (General Medicine)',
    experience: 9,
    phone: '+91 98001 56789',
    status: 'available',
    nextAvailable: 'Now',
    todayPatients: 21,
    emergencyCases: 0,
  },
  {
    id: 'd6',
    name: 'Dr. Meera Joshi',
    specialty: 'Pathology',
    department: 'Diagnostics',
    hospital: 'SRL Diagnostics, Pune',
    qualification: 'MBBS, MD (Pathology)',
    experience: 7,
    phone: '+91 98001 67890',
    status: 'offline',
    nextAvailable: 'Tomorrow 9:00 AM',
    todayPatients: 0,
    emergencyCases: 0,
  },
];

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientHealthId: string;
  doctorId: string;
  doctorName: string;
  department: string;
  hospital: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'emergency' | 'lab' | 'procedure';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
}

export const appointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Rahul Patil',
    patientHealthId: 'JVS-2847-9142',
    doctorId: 'd1',
    doctorName: 'Dr. Anil Sharma',
    department: 'Cardiology',
    hospital: 'City Hospital, Pune',
    date: '2026-10-28',
    time: '10:30 AM',
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Post-emergency cardiology follow-up',
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Sneha Joshi',
    patientHealthId: 'JVS-3912-0054',
    doctorId: 'd3',
    doctorName: 'Dr. Suresh Mehta',
    department: 'Respiratory Medicine',
    hospital: 'Ruby Hall Clinic',
    date: '2026-10-24',
    time: '11:00 AM',
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Asthma routine review',
  },
  {
    id: 'a3',
    patientId: 'p3',
    patientName: 'Amit Deshmukh',
    patientHealthId: 'JVS-5521-7783',
    doctorId: 'd4',
    doctorName: 'Dr. Kavitha Rao',
    department: 'Nephrology',
    hospital: 'Jehangir Hospital',
    date: '2026-10-25',
    time: '3:00 PM',
    type: 'consultation',
    status: 'scheduled',
    notes: 'Quarterly CKD monitoring',
  },
];

export interface AccessLogEntry {
  id: string;
  accessedBy: string;
  role: string;
  hospital: string;
  type: 'Emergency Access' | 'Medical Record Access' | 'Lab Report Access' | 'Prescription Access';
  dateTime: string;
  patientId: string;
  canRevoke: boolean;
}

export const accessLogs: AccessLogEntry[] = [
  {
    id: 'log1',
    accessedBy: 'Dr. Anil Sharma',
    role: 'Cardiologist',
    hospital: 'City Hospital, Pune',
    type: 'Emergency Access',
    dateTime: 'Today, 3:42 PM',
    patientId: 'p1',
    canRevoke: false,
  },
  {
    id: 'log2',
    accessedBy: 'Dr. Priya Kulkarni',
    role: 'Endocrinologist',
    hospital: 'Sahyadri Hospital',
    type: 'Medical Record Access',
    dateTime: 'Yesterday, 11:15 AM',
    patientId: 'p1',
    canRevoke: true,
  },
  {
    id: 'log3',
    accessedBy: 'SRL Diagnostics Lab System',
    role: 'Diagnostic Lab',
    hospital: 'SRL Diagnostics, Pune',
    type: 'Lab Report Access',
    dateTime: '3 days ago',
    patientId: 'p1',
    canRevoke: true,
  },
];

export const aiSummaries: Record<string, string> = {
  p1: `Patient has a 2-year history of hypertension currently managed with Amlodipine 5mg and Atorvastatin. Known severe allergy to Penicillin and Sulfonamides — avoid entirely. Recent emergency visit (Sep 2026) for chest pain showed slightly elevated troponin with no acute MI. Underlying Coronary Artery Disease noted. Cardiologist monitoring ongoing. Current BP response is adequate. Exercise and sodium restriction advised.`,
  p2: `29-year-old female with moderate persistent bronchial asthma, well-controlled on ICS therapy. NSAID allergy documented — avoid aspirin, ibuprofen, diclofenac. Recent acute exacerbation (Aug 2026) resolved with nebulisation. Spirometry shows obstructive pattern with reversibility. Regular pulmonology follow-up. No other significant conditions.`,
  p3: `61-year-old male with complex multi-system disease: Type 2 Diabetes (HbA1c 8.2%, on insulin), Stage 2 Hypertension, and Stage 3b CKD (eGFR 38). Metformin intolerant — avoid. Current regimen: Glipizide + Insulin Glargine + Lisinopril + Amlodipine. Nephrology under active monitoring. Declining renal function — dose-adjust all renally cleared medications. Shellfish allergy noted.`,
};
