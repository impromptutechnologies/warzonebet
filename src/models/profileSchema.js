
const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    tokens: {type: Number, default:0, required:true},
    codUsername: {type:String, default:'', required:false},
    codPlatform: {type:String, default:'', required:false},
    verified:{type:String, default:'no', required:true},
    skillLevel:{type:String, default:'', required:false},
    payments:[]
}, {timestamps: true});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;