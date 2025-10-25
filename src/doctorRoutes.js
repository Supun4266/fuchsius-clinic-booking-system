const express = require('express');
const router = express.Router();
const {
  getDoctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorAppointments,
  getAppointmentDetails,
  updateAppointmentStatus
} = require('../controllers/doctorController');
const { protect, restrictTo } = require('../middleware/authMiddleware');


router.use(protect);
router.use(restrictTo('DOCTOR', 'ADMIN'));

 
router.get('/dashboard', getDoctorDashboard);

router.get('/profile', getDoctorProfile);
 
router.get('/profile/:id', getDoctorProfile);
 
router.put('/profile', updateDoctorProfile);

router.get('/appointments', getDoctorAppointments);
 
router.get('/appointments/:appointmentId', getAppointmentDetails);
 
router.patch('/appointments/:appointmentId/status', updateAppointmentStatus);

module.exports = router;