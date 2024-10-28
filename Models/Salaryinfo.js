const mongoose = require('mongoose')

const SalarySchema = new mongoose.Schema({
    employeeId: { type: String, required: true },  // Can be doctorId or staffId
    employeeType: { type: String, required: true }, // 'doctor' or 'staff'
    salaryAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    paymentMonth: { type: String, required: true }, // Format 'YYYY-MM'
    paymentDate: { type: Date }
});

const Salary = mongoose.model('Salary', SalarySchema);
module.exports = Salary;
