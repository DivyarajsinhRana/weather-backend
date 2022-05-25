const express = require('express');
const requests = require('requests');
const { apikey } = require('./config');

const app = express();  //initialize app

app.get('/',(req,res)=>{
    res.send('welcome to home page')
});
app.get('/temp',(req,res)=>{
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${apikey}`)
            .on('data', (chunk) => {
                // console.log(chunk)
                res.write(chunk);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.send()
                // console.log('end');
            })
});
app.get('*',(req,res)=>{
    res.send('error 404!,record not found...')
});
app.listen(8000,()=>{
    console.log('server run on port 8000');
})