
const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/userModel')
const categoryModel = require('../models/categoryModel')
const bookmodel = require('../models/bookModel')
const autherModel = require('../models/authorModel')

userRouter.get('/categories/:id', (req, res, next) => {
        categoryModel.findById(req.params.id).then((name) => {
            bookmodel.find({ categoryId: req.params.id }).then((record) => {
                console.log(record)
                autherModel.find({id:record.authorId}).then((author)=>{
            res.render('pages/eco1.ejs',
                {
                    name: name,
                    record: record,
                    author: author
                })
            }).catch(err=>console.log(err))
        
        // })
    })
}).catch(console.log)

userRouter.get('/hpage/all', (req, res) => {   //this URL is just user for test. It can be changed.
    bookmodel.find().then((books) => {
        // res.send(books);
        books.forEach(book=>{
            autherModel.findById(book.authorId).then(author=>{
                res.render('pages/userHome.ejs', {
                    books:books,
                    author: author.first_name+" "+author.last_name
                })
                // console.log(author.first_name+" "+author.last_name);
            })
        })
    })
})



userRouter.get('/categories', (req, res) => {

    categoryModel.find()
        .then((categories) => {
            res.render('pages/usercategories.ejs',
                {
                    categories: categories
                })

        })
})

userRouter.get('/categories', (req, res) => {
    res.render('pages/usercategories.ejs')

})


// userRouter.get('/categories/:id', (req, res, next) => {
//     categoryModel.findById(req.params.id).then((name) => {
//     bookmodel.findOne({ categoryId: req.params.id }).then((record) => {
//         // record.forEach(elm=>{
//             autherModel.findById(record.authorId).then(author=>{
//             res.render('pages/eco1.ejs',
//                 {
//                     name: name,
//                     record: record,
//                     author: author.first_name+" "+author.last_name
//                 })
//             //console.log(record)
//             })
//         })
//         // })
//     })
// })


userRouter.get('/categories/:id', (req, res, next) => {
        categoryModel.findById(req.params.id).then((name) => {
            bookmodel.find({ categoryId: req.params.id }).then((record) => {
                console.log(record)
                autherModel.find({id:record.authorId}).then((author)=>{
            res.render('pages/eco1.ejs',
                {
                    name: name,
                    record: record,
                    author: author
                })
            }).catch(err=>console.log(err))
        
        // })
    })
}).catch(console.log)
// userRouter.get('/categories/:id', (req, res) => {   //this URL is just user for test. It can be changed.
//     bookmodel.find().then((books) => {
//         books.forEach(book=>{
//             autherModel.findById(book.authorId).then(author=>{
//                 res.render('pages/eco1.ejs', {
//                     books:books,
//                     author: author.first_name+" "+author.last_name
//                 })
//                 // console.log(author.first_name+" "+author.last_name);
//             })
//         })
//     })
// })



userRouter.get('/hpage/read', (req, res) =>{
    res.render('pages/userread.ejs')
})


userRouter.get('/', (req, res) => {


    res.render('pages/homepage.ejs')})

userRouter.post('/',(req,res)=>{
    if(req.body.psw === req.body.pswrepeat)
    {
        userModel.findOne({ email: req.body.email}).then((record) => {
            //console.log(record)
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
                    //console.log(usr)
            
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
        //console.log(record)
        if (record && record.userpassword === req.body.pass){
            //console.log(record.state)  
          //console.log('User and password is correct')
         
          userModel.updateOne({_id: record._id}, ({state:'online'}), function(err, raw) {
            if (err) {
              res.send(err);
            }   
          }); 
          //console.log(record.state)  
               res.redirect('/signin/id='+record._id+'/userhome')
         } else {
          //console.log(" wrong");
          res.redirect('/signin')       
         }              
 })
})
})


// userRouter.get('/signin/:id/userhome', (req, res) => {
//     res.render('pages/userHome.ejs')
// })


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
})

//     res.render('pages/')
// })




var getSHA1ofJSON = function (input) {
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}

module.exports = userRouter
