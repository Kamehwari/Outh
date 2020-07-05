const mongoose = require('mongoose')

let schema =  mongoose.Schema;
let userSchema  = new schema({
    username : { type: String, required : true, unique : true},
    password  : { type : String , required : true},
    creationDate : { type : Date, default : Date.now},
    modifiedDate : { type : Date}
})


// on every save, update the created/modified date
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
  
    // change the modified field to current date
    this.modifiedDate = currentDate;
  
    // if createdDate doesn't exist, add to that field
    if (!this.creationDate)
      this.creationDate = currentDate;
  
    next();
  });
  

  
// Create a Model
var User = mongoose.model('User', userSchema);


// Make User available everywhere in the app
module.exports = User;
