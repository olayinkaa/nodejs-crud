const express = require('express');
var router = express.Router();

//connection to database-------------------
const mongoose =require('mongoose');
const Employee = mongoose.model('Employee');


//-------------------------CRUD ------------------------------------------------------
router.get('/',(req,res)=>{
      //res.json('sample text');
      res.render("employee/addOrEdit",{viewTitle:"Insert Employee"})
});
router.post('/',(req,res)=>{

     insertRecord(req,res);

})

router.get('/list',(req,res)=>{

    res.json('from list');
});


function insertRecord(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc)=>{
        if(!err)
            res.redirect('employee/list');
        else {
            
            if(err.name=='validationError')
            {
                handleValidationError(err,req.body);
                res.render('employee/addOrEdit',{
                    viewTitle:"insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion'+err);
        }
    });
}


function handleValidationError(err,body){

        for(field in err.errors)
        {
            switch(err.errors[field].path){
                case 'fullname':
                        body['fullNameError']=err.errors[field].message;
                        break;
                case 'email':
                        body['emailError']=err.errors[field].message;
                        break;
                default:
                        break;

            }
        }
}

module.exports = router;