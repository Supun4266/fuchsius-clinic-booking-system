import React from "react";
import { Routes, Route } from "react-router-dom";
import AppointmentDashboard from "./pages/AppointmentDashboard";


export default function App() {
  return (
    <Routes>
      <Route path="dashboard" element={<AppointmentDashboard />} />
   
    </Routes>
  );
}