const express = require('express')
const categoryModel= require('../models/categoryModel')
const authorModel=require('../models/authorModel')
const bookModel=require('../models/bookModel')
//const form1 =require('../public/js/admin')

const adminRouter = express.Router()

adminRouter.get('/', (req, res) => {    
        res.render('pages/adminsignin.ejs')
});


 //categories
 adminRouter.get('/categories',(req,res)=>
 {
     categoryModel.find()
     .then((categories)=>
     {
         res.render('pages/admin_categories.ejs',{
             categories:categories
         })
     })
 })
 adminRouter.get('/authors',(req,res)=>
 {
     authorModel.find()
     .then((authors)=>
     {
         res.render('pages/admin_authors.ejs',{
            authors:authors
         })
     })
 })
 adminRouter.get('/books',(req,res)=>
 {
     bookModel.find()
     .then((books)=>
     {
         res.render('pages/admin_books.ejs',{
            books:books
         })
     })
 })
    
    //del category
    adminRouter.get('/categories/:id/deleteCategory',(req,res)=>
    {
        categoryModel.findByIdAndDelete({_id:req.params.id})
        .then((deletdCategory)=>
        {
            console.log(deletdCategory)
            res.redirect('/admin/categories')

        })

    })
    //del book
    adminRouter.get('/books/:id/deleteBook',(req,res)=>
    {
        bookModel.findByIdAndDelete({_id:req.params.id})
        .then((deleteBook)=>
        {
            console.log(deleteBook)
            res.redirect('/admin/books')

        })

    })
    //del author
    adminRouter.get('/authors/:id/deleteAuthor',(req,res)=>
    {
        authorModel.findByIdAndDelete({_id:req.params.id})
        .then((deletedAuthors)=>
        {
            console.log(deletedAuthors)
            res.redirect('/admin/authors')

        })

    })

adminRouter.post('/categories',(req,res)=>
{
    categoryModel.create({
        name:req.body.name
    })
    .then(()=>
    {
        res.redirect('/admin/categories')
    })

}) 
adminRouter.post('/books',(req,res)=>
{
    


    // authorModel.findOne({first_name: req.body.newBookauthor})
    // .then((author,err)=>
    // {
    //  if(err)
    //  {
    //      authorModel.create({first_name:req.body.newBookauthor})
    //      .then((author)=>
    //      {
    //         categoryModel.findOne({name:req.body.newBookcategory},(category,err)=>
    //         {
    //             if(err)
    //             {
    //                 categoryModel.create({name:req.body.newBookcategory})
    //                 .then(()=>
    //                 {
    //                     bookModel.create({
                            // name:req.body.newBookname,
                            // image:req.body.newBookimage,
    //                         categoryId:category._id,
    //                         authorId:author._id
                    
    //                     })
    //                     .then(()=>
    //                     {
    //                         console.log("here after")
                    
                    
    //                         res.redirect('/admin/books')
    //                     })

    //                 })
    //             }
                
    
    //         })

    //      })
    //  }   

    // })
    
    {
        
            
        
    }
    
    

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