import React, { useState } from 'react';
import { Pill, Info, Clock, User, Calendar, Bell, Edit, Settings, Check, Gift, LogOut, Trash2, AlertTriangle, Send, ChevronLeft, Phone, MapPin, Droplet, Cake, Star, Activity, Plus, X, BookOpen, Search, Mic } from 'lucide-react';

// Medicine dictionary data
const medicineDictionary = [
  {
    id: 1,
    name: 'Paracetamol',
    category: 'Analgesic & Antipyretic',
    purpose: 'Purpose: Analgesic (pain relief) and Antipyretic (fever reducer).',
    indication: 'Indication: Mild to moderate pain, fever',
    constraindications: 'Contra: Severe liver impairment allergy',
    effects: 'Side Effects: Generally well-tolerated; large doses can cause liver damage (hepatotoxicity).',
    dose: 'Dose: 325 mg to 1000 mg every 4–6 hours (max 4000 mg/day).'
  },
  {
    id: 2,
    name: 'Amoxicillin',
    category: 'Antibiotic',
    purpose: 'Purpose: NSAID (at high doses); Antiplatelet (at low doses).',
    indication: 'Indication: Pain, fever, inflammation; prevention of heart attack/stroke (low dose).',
    constraindications: 'Contra: Children (Reyes syndrome risk), active GI bleed, allergy to NSAIDs.',
    effects: 'Side Effects: Bleeding, GI ulcers, tinnitus (ringing in ears).',
    dose: 'Dose: 81 mg/day (cardiac); 325–650 mg every 4–6 hours (pain/fever).'
  },
  {
    id: 3,
    name: 'Metformin',
    category: 'Antidiabetic',
    purpose: 'Purpose: Biguanide; lowers blood glucose production by the liver.',
    indication: 'Indication: Type 2 Diabetes Mellitus.',
    constraindications: 'Contra: Severe kidney impairment, metabolic acidosis, congestive heart failure requiring medication.',
    effects: 'Side Effects: Diarrhea, nausea, vomiting, abdominal discomfort; Lactic Acidosis (rare but serious).',
    dose: 'Dose: 500 mg to 1000 mg one to three times daily.'
  },
  {
    id: 4,
    name: 'Amlodipine',
    category: 'Antihypertensive',
    purpose: 'Purpose: Calcium Channel Blocker (CCB).',
    indication: 'Indication: Hypertension (high blood pressure), Chronic stable angina (chest pain).',
    constraindications: 'Contra: Severe hypotension, cardiogenic shock.',
    effects: 'Effects: Edema (swelling, especially in ankles), headache, fatigue, flushing.',
    dose: 'Dose: 2.5 mg to 10 mg once daily.'
  },
  {
    id: 5,
    name: 'Ibuprofen',
    category: 'Anti-inflammatory',
    purpose: 'Purpose: Nonsteroidal Anti-Inflammatory Drug (NSAID). Analgesic, Anti-inflammatory, Antipyretic.',
    indication: 'Indication: Mild to moderate pain, inflammation (arthritis), fever.',
    constraindications: 'Contra: GI bleeding/ulcers, severe heart failure, third-trimester pregnancy.',
    effects: 'Side Effects: GI upset/ulcers, dizziness, fluid retention, increased risk of heart attack/stroke.',
    dose: 'Dose: 200 mg to 800 mg every 4–8 hours.'
  },
  {
    id: 6,
    name: 'Omeprazole',
    category: 'Proton Pump Inhibitor',
    purpose: 'Purpose: Proton Pump Inhibitor (PPI).',
    indication: 'Indication: Gastroesophageal Reflux Disease (GERD), ulcers, erosive esophagitis.',
    constraindications: 'Contra: Hypersensitivity.',
    effects: 'Side Effects: Headache, diarrhea, nausea, long-term use linked to risk of bone fracture, low magnesium.',
    dose: 'Dose: 20 mg to 40 mg once daily.'
  },
  {
    id: 7,
    name: 'Aspirin',
    category: 'Antiplatelet',
    purpose: 'Purpose: NSAID (at high doses); Antiplatelet (at low doses).',
    indication: 'Indication: Pain, fever, inflammation; prevention of heart attack/stroke (low dose).',
    constraindications: 'Contra: Children (Reyes syndrome risk), active GI bleed, allergy to NSAIDs.',
    effects: 'Side Effects: Bleeding, GI ulcers, tinnitus (ringing in ears).',
    dose: 'Dose: 81 mg/day (cardiac); 325–650 mg every 4–6 hours (pain/fever).'
  },
  {
    id: 8,
    name: 'Cetirizine',
    category: 'Antihistamine',
    purpose: 'Purpose: Second-generation Antihistamine.',
    indication: 'Indication: Allergic rhinitis (hay fever), chronic urticaria (hives).',
    constraindications: 'Contra: Hypersensitivity, severe kidney impairment.',
    effects: 'Side Effects: Drowsiness (less than first-generation), fatigue, dry mouth.',
    dose: 'Dose: 5 mg to 10 mg once daily.'
  },
  {
    id: 9,
    name: 'Losartan',
    category: 'Antihypertensive',
    purpose: 'Purpose: Angiotensin II Receptor Blocker (ARB).',
    indication: 'Indication: Hypertension, stroke risk reduction in hypertensive patients with left ventricular hypertrophy.',
    constraindications: 'Contra: Pregnancy (can cause fetal harm), hypersensitivity.',
    effects: 'Side Effects: Dizziness, upper respiratory infection, angioedema (swelling of face/throat).',
    dose: 'Dose: 25 mg to 100 mg once daily.'
  },
  {
    id: 10,
    name: 'Atorvastatin',
    category: 'Statin',
    purpose: 'Purpose: HMG-CoA Reductase Inhibitor (Statin).',
    indication: 'Indication: Hypercholesterolemia (high cholesterol), prevention of cardiovascular events.',
    constraindications: 'Contra: Active liver disease, pregnancy/breastfeeding.',
    effects: 'Side Effects: Muscle pain (myalgia), headache, joint pain, rare risk of liver damage or muscle breakdown (Rhabdomyolysis).',
    dose: 'Dose: 10 mg to 80 mg once daily.'
  }
];

// Demo doctors data
const demoDoctors = [
  {
    id: 1,
    name: 'Dr. Jasmine Dela Cruz',
    specialty: 'Pediatrician',
    location: 'San Vicente, Biñan, Laguna',
    distance: '2 KM',
    wait: '10 Mins',
    description: "Dr. Jasmine Dela Cruz is a highly-rated pediatrician specializing in childhood vaccines, growth and development, and common pediatric illnesses. She completed her residency at Philippine General Hospital and is affiliated with St. Cabrini Medical Center.",
    rating: 4.8
  },
  {
    id: 2,
    name: 'Dr. Denise Smith',
    specialty: 'Endocrinologist',
    location: 'Orchid Street, Biñan, Laguna',
    distance: '5 KM',
    wait: '20 Mins',
    description: "Dr. Denise Smith is a renowned endocrinologist specializing in diabetes, metabolic disorders, and hormonal imbalances. She earned her medical degree from Harvard Medical School and completed her residency in internal medicine at Johns Hopkins Hospital, followed by a fellowship in endocrinology at the Mayo Clinic.",
    rating: 4.9
  },
  {
    id: 3,
    name: 'Dr. Zambas Santos',
    specialty: 'Cardiologist',
    location: 'Tubigan Road, Biñan, Laguna',
    distance: '4 KM',
    wait: '17 Mins',
    description: "Dr. Zambas Santos is a board-certified cardiologist with over 15 years of experience treating heart disease, hypertension, and cardiovascular conditions. She graduated from University of the Philippines College of Medicine and completed her cardiology fellowship at Texas Heart Institute.",
    rating: 4.7
  },
  {
    id: 4,
    name: 'Dr. Zabala Torres',
    specialty: 'General Practitioner',
    location: 'Santo Tomas, Biñan, Laguna',
    distance: '6 KM',
    wait: '28 Mins',
    description: "Dr. Zabala Torres is a trusted family doctor providing comprehensive primary care for patients of all ages. She specializes in preventive medicine, chronic disease management, and routine health screenings. She is known for her compassionate bedside manner and thorough approach to patient care.",
    rating: 4.6
  }
];

export default function MedicineTracker() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);
  const [showDoctorLogin, setShowDoctorLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  
  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (loginForm.username === 'jasmine' && loginForm.password === 'denise') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
      setLoginForm({ username: '', password: '' });
    }
  };
  
  // Handle doctor login
  const handleDoctorLogin = (e) => {
    e.preventDefault();
    
    if (loginForm.username === 'jasmine' && loginForm.password === 'zabala') {
      setIsDoctorLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
      setLoginForm({ username: '', password: '' });
    }
  };
  
  // Doctor logout
  const handleDoctorLogout = () => {
    setIsDoctorLoggedIn(false);
    setShowDoctorLogin(false);
    setActiveTab('home');
    setLoginForm({ username: '', password: '' });
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
    setShowAccountDetails(false);
    setLoginForm({ username: '', password: '' });
  };
  
  const [medicines, setMedicines] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showSymptomsTracker, setShowSymptomsTracker] = useState(false);
  const [showMedicineDictionary, setShowMedicineDictionary] = useState(false);
  const [medicineSearchTerm, setMedicineSearchTerm] = useState('');
  
  // Symptoms tracker state
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: 'Fever', checked: false, custom: false },
    { id: 2, name: 'Tiredness', checked: false, custom: false },
    { id: 3, name: 'Dry cough', checked: false, custom: false },
    { id: 4, name: 'Loss of taste or smell', checked: false, custom: false },
    { id: 5, name: 'Aches and pain', checked: false, custom: false },
    { id: 6, name: 'Sore throat', checked: false, custom: false },
    { id: 7, name: 'Conjuctivitis', checked: false, custom: false },
    { id: 8, name: 'Headache', checked: false, custom: false },
    { id: 9, name: 'Nausea', checked: false, custom: false },
    { id: 10, name: 'Diarrhea', checked: false, custom: false },
    { id: 11, name: 'Shortness of breath', checked: false, custom: false }
  ]);
  
  const [newSymptom, setNewSymptom] = useState('');
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // Save symptoms and show toast
  const saveSymptoms = () => {
    setShowSuccessToast(true);
    // Hide toast after 2 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2000);
  };
  
  // Toggle symptom
  const toggleSymptom = (id) => {
    setSymptoms(prev => prev.map(symptom => 
      symptom.id === id ? { ...symptom, checked: !symptom.checked } : symptom
    ));
  };
  
  // Add custom symptom
  const addCustomSymptom = () => {
    if (newSymptom.trim()) {
      const newSymptomObj = {
        id: Date.now(),
        name: newSymptom.trim(),
        checked: false,
        custom: true
      };
      setSymptoms(prev => [...prev, newSymptomObj]);
      setNewSymptom('');
      setShowAddSymptom(false);
    }
  };
  
  // Delete custom symptom
  const deleteCustomSymptom = (id) => {
    setSymptoms(prev => prev.filter(symptom => symptom.id !== id));
  };
  
  // Calendar state
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  
  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    type: 'Check Up',
    doctor: '',
    date: '',
    time: '',
    comments: ''
  });
  
  // Handle appointment form submission
  const handleSetAppointment = (e) => {
    e.preventDefault();
    
    if (!appointmentForm.date || !appointmentForm.time) {
      alert('Please select both date and time');
      return;
    }
    
    if (!appointmentForm.doctor) {
      alert('Please select a doctor');
      return;
    }
    
    const newAppointment = {
      id: Date.now(),
      type: appointmentForm.type,
      doctor: appointmentForm.doctor,
      date: appointmentForm.date,
      time: appointmentForm.time,
      comments: appointmentForm.comments
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    
    // Reset form
    setAppointmentForm({
      type: 'Check Up',
      doctor: '',
      date: '',
      time: '',
      comments: ''
    });
    
    setShowAppointmentForm(false);
    
    // Switch view to the Bell tab
    setActiveTab('bell');
  };
  
  // Get calendar data
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };
  
  // Demo user data
  const demoUser = {
    name: 'Jasmine Denise',
    dateOfBirth: '06 November 2004',
    phoneNumber: '+55 555 5555',
    bloodType: 'O+',
    city: 'Laguna, Philippines'
  };
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    lastTaken: '',
    nextDue: '',
    instruction: '',
    color: 'red'
  });
  
  // Common medicine database for search
  const medicineDatabase = [
    // Existing Medicines
    'Allopurinol', 'Eltroxin', 'Ibuprofen', 'Paracetamol', 'Aspirin',
    'Metformin', 'Lisinopril', 'Levothyroxine', 'Atorvastatin', 'Amlodipine',
    'Omeprazole', 'Simvastatin', 'Losartan', 'Gabapentin', 'Hydrochlorothiazide',
    
    // Cardiovascular Agents
    'Atenolol', 'Metoprolol', 'Rosuvastatin', 'Pravastatin', 'Ezetimibe',
    'Valsartan', 'Carvedilol', 'Clopidogrel', 'Warfarin', 'Rivaroxaban',
    'Apixaban', 'Furosemide', 'Spironolactone', 'Triamterene', 'Diltiazem',
    'Verapamil', 'Hydralazine', 'Ramipril', 'Enalapril', 'Benazepril',
    'Telmisartan', 'Olmesartan', 'Digoxin', 'Amiodarone', 'Nitroglycerin',
    'Isosorbide Mononitrate', 'Doxazosin', 'Nebivolol', 'Labetalol',
    'Bisoprolol', 'Candesartan', 'Chlorthalidone',
    
    // Central Nervous System Agents
    'Sertraline', 'Escitalopram', 'Fluoxetine', 'Bupropion', 'Trazodone',
    'Citalopram', 'Venlafaxine', 'Duloxetine', 'Amitriptyline', 'Alprazolam',
    'Clonazepam', 'Lorazepam', 'Diazepam', 'Zolpidem', 'Quetiapine',
    'Aripiprazole', 'Risperidone', 'Lamotrigine', 'Topiramate', 'Pregabalin',
    'Cyclobenzaprine', 'Tramadol', 'Oxycodone', 'Hydrocodone/Acetaminophen',
    'Codeine/Acetaminophen', 'Meloxicam', 'Naproxen', 'Celecoxib',
    'Methylphenidate', 'Lisdexamfetamine', 'Tizanidine', 'Baclofen',
    'Hydroxyzine', 'Buspirone', 'Phenytoin', 'Divalproex', 'Lithium',
    'Donepezil', 'Memantine',
    
    // Anti-infective Agents
    'Amoxicillin', 'Azithromycin', 'Doxycycline', 'Cephalexin', 'Ciprofloxacin',
    'Metronidazole', 'Trimethoprim/Sulfamethoxazole', 'Amoxicillin/Clavulanate',
    'Clindamycin', 'Levofloxacin', 'Penicillin V Potassium', 'Mupirocin',
    'Fluconazole', 'Valacyclovir', 'Acyclovir', 'Oseltamivir',
    
    // Respiratory and Allergy Agents
    'Albuterol', 'Fluticasone', 'Montelukast', 'Cetirizine', 'Loratadine',
    'Diphenhydramine', 'Fluticasone/Salmeterol', 'Budesonide/Formoterol',
    'Ipratropium', 'Tiotropium', 'Theophylline',
    
    // Gastrointestinal Agents
    'Pantoprazole', 'Esomeprazole', 'Ranitidine', 'Famotidine', 'Ondansetron',
    'Promethazine', 'Lansoprazole', 'Metoclopramide', 'Dicyclomine',
    'Lactulose', 'Polyethylene Glycol', 'Senna',
    
    // Endocrine and Metabolic Agents
    'Glipizide', 'Glimepiride', 'Pioglitazone', 'Insulin Glargine', 'Insulin Lispro',
    'Semaglutide', 'Dapagliflozin', 'Empagliflozin', 'Sitagliptin', 'Estradiol',
    'Ethinyl Estradiol/Norethindrone', 'Conjugated Estrogen', 'Prednisone',
    'Methylprednisolone', 'Alendronate', 'Folic Acid', 'Ergocalciferol',
    'Potassium Chloride', 'Ferrous Sulfate', 'Finasteride', 'Tamsulosin'
  ];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Filter medicines based on search
  const filteredMedicines = medicineDatabase.filter(med =>
    med.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle medicine search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
    setShowSuggestions(true);
  };
  
  // Select medicine from suggestions
  const selectMedicine = (medicineName) => {
    setSearchTerm(medicineName);
    setFormData(prev => ({
      ...prev,
      name: medicineName
    }));
    setShowSuggestions(false);
  };
  
  // Add new medicine
  const handleAddMedicine = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dosage) {
      alert('Please fill in at least Medicine Name and Dosage');
      return;
    }
    
    const newMedicine = {
      id: Date.now(),
      ...formData
    };
    
    setMedicines(prev => [...prev, newMedicine]);
    
    // Reset form
    setFormData({
      name: '',
      dosage: '',
      lastTaken: '',
      nextDue: '',
      instruction: '',
      color: 'red'
    });
    setSearchTerm('');
    
    // Switch to home tab to see the new medicine
    setActiveTab('home');
  };
  
  // Delete medicine
  const deleteMedicine = (id) => {
    setMedicines(prev => prev.filter(med => med.id !== id));
  };
  
  // Mark medicine as taken (with animation)
  const [completingId, setCompletingId] = useState(null);
  
  const markAsTaken = (id) => {
    setCompletingId(id);
    // Wait for animation then remove
    setTimeout(() => {
      deleteMedicine(id);
      setCompletingId(null);
    }, 500);
  };
  
  // Mark appointment as complete (with animation)
  const [completingAppointmentId, setCompletingAppointmentId] = useState(null);
  
  const markAppointmentComplete = (id) => {
    setCompletingAppointmentId(id);
    // Wait for animation then remove
    setTimeout(() => {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
      setCompletingAppointmentId(null);
    }, 500);
  };

  const colorClasses = {
    red: 'border-l-red-600 bg-red-50',
    orange: 'border-l-orange-500 bg-orange-50',
    brown: 'border-l-amber-700 bg-amber-50'
  };

  const colorTextClasses = {
    red: 'text-red-600',
    orange: 'text-orange-500',
    brown: 'text-amber-700'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-700 flex items-center justify-center p-4">
      {!isLoggedIn && !isDoctorLoggedIn && !showDoctorLogin ? (
        /* Main Login Page */
        <div className="w-full max-w-md bg-gradient-to-b from-red-600 to-red-700 rounded-3xl shadow-2xl overflow-hidden p-8" style={{ minHeight: '600px' }}>
          <div className="flex flex-col items-center justify-center h-full">
            {/* Logo - MediCheck Text */}
            <div className="mb-8 text-center">
              <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
                MediCheck
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-0.5 w-16 bg-white"></div>
                <Pill className="w-8 h-8 text-white" strokeWidth={2.5} />
                <div className="h-0.5 w-16 bg-white"></div>
              </div>
              <p className="text-white text-sm font-light tracking-wide opacity-90">
                Your Personal Health Companion
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-full space-y-4">
              {/* Username */}
              <div>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Username"
                  className="w-full px-6 py-4 rounded-full text-gray-700 placeholder-gray-400 font-medium focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Password"
                  className="w-full px-6 py-4 rounded-full text-gray-700 placeholder-gray-400 font-medium focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="text-white text-center text-sm font-semibold bg-red-800 bg-opacity-50 py-2 rounded-full">
                  {loginError}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-white text-red-600 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Login
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 text-center">
              <p className="text-white text-xs font-semibold mb-1">Demo Credentials:</p>
              <p className="text-white text-xs opacity-90">Username: jasmine | Password: denise</p>
            </div>

            {/* Additional Login Buttons */}
            <div className="mt-8 w-full flex gap-3">
              <button 
                onClick={() => setShowDoctorLogin(true)}
                type="button"
                className="flex-1 bg-white text-red-600 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md"
              >
                Doctor Login
              </button>
              <button 
                type="button"
                className="flex-1 bg-white text-red-600 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md"
              >
                Medical Centre Login
              </button>
            </div>
          </div>
        </div>
      ) : isDoctorLoggedIn ? (
        /* Doctor Interface */
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: '600px', maxHeight: '90vh' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
            <h1 className="text-2xl font-bold tracking-wide">Upcoming Appointments</h1>
          </div>

          {/* Content Area */}
          <div className="overflow-y-auto" style={{ height: 'calc(90vh - 180px)', maxHeight: '500px' }}>
            {activeTab === 'home' && (
              <div className="p-6">
                {/* Appointments List */}
                {appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No upcoming appointments</p>
                    <p className="text-gray-400 text-sm mt-2">Appointments will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-500"
                      >
                        <div className="flex items-start gap-3">
                          {/* Circle Checkbox */}
                          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 mt-1"></div>
                          
                          {/* Appointment Details */}
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                              {apt.type}
                            </h3>
                            
                            {apt.doctor && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                <User className="w-4 h-4" />
                                <span>{apt.doctor}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(apt.date).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{apt.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Doctor Calendar View */}
            {activeTab === 'calendar' && (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-8 h-8 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Schedule</h2>
                </div>

                {/* Calendar Placeholder */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 mb-6 text-center">
                  <Calendar className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-semibold text-lg mb-2">Calendar View</p>
                  <p className="text-gray-500 text-sm">Your weekly schedule and appointments</p>
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 mb-4">
                  <h3 className="font-bold text-gray-800 mb-3">Today's Schedule</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-gray-600">09:00 - 10:00</span>
                      <span className="text-gray-800 font-medium">Patient Consultation</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-gray-600">10:30 - 11:00</span>
                      <span className="text-gray-800 font-medium">Follow-up Review</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">14:00 - 15:00</span>
                      <span className="text-gray-800 font-medium">Lab Results Review</span>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-red-600 mb-1">{appointments.length}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-green-600 mb-1">12</p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
              </div>
            )}

            {/* Doctor Notifications View */}
            {activeTab === 'bell' && (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Bell className="w-8 h-8 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                    <div className="flex items-start gap-3">
                      <Bell className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">New Appointment Request</p>
                        <p className="text-sm text-gray-600">Patient Alpavet requested an appointment for tomorrow at 2:00 PM</p>
                        <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Lab Results Available</p>
                        <p className="text-sm text-gray-600">Blood test results for patient Crinnie are ready for review</p>
                        <p className="text-xs text-gray-500 mt-2">5 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Appointment Reminder</p>
                        <p className="text-sm text-gray-600">You have 3 appointments scheduled for tomorrow</p>
                        <p className="text-xs text-gray-500 mt-2">1 day ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Appointment Confirmed</p>
                        <p className="text-sm text-gray-600">Patient Keilene confirmed their appointment for Nov 28, 10:00 AM</p>
                        <p className="text-xs text-gray-500 mt-2">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation - Doctor View (Simplified) */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
            <div className="flex justify-around items-center">
              <button
                onClick={() => setActiveTab('home')}
                className={`p-3 rounded-full transition-colors ${
                  activeTab === 'home' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <Clock className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`p-3 rounded-full transition-colors ${
                  activeTab === 'calendar' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <Calendar className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setActiveTab('bell')}
                className={`p-3 rounded-full transition-colors ${
                  activeTab === 'bell' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <Bell className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleDoctorLogout}
                className="p-3 rounded-full transition-colors hover:bg-white/10"
              >
                <Settings className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : !isLoggedIn && showDoctorLogin ? (
        /* Doctor Login Page */
        <div className="w-full max-w-md bg-gradient-to-b from-red-600 to-red-700 rounded-3xl shadow-2xl overflow-hidden p-8" style={{ minHeight: '600px' }}>
          <div className="flex flex-col items-center justify-center h-full">
            {/* Back Button */}
            <button 
              onClick={() => {
                setShowDoctorLogin(false);
                setLoginError('');
                setLoginForm({ username: '', password: '' });
              }}
              className="self-start mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Logo - MediCheck Text */}
            <div className="mb-8 text-center">
              <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
                MediCheck
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-0.5 w-16 bg-white"></div>
                <User className="w-8 h-8 text-white" strokeWidth={2.5} />
                <div className="h-0.5 w-16 bg-white"></div>
              </div>
              <p className="text-white text-lg font-semibold tracking-wide">
                Doctor Login
              </p>
            </div>

            {/* Doctor Login Form */}
            <form onSubmit={handleDoctorLogin} className="w-full space-y-4">
              {/* Username */}
              <div>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Username"
                  className="w-full px-6 py-4 rounded-full text-gray-700 placeholder-gray-400 font-medium focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Password"
                  className="w-full px-6 py-4 rounded-full text-gray-700 placeholder-gray-400 font-medium focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="text-white text-center text-sm font-semibold bg-red-800 bg-opacity-50 py-2 rounded-full">
                  {loginError}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-white text-red-600 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Login as Doctor
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 text-center">
              <p className="text-white text-xs font-semibold mb-1">Demo Credentials:</p>
              <p className="text-white text-xs opacity-90">Username: jasmine | Password: zabala</p>
            </div>
          </div>
        </div>
      ) : (
        /* Main App */
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: '600px', maxHeight: '90vh' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <h1 className="text-2xl font-bold tracking-wide">MEDICHECK HEALTH</h1>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto" style={{ height: 'calc(90vh - 180px)', maxHeight: '500px' }}>
          {/* Home/Clock Tab - Medicine List */}
          {activeTab === 'home' && (
            <div className="p-6">
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-6">
                <Pill className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">Medicines</h2>
              </div>

              {/* Medicine Cards */}
              {medicines.length === 0 ? (
                <div className="text-center py-12">
                  <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No medicines added yet</p>
                  <p className="text-gray-400 text-sm mt-2">Click the Edit icon below to add your first medicine</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {medicines.map((medicine) => (
                    <div
                      key={medicine.id}
                      className={`border-l-8 ${colorClasses[medicine.color]} rounded-lg p-4 shadow-sm transition-all duration-500 ${
                        completingId === medicine.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Check Circle Button */}
                        <button
                          onClick={() => markAsTaken(medicine.id)}
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            completingId === medicine.id
                              ? `${colorTextClasses[medicine.color]} border-current bg-current`
                              : `${colorTextClasses[medicine.color]} border-current hover:bg-current hover:bg-opacity-10`
                          }`}
                        >
                          {completingId === medicine.id && (
                            <Check className="w-5 h-5 text-white" />
                          )}
                        </button>

                        {/* Medicine Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className={`text-xl font-bold ${colorTextClasses[medicine.color]}`}>
                              {medicine.name}
                            </h3>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Info className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 font-semibold">Dosage</span>
                              <span className="text-gray-800 font-medium">{medicine.dosage}</span>
                            </div>
                            {medicine.lastTaken && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 font-semibold">Last Taken</span>
                                <span className="text-gray-800">{medicine.lastTaken}</span>
                              </div>
                            )}
                            {medicine.nextDue && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 font-semibold">Next Due</span>
                                <span className="text-gray-800">{medicine.nextDue}</span>
                              </div>
                            )}
                            {medicine.instruction && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 font-semibold">Instruction</span>
                                <span className="text-gray-800">{medicine.instruction}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Edit Tab - Add Medicine Form */}
          {activeTab === 'edit' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Edit className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">Add Medicine</h2>
              </div>

              <form onSubmit={handleAddMedicine} className="space-y-4">
                {/* Medicine Name Search */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search or type medicine name..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  
                  {/* Suggestions Dropdown */}
                  {showSuggestions && searchTerm && filteredMedicines.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredMedicines.map((med, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectMedicine(med)}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 text-gray-800"
                        >
                          {med}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dosage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 100mg, 2 tablets"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Last Taken */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Taken
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      name="lastTakenDate"
                      onChange={(e) => {
                        const date = e.target.value;
                        const time = formData.lastTaken?.split(' ')[1] || '';
                        setFormData(prev => ({
                          ...prev,
                          lastTaken: time ? `${date} ${time}` : date
                        }));
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      name="lastTakenTime"
                      onChange={(e) => {
                        const time = e.target.value;
                        const date = formData.lastTaken?.split(' ')[0] || new Date().toISOString().split('T')[0];
                        setFormData(prev => ({
                          ...prev,
                          lastTaken: `${date} ${time}`
                        }));
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Select date and time</p>
                </div>

                {/* Next Due */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Next Due
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      name="nextDueDate"
                      onChange={(e) => {
                        const date = e.target.value;
                        const time = formData.nextDue?.split(' ')[1] || '';
                        setFormData(prev => ({
                          ...prev,
                          nextDue: time ? `${date} ${time}` : date
                        }));
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      name="nextDueTime"
                      onChange={(e) => {
                        const time = e.target.value;
                        const date = formData.nextDue?.split(' ')[0] || new Date().toISOString().split('T')[0];
                        setFormData(prev => ({
                          ...prev,
                          nextDue: `${date} ${time}`
                        }));
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Select date and time</p>
                </div>

                {/* Instruction */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instruction
                  </label>
                  <input
                    type="text"
                    name="instruction"
                    value={formData.instruction}
                    onChange={handleInputChange}
                    placeholder="e.g., Take with food"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Card Color
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="brown">Brown</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Add Medicine
                </button>
              </form>

              {/* List of Added Medicines with Delete */}
              {medicines.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Your Medicines</h3>
                  <div className="space-y-2">
                    {medicines.map((medicine) => (
                      <div
                        key={medicine.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <span className="font-semibold text-gray-800">{medicine.name}</span>
                          <span className="text-gray-600 text-sm ml-2">({medicine.dosage})</span>
                        </div>
                        <button
                          onClick={() => deleteMedicine(medicine.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Symptoms Tracker Page */}
          {activeTab === 'settings' && showSymptomsTracker && (
            <div className="p-6">
              {/* Back Button */}
              <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setShowSymptomsTracker(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Symptoms Tracker</h2>
              </div>

              {/* Prompt Section */}
              <div className="bg-white rounded-full p-4 mb-6 shadow-sm flex items-center gap-3 border-2 border-red-600">
                <span className="text-red-600 font-semibold text-sm flex-1">Tell me what are you feeling...</span>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
              </div>

              {/* Symptoms List */}
              <div className="space-y-3 mb-6">
                {symptoms.map((symptom) => (
                  <div key={symptom.id} className="relative">
                    <button
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`w-full p-4 rounded-lg font-semibold text-left flex items-center gap-3 transition-all ${
                        symptom.checked
                          ? 'bg-red-600 text-white border-2 border-red-600'
                          : 'bg-white text-red-600 border-2 border-red-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        symptom.checked
                          ? 'bg-white border-white'
                          : 'bg-white border-red-600'
                      }`}>
                        {symptom.checked && (
                          <Check className="w-4 h-4 text-red-600" strokeWidth={3} />
                        )}
                      </div>
                      <span className="flex-1">{symptom.name}</span>
                    </button>
                    
                    {/* Delete button for custom symptoms */}
                    {symptom.custom && (
                      <button
                        onClick={() => deleteCustomSymptom(symptom.id)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-red-700 rounded-full transition-colors"
                      >
                        <X className={`w-4 h-4 ${symptom.checked ? 'text-white' : 'text-red-600'}`} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Custom Symptom Section */}
              {showAddSymptom ? (
                <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-red-600 mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Add Custom Symptom
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSymptom}
                      onChange={(e) => setNewSymptom(e.target.value)}
                      placeholder="Enter symptom name..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
                    />
                    <button
                      onClick={addCustomSymptom}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSymptom(false);
                        setNewSymptom('');
                      }}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddSymptom(true)}
                  className="w-full bg-white text-red-600 border-2 border-red-600 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Custom Symptom
                </button>
              )}

              {/* Save/Download Button */}
              <button 
                onClick={saveSymptoms}
                className="w-full bg-red-600 text-white py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg mt-6 flex items-center justify-center gap-2"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-red-600" strokeWidth={3} />
                </div>
                Save Symptoms
              </button>
            </div>
          )}

          {/* Success Toast Notification */}
          {showSuccessToast && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
              <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                <Check className="w-5 h-5" strokeWidth={3} />
                <span className="font-semibold">Symptoms saved successfully!</span>
              </div>
            </div>
          )}

          {/* Medicine Dictionary Page */}
          {activeTab === 'settings' && showMedicineDictionary && (
            <div className="p-6">
              {/* Back Button */}
              <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setShowMedicineDictionary(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Medicine Dictionary</h2>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-full p-3 mb-6 shadow-sm flex items-center gap-3 border-2 border-gray-200">
                <Search className="w-5 h-5 text-red-600 ml-2" />
                <input
                  type="text"
                  value={medicineSearchTerm}
                  onChange={(e) => setMedicineSearchTerm(e.target.value)}
                  placeholder="Search Medicine"
                  className="flex-1 outline-none text-red-600 placeholder-red-400 font-semibold"
                />
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Mic className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Medicine List */}
              <div className="space-y-4">
                {medicineDictionary
                  .filter(med => 
                    medicineSearchTerm === '' || 
                    med.name.toLowerCase().includes(medicineSearchTerm.toLowerCase()) ||
                    med.category.toLowerCase().includes(medicineSearchTerm.toLowerCase())
                  )
                  .map((medicine) => (
                    <div 
                      key={medicine.id}
                      className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-600"
                    >
                      <h3 className="text-lg font-bold text-red-600 mb-1">
                        {medicine.name}
                      </h3>
                      <p className="text-red-500 text-sm font-semibold italic mb-2">
                        {medicine.category}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {medicine.purpose}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {medicine.indication}
                      </p>
                     <p className="text-gray-600 text-sm leading-relaxed">
                        {medicine.constraindications}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {medicine.effects}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {medicine.dose}
                      </p>
                    </div>
                  ))}
                
                {/* No results message */}
                {medicineSearchTerm !== '' && 
                 medicineDictionary.filter(med => 
                   med.name.toLowerCase().includes(medicineSearchTerm.toLowerCase()) ||
                   med.category.toLowerCase().includes(medicineSearchTerm.toLowerCase())
                 ).length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No medicines found</p>
                    <p className="text-gray-400 text-sm mt-2">Try searching with a different term</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && !showAccountDetails && !showSymptomsTracker && !showMedicineDictionary && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
              </div>

              {/* General Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">General</h3>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setShowAccountDetails(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Account</span>
                  </button>
                  <button 
                    onClick={() => {
                      setShowSymptomsTracker(true);
                      setShowAccountDetails(false);
                      setShowMedicineDictionary(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <Activity className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Symptoms Tracker</span>
                  </button>
                  <button 
                    onClick={() => {
                      setShowMedicineDictionary(true);
                      setShowAccountDetails(false);
                      setShowSymptomsTracker(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <BookOpen className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Medicine Dictionary</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <LogOut className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Log out</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <Trash2 className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Delete account</span>
                  </button>
                </div>
              </div>

              {/* Feedback Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">Feedback</h3>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <AlertTriangle className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Report a bug</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <Send className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Send feedback</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Account Details Page */}
          {activeTab === 'settings' && showAccountDetails && (
            <div className="p-6">
              {/* Back Button and Header */}
              <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setShowAccountDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Account</h2>
              </div>

              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* User Information Cards */}
              <div className="space-y-4">
                {/* Name */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-red-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Full Name</p>
                      <p className="text-gray-800 font-medium">{demoUser.name}</p>
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
                  <div className="flex items-center gap-3">
                    <Cake className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Date of Birth</p>
                      <p className="text-gray-800 font-medium">{demoUser.dateOfBirth}</p>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Phone Number</p>
                      <p className="text-gray-800 font-medium">{demoUser.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Blood Type */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-600">
                  <div className="flex items-center gap-3">
                    <Droplet className="w-5 h-5 text-red-700" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Blood Type</p>
                      <p className="text-gray-800 font-medium">{demoUser.bloodType}</p>
                    </div>
                  </div>
                </div>

                {/* City */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">City</p>
                      <p className="text-gray-800 font-medium">{demoUser.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Edit Profile
              </button>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && !showAppointmentForm && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
              </div>

              {/* Month and Year */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
              </div>

              {/* Calendar Grid */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {(() => {
                    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
                    const days = [];
                    
                    // Empty cells for days before month starts
                    for (let i = 0; i < startingDayOfWeek; i++) {
                      days.push(
                        <div key={`empty-${i}`} className="aspect-square" />
                      );
                    }
                    
                    // Days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                      const isToday = isSameDay(date, new Date());
                      
                      days.push(
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                            isToday
                              ? 'bg-red-600 text-white shadow-lg scale-110'
                              : isSameDay(date, selectedDate)
                              ? 'bg-red-100 text-red-600'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    }
                    
                    return days;
                  })()}
                </div>
              </div>

              {/* Set Appointment Reminder Button */}
              <button 
                onClick={() => setShowAppointmentForm(true)}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Bell className="w-5 h-5" />
                Set Appointment Reminder
              </button>

              {/* Upcoming Appointments */}
              {appointments.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Upcoming Appointments</h3>
                  <div className="space-y-3">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-800">{apt.type}</span>
                          <button
                            onClick={() => setAppointments(prev => prev.filter(a => a.id !== apt.id))}
                            className="text-red-600 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">
                          📅 {apt.date} at {apt.time}
                        </p>
                        {apt.comments && (
                          <p className="text-sm text-gray-500 mt-2">💬 {apt.comments}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Date Info */}
              {selectedDate && !isSameDay(selectedDate, new Date()) && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Selected Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Appointment Form */}
          {activeTab === 'calendar' && showAppointmentForm && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setShowAppointmentForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Set Appointment</h2>
              </div>

              <form onSubmit={handleSetAppointment} className="space-y-5">
                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={appointmentForm.type}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 font-medium"
                    required
                  >
                    <option value="Check Up">Check Up</option>
                    <option value="Blood Test">Blood Test</option>
                    <option value="CBG Test">CBG Test</option>
                  </select>
                </div>

                {/* Select Doctor */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Doctor *
                  </label>
                  <select
                    value={appointmentForm.doctor}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, doctor: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 font-medium"
                    required
                  >
                    <option value="">-- Choose a doctor --</option>
                    {demoDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Comments
                  </label>
                  <textarea
                    value={appointmentForm.comments}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, comments: e.target.value }))}
                    placeholder="Add any additional notes or comments..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
                >
                  Set Appointment
                </button>
              </form>
            </div>
          )}

          {/* Bell/Notifications Tab */}
          {activeTab === 'bell' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
              </div>

              {/* Appointment Reminders */}
              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No appointment reminders</p>
                  <p className="text-gray-400 text-sm mt-2">Set appointments in the Calendar tab</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">Appointment Reminders</h3>
                  {appointments.map((apt) => {
                    const appointmentDate = new Date(apt.date + 'T' + apt.time);
                    const now = new Date();
                    const isPast = appointmentDate < now;
                    const isToday = apt.date === new Date().toISOString().split('T')[0];
                    
                    return (
                      <div
                        key={apt.id}
                        className={`rounded-lg shadow-sm p-4 border-l-4 transition-all duration-500 ${
                          completingAppointmentId === apt.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        } ${
                          isPast
                            ? 'bg-gray-50 border-gray-400'
                            : isToday
                            ? 'bg-red-50 border-red-600'
                            : 'bg-white border-orange-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Check Circle Button */}
                          <button
                            onClick={() => markAppointmentComplete(apt.id)}
                            className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              completingAppointmentId === apt.id
                                ? isPast
                                  ? 'text-gray-600 border-gray-600 bg-gray-600'
                                  : isToday
                                  ? 'text-red-600 border-red-600 bg-red-600'
                                  : 'text-orange-600 border-orange-600 bg-orange-600'
                                : isPast
                                ? 'text-gray-600 border-gray-600 hover:bg-gray-600 hover:bg-opacity-10'
                                : isToday
                                ? 'text-red-600 border-red-600 hover:bg-red-600 hover:bg-opacity-10'
                                : 'text-orange-600 border-orange-600 hover:bg-orange-600 hover:bg-opacity-10'
                            }`}
                          >
                            {completingAppointmentId === apt.id && (
                              <Check className="w-5 h-5 text-white" />
                            )}
                          </button>

                          {/* Appointment Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <h3 className={`text-lg font-bold ${
                                  isPast ? 'text-gray-500' : isToday ? 'text-red-600' : 'text-gray-800'
                                }`}>
                                  {apt.type}
                                </h3>
                              </div>
                              {isToday && (
                                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                  TODAY
                                </span>
                              )}
                              {isPast && (
                                <span className="bg-gray-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                  PAST
                                </span>
                              )}
                            </div>

                            <div className="space-y-2 text-sm">
                              {apt.doctor && (
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-500" />
                                  <span className="text-gray-700 font-medium">{apt.doctor}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700 font-medium">
                                  {new Date(apt.date).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700 font-medium">{apt.time}</span>
                              </div>
                              {apt.comments && (
                                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-200">
                                  <Info className="w-4 h-4 text-gray-500 mt-0.5" />
                                  <span className="text-gray-600">{apt.comments}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* User/Doctor Search Tab */}
          {activeTab === 'user' && !selectedDoctor && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">Find Doctors</h2>
              </div>

              {/* Map with Real Image */}
              <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-md relative" style={{ height: '250px' }}>
                <img 
                  src="laguna.png" 
                  alt="Map of Biñan, Laguna"
                  className="w-full h-full object-cover"
                />
                
                {/* User Location Pin (University of Perpetual Help System Laguna) - Center-right */}
                <div className="absolute top-[42%] left-[48%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <MapPin className="w-8 h-8 text-blue-600 fill-blue-400 drop-shadow-lg" strokeWidth={2.5} />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md whitespace-nowrap text-center">
                      <p className="text-xs font-semibold text-blue-600">You are here</p>
                    </div>
                  </div>
                </div>
                
                {/* Doctor Pins - Scattered across Biñan/Laguna area */}
                
                {/* Dr. Maria Dela Cruz - Near Central Mall Biñan (upper left) */}
                <div className="absolute top-[38%] left-[35%]">
                  <div className="relative group">
                    <MapPin className="w-6 h-6 text-red-600 fill-red-400 drop-shadow-md animate-pulse cursor-pointer" />
                  </div>
                </div>
                
                {/* Dr. John Smith - Calamba area (left side) */}
                <div className="absolute top-[25%] left-[25%]">
                  <div className="relative group">
                    <MapPin className="w-6 h-6 text-red-600 fill-red-400 drop-shadow-md animate-pulse cursor-pointer" />
                  </div>
                </div>
                
                {/* Dr. Elena Santos - Near Plaza Rizal (upper right) */}
                <div className="absolute top-[20%] left-[60%]">
                  <div className="relative group">
                    <MapPin className="w-6 h-6 text-red-600 fill-red-400 drop-shadow-md animate-pulse cursor-pointer" />
                  </div>
                </div>
                
                {/* Dr. Rafael Torres - San Pedro/Zapote area (lower left) */}
                <div className="absolute bottom-[30%] left-[20%]">
                  <div className="relative group">
                    <MapPin className="w-6 h-6 text-red-600 fill-red-400 drop-shadow-md animate-pulse cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Doctor List */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">Available Doctors</h3>
              <div className="space-y-3">
                {demoDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor)}
                    className="w-full bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500 hover:shadow-md transition-shadow text-left"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{doctor.name}</h4>
                        <p className="text-red-600 text-sm font-medium">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-700">{doctor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {doctor.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {doctor.wait}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Doctor Profile View */}
          {activeTab === 'user' && selectedDoctor && (
            <div className="p-6">
              {/* Back Button */}
              <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setSelectedDoctor(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Doctor Profile</h2>
              </div>

              {/* Doctor Profile Card */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 mb-6 shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedDoctor.name}</h3>
                    <p className="text-red-600 font-semibold mb-3">{selectedDoctor.specialty}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>Wait time: <strong>{selectedDoctor.wait}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{selectedDoctor.location} ({selectedDoctor.distance})</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="bg-white rounded-full px-4 py-2 shadow-sm flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-800">{selectedDoctor.rating}</span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">About</h4>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">{selectedDoctor.description}</p>
                </div>
              </div>

              {/* Book Appointment Button */}
              <button
                onClick={() => {
                  setActiveTab('calendar');
                  setShowAppointmentForm(true);
                  setSelectedDoctor(null);
                }}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
            </div>
          )}

          {/* Other Tabs - Placeholder */}
          {activeTab !== 'home' && activeTab !== 'edit' && activeTab !== 'settings' && activeTab !== 'calendar' && activeTab !== 'bell' && activeTab !== 'user' && (
            <div className="p-6 text-center">
              <p className="text-gray-500 text-lg">Coming Soon!</p>
              <p className="text-gray-400 text-sm mt-2">This feature is under development</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`p-3 rounded-full transition-colors ${
                activeTab === 'home' || activeTab === 'clock' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Clock className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setActiveTab('user')}
              className={`p-3 rounded-full transition-colors ${
                activeTab === 'user' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <User className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`p-3 rounded-full transition-colors ${
                activeTab === 'calendar' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Calendar className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setActiveTab('bell')}
              className={`p-3 rounded-full transition-colors ${
                activeTab === 'bell' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Bell className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`p-3 rounded-full transition-colors ${
                activeTab === 'edit' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Pill className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-3 rounded-full transition-colors ${
                activeTab === 'settings' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Settings className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
              </div>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}