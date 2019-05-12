const mongoose =require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:"The full name is required"
    },
    email: {
        type:String
    },
    mobile: {
        type:String
    },
    city: {
        type:String
    }
});

mongoose.model('Employee',employeeSchema);
//Employee looks for 'employees' collection in the database thats the plural form of the model name