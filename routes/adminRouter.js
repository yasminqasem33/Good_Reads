const express = require('express')
const categoryModel = require('../models/categoryModel')
const authorModel = require('../models/authorModel')
const bookModel = require('../models/bookModel')
const url = require('url');



const adminRouter = express.Router()

adminRouter.get('/', (req, res) => {
    res.render('pages/adminsignin.ejs')
});
adminRouter.get('/categories', (req, res) => {
    getCategories(res)
})

//login admin validation
adminRouter.post('/', (req, res) => {
    if (req.body.name == "yasmin" && req.body.password == "12345") {
        res.redirect('admin/categories')

    }
    else {
        res.redirect('/admin')
    }


})



//=====================category routes=================
function getCategories(res) {
    categoryModel.find()
        .then((categories) => {
            res.render('pages/admin_categories.ejs', {
                categories: categories
            })
        })
}
adminRouter.post('/categories/addCategory_andsave', (req, res) => {
    categoryModel.findOne({ name: req.body.name })
        .then((category) => {
            if (category == null) {
                categoryModel.create({
                    name: req.body.name
                }, (category) => {
                    res.redirect('/admin/categories')
                })
            }
            else { res.send("Repeated Book name,Enter Back To Try Again") }
        })
})

adminRouter.get('/categories/addCategories', (req, res) => {
    res.render('pages/admin_formCategory.ejs', { form: "add" })
})

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
        })
})











//============================ books routes======================


//del book
adminRouter.get('/books/:id/deleteBook', (req, res) => {
    bookModel.findByIdAndDelete({ _id: req.params.id })
        .then((deleteBook) => {
            console.log(deleteBook)
            res.redirect('/admin/books')

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
        }
        else {
            console.log("already exist")
            //handling of existing book with same name

        }

    })

})


//==========================authors routes======================
adminRouter.get('/authors', (req, res) => {
    authorModel.find()
        .then((authors) => {
            res.render('pages/admin_authors.ejs', {
                authors: authors
            })
        })
})


adminRouter.post('/authors', (req, res) => {
    authorModel.findOne({ name: req.body.name }, function (err, data) {
        if (data == null) {
            authorModel.create({
                first_name:req.body.firstname,
                last_name:req.body.lastname,
                date_birth:req.body.date_birth
            }).then((user) => {
                console.log(user)
                res.redirect('/admin/authors')
            })         
                }
        else {
            console.log("already exist")
            //handling of existing book with same name
        }
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

function getauthors(res) {
    authorModel.find()
        .then((authors) => {
            res.render('pages/admin_authors.ejs', {
                authors: authors
            })
        })
}
adminRouter.post('/authors/addauthor_andsave', (req, res) => {
    authorModel.findOne({ name: req.body.name })
        .then((author) => {
            if (author == null) {
                authorModel.create({
                    name: req.body.name
                }, (author) => {
                    res.redirect('/admin/authors')
                })
            }
            else { res.send("Repeated Book name,Enter Back To Try Again") }
        })
})

adminRouter.get('/authors/addauthors', (req, res) => {
    res.render('pages/admin_formauthor.ejs', { form: "add" })
})

adminRouter.get('/authors/:id/deleteauthor', (req, res) => {
    categoryModel.findByIdAndDelete({ _id: req.params.id })
        .then((deletdCategory) => {
            console.log(deletdCategory)
            res.redirect('/admin/authors')

        })
})

adminRouter.post('/authors/:id/editauthors_andsave', (req, res) => {
    authorModel.findByIdAndUpdate(req.params.id, { name: req.body.name })
        .then((updated) => {
            console.log("this is id" + req.params.id)

            console.log("this is new name" + req.body.name)
            console.log(updated)
            res.redirect('/admin/authors')
        }).catch(err => {
            res.send("id not found")
        })
})

adminRouter.get('/authors/:id/editauthors', (req, res) => {
    console.log(req.params.id)
    authorModel.findOne(
        { _id: req.params.id })
        .then((author) => {
            console.log("this is author which passed to input" + author)
            res.render('pages/admin_formauthor.ejs',
                {
                    form: "edit",
                    author: author
                })
        })
})
module.exports = adminRouter