const Profile = require('../models/profileSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("../db/mongoose");
require("dotenv").config();

const register = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            req.flash('msg', 'info')
            console.log(req.flash('msg'))
            res.redirect('/')
        }
        let user = new Profile({
            email: req.body.email,
            password: hashedPass,
        })
        req.session.email = user.email;
        user.save((err, req, res) => {
            if(err){
                console.log(err)
            }
        })
        res.redirect('/account')
    })
    
}

const login = async (req, res, next) => {
    var email = req.body.email
    var password = req.body.password
    Profile.findOne({
        email: email
    }).then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                console.log(result)
                if(err){
                    console.log(err)
                    req.flash('msg', 'Error')
                    //console.log(req.flash('msg')[0])
                    res.redirect('/')
                }
                if(result){
                    let token = jwt.sign({email: user.email}, 'versecret', {expiresIn: '2h'})
                    req.session.email = user.email;
                    res.redirect('/account')
                }else{
                    console.log(err)
                    req.flash('msg', 'Error')
                    //console.log(req.flash('msg')[0])
                    res.redirect('/')
                }
            })
        }else{
            req.flash('msg', 'Error')
            //console.log(req.flash('msg')[0])
            res.redirect('/')
        }
    })
}

module.exports = {
    register,login
}