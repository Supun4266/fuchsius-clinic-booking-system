import React from "react";
import { FaSearch } from "react-icons/fa";

const DoctorManagement = () => {
  const doctors = [
    {
      name: "Dr. Amelia Harper",
      specialty: "Cardiology",
      contact: "amelia.harper@clinic.com",
      status: "Active",
    },
    {
      name: "Dr. Ethan Bennett",
      specialty: "Dermatology",
      contact: "ethan.bennett@clinic.com",
      status: "Active",
    },
    {
      name: "Dr. Olivia Carter",
      specialty: "Neurology",
      contact: "olivia.carter@clinic.com",
      status: "Active",
    },
    {
      name: "Dr. Noah Davis",
      specialty: "Pediatrics",
      contact: "noah.davis@clinic.com",
      status: "Inactive",
    },
    {
      name: "Dr. Sophia Evans",
      specialty: "Orthopedics",
      contact: "sophia.evans@clinic.com",
      status: "Active",
    },
  ];
  return (
    <>
      <nav className="pl-5 pr-5 shadow">
        <div className="container mx-auto p-3 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-gray-900">
            FUCHSIUS Clinic
          </a>

          <div className="flex items-center text-sm ">
            <a
              href="/dashboard"
              className="hover:text-gray-500 mr-8 text-gray-900"
            >
              Dashboard
            </a>
            <a href="/appointments" className="hover:text-gray-500 mr-8 text-gray-900">
              Appointments
            </a>
            <a
              href="/patients"
              className="hover:text-gray-500 mr-8 text-gray-900"
            >
              Patients
            </a>
            <a
              href="/doctors"
              className="hover:text-gray-500 mr-8 text-gray-900"
            >
              Doctors
            </a>
            <a
              href="/service"
              className="hover:text-gray-500 mr-8 text-gray-900"
            >
              Services
            </a>
            <a
              href="/staff"
              className="hover:text-gray-500 mr-8 text-gray-900"
            >
              Staff
            </a>
            <img
              src="https://avatar.iran.liara.run/public/54"
              alt=""
              className="rounded-full"
              width={40}
              height={40}
            />
          </div>
        </div>
      </nav>

      <div className="items-center flex justify-center">
        <div className="mx-auto p-7">
          <h2 className="text-2xl font-bold mb-2 flex-1">Doctor Management</h2>
          <p className="text-gray-600 mb-4 flex-1 text-xs">
            Manage doctor profiles, including adding new doctors, updating
            existing information, and removing profiles.
          </p>

          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search by name or specialty"
              className="w-full p-2 pl-12 border rounded-lg bg-gray-300 placeholder-cyan-700 text-xs"
            />
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-cyan-700" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border text-xs">
              <thead>
                <tr className="border">
                  <th className="p-3">Doctor Name</th>
                  <th className="p-3">Specialty</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, index) => (
                  <tr key={index} className="border-b text-xs">
                    <td className="p-3">{doctor.name}</td>
                    <td className="p-3 text-sky-700">{doctor.specialty}</td>
                    <td className="p-3 text-sky-700">{doctor.contact}</td>
                    <td className="p-3">
                      <span
                        className={
                          "px-2 py-1 rounded inline-block bg-gray-200 text-center w-20"
                        }
                      >
                        {doctor.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-cyan-700 hover:text-gray-600 font-bold">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-xs">
              Add New Doctor
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorManagement;
