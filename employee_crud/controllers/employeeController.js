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

    if(req.body._id == "")
        insertRecord(req,res);
    else
        updateRecord(req,res);

})

router.get('/list',(req,res)=>{

    // res.json('from list');
    Employee.find((err,docs)=>{
            if(!err){

                res.render("employee/list",{list:docs});

            } else {

                    console.log("Error in retrieving Employee list: " + err);
            }
    });
});

router.get('/:id',(req,res)=>{

    Employee.findById(req.params.id,(err,docs)=>{
            if(!err){
                res.render('employee/addOrEdit',{
                    viewTitle:"Update Employee",
                    employee:docs
                })
            } else {

                
            }
    });
});


router.get('/delete/:id',(req,res)=>{

        deleteRecord(req,res);

});


function deleteRecord(req,res)
{
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(!err)
                res.redirect('/employee/list');
            else
                console.log("Error while trying to delete this record "+ err);
    });
}

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

function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('employee/list');
        } 
        else {
                if(err.name = 'validationError'){
                    handleValidationError(err,req.body);
                    res.render("employee/addOrEdit",
                    {
                        viewTitle:"Update Employee",
                        employee:req.body
                    });
                }
                else
                {
                    console.log("Error while updating this record " + err);
                }
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