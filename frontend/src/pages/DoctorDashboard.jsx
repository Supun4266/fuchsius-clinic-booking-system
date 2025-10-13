import React, { useState } from 'react';
import { Calendar, Users, MessageSquare, Settings, Home, ChevronLeft, ChevronRight } from 'lucide-react';

const DoctorDashboard = () => {
  const [activeView, setActiveView] = useState('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 6, 1)); // July 2024
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };
  
  const renderCalendar = (monthOffset) => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + monthOffset);
    const { firstDay, daysInMonth } = getDaysInMonth(date);
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = monthOffset === 0 && day === 5;
      days.push(
        <div
          key={day}
          className={`h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 ${
            isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
          }`}
        >
          {day}
        </div>
      );
    }
    
    return (
      <div className="flex-1">
        <div className="text-center font-semibold mb-4">
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="font-medium text-gray-600">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {days}
        </div>
      </div>
    );
  };
  
  const appointments = [
    {
      time: '10:00 AM - 10:30 AM',
      patient: 'Emily Harper',
      avatar: '👩‍⚕️',
      reason: 'Annual Checkup',
      symptoms: 'None',
      notes: 'Patient is generally healthy.'
    },
    {
      time: '11:00 AM - 11:30 AM',
      patient: 'David Miller',
      avatar: '👨',
      reason: 'Follow-up',
      symptoms: 'Mild cough',
      notes: 'Monitor for a week.'
    },
    {
      time: '1:00 PM - 1:30 PM',
      patient: 'Olivia Bennett',
      avatar: '👩',
      reason: 'Consultation',
      symptoms: 'Fatigue',
      notes: 'Discuss lifestyle changes.'
    }
  ];
  
  const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Calendar, label: 'Appointments', active: false },
    { icon: Users, label: 'Patients', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
            👨‍⚕️
          </div>
          <div>
            <div className="font-semibold">Dr. Robert Carter</div>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                  item.active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          {/* Calendar/List Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveView('calendar')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeView === 'calendar' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeView === 'list' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              List
            </button>
          </div>
          
          {/* Calendar View */}
          {activeView === 'calendar' && (
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <div className="flex gap-8">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft size={20} />
                </button>
                {renderCalendar(0)}
                {renderCalendar(1)}
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
          
          {/* Today's Appointments */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Today's Appointments</h2>
            <div className="space-y-4">
              {appointments.map((apt, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      {apt.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">
                        {apt.time}: {apt.patient}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="text-blue-600">Reason:</span> {apt.reason}, 
                        <span className="text-blue-600"> Symptoms:</span> {apt.symptoms}, 
                        <span className="text-blue-600"> Notes:</span> {apt.notes}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;