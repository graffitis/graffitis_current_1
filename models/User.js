
/* 
    #TODO: Nomenclatura unica per Super, Admin e User > User e utilizzo roles differnenti
*/
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    pic: String,
    role: Number
    /* 
      ROLES: 
        super  > 2
        admin  > 1
        user   > 0
    */
});

var User = mongoose.model('User', userSchema);

module.exports = User;
