
const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  PostSchema  = new Schema ({
       
        first_name: String,
        last_name: String,
         middle_name: String,
         email: String,
         phone: String,
         password: String,
         token : Number
    }
);
    
   
    module.exports = Post = mongoose.model('User', PostSchema);    