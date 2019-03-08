
const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/userModel')
const categoryModel = require('../models/categoryModel')
const bookmodel = require('../models/bookModel')

userRouter.get('/categories', (req, res) => {

    categoryModel.find()
        .then((categories) => {
            res.render('pages/usercategories.ejs',
                {
                    categories: categories
                })

        })
    })

userRouter.get('/categories', (req,res)=>
{
    res.render('pages/usercategories.ejs')

})


userRouter.get('/categories/:id', (req, res, next) => {
    bookmodel.findOne({ categoryId: req.params.id }).then((record) => {
        categoryModel.findById(req.params.id).then((name) => {

            res.render('pages/eco1.ejs',
                {
                    name: name,
                    record: record
                })
                console.log(record)
        })
    })
})

// userRouter.get('/categories/:id', (req,res, next)=>
// {
//     categoryModel.findById(req.params.id).then((name)=>{

//         res.render('pages/eco1.ejs',
//         {

//             name:name
//         })
//         //res.send(name.name)
//     })
//     bookmodel.findOne({categoryId:req.params.id}).then((record)=>{
//         res.render('pages/eco1.ejs',
//         {
//             record:record
//         })
//     })

//   //  res.render('pages/eco1.ejs')
// })


// userRouter.get('/categories', (req,res)=>
// {
//     res.render('pages/usercategories.ejs')

// })
// userRouter.get('/categories/:categoryid/eco1', (req, res) =>{
//     res.render('pages/eco1.ejs')
// })
// userRouter.get('/categories/:categoryid/eco2', (req, res) =>{
//     res.render('pages/eco2.ejs')
// })
// userRouter.get('/categories/:categoryid/eco3', (req, res) =>{
//     res.render('pages/eco3.ejs')
// })

// userRouter.get('/categories/:categoryid/sprt1', (req, res) =>{
//     res.render('pages/sprt1.ejs')
// })
// userRouter.get('/categories/:categoryid/sprt2', (req, res) =>{
//     res.render('pages/sprt2.ejs')
// })
// userRouter.get('/categories/:categoryid/sprt3', (req, res) =>{
//     res.render('pages/sprt3.ejs')
// })

// userRouter.get('/categories/:categoryid/scty1', (req, res) =>{
//     res.render('pages/scty1.ejs')
// })
// userRouter.get('/categories/:categoryid/scty2', (req, res) =>{
//     res.render('pages/scty2.ejs')
// })
// userRouter.get('/categories/:categoryid/scty3', (req, res) =>{
//     res.render('pages/scty3.ejs')
// })









// userRouter.get('/categories/:categoryid/art1', (req, res) =>{
//     res.render('pages/art1.ejs')
// })
// userRouter.get('/categories/:categoryid/art2', (req, res) =>{
//     res.render('pages/art2.ejs')
// })
// userRouter.get('/categories/:categoryid/art3', (req, res) =>{
//     res.render('pages/art3.ejs')
// })

// userRouter.get('/categories/:categoryid/hror1', (req, res) =>{
//     res.render('pages/hror1.ejs')
// })
// userRouter.get('/categories/:categoryid/hror2', (req, res) =>{
//     res.render('pages/hror2.ejs')
// })
// userRouter.get('/categories/:categoryid/:categoryid/hror3', (req, res) =>{
//     res.render('pages/hror3.ejs')
// })

userRouter.get('/', (req, res) => {
    res.render('pages/homepage.ejs')
})

userRouter.post('/',(req,res)=>{
    if(req.body.psw === req.body.pswrepeat)
    {
        userModel.findOne({ email: req.body.email}).then((record) => {
            console.log(record)
            if (record ){
                res.redirect('/')
                console.log("already user")
            } else {
                userModel.create({
                    firstName: req.body.FirstName,
                    lastName: req.body.LastName,
                    email: req.body.email,
                    userpassword: req.body.psw,
                    userImage:"sddkkk",
                    state:"offline"
                })
                .then ((usr)=>{
                    res.redirect('/signin')
                    console.log(usr)
            
                })
            }              
        })   
    }
    else
    {
        res.redirect('/')
        console.log("false password")
    }
})


userRouter.get('/signin',(req,res)=>{
    res.render('pages/usersignin.ejs')
})

userRouter.post('/signin',(req,res)=>{
    userModel.findOne({ email: req.body.email}).then((record) => {
        console.log(record)
        if (record && record.userpassword === req.body.pass){
            console.log(record.state)  
          console.log('User and password is correct')
         
          userModel.updateOne({_id: record._id}, ({state:'online'}), function(err, raw) {
            if (err) {
              res.send(err);
            }   
          }); 
          console.log(record.state)  
               res.redirect('/signin/id='+record._id+'/userhome')
         } else {
          console.log(" wrong");
          res.redirect('/signin')       
         }              
 })
})


userRouter.get('/signin/:id/userhome', (req, res) => {
    res.render('pages/userHome.ejs')
})


userRouter.post('/signin/:id/userhome/logout',(req,res)=>{
    userModel.updateOne({_id: req.params._id}, ({state:'offline'}), function(err, raw) {
        if (err) {
          res.send(err);
        }  
        else{
          res.redirect('/signin')  
        }
    }); 
})






userRouter.get('/categories/:id', (req, res) => {
    res.render('/pages/')
})




var getSHA1ofJSON = function(input){
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}

module.exports = userRouter
