const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Admininfo = require('./Models/Admin/Admininfo')

const env = require('dotenv');
env.config()

const port = 3000 || process.env.PORT

const app = express()

app.use(cors());

app.use(express.json());


mongoose.connect(process.env.DBCONNECTION)
.then(() => console.log("Connected to Database"))
.catch((e) => console.log("Error connecting to db" , e))

app.listen(port , () => {
    console.log("Server is Running on port 3000")
})
app.post('/createadmin', async (req, res) => {
    try {
        const admin = await Admininfo.collection.insertOne({
            'id': 'A001', 
            'name': 'Amit', 
            'email': 'abcd@gmail.com', 
            'password': 'a@123', 
            'phone': 1234567890, 
            'address': 'xyz'
        });
        res.json(admin);
        console.log('Inserted:', admin);
    } catch (error) {
        console.error("Insertion Error:", error); // Log full error
        res.status(500).json({ message: 'Error inserting admin', error: error.message });
    }
});
