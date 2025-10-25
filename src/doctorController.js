const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

 
const getDoctorDashboard = async (req, res) => {
  try {
    const doctorId = req.user.doctorId;  
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

     
    const todayAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        appointmentDateTime: {
          gte: today,
          lt: tomorrow
        },
        status: 'BOOKED'
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        appointmentDateTime: 'asc'
      }
    });

     
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        appointmentDateTime: {
          gte: tomorrow,
          lte: nextWeek
        },
        status: 'BOOKED'
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        appointmentDateTime: 'asc'
      }
    });

   
    const stats = await prisma.appointment.groupBy({
      by: ['status'],
      where: {
        doctorId: doctorId
      },
      _count: true
    });
 
    const totalPatients = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId
      },
      distinct: ['patientId']
    });

    res.status(200).json({
      success: true,
      data: {
        todayAppointments,
        upcomingAppointments,
        stats: {
          totalAppointments: stats.reduce((acc, s) => acc + s._count, 0),
          bookedAppointments: stats.find(s => s.status === 'BOOKED')?._count || 0,
          completedAppointments: stats.find(s => s.status === 'COMPLETED')?._count || 0,
          canceledAppointments: stats.find(s => s.status === 'CANCELED')?._count || 0,
          totalPatients: totalPatients.length
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
};

 
const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.params.id || req.user.doctorId;

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        appointments: {
          where: {
            status: 'BOOKED',
            appointmentDateTime: {
              gte: new Date()
            }
          },
          take: 5,
          orderBy: {
            appointmentDateTime: 'asc'
          }
        }
      }
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor profile',
      error: error.message
    });
  }
};

 
const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.doctorId;
    const { name, specialization, description, imageUrl, availability } = req.body;

    const updatedDoctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: {
        ...(name && { name }),
        ...(specialization && { specialization }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
        ...(availability && { availability })
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedDoctor
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};
 
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.doctorId;
    const { startDate, endDate, status } = req.query;

    const whereClause = {
      doctorId: doctorId,
      ...(startDate && endDate && {
        appointmentDateTime: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }),
      ...(status && { status })
    };

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        appointmentDateTime: 'asc'
      }
    });

    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

 
const getAppointmentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const doctorId = req.user.doctorId;

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        doctorId: doctorId
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
          }
        }
      }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Get appointment details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment details',
      error: error.message
    });
  }
};

 
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const doctorId = req.user.doctorId;

    
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        doctorId: doctorId
      }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found or unauthorized'
      });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status }
    });

    res.status(200).json({
      success: true,
      message: 'Appointment status updated',
      data: updatedAppointment
    });
  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating appointment status',
      error: error.message
    });
  }
};

module.exports = {
  getDoctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorAppointments,
  getAppointmentDetails,
  updateAppointmentStatus
};