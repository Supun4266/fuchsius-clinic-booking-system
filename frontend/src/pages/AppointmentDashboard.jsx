import React, { useState } from "react";
import logo from "../assets/logo.png";
import doc1 from "../assets/doc1.png";
import doc2 from "../assets/doc2.png";
import doc3 from "../assets/doc3.png";




export default function AppointmentDashboard() {
  const [selectedDate, setSelectedDate] = useState("2024-10-04");
  const [reason, setReason] = useState("");

  const availableDoctors = [
    { name: "Dr. Amelia Harper", specialty: "Cardiologist", image: doc1 },
    { name: "Dr. Ethan Bennett", specialty: "Dermatologist", image: doc2 },
    { name: "Dr. Olivia Carter", specialty: "Pediatrician", image: doc3 },
  ];

  const upcoming = [
    { doctor: "Dr. Amelia Harper", date: "Oct 20, 2024", time: "10:00 AM", reason: "Checkup", status: "Confirmed" },
    { doctor: "Dr. Ethan Bennett", date: "Nov 5, 2024", time: "2:30 PM", reason: "Skin rash", status: "Pending" },
  ];

  const past = [
    { doctor: "Dr. Olivia Carter", date: "Sep 15, 2024", time: "11:00 AM", reason: "Vaccination", status: "Completed" },
    { doctor: "Dr. Amelia Harper", date: "Aug 22, 2024", time: "9:00 AM", reason: "Consultation", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray shadow">
        <div className="flex items-center gap-2 font-bold text-xl">
          <img src={logo} alt="logo" className="w-5" />
          <span>Clinic Appointment</span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6">
            <a href="home.html" className="hover:text-blue-500">Home</a>
            <a href="#" className="hover:text-blue-500">Doctors</a>
            <a href="#" className="hover:text-blue-500">Appointments</a>
            <a href="#" className="hover:text-blue-500">Profile</a>
          </nav>
          <div className="flex gap-2">
            
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8Py44jLtIhnved91AB50jO-DP8_n3_5AZAnMzQJ8rCI_zKIM7PBLeqmgH0No8StUtjyGMKCKI79KK_PExoMFqENpNLP5wadJexsq6Vkv6iUSi-WKDQFJ7sEx0bePjzuIxDi6WQFnxbmNwb929vMni-3BffxxDGISIXwzQDRwLr4rmvpcVnEGS-zpNpaP7Lz6kaykxjmVP0qG7crhxXnLXvfoxwrwe9tXilqu6movpulVN84QlnEHFmtc35GrJDKdfJtfD8IP4J3cT")',
              }}
            ></div>
          </div>
          <div className="md:hidden text-2xl cursor-pointer">&#9776;</div>
        </div>
      </header>

  <div className="flex min-h-screen bg-gray-50 p-6">
      {/* Left Panel */}
      <div className="w-1/4 bg-white shadow-md rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4">Book Appointment</h2>

        {/* Doctor Select */}
        <select className="w-full border border-gray-300 rounded-lg p-2 mb-4">
          <option>Select Doctor</option>
          {availableDoctors.map((doc, index) => (
            <option key={index}>{doc.name}</option>
          ))}
        </select>

        {/* Calendar */}
        <div className="border border-gray-300 rounded-lg mb-4 p-3">
          <h3 className="font-medium mb-2 text-gray-700">October 2024</h3>
          <div className="grid grid-cols-7 text-center text-sm text-gray-600 gap-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <span key={d} className="font-semibold">{d}</span>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(`2024-10-${i + 1}`)}
                className={`rounded-md p-1 ${
                  selectedDate === `2024-10-${i + 1}`
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Reason */}
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for visit"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        />

        {/* Book Button */}
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
          Book Appointment
        </button>
      </div>

      {/* Right Panel */}
      <div className="flex-1 ml-6">
        {/* Available Doctors */}
        <h2 className="text-xl font-semibold mb-3">Available Doctors</h2>
        <div className="space-y-4">
          {availableDoctors.map((doc, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-4 shadow-sm rounded-lg">
              <div>
                <h3 className="font-semibold">{doc.name}</h3>
                <p className="text-gray-500">{doc.specialty}</p>
                <button className="mt-2 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
                  View Profile
                </button>
              </div>
              <img
                src={doc.image}
                alt={doc.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

<h2 className="text-lg font-semibold mt-8 mb-3">Upcoming Appointments</h2>
<div className="bg-white shadow-sm rounded-lg overflow-x-auto">
  <table className="min-w-full border-collapse text-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="text-left px-4 py-2 w-1/5">Doctor</th>
        <th className="text-left px-4 py-2 w-1/6">Date</th>
        <th className="text-left px-4 py-2 w-1/6">Time</th>
        <th className="text-left px-4 py-2 w-1/4">Reason</th>
        <th className="text-left px-4 py-2 w-1/6">Status</th>
        <th className="text-left px-4 py-2 w-1/6">Actions</th>
      </tr>
    </thead>
    <tbody>
      {upcoming.map((a, index) => (
        <tr
          key={index}
          className="border-t hover:bg-gray-50 transition-colors"
        >
          <td className="px-4 py-2">{a.doctor}</td>
          <td className="px-4 py-2">{a.date}</td>
          <td className="px-4 py-2">{a.time}</td>
          <td className="px-4 py-2">{a.reason}</td>
          <td className="px-4 py-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                a.status === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {a.status}
            </span>
          </td>
          <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">
            View Details
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* Past Appointments */}
        <h2 className="text-lg font-semibold mt-8 mb-3">Past Appointments</h2>
        <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
  <table className="min-w-full border-collapse text-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="text-left px-4 py-2 w-1/5">Doctor</th>
        <th className="text-left px-4 py-2 w-1/6">Date</th>
        <th className="text-left px-4 py-2 w-1/6">Time</th>
        <th className="text-left px-4 py-2 w-1/4">Reason</th>
        <th className="text-left px-4 py-2 w-1/6">Status</th>
        <th className="text-left px-4 py-2 w-1/6">Actions</th>
      </tr>
    </thead>
    <tbody>
      {past.map((a, index) => (
        <tr
          key={index}
          className="border-t hover:bg-gray-50 transition-colors"
        >
          <td className="px-4 py-2">{a.doctor}</td>
          <td className="px-4 py-2">{a.date}</td>
          <td className="px-4 py-2">{a.time}</td>
          <td className="px-4 py-2">{a.reason}</td>
          <td className="px-4 py-2">
            <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-700">
              {a.status}
            </span>
          </td>
          <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">
            View Details
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
    </div>
  );
}
