const express = require('express')
const router = express.Router()
const Salary = require('../Models/Salaryinfo');

const jwt = require('jsonwebtoken')
const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')

router.post('/addsalary' , async (req , res) => {
  try {
    const { employeeId, employeeType, salaryAmount, paymentStatus, paymentMonth } = req.body;

    const salary = await Salary.create(
      {
        'employeeId': employeeId,
        'employeeType': employeeType,
        'salaryAmount': salaryAmount,
        'paymentStatus': paymentStatus,
        'paymentMonth' : paymentMonth
      }
    )
    res.status(200).json({ message: 'Salary details inserted successfully', salary });
    console.log('Inserted:', salary);

  } catch (error) {
    console.log("Error:" , error)   
  }
})


// get all salary details
router.post('/salarydetails', async (req, res) => {
  try {
    const salary = await Salary.find(); 
    res.status(200).json(salary); 
    console.log(salary)
  } catch (error) {
    console.error("Error fetching salary:", error);
    res.status(500).json({ message: 'Error fetching salary', error: error.message });
  }
});


// Update Route
router.post('/updatesalary/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  try {
    // Find the doctor by id and update with new data
    const updatedsalary = await Salary.findOneAndUpdate(
      { id: id },  // Find doctor by id
      { $set: updateData },  // Update the doctor's details with the new data
      { new: true } // Return the updated document
    );
    
    // If no doctor found, return a 404 error
    if (!updatedsalary) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Return the updated salary
    res.status(200).json({message: 'Details Updated Sucessfully' ,updatedsalary});
    console.log(updatedDoctor)

  } catch (error) {
    console.error('Error updating salary:', error);
    res.status(500).json({ message: 'Error updating salary', error: error.message });
  }
});


// DELETE route to delete a doctor by EmployeeId
router.post('/deletesalaryinfo', async (req, res) => {
  try {
    const {id} = req.body; 
    console.log(id)
    // Deleting a salary by employeeId
    const salary = await Salary.findOneAndDelete({ 'id' : id});

    if (!salary) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "salary details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting salary details", error: error.message });
    console.log(error.message);
  }
});

module.exports = router