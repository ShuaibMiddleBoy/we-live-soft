const mongoose = require('mongoose');


const DB = process.env.DB;


mongoose.connect(DB).then(()=>{
    console.log('DB Conntected!');
}).catch((err)=>{
    console.log('DB Connection Failed!', err)
})
module.exports = mongoose;
