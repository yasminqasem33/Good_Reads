const express = require('express')
//import alert from 'alert-node'

const adminRouter = express.Router()

adminRouter.get('/', (req, res) => {
    res.render('pages/adminsignin.ejs')
 });
adminRouter.get('/homeAdmin',(req,res)=>
{
    //console.log("fff")
    res.render('pages/adminhome.ejs')

})
 adminRouter.post('/',(req,res)=>
 {
    if(req.body.name=="yasmin" && req.body.password=="12345")
    {
        res.redirect('admin/homeAdmin')
         
    }
    else
    {
    //    //window.alert("You aren't Admin")
    //    var popupS = require('popups');
 
    //    popupS.alert({
    //        content: 'Hello World!'
    //    });
        res.redirect('/admin')
        
    }


 })



module.exports=adminRouter