const mongoose = require('mongoose')

let Schema =  mongoose.Schema;
let accessTokenSchema  = new Schema({
    user_id : {type : Schema.Types.ObjectId, ref : 'User'},
    accesstoken : { type: String, required : true, unique : true},
    creationDate : { type : Date, default : Date.now},
    modifiedDate : { type : Date}
})


// on every save, update the created/modified date
accessTokenSchema.pre('save', function(next) {
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
var Accesstoken = mongoose.model('Accesstoken', accessTokenSchema);


// Make Accesstoken available everywhere in the app
module.exports = Accesstoken;
