// const express = require('express')
// const router = express.Router()
// const Test = require('../Models/Testinfo')

// router.post("/create" , async (req, res) => {

//     try {
//         const {patientid , patientname , doctorid , staffid , testname , result , status, } = req.body;

//         const test = await Test.create({
//             'staffid' : staffid,
//             'patientid' : patientid,
//             'patientname' : patientname,
//             'doctorid' : doctorid,
//             'testname' : testname,
//             'status' : status,
//             'result' : result,
//         })

//         res.status(200).json({message : 'Test Added' , test})
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Error inserting test', error: error.message });
//     }
// })



// router.post('/testdetails', async (req, res) => {
//     try {
//       const test = await Test.find(); // Fetch test details from the collection
//       res.status(200).json(test);
//       // console.log(patient)
//     } catch (error) {
//       console.error("Error fetching test details:", error);
//       res.status(500).json({ message: 'Error fetching test details', error: error.message });
//     }
//   });

//   // Find details of a single patient
// router.post('/patienttestdetail/:id', async (req, res) => {
//   const { id } = req.params;
//   console.log(id)
  
//   try {
//     // Find one patient by the  id
//     const test = await Test.findOne({ 'patientid' : id });

//     if (!test) {
//       return res.status(404).json({ message: `test details of patient not found ${id}` });
//     }

//     // res.status(200).json(patient);
//     res.send(test)
//     console.log(test)
//   } catch (error) {
//     console.error('Error fetching test details:', error);
//     res.status(500).json({ message: 'Error fetching test details', error: error.message });
//   }
// });


// // Update detaiils of patient with id
// router.post('/updatetest/:id', async (req, res) => {
//   const { id } = req.params;
//   console.log(id)
//   const updateData = req.body;
//   console.log(updateData)
  
//   try {
//     // Find the patient by id and update with new data
//     const updatedtest = await Test.findOneAndUpdate(
//       { _id: id },  // Find patient by id
//       { $set: updateData },  // Update the patient's details with the new data
//       { new: true } // Return the updated document
//     );
    
//     // If no patient found, return a 404 error
//     if (!updatedtest) {
//       return res.status(404).json({ message: 'Not Updated' });
//     }

//     // Return the updated patient
//     res.status(200).json({message: 'Details Updated Sucessfully' , updatedtest});
//     console.log(updatedtest)

//   } catch (error) {
//     console.error('Error updating test details:', error);
//     res.status(500).json({ message: 'Error updating test details', error: error.message });
//   }
// });


// // DELETE route to delete a test by ObjectId
// router.post('/deletetest', async (req, res) => {
//   try {
//     const {id} = req.body; // Assuming the _id is sent as a URL parameter
//     console.log(id)
//     // Deleting a test by ObjectId
//     const test = await Test.findOneAndDelete({ 'id' : id});

//     if (!test) {
//       return res.status(404).json({ message: "Test not found" });
//     }

//     res.status(200).json({ message: "Test deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting test", error: error.message });
//     console.log(error.message);
//   }
// });


// module.exports = router

const express = require('express');
const router = express.Router();
const Test = require('../models/TestInfo');

// Create a new test
router.post("/create", async (req, res) => {
  try {
    const { patientid, patientname, doctorid, staffid, testname, result, status } = req.body;
    const test = await Test.create({
      staffid, patientid, patientname, doctorid, testname, result, status
    });
    res.status(200).json({ message: 'Test Added', test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting test', error: error.message });
  }
});

// Fetch all test details
router.post('/testdetails', async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching test details:", error);
    res.status(500).json({ message: 'Error fetching test details', error: error.message });
  }
});

// Fetch a single patient's test details by patient ID
router.post('/patienttestdetail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tests = await Test.find({ patientid: id });
    if (!tests.length) {
      return res.status(404).json({ message: `No test details found for patient ID ${id}` });
    }
    res.status(200).json(tests);
  } catch (error) {
    console.error('Error fetching patient test details:', error);
    res.status(500).json({ message: 'Error fetching test details', error: error.message });
  }
});

// Update test details by test ID
router.post('/updatetest/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedTest = await Test.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json({ message: 'Test details updated successfully', updatedTest });
  } catch (error) {
    console.error('Error updating test details:', error);
    res.status(500).json({ message: 'Error updating test details', error: error.message });
  }
});

// Delete a test by test ID
router.post('/deletetest', async (req, res) => {
  const { id } = req.body;
  try {
    const test = await Test.findByIdAndDelete(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).json({ message: "Error deleting test", error: error.message });
  }
});

module.exports = router;
