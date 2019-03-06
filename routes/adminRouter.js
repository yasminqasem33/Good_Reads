const express = require('express')
const categoryModel= require('../models/categoryModel')
const authorModel=require('../models/authorModel')
const bookModel=require('../models/bookModel')
//import alert from 'alert-node'

const adminRouter = express.Router()
//login page admin
adminRouter.get('/', (req, res) => {    
        res.render('pages/adminsignin.ejs')
});
 //homepage admin
adminRouter.get('/home',(req,res)=>
{
    categoryModel.find()
    .then((categories)=>
    {
        bookModel.find()
        .then((books)=>
        {
            authorModel.find()
            .then((authors)=>
            {
                //console.log(authors)
                res.render('pages/adminhome',
                {
                    books:books,
                    authors:authors,
                    categories:categories
                })
    
            })
        })
       
       
    })
    
    // categoryModel.find((err,categories)=>
    // {
    //     res.render('pages/adminhome.ejs',
    //     {
    //         categories:categories
    //     })

    // })
    // authorModel.find()
    // .then((authors)=>
    // {
    //     res.render('pages/adminhome.ejs',
    //     {
    //         authors:authors
    //     })
    // })
    
})
//login admin validation
 adminRouter.post('/',(req,res)=>
 {
    if(req.body.name=="yasmin" && req.body.password=="12345")
    {
        res.redirect('admin/home')
         
    }
    else
    {
        res.redirect('/admin')
    }


 })


 



module.exports=adminRouter