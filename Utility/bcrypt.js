const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    try {
        const saltRounds = 8; // Number of salt rounds for hashing
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Password hashing failed.');
    }
};


const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed.');
    }
};


module.exports = { hashPassword, comparePassword };