const express = require('express')
const router = express.Router()
const Bill = require('../Models/Billinfo')


// get all bills
router.post('/allbills', async (req, res) => {
  try {
    const patient = await Bill.find(); // Fetch all patient from the collection
    res.status(200).json(patient);
    // console.log(patient)
  } catch (error) {
    console.error("Error fetching Bills:", error);
    res.status(500).json({ message: 'Error fetching Bills', error: error.message });
  }
});


router.post('/bills', async (req, res) => {
  try {
    const patient = await Bill.find({'status' : "not paid"}); // Fetch all patient from the collection
    res.status(200).json(patient);
    // console.log(patient)
  } catch (error) {
    console.error("Error fetching Bills:", error);
    res.status(500).json({ message: 'Error fetching Bills', error: error.message });
  }
});


// Find Bill of a single patient
router.post('/findbill/:id', async (req, res) => {
  const { id } = req.params;
  console.log(" bill for patient ID:" , id)
  
  try {
    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    // Find one patient by the  id
    const patientbill = await Bill.findOne({ 'billno' : id , 'status' : "not paid"});

    if (!patientbill) {
      return res.status(404).json({ message: `patient bill not found ${id}` });
    }

    res.status(200).json(patientbill);
    console.log(patientbill)
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
});


// set Doctor status inactive after logout
router.post('/paid', async (req, res) => {
  const { billno } = req.body;
  try {
    await Bill.updateOne({ 'billno' : billno }, { 'status': 'paid' });
    res.status(200).json({ success: true, message: 'Bill Updated' });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Function to calculate revenue for a specific date range
const calculateRevenueForRange = async (startDate, endDate) => {
  return await Bill.aggregate([
    {
      $addFields: {
        totalFee: {
          $add: [
            "$fees.consultationfee",
            "$fees.testfee",
            "$fees.admissionfee",
          ],
        },
      },
    },
    {
      $match: {
        date: {
          $gte: new Date(startDate), // Start date
          $lt: new Date(endDate),   // End date (exclusive)
        },
      },
    },
    {
      $group: {
        _id: null, // No grouping, just sum for the range
        totalAmount: { $sum: "$totalFee" },
      },
    },
  ]);
};


// Route to get revenue for current day, month, and year
router.get('/revenue', async (req, res) => {
  
  try {
    // Get the current date
    const now = new Date();

    // Calculate the start and end dates for current day
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // Calculate the start and end dates for current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Calculate the start and end dates for current year
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    // Fetch revenue for each range
    const [dailyRevenue] = await calculateRevenueForRange(startOfDay, endOfDay);
    const [monthlyRevenue] = await calculateRevenueForRange(startOfMonth, endOfMonth);
    const [yearlyRevenue] = await calculateRevenueForRange(startOfYear, endOfYear);

    // Return the results
    res.json({
      dailyRevenue: dailyRevenue?.totalAmount || 0,
      monthlyRevenue: monthlyRevenue?.totalAmount || 0,
      yearlyRevenue: yearlyRevenue?.totalAmount || 0,
    });

  } catch (error) {
    console.error('Error calculating revenue:', error);
    res.status(500).json({ error: 'Error calculating revenue' });
  }
});


module.exports = router