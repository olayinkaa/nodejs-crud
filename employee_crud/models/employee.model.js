const mongoose =require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:"The full name is required"
    },
    email: {
        type:String,
        required:"The email is required"

    },
    mobile: {
        type:String,
        required:"The mobile is required"

    },
    city: {
        type:String,
        required:"The city is required"

    }
});

mongoose.model('Employee',employeeSchema);
//Employee looks for 'employees' collection in the database thats the plural form of the model name