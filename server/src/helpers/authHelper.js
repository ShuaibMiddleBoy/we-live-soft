const bcrypt = require('bcrypt');

const hashPassowrd = async (password) => {
const hashedPassword = await bcrypt.hash(password, 10);
return hashedPassword;
}
const comparePassword = (password , hashedpassword) => {
return bcrypt.compare(password, hashedpassword);
}

module.exports = {hashPassowrd, comparePassword}