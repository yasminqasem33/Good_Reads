const express = require('express')
const categoryModel = require('../models/categoryModel')
const authorModel = require('../models/authorModel')
const bookModel = require('../models/bookModel')
const url = require('url');
var formidable = require('formidable');
var mongoose = require('mongoose');
var grid = require('gridfs-stream');
var fs = require('fs');
var util = require('util');
var path = require("path");
const adminRouter = express.Router()
function getPath(req) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.resolve(".") + "/public/img";
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if (!err) {
            console.log("get path inside func" + files.file.path)
            return files.file.path
        }
    })
}
adminRouter.get('/', (req, res) => {
    res.render('pages/adminsignin.ejs')
});
adminRouter.get('/categories', (req, res) => {
    getCategories(res)

})
adminRouter.post('/categories/addCategory_andsave', (req, res) => {
    console.log(req.body.name)
    categoryModel.findOne({ name: req.body.name })
        .then((category) => {
            if (category == null) {
                categoryModel.create({
                    name: req.body.name
                }, (category) => {
                    res.redirect('/admin/categories')

                })
            }
            else { res.send("Repeated category name,Enter Back To Try Again") }
        })




})
adminRouter.get('/categories/addCategories', (req, res) => {
    res.render('pages/admin_formCategory.ejs', { form: "add" })

})
adminRouter.get('/authors', (req, res) => {
    authorModel.find()
        .then((authors) => {
            res.render('pages/admin_authors.ejs', {
                authors: authors
            })
        })
})
adminRouter.post('/books/:id/editBook_andsave', () => {
    res.send("here")

})
adminRouter.get('/books', (req, res) => {
    bookModel.find()
        .then((books) => {
            res.render('pages/admin_books.ejs',
                {
                    books: books
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

adminRouter.post('/categories/:id/editCategory_andsave', (req, res) => {
    categoryModel.findByIdAndUpdate(req.params.id, { name: req.body.name })
        .then((updated) => {
            console.log("this is id" + req.params.id)

            console.log("this is new name" + req.body.name)
            console.log(updated)
            res.redirect('/admin/categories')
        }).catch(err => {
            res.send("id not found")
        })

})
//edit cat 
adminRouter.get('/categories/:id/editCategory', (req, res) => {
    console.log(req.params.id)
    categoryModel.findOne(
        { _id: req.params.id })
        .then((category) => {
            console.log("this is category which passed to input" + category)
            res.render('pages/admin_formCategory.ejs',
                {
                    form: "edit",
                    category: category
                })


        }
        )
}
)
adminRouter.get('/books/:id/editBook', (req, res) => {

    bookModel.findOne({ _id: req.params.id })
        .then((book) => {
            authorModel.find()
                .then((authors) => {
                    categoryModel.find()
                        .then((categories) => {
                            
                            res.render('pages/admin_formBook.ejs', {
                                book: book,
                                form: "edit",
                                categories:categories,
                                authors:authors

                            })


                        })

                })

        })

})


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
adminRouter.post('/books/add_save', (req, res) => {

    bookModel.findOne({ name: req.body.name })
        .then((book) => {
            console.log(book)
            if (book == null) {
                authorModel.findOne({ first_name: req.body.authors })
                    .then((author) => {
                        categoryModel.findOne({ name: req.body.categories })
                            .then((category) => {
                                bookModel.create({
                                    image: req.body.image,
                                    name: req.body.name,
                                    authorId: author._id,
                                    categoryId: category._id

                                })
                                    .then(() => {
                                        res.redirect('/admin/books')

                                    })

                            })
                    })

            }
            else {
                res.send("Repeated Book Name, Enter back To Try Again")
            }


        })
})



adminRouter.get('/books/add', (req, res) => {
    authorModel.find()
        .then((authors) => {
            console.log(authors)

            categoryModel.find()
                .then((categories) => {
                    res.render('pages/admin_formBook.ejs', {
                        categories: categories,
                        authors: authors,
                        form: "add"
                    })

                })
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
function getCategories(res) {
    categoryModel.find()
        .then((categories) => {
            res.render('pages/admin_categories.ejs', {
                categories: categories
            })
        })
}





module.exports = adminRouter