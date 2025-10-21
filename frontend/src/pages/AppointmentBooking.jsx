import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function AppointmentBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [currentMonth, setCurrentMonth] = useState(9); 
  const [currentYear, setCurrentYear] = useState(2024);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const doctors = [
    'Dr. Sarath Jonston - Cardiologist',
    'Dr. Migara shen - General Practitioner',
    'Dr. Lakmal Williams - Pediatrician',
    'Dr. kosala Bandara - Dermatologist',
    'Dr. Lllith Ananda - Orthopedic'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleConfirm = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }
    alert(`Appointment confirmed!\nDoctor: ${selectedDoctor}\nDate: ${monthNames[currentMonth]} ${selectedDate}, ${currentYear}\nTime: ${selectedTime}`);
  };

  const calendar = generateCalendar();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="min-h-screen bg-gray-50">
    {/* Navigation */}
    <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Clinic Logo" className="w-6 h-6" />
                    <span className="text-xl font-bold">ClinicName</span>
                </div>
                <div className="flex items-center space-x-8">
                    <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">Services</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">Doctors</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
                    <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    </nav>

    {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Book an Appointment</h1>

        {/* Doctor Selection */}
        <div className="mb-6 relative">
          <button
            onClick={() => setShowDoctorDropdown(!showDoctorDropdown)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex justify-between items-center hover:border-gray-400 transition"
          >
            <span className={selectedDoctor ? 'text-gray-900' : 'text-gray-500'}>
              {selectedDoctor || 'Select a Doctor'}
            </span>
            <div className="flex flex-col">
              <ChevronUp className="w-4 h-4 text-blue-600 -mb-1" />
              <ChevronDown className="w-4 h-4 text-blue-600" />
            </div>
          </button>
          {showDoctorDropdown && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setShowDoctorDropdown(false);
                  }}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition"
                >
                  {doctor}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Calendar */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center font-semibold text-sm text-gray-700">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendar.map((day, index) => (
              <div key={index} className="aspect-square">
                {day && (
                  <button
                    onClick={() => setSelectedDate(day)}
                    className={`w-full h-full flex items-center justify-center rounded-full text-sm transition ${
                      selectedDate === day
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="mb-6 relative">
          <button
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex justify-between items-center hover:border-gray-400 transition"
          >
            <span className={selectedTime ? 'text-gray-900' : 'text-gray-500'}>
              {selectedTime || 'Select a Time Slot'}
            </span>
            <div className="flex flex-col">
              <ChevronUp className="w-4 h-4 text-blue-600 -mb-1" />
              <ChevronDown className="w-4 h-4 text-blue-600" />
            </div>
          </button>
          {showTimeDropdown && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedTime(time);
                    setShowTimeDropdown(false);
                  }}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition"
                >
                  {time}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Symptoms Textarea */}
        <div className="mb-6">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms or reason for visit"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition"
            rows="5"
          />
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
}