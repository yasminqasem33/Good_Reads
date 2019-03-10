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
 function getCategories(res)
 {
    categoryModel.find()
    .then((categories)=>
    {
        res.render('pages/admin_categories.ejs',{
            categories:categories
        })
    })
 }
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
//  adminRouter.post('/categories',(req,res)=>
//  {
//      getCategories(res)
//  })
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
          authorModel.find()
    .then((authors)=>
    {
      
        categoryModel.find()
        .then((categories)=>
        {
            res.render('pages/admin_books.ejs',{
                categories:categories,
                books :books,
                authors:authors,
             })
        })

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
    //edit cat 
    // adminRouter.get('/categories/:id/editCategory',(req,res)=>
    // {
    //     console.log("lkdslkj")
    //     categoryModel.findById({_id:req.params.id},(category)=>
    //     {
    //         res.render('pages/admin_editCategory',
    //         {
    //             category:category
    //         })
    //         categoryModel.findByIdAndDelete({
    //             _id:req.params.id
    //         },()=>
    //         {
    //             categoryModel.create({
    //                 id:category.id,
    //                 name:category.name
    //             },()=>
    //             {
    //                 res.redirect('/admin/categories')
    
    //             })
    //         })
    //     })
        

    // })
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
    // adminRouter.get('/categories/:id/editCategory',(req,res)=>
    // {
    //     console.log("sfs")

    // })
    
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


adminRouter.post('/books',(req,res)=>
{
    bookModel.findOne({name:req.body.name},function(err,data)
    {
        if(data==null)
        {
            //
            
            authorModel.findOne({first_name:req.body.authors})
            .then((author)=>
            {
                console.log(author)
                categoryModel.findOne({name:req.body.categories})
                .then((category)=>
                {

                    console.log(category)
                    bookModel.create({
                        image:req.body.image,
                        name:req.body.name,
                        authorId:author._id,
                        categoryId:category._id
        
                    })
                    .then((user)=>
                    {
                        console.log(user)
                        res.redirect('/admin/books')
        
                    })
                })
            }
        
        )


            //

        }
        else
        {
            console.log("already exist")
            //handling of existing book with same name
            
        }

    })
    
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