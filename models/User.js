
const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
       
        first_name: String,
        
        last_name: String,
         middle_name: String,
         email: String,
         phone: String,
         password: String,
         created:{
            type: Date,
            default: Date.now
         }
    }
);
    
   
    module.exports = User = mongoose.model('users', UserSchema);    