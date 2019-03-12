const express = require('express')
const categoryModel = require('../models/categoryModel')
const authorModel = require('../models/authorModel')
const bookModel = require('../models/bookModel')
const url = require('url');
//const form1 =require('../public/js/admin')

const adminRouter = express.Router()

adminRouter.get('/', (req, res) => {
    res.render('pages/adminsignin.ejs')
});


//categories
function getCategories(res) {
    categoryModel.find()
        .then((categories) => {
            res.render('pages/admin_categories.ejs', {
                categories: categories
            })
        })
}
//change
adminRouter.get('/categories', (req, res) => {
    categoryModel.find()
        .then((categories) => {
            res.render('pages/admin_categories.ejs', {
                categories: categories
            })
        })
    // getCategories(res)
    // categoryModel.create({
    //     _id:req.query.id,
    //     name:req.body.name
    // },
    //     ()=>
    //     {

    //     })

})
//  adminRouter.post('/categories',(req,res)=>
//  {
//      getCategories(res)
//  })
adminRouter.get('/authors', (req, res) => {
    authorModel.find()
        .then((authors) => {
            res.render('pages/admin_authors.ejs', {
                authors: authors
            })
        })
})
adminRouter.get('/books', (req, res) => {
    bookModel.find()
        .then((books) => {
            authorModel.find()
                .then((authors) => {

                    categoryModel.find()
                        .then((categories) => {
                            res.render('pages/admin_books.ejs', {
                                categories: categories,
                                books: books,
                                authors: authors,
                            })
                        })

                })

        })
})


//del category
adminRouter.get('/categories/:id/deleteCategory', (req, res) => {
    categoryModel.findByIdAndDelete({ _id: req.params.id })
        .then((deletdCategory) => {
            console.log(deletdCategory)
            res.redirect('/admin/categories')

        })

})
adminRouter.post('/categories', (req, res) => {

    categoryModel.create({
        name: req.body.name
    })
        .then(() => {

            res.redirect('/admin/categories')
        })

})
adminRouter.post('/categories/:id/editCategory_andsave', (req, res) => {
    categoryModel.updateOne( req.params._id , { $set: { name: req.body.name }})
        .then((updated) => {
            console.log(req.params.id)
            console.log(updated)
            console.log(req.body.name)
            res.redirect('/admin/categories')
        })

})
//edit cat 
adminRouter.get('/categories/:id/editCategory', (req, res) => {
    console.log(req.params.id)
    categoryModel.findOne(
        { _id: req.params.id })
        .then((category) => {
            // console.log(category)
            res.render('pages/admin_editCategories',
                {
                    category: category
                })
            // res.redirect(url.format({
            //     pathname:"/admin/categories",
            //     query: {
            //        "id": req.params.id,


            //      }}))



            // categoryModel.create({
            //     _id:category._id,
            //     name:req.body.name

            // }).then(()=>
            // {
            //     // categoryModel.find().then((data)=>
            //     // {
            //     //     console.log(data)
            //     // })
            //     res.redirect('/admin/categories')

            // })

        }
        )
}
)


//del book
adminRouter.get('/books/:id/deleteBook', (req, res) => {
    bookModel.findByIdAndDelete({ _id: req.params.id })
        .then((deleteBook) => {
            console.log(deleteBook)
            res.redirect('/admin/books')

        })

})


//del author
adminRouter.get('/authors/:id/deleteAuthor', (req, res) => {
    authorModel.findByIdAndDelete({ _id: req.params.id })
        .then((deletedAuthors) => {
            console.log(deletedAuthors)
            res.redirect('/admin/authors')

        })

})


adminRouter.post('/books', (req, res) => {
    bookModel.findOne({ name: req.body.name }, function (err, data) {
        if (data == null) {
            //

            authorModel.findOne({ first_name: req.body.authors })
                .then((author) => {
                    console.log(author)
                    categoryModel.findOne({ name: req.body.categories })
                        .then((category) => {

                            console.log(category)
                            bookModel.create({
                                image: req.body.image,
                                name: req.body.name,
                                authorId: author._id,
                                categoryId: category._id

                            })
                                .then((user) => {
                                    console.log(user)
                                    res.redirect('/admin/books')

                                })
                        })
                }

                )


            //

        }
        else {
            console.log("already exist")
            //handling of existing book with same name

        }

    })

})

//login admin validation
adminRouter.post('/', (req, res) => {
    if (req.body.name == "yasmin" && req.body.password == "12345") {
        res.redirect('admin/home')

    }
    else {
        res.redirect('/admin')
    }


})






module.exports = adminRouter