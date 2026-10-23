export interface MedicalEvent {
  id: string;
  date: string;
  year: number;
  type: 'emergency' | 'consultation' | 'lab' | 'prescription' | 'surgery';
  title: string;
  hospital: string;
  doctor: string;
  diagnosis: string;
  prescription?: string;
  notes: string;
  reports?: string[];
}

export interface Patient {
  id: string;
  healthId: string;
  name: string;
  nameHindi: string;
  age: number;
  dob: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  address: string;
  photo: string;
  emergencyContact: string;
  emergencyPhone: string;
  allergies: string[];
  criticalConditions: string[];
  currentMedications: { name: string; dose: string; since: string }[];
  history: MedicalEvent[];
}

export const patients: Patient[] = [
  {
    id: 'p1',
    healthId: 'JVS-2847-9142',
    name: 'Rahul Patil',
    nameHindi: 'राहुल पाटिल',
    age: 42,
    dob: '1982-03-15',
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98765 43210',
    address: '14, Shivaji Nagar, Pune, Maharashtra 411005',
    photo: '',
    emergencyContact: 'Sunita Patil (Wife)',
    emergencyPhone: '+91 98765 43211',
    allergies: ['Penicillin', 'Sulfonamides'],
    criticalConditions: ['Hypertension', 'Early-stage Coronary Artery Disease'],
    currentMedications: [
      { name: 'Amlodipine', dose: '5mg once daily', since: '2024-01-10' },
      { name: 'Atorvastatin', dose: '20mg at night', since: '2024-03-05' },
      { name: 'Aspirin', dose: '75mg once daily', since: '2024-03-05' },
    ],
    history: [
      {
        id: 'e1',
        date: '2026-09-18',
        year: 2026,
        type: 'emergency',
        title: 'Chest Pain — Emergency Visit',
        hospital: 'City Hospital, Pune',
        doctor: 'Dr. Anil Sharma',
        diagnosis: 'Angina pectoris, ruled out MI. Elevated troponin.',
        prescription: 'Nitroglycerin SOS, continued Amlodipine',
        notes: 'Patient arrived with chest pain radiating to left arm. ECG showed no acute changes. Troponin slightly elevated. Cardiology follow-up advised.',
        reports: ['ECG Report', 'Troponin Blood Report'],
      },
      {
        id: 'e2',
        date: '2026-03-12',
        year: 2026,
        type: 'consultation',
        title: 'Cardiology Consultation',
        hospital: 'Sahyadri Hospital, Pune',
        doctor: 'Dr. Priya Kulkarni',
        diagnosis: 'Stable Hypertension. CAD monitoring.',
        prescription: 'Continue current medications. Low-sodium diet.',
        notes: 'BP 138/88. Patient responds well to Amlodipine. Echo shows mild LVH. Repeat echo in 6 months.',
        reports: ['Echo Report', 'Lipid Profile'],
      },
      {
        id: 'e3',
        date: '2025-11-02',
        year: 2025,
        type: 'lab',
        title: 'Annual Blood Work',
        hospital: 'SRL Diagnostics, Pune',
        doctor: 'Dr. Meera Joshi',
        diagnosis: 'Elevated LDL. Slightly raised blood sugar.',
        notes: 'Fasting glucose 112. LDL 168. Statin therapy initiated.',
        reports: ['CBC', 'Lipid Panel', 'HbA1c', 'Kidney Function'],
      },
      {
        id: 'e4',
        date: '2025-05-20',
        year: 2025,
        type: 'consultation',
        title: 'General Consultation',
        hospital: 'Apollo Clinic, Pune',
        doctor: 'Dr. Rajesh Nair',
        diagnosis: 'Viral fever. Mild upper respiratory infection.',
        prescription: 'Paracetamol 500mg, Cetirizine, rest',
        notes: 'Temp 101°F. Throat slightly inflamed. Recovered in 5 days.',
      },
      {
        id: 'e5',
        date: '2024-01-10',
        year: 2024,
        type: 'consultation',
        title: 'Hypertension Diagnosis',
        hospital: 'KEM Hospital, Pune',
        doctor: 'Dr. Anil Sharma',
        diagnosis: 'Stage 2 Hypertension. Initiated treatment.',
        prescription: 'Amlodipine 5mg, lifestyle modifications',
        notes: 'BP consistently above 150/95 over 3 readings. Lifestyle counselling provided. Follow-up in 3 months.',
      },
    ],
  },
  {
    id: 'p2',
    healthId: 'JVS-3912-0054',
    name: 'Sneha Joshi',
    nameHindi: 'स्नेहा जोशी',
    age: 29,
    dob: '1997-07-22',
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+91 87654 32109',
    address: '7, Koregaon Park, Pune, Maharashtra 411001',
    photo: '',
    emergencyContact: 'Vikram Joshi (Father)',
    emergencyPhone: '+91 87654 32110',
    allergies: ['NSAIDs'],
    criticalConditions: ['Bronchial Asthma'],
    currentMedications: [
      { name: 'Salbutamol Inhaler', dose: '2 puffs SOS', since: '2022-06-15' },
      { name: 'Budesonide Inhaler', dose: '200mcg twice daily', since: '2023-02-10' },
    ],
    history: [
      {
        id: 'e6',
        date: '2026-08-05',
        year: 2026,
        type: 'emergency',
        title: 'Acute Asthma Attack',
        hospital: 'Ruby Hall Clinic, Pune',
        doctor: 'Dr. Suresh Mehta',
        diagnosis: 'Acute severe asthma exacerbation.',
        prescription: 'Nebulisation with Salbutamol, oral steroids',
        notes: 'SpO2 dropped to 89% on arrival. Nebulised twice. Stabilised at 97%. Discharged after 6 hours observation.',
        reports: ['Chest X-Ray', 'Peak Flow Measurement'],
      },
      {
        id: 'e7',
        date: '2025-12-10',
        year: 2025,
        type: 'consultation',
        title: 'Pulmonology Follow-up',
        hospital: 'Deenanath Mangeshkar Hospital',
        doctor: 'Dr. Anita Desai',
        diagnosis: 'Moderate persistent asthma, well-controlled.',
        notes: 'PFT within acceptable range. Advised to continue ICS. Allergen avoidance counselling.',
        reports: ['Pulmonary Function Test'],
      },
      {
        id: 'e8',
        date: '2022-06-15',
        year: 2022,
        type: 'consultation',
        title: 'Asthma Diagnosis',
        hospital: 'Inlaks and Budhrani Hospital',
        doctor: 'Dr. Suresh Mehta',
        diagnosis: 'Bronchial Asthma — newly diagnosed.',
        prescription: 'Salbutamol inhaler prescribed',
        notes: 'Wheezing since childhood. Spirometry confirms obstructive pattern with reversibility.',
      },
    ],
  },
  {
    id: 'p3',
    healthId: 'JVS-5521-7783',
    name: 'Amit Deshmukh',
    nameHindi: 'अमित देशमुख',
    age: 61,
    dob: '1963-11-03',
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+91 77543 21098',
    address: '22, Model Colony, Shivajinagar, Pune, Maharashtra 411016',
    photo: '',
    emergencyContact: 'Kavita Deshmukh (Wife)',
    emergencyPhone: '+91 77543 21099',
    allergies: ['Metformin (GI intolerance)', 'Shellfish'],
    criticalConditions: ['Type 2 Diabetes Mellitus', 'Hypertension', 'Stage 3 CKD'],
    currentMedications: [
      { name: 'Glipizide', dose: '5mg before meals', since: '2019-05-12' },
      { name: 'Lisinopril', dose: '10mg once daily', since: '2020-01-20' },
      { name: 'Amlodipine', dose: '5mg once daily', since: '2020-01-20' },
      { name: 'Insulin Glargine', dose: '18 units at bedtime', since: '2023-08-01' },
      { name: 'Calcium + Vit D', dose: 'once daily', since: '2022-03-10' },
    ],
    history: [
      {
        id: 'e9',
        date: '2026-10-01',
        year: 2026,
        type: 'lab',
        title: 'Quarterly Diabetes Panel',
        hospital: 'Thyrocare, Pune',
        doctor: 'Dr. Rajesh Nair',
        diagnosis: 'HbA1c 8.2% — above target. eGFR declining.',
        notes: 'Nephrology referral advised. Dietary review required. Insulin dose adjustment considered.',
        reports: ['HbA1c', 'Kidney Function', 'Urine ACR'],
      },
      {
        id: 'e10',
        date: '2026-05-14',
        year: 2026,
        type: 'consultation',
        title: 'Nephrology Consultation',
        hospital: 'Jehangir Hospital, Pune',
        doctor: 'Dr. Kavitha Rao',
        diagnosis: 'CKD Stage 3b — stable. Hypertension management reviewed.',
        notes: 'eGFR 38. Protein in urine. Stricter BP control required. Advised low-protein diet.',
        reports: ['24hr Urine Protein', 'Renal Ultrasound'],
      },
      {
        id: 'e11',
        date: '2023-08-01',
        year: 2023,
        type: 'consultation',
        title: 'Endocrinology — Insulin Initiation',
        hospital: 'Sahyadri Hospital',
        doctor: 'Dr. Priya Kulkarni',
        diagnosis: 'Uncontrolled T2DM. Insulin therapy initiated.',
        prescription: 'Insulin Glargine 18 units bedtime',
        notes: 'Oral agents insufficient. HbA1c was 10.4%. Insulin training provided to patient and wife.',
      },
      {
        id: 'e12',
        date: '2019-05-12',
        year: 2019,
        type: 'consultation',
        title: 'Diabetes Diagnosis',
        hospital: 'KEM Hospital, Pune',
        doctor: 'Dr. Anil Sharma',
        diagnosis: 'Type 2 Diabetes Mellitus. Fasting glucose 248.',
        prescription: 'Metformin 500mg (later changed due to GI intolerance)',
        notes: 'BMI 28.4. Lifestyle counselling. Dietary modifications advised.',
      },
    ],
  },
];

export const getPatientByHealthId = (healthId: string) =>
  patients.find((p) => p.healthId === healthId);

export const getPatientById = (id: string) =>
  patients.find((p) => p.id === id);
