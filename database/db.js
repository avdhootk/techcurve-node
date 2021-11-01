const express = require('express');
const mongoose = require('mongoose');

const url = process.env.mongoURL;

mongoose.connect(url , {useNewUrlParser:true});

const con = mongoose.connection;

con.on('open',()=>{
    console.log('Database Connected.....')
});

module.exports = con